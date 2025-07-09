'use client';

import { graphqlClient } from "../client"
import { GET_TIMELINE_QUERY, GET_FOLLOWING_TIMELINE_QUERY, GET_USER_TIMELINE_QUERY } from "../graphql/queries/feed"
import type { TimelineInput, TimelineResponse } from "@/types/feed"

export async function getTimeline(input: TimelineInput = {}): Promise<TimelineResponse> {
  try {
    const { data } = await graphqlClient.query({
      query: GET_TIMELINE_QUERY,
      variables: { input },
      fetchPolicy: "cache-and-network",
    })

    if (data?.getTimeline) {
      return {
        success: true,
        tweets: data.getTimeline.tweets,
        hasMore: data.getTimeline.hasMore,
        nextCursor: data.getTimeline.nextCursor,
      }
    }

    return { success: false, error: "Failed to fetch timeline" }
  } catch (error: any) {
    console.error("Get timeline error:", error)

    if (error.graphQLErrors?.length > 0) {
      return { success: false, error: error.graphQLErrors[0].message }
    }

    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getFollowingTimeline(input: TimelineInput = {}): Promise<TimelineResponse> {
  try {
    const { data } = await graphqlClient.query({
      query: GET_FOLLOWING_TIMELINE_QUERY,
      variables: { input },
      fetchPolicy: "cache-and-network",
    })

    if (data?.getFollowingTimeline) {
      return {
        success: true,
        tweets: data.getFollowingTimeline.tweets,
        hasMore: data.getFollowingTimeline.hasMore,
        nextCursor: data.getFollowingTimeline.nextCursor,
      }
    }

    return { success: false, error: "Failed to fetch following timeline" }
  } catch (error: any) {
    console.error("Get following timeline error:", error)

    if (error.graphQLErrors?.length > 0) {
      return { success: false, error: error.graphQLErrors[0].message }
    }

    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getUserTimeline(userId: string, input: TimelineInput = {}): Promise<TimelineResponse> {
  try {
    const { data } = await graphqlClient.query({
      query: GET_USER_TIMELINE_QUERY,
      variables: { userId, input },
      fetchPolicy: "cache-and-network",
    })

    if (data?.getUserTimeline) {
      return {
        success: true,
        tweets: data.getUserTimeline.tweets,
        hasMore: data.getUserTimeline.hasMore,
        nextCursor: data.getUserTimeline.nextCursor,
      }
    }

    return { success: false, error: "Failed to fetch user timeline" }
  } catch (error: any) {
    console.error("Get user timeline error:", error)

    if (error.graphQLErrors?.length > 0) {
      return { success: false, error: error.graphQLErrors[0].message }
    }

    return { success: false, error: "An unexpected error occurred" }
  }
}