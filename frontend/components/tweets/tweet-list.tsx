"use client"

import { useState, useEffect, useCallback } from "react"
import { TweetCard } from "./tweet-card"
import { TweetSkeleton } from "./tweet-skeleton"
import { getUserTweets } from "@/lib/api/actions/tweet"
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { TweetsResponse, Tweet } from "@/types/tweet"

interface TweetListProps {
  userId: string
  refreshTrigger?: number
  initialData?: TweetsResponse
}

export function TweetList({ userId, refreshTrigger = 0, initialData }: TweetListProps) {
  const [tweets, setTweets] = useState<Tweet[]>(initialData?.success ? initialData.tweets || [] : [])
  const [isLoading, setIsLoading] = useState(!initialData?.success)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false) // No pagination implemented yet

  const loadTweets = useCallback(
    async (reset = false) => {
      try {
        if (reset) {
          setIsLoading(true)
          setError(null)
        } else {
          setIsLoadingMore(true)
        }

        const result = await getUserTweets(userId)

        if (result.success && result.tweets) {
          setTweets(result.tweets)
        } else {
          setError(result.error || "Failed to load tweets")
        }
      } catch (err) {
        setError("An unexpected error occurred")
      } finally {
        setIsLoading(false)
        setIsLoadingMore(false)
      }
    },
    [userId],
  )

  const handleRefresh = () => {
    loadTweets(true)
  }

  const { loadingRef } = useInfiniteScroll({
    hasMore,
    isLoading: isLoadingMore,
    onLoadMore: () => {}, // No pagination yet
  })

  useEffect(() => {
    // Don't load initially if we already have data from the server
    if (initialData?.success && refreshTrigger === 0) {
      return;
    }
    loadTweets(true)
  }, [loadTweets, refreshTrigger, initialData])

  if (isLoading) {
    return (
      <div className="space-y-4">
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tweets yet</h3>
            <p className="text-gray-600 mb-4">Start tweeting to see your posts here!</p>
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}

      {/* Loading indicator */}
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
            <p>You've reached the end</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TweetList