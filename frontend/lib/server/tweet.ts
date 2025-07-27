'use server';

import { cookies } from "next/headers"
// Direct GraphQL query
import { toGlobalId } from "@/lib/api/global-id"
const GET_USER_TWEETS_QUERY = `
  query GetUserTweets($userId: ID!) {
    getUserTweets(userId: $userId) {
      id
      content
      createdAt
      authorId
      author {
        id
        username
      }
    }
  }
`

interface TweetsResponse {
  success: boolean;
  tweets?: any[];
  error?: string;
}

// Server-side implementation to fetch user tweets
// Check if userId is already in global ID format, if not, convert it
export async function getUserTweets(userId: string): Promise<TweetsResponse> {
  // Log the original ID
  console.log('Original user ID:', userId)
  
  // Check if ID is a number or simple string, and convert to global ID if needed
  // The backend expects base64 encoded 'User:id'
  let globalUserId = userId
  
  // Check if the ID is not in the expected base64 format
  try {
    const decodedId = Buffer.from(userId, 'base64').toString()
    if (!decodedId.includes('User:')) {
      // Not in the expected format, so convert it
      globalUserId = toGlobalId('User', userId)
      console.log('Converted to global ID:', globalUserId)
    } else {
      console.log('ID already in global format')
    }
  } catch (error) {
    // If decoding fails, it's not base64, so convert
    globalUserId = toGlobalId('User', userId)
    console.log('Converted to global ID after error:', globalUserId)
  }
  try {
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
        query: GET_USER_TWEETS_QUERY,
        variables: { userId: globalUserId } // Use the properly formatted global ID
      }),
      next: { revalidate: 30 } // Cache for 30 seconds
    })
    
    const result = await response.json()
    
    // Log the entire response for debugging
    console.log('getUserTweets API response:', JSON.stringify(result, null, 2))
    
    if (result.errors) {
      console.error("GraphQL errors:", result.errors)
      return { success: false, error: result.errors[0]?.message || "Failed to fetch tweets" }
    }
    
    if (result.data?.getUserTweets) {
      return { success: true, tweets: result.data.getUserTweets }
    }
    
    return { success: false, error: "No tweets found" }
  } catch (error: any) {
    console.error("Server-side get user tweets error:", error)
    return { success: false, error: error.message || "An unexpected error occurred" }
  }
}