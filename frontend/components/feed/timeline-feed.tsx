"use client"

import { useState, useEffect, useCallback } from "react"
import { TweetCard } from "@/components/tweets/tweet-card"
import { TweetSkeleton } from "@/components/tweets/tweet-skeleton"
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll"
import { getFollowingTimeline } from "@/lib/feed-actions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { TimelineTweet } from "@/types/feed"

interface TimelineFeedProps {
  refreshTrigger?: number
}

export function TimelineFeed({ refreshTrigger = 0 }: TimelineFeedProps) {
  const [tweets, setTweets] = useState<TimelineTweet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [nextCursor, setNextCursor] = useState<string | undefined>()

  const loadTweets = useCallback(async (cursor?: string, reset = false) => {
    try {
      if (reset) {
        setIsLoading(true)
        setError(null)
      } else {
        setIsLoadingMore(true)
      }

      const result = await getFollowingTimeline({
        limit: 10,
        cursor,
      })

      if (result.success && result.tweets) {
        if (reset) {
          setTweets(result.tweets)
        } else {
          setTweets((prev) => [...prev, ...result.tweets!])
        }
        setHasMore(result.hasMore || false)
        setNextCursor(result.nextCursor)
      } else {
        setError(result.error || "Failed to load timeline")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }, [])

  const handleLoadMore = useCallback(() => {
    if (hasMore && !isLoadingMore && nextCursor) {
      loadTweets(nextCursor, false)
    }
  }, [hasMore, isLoadingMore, nextCursor, loadTweets])

  const handleRefresh = () => {
    loadTweets(undefined, true)
  }

  const { loadingRef } = useInfiniteScroll({
    hasMore,
    isLoading: isLoadingMore,
    onLoadMore: handleLoadMore,
  })

  useEffect(() => {
    loadTweets(undefined, true)
  }, [loadTweets, refreshTrigger])

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
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your timeline is empty</h3>
            <p className="text-gray-600 mb-4">Follow some users to see their tweets in your timeline!</p>
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
            <p>You've reached the end of your timeline</p>
          </div>
        )}
      </div>
    </div>
  )
}
