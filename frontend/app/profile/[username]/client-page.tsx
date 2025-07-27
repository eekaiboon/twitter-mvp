"use client"

import { ProfileContainer } from "@/components/profile/profile-container"
import type { UserProfile } from "@/types/follow"
import type { Tweet } from "@/types/tweet"

interface ClientProfilePageProps {
  currentUser: any
  profileUser: UserProfile
  isOwnProfile: boolean
  initialTweets?: Tweet[]
}

export function ClientProfilePage({ 
  currentUser, 
  profileUser, 
  isOwnProfile,
  initialTweets = []
}: ClientProfilePageProps) {
  return (
    <ProfileContainer
      currentUser={currentUser}
      profileUser={profileUser}
      isOwnProfile={isOwnProfile}
      initialTweets={initialTweets}
    />
  )
}