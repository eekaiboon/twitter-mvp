"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { followUser, unfollowUser } from "@/lib/api/actions/follow"
import { useToast } from "@/hooks/use-toast"

interface FollowButtonProps {
  userId: string
  initialIsFollowing: boolean
}

export function FollowButton({ userId, initialIsFollowing }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleFollowToggle = async () => {
    setIsLoading(true)

    try {
      if (isFollowing) {
        const result = await unfollowUser({ userId })
        if (result.success) {
          setIsFollowing(false)
          toast({
            title: "Unfollowed successfully",
            description: "You are no longer following this user.",
          })
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to unfollow user",
            variant: "destructive",
          })
        }
      } else {
        const result = await followUser({ userId })
        if (result.success) {
          setIsFollowing(true)
          toast({
            title: "Following successfully",
            description: "You are now following this user.",
          })
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
      variant={isFollowing ? "outline" : "default"}
      className={isFollowing ? "hover:bg-red-50 hover:text-red-600 hover:border-red-200" : ""}
    >
      {isLoading ? "Loading..." : isFollowing ? <span className="group-hover:hidden">Following</span> : "Follow"}
    </Button>
  )
}
