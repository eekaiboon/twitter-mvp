"use client"

import { useState, ReactNode, useCallback } from 'react'
import { FollowContext } from '@/lib/client/follow-storage'

interface FollowProviderProps {
  children: ReactNode
}

export function FollowProvider({ children }: FollowProviderProps) {
  // State for follow status and counts
  const [followStats, setFollowStats] = useState<Record<string, { followersCount: number, followingCount: number }>>({});
  const [followMap, setFollowMap] = useState<Record<string, boolean>>({});

  // Update follow status for a user - using useCallback to prevent infinite renders
  const updateFollowStatus = useCallback((userId: string, isFollowing: boolean) => {
    setFollowMap(prev => {
      // Only update if the status has actually changed
      if (prev[userId] !== isFollowing) {
        return { ...prev, [userId]: isFollowing };
      }
      return prev;
    });
  }, []);

  // Initialize follow stats for a user - using useCallback to prevent infinite renders
  const initializeFollowStats = useCallback((userId: string, stats: { followersCount: number, followingCount: number }) => {
    setFollowStats(prev => {
      // Only initialize if not already set or values are different
      if (!prev[userId] || 
          prev[userId].followersCount !== stats.followersCount || 
          prev[userId].followingCount !== stats.followingCount) {
        return { ...prev, [userId]: stats };
      }
      return prev;
    });
  }, []);

  // Increment follower count for a user - using useCallback to prevent infinite renders
  const incrementFollowerCount = useCallback((userId: string) => {
    setFollowStats(prev => {
      const currentStats = prev[userId] || { followersCount: 0, followingCount: 0 };
      return {
        ...prev,
        [userId]: {
          ...currentStats,
          followersCount: currentStats.followersCount + 1
        }
      };
    });
  }, []);

  // Decrement follower count for a user - using useCallback to prevent infinite renders
  const decrementFollowerCount = useCallback((userId: string) => {
    setFollowStats(prev => {
      const currentStats = prev[userId] || { followersCount: 1, followingCount: 0 };
      return {
        ...prev,
        [userId]: {
          ...currentStats,
          followersCount: Math.max(0, currentStats.followersCount - 1)
        }
      };
    });
  }, []);

  const value = {
    followStats,
    followMap,
    updateFollowStatus,
    incrementFollowerCount,
    decrementFollowerCount,
    initializeFollowStats,
  };

  return (
    <FollowContext.Provider value={value}>
      {children}
    </FollowContext.Provider>
  );
}