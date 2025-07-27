'use server';

import { cookies } from "next/headers"
// Import query string directly to avoid client-side code
const GET_USER_PROFILE_QUERY = `
  query GetUserProfile($username: String!) {
    userByUsername(username: $username) {
      id
      username
      email
      createdAt
      followersCount
      followingCount
      isFollowedByMe
    }
  }
`
import type { UserProfileResponse } from "@/types/follow"

// Server-side implementation of getUserProfile
export async function getUserProfile(username: string): Promise<UserProfileResponse> {
  try {
    // Get cookie store and await it properly
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value
    
    if (!token) {
      return { success: false, error: "Authentication required" }
    }
    
    // Make a direct fetch request to the GraphQL API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        query: GET_USER_PROFILE_QUERY,
        variables: { username }
      }),
      next: { revalidate: 0 } // Disable cache for now
    })
    
    const result = await response.json()
    
    if (result.errors) {
      console.error("GraphQL errors:", result.errors)
      return { success: false, error: result.errors[0]?.message || "Failed to fetch user profile" }
    }
    
    if (result.data?.userByUsername) {
      // Log the user object to see what kind of ID we're getting
      console.log('User profile from API:', JSON.stringify(result.data.userByUsername))
      return { success: true, user: result.data.userByUsername }
    }
    
    return { success: false, error: "User not found" }
  } catch (error: any) {
    console.error("Server-side get user profile error:", error)
    return { success: false, error: error.message || "An unexpected error occurred" }
  }
}