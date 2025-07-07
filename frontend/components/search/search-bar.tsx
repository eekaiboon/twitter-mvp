"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { getSearchSuggestions } from "@/lib/search-actions"
import { SearchSuggestions } from "./search-suggestions"
import type { SearchSuggestion } from "@/types/search"

interface SearchBarProps {
  initialQuery?: string
  onSearch: (query: string) => void
}

export function SearchBar({ initialQuery = "", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.trim().length > 1) {
        fetchSuggestions(query.trim())
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const fetchSuggestions = async (searchQuery: string) => {
    setIsLoading(true)
    try {
      const result = await getSearchSuggestions(searchQuery)
      if (result.success && result.suggestions) {
        setSuggestions(result.suggestions)
        setShowSuggestions(true)
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      setShowSuggestions(false)
      inputRef.current?.blur()
    }
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    const searchQuery = suggestion.type === "hashtag" ? `#${suggestion.value}` : suggestion.value
    setQuery(searchQuery)
    onSearch(searchQuery)
    setShowSuggestions(false)
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
    setSuggestions([])
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search tweets, hashtags, and users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleInputFocus}
            className="pl-10 pr-20 py-3 text-lg"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {query && (
              <Button type="button" variant="ghost" size="sm" onClick={handleClear} className="h-8 w-8 p-0">
                <X className="w-4 h-4" />
              </Button>
            )}
            <Button type="submit" size="sm" disabled={!query.trim()}>
              Search
            </Button>
          </div>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div ref={suggestionsRef}>
          <SearchSuggestions
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  )
}
