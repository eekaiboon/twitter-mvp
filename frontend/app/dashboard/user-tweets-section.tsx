"use client"

import { UserTweetsList } from "@/components/tweets/user-tweets-list"
import type { User } from "@/types/auth"

interface UserTweetsSectionProps {
  user: User
  refreshTrigger?: number
}

export default function UserTweetsSection({ user, refreshTrigger = 0 }: UserTweetsSectionProps) {
  console.log('[UserTweetsSection] Rendering with user:', user);
  
  // Use sub as the user ID since that's what's available in the JWT token
  const userId = user?.sub || user?.id;
  console.log('[UserTweetsSection] Using User ID:', userId);
  console.log('[UserTweetsSection] Received refreshTrigger:', refreshTrigger);
  
  if (!userId) {
    console.error('[UserTweetsSection] No user ID available:', user);
  }
  
  return (
    <div>
      <UserTweetsList userId={String(userId)} refreshTrigger={refreshTrigger} />
    </div>
  )
}