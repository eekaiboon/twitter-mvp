"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useFollow } from "@/lib/client/follow-storage"
import type { UserProfile } from "@/types/follow"

interface UserStatsProps {
  user: UserProfile
}

export function UserStats({ user }: UserStatsProps) {
  const { followStats, initializeFollowStats } = useFollow()
  
  // Initialize follow stats in context
  useEffect(() => {
    initializeFollowStats(user.id, {
      followersCount: user.followersCount,
      followingCount: user.followingCount
    })
  }, [user.id, user.followersCount, user.followingCount, initializeFollowStats])
  
  // Get current stats from context or fall back to props
  const stats = followStats[user.id] || {
    followersCount: user.followersCount,
    followingCount: user.followingCount
  }
  
  return (
    <div className="flex items-center space-x-6">
      <Link href={`/profile/${user.username}/following`}>
        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
          <div className="flex items-center space-x-1">
            <span className="font-bold text-gray-900">{stats.followingCount}</span>
            <span className="text-gray-600">Following</span>
          </div>
        </Button>
      </Link>
      <Link href={`/profile/${user.username}/followers`}>
        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
          <div className="flex items-center space-x-1">
            <span className="font-bold text-gray-900">{stats.followersCount}</span>
            <span className="text-gray-600">Followers</span>
          </div>
        </Button>
      </Link>
      <div className="flex items-center space-x-1">
        <span className="font-bold text-gray-900">{user.tweetsCount || 0}</span>
        <span className="text-gray-600">Tweets</span>
      </div>
    </div>
  )
}