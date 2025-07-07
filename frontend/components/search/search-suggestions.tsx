"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Hash, User, Search } from "lucide-react"
import type { SearchSuggestion } from "@/types/search"

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[]
  onSuggestionClick: (suggestion: SearchSuggestion) => void
  isLoading: boolean
}

export function SearchSuggestions({ suggestions, onSuggestionClick, isLoading }: SearchSuggestionsProps) {
  const getIcon = (type: SearchSuggestion["type"]) => {
    switch (type) {
      case "hashtag":
        return <Hash className="w-4 h-4 text-blue-500" />
      case "user":
        return <User className="w-4 h-4 text-green-500" />
      default:
        return <Search className="w-4 h-4 text-gray-500" />
    }
  }

  const formatValue = (suggestion: SearchSuggestion) => {
    return suggestion.type === "hashtag" ? `#${suggestion.value}` : suggestion.value
  }

  if (isLoading) {
    return (
      <Card className="absolute top-full left-0 right-0 mt-1 z-50">
        <CardContent className="p-2">
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-2">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse flex-1" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg">
      <CardContent className="p-2">
        <div className="space-y-1">
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${suggestion.value}-${index}`}
              onClick={() => onSuggestionClick(suggestion)}
              className="w-full flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md transition-colors text-left"
            >
              {getIcon(suggestion.type)}
              <div className="flex-1">
                <span className="text-gray-900">{formatValue(suggestion)}</span>
                {suggestion.count && (
                  <span className="text-sm text-gray-500 ml-2">
                    {suggestion.count} {suggestion.type === "hashtag" ? "tweets" : "results"}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
