'use client';

import { graphqlClient } from "../client"
import { toGlobalId } from "../global-id"
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
    if (!input.targetUserId) {
      console.error("followUser called with no targetUserId:", input);
      return { success: false, error: "No user ID provided" };
    }

    // Convert to global ID format (User:id)
    const globalId = toGlobalId("User", input.targetUserId);
    console.log("Following user with ID:", input.targetUserId, "Global ID:", globalId);
    
    const { data } = await graphqlClient.mutate({
      mutation: FOLLOW_USER_MUTATION,
      variables: { targetUserId: globalId },
      refetchQueries: [
        // This will force a refresh of any profile data on the page
        { query: GET_USER_PROFILE_QUERY, variables: { username: input.username } }
      ],
      awaitRefetchQueries: true
    })

    if (data?.followUser?.success) {
      return { success: true, targetUser: data.followUser.targetUser }
    }

    return { success: false, error: data?.followUser?.error || "Failed to follow user" }
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
    if (!input.targetUserId) {
      console.error("unfollowUser called with no targetUserId:", input);
      return { success: false, error: "No user ID provided" };
    }

    // Convert to global ID format (User:id)
    const globalId = toGlobalId("User", input.targetUserId);
    console.log("Unfollowing user with ID:", input.targetUserId, "Global ID:", globalId);
    
    const { data } = await graphqlClient.mutate({
      mutation: UNFOLLOW_USER_MUTATION,
      variables: { targetUserId: globalId },
      refetchQueries: [
        // This will force a refresh of any profile data on the page
        { query: GET_USER_PROFILE_QUERY, variables: { username: input.username } }
      ],
      awaitRefetchQueries: true
    })

    if (data?.unfollowUser?.success) {
      return { success: true, targetUser: data.unfollowUser.targetUser }
    }

    return { success: false, error: data?.unfollowUser?.error || "Failed to unfollow user" }
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
      fetchPolicy: "network-only",
    })

    if (data?.userByUsername) {
      return { success: true, user: data.userByUsername }
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
      fetchPolicy: "network-only",
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