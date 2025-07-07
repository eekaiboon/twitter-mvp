"use client"

import { useState, useEffect } from "react"
import { TweetCard } from "@/components/tweets/tweet-card"
import { TweetSkeleton } from "@/components/tweets/tweet-skeleton"
import { Heart } from "lucide-react"
import type { Tweet } from "@/types/tweet"

interface ProfileLikesProps {
  userId: string
}

export function ProfileLikes({ userId }: ProfileLikesProps) {
  const [likedTweets, setLikedTweets] = useState<Tweet[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading liked tweets
    const timer = setTimeout(() => {
      setLikedTweets([])
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [userId])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <TweetSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (likedTweets.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No likes yet</h3>
        <p className="text-gray-600">Liked tweets will appear here</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {likedTweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </div>
  )
}
