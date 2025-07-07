"use client"

import { useState, useEffect, useCallback } from "react"
import { TweetCard } from "@/components/tweets/tweet-card"
import { TweetSkeleton } from "@/components/tweets/tweet-skeleton"
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll"
import { searchTweets } from "@/lib/search-actions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SearchTweet, SearchFilters } from "@/types/search"

interface SearchResultsProps {
  query: string
  filters: SearchFilters
}

export function SearchResults({ query, filters }: SearchResultsProps) {
  const [tweets, setTweets] = useState<SearchTweet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [nextCursor, setNextCursor] = useState<string | undefined>()
  const [totalCount, setTotalCount] = useState<number>(0)

  const performSearch = useCallback(
    async (cursor?: string, reset = false) => {
      try {
        if (reset) {
          setIsLoading(true)
          setError(null)
        } else {
          setIsLoadingMore(true)
        }

        const result = await searchTweets({
          query,
          limit: 10,
          cursor,
          filters,
        })

        if (result.success && result.tweets) {
          if (reset) {
            setTweets(result.tweets)
          } else {
            setTweets((prev) => [...prev, ...result.tweets!])
          }
          setHasMore(result.hasMore || false)
          setNextCursor(result.nextCursor)
          setTotalCount(result.totalCount || 0)
        } else {
          setError(result.error || "Search failed")
        }
      } catch (err) {
        setError("An unexpected error occurred")
      } finally {
        setIsLoading(false)
        setIsLoadingMore(false)
      }
    },
    [query, filters],
  )

  const handleLoadMore = useCallback(() => {
    if (hasMore && !isLoadingMore && nextCursor) {
      performSearch(nextCursor, false)
    }
  }, [hasMore, isLoadingMore, nextCursor, performSearch])

  const handleRefresh = () => {
    performSearch(undefined, true)
  }

  const { loadingRef } = useInfiniteScroll({
    hasMore,
    isLoading: isLoadingMore,
    onLoadMore: handleLoadMore,
  })

  useEffect(() => {
    if (query.trim()) {
      performSearch(undefined, true)
    }
  }, [performSearch, query])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-600">Searching for "{query}"...</div>
        {Array.from({ length: 5 }).map((_, i) => (
          <TweetSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription className="flex items-center justify-between">
          <span>{error}</span>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (tweets.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="space-y-4">
          <div className="text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-4">No tweets found for "{query}". Try different keywords or hashtags.</p>
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Search again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {totalCount > 0 && (
            <span>
              {totalCount.toLocaleString()} result{totalCount !== 1 ? "s" : ""} for "{query}"
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={handleRefresh}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="space-y-4">
        {tweets.map((tweet) => (
          <SearchTweetCard key={tweet.id} tweet={tweet} query={query} />
        ))}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={loadingRef} className="py-4">
        {isLoadingMore && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <TweetSkeleton key={`loading-${i}`} />
            ))}
          </div>
        )}
        {!hasMore && tweets.length > 0 && (
          <div className="text-center text-gray-500 py-4">
            <p>End of search results</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Enhanced tweet card for search results with highlighting
function SearchTweetCard({ tweet, query }: { tweet: SearchTweet; query: string }) {
  const highlightText = (text: string, searchQuery: string) => {
    if (!searchQuery.trim()) return text

    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  return (
    <TweetCard
      tweet={{
        ...tweet,
        content: tweet.highlightedContent || tweet.content,
      }}
    />
  )
}
