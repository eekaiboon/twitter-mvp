'use server';

import { cookies } from "next/headers"
import type { TweetsResponse } from "@/types/tweet"

export async function getUserTweets(userId: string): Promise<TweetsResponse> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value
    
    if (!token) {
      return { success: false, error: "Authentication required" }
    }
    
    const query = `
      query GetUserTweets($userId: ID!) {
        getUserTweets(userId: $userId) {
          id
          content
          createdAt
          author {
            id
            username
            email
          }
          likesCount
          retweetsCount
          repliesCount
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
        variables: { userId }
      }),
      next: { revalidate: 30 } // Cache for 30 seconds
    })
    
    const result = await response.json()
    
    if (result.errors) {
      console.error("GraphQL errors:", result.errors)
      return { success: false, error: result.errors[0]?.message || "Failed to fetch user tweets" }
    }
    
    if (result.data?.getUserTweets) {
      return { 
        success: true, 
        tweets: result.data.getUserTweets
      }
    }
    
    return { success: false, error: "Failed to fetch user tweets" }
  } catch (error: any) {
    console.error("Server-side get user tweets error:", error)
    return { success: false, error: error.message || "An unexpected error occurred" }
  }
}