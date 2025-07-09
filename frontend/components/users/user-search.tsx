"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Users } from "lucide-react"
import { searchUsers } from "@/lib/api/actions/follow"
import { FollowButton } from "@/components/profile/follow-button"
import Link from "next/link"
import type { UserProfile } from "@/types/follow"

export function UserSearch() {
  const [query, setQuery] = useState("")
  const [users, setUsers] = useState<UserProfile[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.trim().length > 0) {
        handleSearch()
      } else {
        setUsers([])
        setHasSearched(false)
      }
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [query])

  const handleSearch = async () => {
    setIsLoading(true)
    setHasSearched(true)

    try {
      const result = await searchUsers(query.trim())
      if (result.success && result.users) {
        setUsers(result.users)
      } else {
        setUsers([])
      }
    } catch (error) {
      console.error("Search error:", error)
      setUsers([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      )}

      {hasSearched && !isLoading && users.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No users found for "{query}"</p>
        </div>
      )}

      <div className="space-y-3">
        {users.map((user) => (
          <Card key={user.id} className="hover:bg-gray-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Link href={`/profile/${user.username}`} className="flex items-center space-x-3 flex-1">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{user.username.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">@{user.username}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>{user.followersCount} followers</span>
                      <span>{user.followingCount} following</span>
                    </div>
                  </div>
                </Link>
                <FollowButton userId={user.id} initialIsFollowing={user.isFollowing} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
