"use client"

import { useState } from "react"
import React from "react"
import { TweetComposer } from "@/components/tweets/tweet-composer"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"
import type { User } from "@/types/auth"
import { UserTweetsList } from "@/components/tweets/user-tweets-list"

interface DashboardContentProps {
  user: User
  timelineFeed: React.ReactNode
  userTweets: React.ReactNode
}

export function DashboardContent({ user, timelineFeed, userTweets }: DashboardContentProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  console.log('[DashboardContent] Rendering with user:', JSON.stringify(user, null, 2))

  const handleTweetCreated = () => {
    console.log('[DashboardContent] Tweet created, incrementing refreshTrigger')
    setRefreshTrigger((prev) => prev + 1)
  }

  // Extract the UserTweetsSection from userTweets prop to pass refreshTrigger
  const enhancedUserTweets = React.isValidElement(userTweets) 
    ? React.cloneElement(userTweets, { refreshTrigger })
    : userTweets;
    
  console.log('[DashboardContent] Passing refreshTrigger:', refreshTrigger)

  return (
    <div className="space-y-6">
      <TweetComposer onTweetCreated={handleTweetCreated} user={user} />
      <DashboardTabs 
        user={user} 
        timelineFeed={timelineFeed}
        userTweets={enhancedUserTweets}
      />
    </div>
  )
}
