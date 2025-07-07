"use client"

import { useState } from "react"
import { TweetComposer } from "@/components/tweets/tweet-composer"
import { FeedTabs } from "@/components/feed/feed-tabs"
import type { User } from "@/types/auth"

interface DashboardContentProps {
  user: User
}

export function DashboardContent({ user }: DashboardContentProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleTweetCreated = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="space-y-6">
      <TweetComposer onTweetCreated={handleTweetCreated} />
      <FeedTabs userId={user.id} />
    </div>
  )
}
