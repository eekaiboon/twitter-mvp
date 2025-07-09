"use client"

import { useState } from "react"
import { TweetComposer } from "@/components/tweets/tweet-composer"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"
import type { User } from "@/types/auth"

interface DashboardContentProps {
  user: User
  timelineFeed: React.ReactNode
  userTweets: React.ReactNode
}

export function DashboardContent({ user, timelineFeed, userTweets }: DashboardContentProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleTweetCreated = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="space-y-6">
      <TweetComposer onTweetCreated={handleTweetCreated} />
      <DashboardTabs 
        user={user} 
        timelineFeed={timelineFeed}
        userTweets={userTweets}
      />
    </div>
  )
}
