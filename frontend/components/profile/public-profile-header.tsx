"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mail } from "lucide-react"
import { FollowButton } from "./follow-button"
import { EditProfileButton } from "./edit-profile-button"
import type { UserProfile } from "@/types/follow"

interface PublicProfileHeaderProps {
  user: UserProfile
  isOwnProfile: boolean
}

export function PublicProfileHeader({ user, isOwnProfile }: PublicProfileHeaderProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <Card>
      <CardContent className="p-0">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 relative">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Avatar and Action Button */}
          <div className="flex justify-between items-end -mt-16 mb-4">
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-700">{user.username.charAt(0).toUpperCase()}</span>
              </div>
              {user.isFollowedBy && (
                <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-100 text-gray-700 text-xs">
                  Follows you
                </Badge>
              )}
            </div>

            <div className="mb-4">
              {isOwnProfile ? (
                <EditProfileButton user={user} />
              ) : (
                <FollowButton userId={user.id} initialIsFollowing={user.isFollowing} />
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-4">
            {/* Name and Username */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">@{user.username}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{user.email}</span>
              </div>
            </div>

            {/* Bio */}
            {user.bio && (
              <div>
                <p className="text-gray-900 text-base leading-relaxed whitespace-pre-wrap">{user.bio}</p>
              </div>
            )}

            {/* Additional Info */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Joined {formatDate(user.createdAt)}</span>
              </div>

              {/* You can add more profile fields here like location, website, etc. */}
            </div>

            {/* Follow Stats */}
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-1 hover:underline">
                <span className="font-bold text-gray-900">{formatNumber(user.followingCount)}</span>
                <span className="text-gray-600">Following</span>
              </button>

              <button className="flex items-center space-x-1 hover:underline">
                <span className="font-bold text-gray-900">{formatNumber(user.followersCount)}</span>
                <span className="text-gray-600">Follower{user.followersCount !== 1 ? "s" : ""}</span>
              </button>

              <div className="flex items-center space-x-1">
                <span className="font-bold text-gray-900">{formatNumber(user.tweetsCount)}</span>
                <span className="text-gray-600">Tweet{user.tweetsCount !== 1 ? "s" : ""}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
