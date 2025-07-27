"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { followUser, unfollowUser } from "@/lib/api/actions/follow"
import { useToast } from "@/hooks/use-toast"
import { useFollow } from "@/lib/client/follow-storage"
import { idsMatch } from "@/lib/api/id-utils"

interface FollowButtonProps {
  userId: string
  initialIsFollowing: boolean
  username: string
}

export function FollowButton({ userId, initialIsFollowing, username }: FollowButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { updateFollowStatus, incrementFollowerCount, decrementFollowerCount, followMap } = useFollow()
  
  // Debug userId
  useEffect(() => {
    console.log("FollowButton received userId:", userId, typeof userId)
  }, [userId])
  
  // Initialize follow status in store - only on mount or when key dependencies change
  useEffect(() => {
    // Check if the current value is different before updating
    if (followMap[userId] !== initialIsFollowing) {
      updateFollowStatus(userId, initialIsFollowing)
    }
  }, [userId, initialIsFollowing, updateFollowStatus])
  
  // Get current follow status from context
  const followStatus = followMap[userId] ?? initialIsFollowing

  const handleFollowToggle = async () => {
    setIsLoading(true)

    try {
      if (followStatus) {
        const result = await unfollowUser({ targetUserId: userId, username })
        if (result.success) {
          updateFollowStatus(userId, false)
          decrementFollowerCount(userId)
          toast({
            title: "Unfollowed successfully",
            description: "You are no longer following this user.",
          })
          
          // Reload the page to show updated follower count
          window.location.reload()
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to unfollow user",
            variant: "destructive",
          })
        }
      } else {
        const result = await followUser({ targetUserId: userId, username })
        if (result.success) {
          updateFollowStatus(userId, true)
          incrementFollowerCount(userId)
          toast({
            title: "Following successfully",
            description: "You are now following this user.",
          })
          
          // Reload the page to show updated follower count
          window.location.reload()
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to follow user",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleFollowToggle}
      disabled={isLoading}
      variant={followStatus ? "outline" : "default"}
      className={`${followStatus ? "hover:bg-red-50 hover:text-red-600 hover:border-red-200" : ""} group`}
    >
      {isLoading ? (
        "Loading..."
      ) : followStatus ? (
        <>
          <span className="group-hover:hidden">Following</span>
          <span className="hidden group-hover:inline text-red-600">Unfollow</span>
        </>
      ) : (
        "Follow"
      )}
    </Button>
  )
}
