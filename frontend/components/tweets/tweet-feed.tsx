"use client"

import { useState } from "react"
import { TweetList } from "./tweet-list"

interface TweetFeedProps {
  userId: string
}

export function TweetFeed({ userId }: TweetFeedProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleTweetCreated = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="space-y-6">
      <TweetList userId={userId} refreshTrigger={refreshTrigger} />
    </div>
  )
}
