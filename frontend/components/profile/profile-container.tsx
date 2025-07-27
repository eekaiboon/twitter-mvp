"use client"

import { useEffect, useState } from "react"
import { ProfileHeader } from "./profile-header"
import { ProfileTabs } from "./profile-tabs"
import { ProfileFallback } from "./profile-fallback"
import type { UserProfile } from "@/types/follow"
import type { Tweet } from "@/types/tweet"

interface ProfileContainerProps {
  profileUser: UserProfile
  currentUser: any
  isOwnProfile: boolean
  initialTweets?: Tweet[]
}

export function ProfileContainer({ profileUser, currentUser, isOwnProfile, initialTweets = [] }: ProfileContainerProps) {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate a brief loading state to allow components to render properly
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 200)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (isLoading) {
    return <ProfileFallback />
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">@{currentUser.username}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <ProfileHeader user={profileUser} isOwnProfile={isOwnProfile} />
          <ProfileTabs user={profileUser} initialTweets={initialTweets} />
        </div>
      </main>
    </div>
  )
}