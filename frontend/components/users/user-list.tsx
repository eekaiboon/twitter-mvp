"use client"

import Link from "next/link"
import { FollowButton } from "@/components/profile/follow-button"
import { Card, CardContent } from "@/components/ui/card"
import type { UserProfile } from "@/types/follow"

interface UserListProps {
  users: UserProfile[]
  currentUserId: string
}

export function UserList({ users, currentUserId }: UserListProps) {
  if (users.length === 0) {
    return <div className="text-gray-500 text-center py-6">No users found</div>
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Card key={user.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Link href={`/profile/${user.username}`} className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-700">{user.username.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">@{user.username}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </Link>
              
              {user.id !== currentUserId && (
                <FollowButton userId={user.id} initialIsFollowing={user.isFollowing} />
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}