"use client"

import { TweetComposer } from "@/components/tweets/tweet-composer"
import { UserTweetsList } from "@/components/tweets/user-tweets-list"
import type { User } from "@/types/auth"
import { useState } from "react"

interface UserTweetsSectionProps {
  user: User
}

export default function UserTweetsSection({ user }: UserTweetsSectionProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  
  const handleTweetCreated = () => {
    // Increment refresh trigger to force tweets list to refresh
    setRefreshTrigger(prev => prev + 1)
  }
  
  return (
    <div className="space-y-4">
      <TweetComposer onTweetCreated={handleTweetCreated} />
      <UserTweetsList userId={user.id} refreshTrigger={refreshTrigger} />
    </div>
  )
}