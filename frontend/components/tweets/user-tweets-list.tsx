"use client"

import { useState, useEffect } from "react"
import { TweetCard } from "./tweet-card"
import { TweetSkeleton } from "./tweet-skeleton"
import { getLocalTweets } from "@/lib/client/local-storage"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import type { Tweet } from "@/types/tweet"

interface UserTweetsListProps {
  userId: string
  refreshTrigger?: number
}

export function UserTweetsList({ userId, refreshTrigger = 0 }: UserTweetsListProps) {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load tweets from local storage
  useEffect(() => {
    setIsLoading(true)
    
    // Simulate network latency
    setTimeout(() => {
      const localTweets = getLocalTweets()
      setTweets(localTweets)
      setIsLoading(false)
    }, 300)
  }, [refreshTrigger])

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      const localTweets = getLocalTweets()
      setTweets(localTweets)
      setIsLoading(false)
    }, 300)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <TweetSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (tweets.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow">
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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Your Tweets</h3>
        <Button variant="ghost" size="sm" onClick={handleRefresh} className="text-blue-600">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>
      
      <div className="space-y-4">
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  )
}