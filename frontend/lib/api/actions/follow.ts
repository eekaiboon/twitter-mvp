'use client';

import { graphqlClient } from "../client"
import {
  FOLLOW_USER_MUTATION,
  UNFOLLOW_USER_MUTATION
} from "../graphql/mutations/follow"
import {
  GET_USER_PROFILE_QUERY,
  SEARCH_USERS_QUERY
} from "../graphql/queries/follow"
import type { FollowInput, FollowResponse, UserProfileResponse, UsersResponse } from "@/types/follow"

export async function followUser(input: FollowInput): Promise<FollowResponse> {
  try {
    const { data } = await graphqlClient.mutate({
      mutation: FOLLOW_USER_MUTATION,
      variables: { input },
      refetchQueries: ["GetUserProfile", "GetFollowers", "GetFollowing"],
    })

    if (data?.followUser) {
      return { success: true, relationship: data.followUser }
    }

    return { success: false, error: "Failed to follow user" }
  } catch (error: any) {
    console.error("Follow user error:", error)

    if (error.graphQLErrors?.length > 0) {
      return { success: false, error: error.graphQLErrors[0].message }
    }

    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function unfollowUser(input: FollowInput): Promise<FollowResponse> {
  try {
    const { data } = await graphqlClient.mutate({
      mutation: UNFOLLOW_USER_MUTATION,
      variables: { input },
      refetchQueries: ["GetUserProfile", "GetFollowers", "GetFollowing"],
    })

    if (data?.unfollowUser?.success) {
      return { success: true }
    }

    return { success: false, error: "Failed to unfollow user" }
  } catch (error: any) {
    console.error("Unfollow user error:", error)

    if (error.graphQLErrors?.length > 0) {
      return { success: false, error: error.graphQLErrors[0].message }
    }

    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getUserProfile(username: string): Promise<UserProfileResponse> {
  try {
    const { data } = await graphqlClient.query({
      query: GET_USER_PROFILE_QUERY,
      variables: { username },
      fetchPolicy: "cache-and-network",
    })

    if (data?.getUserProfile) {
      return { success: true, user: data.getUserProfile }
    }

    return { success: false, error: "User not found" }
  } catch (error: any) {
    console.error("Get user profile error:", error)

    if (error.graphQLErrors?.length > 0) {
      return { success: false, error: error.graphQLErrors[0].message }
    }

    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function searchUsers(query: string, limit = 10): Promise<UsersResponse> {
  try {
    const { data } = await graphqlClient.query({
      query: SEARCH_USERS_QUERY,
      variables: { query, limit },
      fetchPolicy: "cache-and-network",
    })

    if (data?.searchUsers) {
      return { success: true, users: data.searchUsers }
    }

    return { success: false, error: "Search failed" }
  } catch (error: any) {
    console.error("Search users error:", error)

    if (error.graphQLErrors?.length > 0) {
      return { success: false, error: error.graphQLErrors[0].message }
    }

    return { success: false, error: "An unexpected error occurred" }
  }
}