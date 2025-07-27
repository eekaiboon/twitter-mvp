"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { FollowButton } from "./follow-button"
import { UserStats } from "./user-stats"
import type { UserProfile } from "@/types/follow"

interface ProfileHeaderProps {
  user: UserProfile
  isOwnProfile: boolean
}

export function ProfileHeader({ user, isOwnProfile }: ProfileHeaderProps) {
  // Debug user object
  useEffect(() => {
    console.log("Profile user object:", user)
    console.log("User ID:", user.id, "Type:", typeof user.id)
    console.log("Is followed by me:", user.isFollowedByMe, "Type:", typeof user.isFollowedByMe)
  }, [user])
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  return (
    <Card>
      <CardContent className="p-0">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          {/* Avatar and Follow Button */}
          <div className="flex justify-between items-end -mt-16 mb-4">
            <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-700">{user.username.charAt(0).toUpperCase()}</span>
            </div>

            <div className="mb-4">
              {isOwnProfile ? (
                <Button variant="outline">Edit Profile</Button>
              ) : (
                <FollowButton userId={user.id} initialIsFollowing={user.isFollowedByMe} username={user.username} />
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">@{user.username}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>

            
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Joined {formatDate(user.createdAt)}</span>
              </div>
            </div>

            {/* Follow Stats */}
            <UserStats user={user} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
