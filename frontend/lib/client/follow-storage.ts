"use client"

import { useState, useCallback, createContext, useContext } from "react"

type FollowStats = {
  followersCount: number
  followingCount: number
}

interface FollowContextType {
  followStats: Record<string, FollowStats>
  followMap: Record<string, boolean>
  updateFollowStatus: (userId: string, isFollowing: boolean) => void
  incrementFollowerCount: (userId: string) => void
  decrementFollowerCount: (userId: string) => void
  initializeFollowStats: (userId: string, stats: FollowStats) => void
}

// Create context with default values
export const FollowContext = createContext<FollowContextType>({
  followStats: {},
  followMap: {},
  updateFollowStatus: () => {},
  incrementFollowerCount: () => {},
  decrementFollowerCount: () => {},
  initializeFollowStats: () => {},
})

export const useFollow = () => useContext(FollowContext)
