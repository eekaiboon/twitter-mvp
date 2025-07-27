'use server';

import { cookies } from "next/headers"
import { gqlClient } from "./client"
import { gql } from "@apollo/client"
import type { UserProfile } from "@/types/follow"

interface UsersResponse {
  success: boolean
  users?: UserProfile[]
  error?: string
}

const GET_FOLLOWERS_QUERY = `
  query GetFollowers($userId: ID!) {
    followers(userId: $userId) {
      id
      username
      email
      followersCount
      followingCount
      isFollowedByMe
    }
  }
`

const GET_FOLLOWING_QUERY = `
  query GetFollowing($userId: ID!) {
    following(userId: $userId) {
      id
      username
      email
      followersCount
      followingCount
      isFollowedByMe
    }
  }
`

export async function getFollowers(userId: string): Promise<UsersResponse> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")?.value
  
  if (!token) {
    return { success: false, error: "Authentication required" }
  }
  
  try {
    const { data } = await gqlClient.query({
      query: gql(GET_FOLLOWERS_QUERY),
      variables: { userId },
      context: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    })
    
    if (data?.followers) {
      return { success: true, users: data.followers }
    }
    
    return { success: false, error: "Failed to fetch followers" }
  } catch (error: any) {
    console.error("Error fetching followers:", error)
    return { 
      success: false, 
      error: error.message || "An unexpected error occurred"
    }
  }
}

export async function getFollowing(userId: string): Promise<UsersResponse> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")?.value
  
  if (!token) {
    return { success: false, error: "Authentication required" }
  }
  
  try {
    const { data } = await gqlClient.query({
      query: gql(GET_FOLLOWING_QUERY),
      variables: { userId },
      context: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    })
    
    if (data?.following) {
      return { success: true, users: data.following }
    }
    
    return { success: false, error: "Failed to fetch following" }
  } catch (error: any) {
    console.error("Error fetching following:", error)
    return { 
      success: false, 
      error: error.message || "An unexpected error occurred"
    }
  }
}