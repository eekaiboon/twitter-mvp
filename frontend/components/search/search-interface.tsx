"use client"

import { useState } from "react"
import { SearchBar } from "./search-bar"
import { SearchResults } from "./search-results"
import { TrendingHashtags } from "./trending-hashtags"
import { SearchFilters } from "./search-filters"
import type { SearchFilters as SearchFiltersType } from "@/types/search"

interface SearchInterfaceProps {
  initialQuery?: string
}

export function SearchInterface({ initialQuery = "" }: SearchInterfaceProps) {
  const [query, setQuery] = useState(initialQuery)
  const [filters, setFilters] = useState<SearchFiltersType>({})
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    setIsSearching(!!searchQuery.trim())
  }

  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters)
  }

  return (
    <div className="space-y-6">
      <SearchBar initialQuery={initialQuery} onSearch={handleSearch} />

      {isSearching && <SearchFilters filters={filters} onFiltersChange={handleFiltersChange} />}

      {isSearching ? (
        <SearchResults query={query} filters={filters} />
      ) : (
        <div className="space-y-6">
          <TrendingHashtags />
          <div className="text-center py-12">
            <div className="space-y-4">
              <div className="text-gray-500">
                <svg
                  className="w-16 h-16 mx-auto mb-4 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Search Twitter Clone</h3>
                <p className="text-gray-600">Find tweets, hashtags, and users</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
