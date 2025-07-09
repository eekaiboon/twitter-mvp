'use server';

import { cookies } from "next/headers"
import type { TimelineInput, TimelineResponse, TimelineTweet } from "@/types/feed"

// Server-side implementations of timeline fetching functions

// For user timeline
export async function getUserTimeline(userId: string, input: TimelineInput = {}): Promise<TimelineResponse> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value
    
    if (!token) {
      return { success: false, error: "Authentication required" }
    }
    
    const query = `
      query GetUserTimeline($userId: ID!, $input: TimelineInput) {
        getUserTimeline(userId: $userId, input: $input) {
          tweets {
            id
            content
            createdAt
            likeCount
            replyCount
            isLiked
            author {
              id
              username
            }
          }
          hasMore
          nextCursor
        }
      }
    `
    
    // Make a direct fetch request to the GraphQL API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        query,
        variables: { userId, input }
      }),
      next: { revalidate: 60 } // Cache for 60 seconds
    })
    
    const result = await response.json()
    
    if (result.errors) {
      console.error("GraphQL errors:", result.errors)
      return { success: false, error: result.errors[0]?.message || "Failed to fetch user timeline" }
    }
    
    if (result.data?.getUserTimeline) {
      return { 
        success: true, 
        tweets: result.data.getUserTimeline.tweets as TimelineTweet[],
        hasMore: result.data.getUserTimeline.hasMore,
        nextCursor: result.data.getUserTimeline.nextCursor
      }
    }
    
    return { success: false, error: "Failed to fetch user timeline" }
  } catch (error: any) {
    console.error("Server-side get user timeline error:", error)
    return { success: false, error: error.message || "An unexpected error occurred" }
  }
}

// For following timeline
export async function getFollowingTimeline(input: TimelineInput = {}): Promise<TimelineResponse> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value
    
    if (!token) {
      return { success: false, error: "Authentication required" }
    }
    
    const query = `
      query GetFollowingTimeline($input: TimelineInput) {
        getFollowingTimeline(input: $input) {
          tweets {
            id
            content
            createdAt
            likeCount
            replyCount
            isLiked
            author {
              id
              username
            }
          }
          hasMore
          nextCursor
        }
      }
    `
    
    // Make a direct fetch request to the GraphQL API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        query,
        variables: { input }
      }),
      next: { revalidate: 30 } // Cache for 30 seconds
    })
    
    const result = await response.json()
    
    if (result.errors) {
      console.error("GraphQL errors:", result.errors)
      return { success: false, error: result.errors[0]?.message || "Failed to fetch following timeline" }
    }
    
    if (result.data?.getFollowingTimeline) {
      return { 
        success: true, 
        tweets: result.data.getFollowingTimeline.tweets as TimelineTweet[],
        hasMore: result.data.getFollowingTimeline.hasMore,
        nextCursor: result.data.getFollowingTimeline.nextCursor
      }
    }
    
    return { success: false, error: "Failed to fetch following timeline" }
  } catch (error: any) {
    console.error("Server-side get following timeline error:", error)
    return { success: false, error: error.message || "An unexpected error occurred" }
  }
}