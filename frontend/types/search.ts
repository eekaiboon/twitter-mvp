import type { Tweet } from "./tweet"

export interface SearchTweet extends Tweet {
  highlightedContent?: string
  matchedHashtags?: string[]
  matchedKeywords?: string[]
}

export interface SearchInput {
  query: string
  limit?: number
  cursor?: string
  filters?: SearchFilters
}

export interface SearchFilters {
  dateFrom?: string
  dateTo?: string
  userId?: string
  hasMedia?: boolean
  hasLinks?: boolean
}

export interface SearchResponse {
  success: boolean
  tweets?: SearchTweet[]
  hasMore?: boolean
  nextCursor?: string
  totalCount?: number
  error?: string
}

export interface SearchSuggestion {
  type: "hashtag" | "user" | "keyword"
  value: string
  count?: number
}

export interface SearchSuggestionsResponse {
  success: boolean
  suggestions?: SearchSuggestion[]
  error?: string
}
