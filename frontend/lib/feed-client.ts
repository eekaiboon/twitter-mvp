'use client';

import { graphqlClient } from "./graphql-client"
import { GET_TIMELINE_QUERY, GET_FOLLOWING_TIMELINE_QUERY, GET_USER_TIMELINE_QUERY } from "./feed-queries"
import type { TimelineInput, TimelineResponse } from "@/types/feed"

// Mock data for development until backend is ready
const MOCK_TWEETS = [
  {
    id: '1',
    content: 'Just setting up my Twitter clone!',
    createdAt: new Date().toISOString(),
    author: {
      id: '1',
      username: 'demo_user',
      displayName: 'Demo User',
    }
  },
  {
    id: '2',
    content: 'Hello world! This is my first tweet on this platform.',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    author: {
      id: '2',
      username: 'jane_doe',
      displayName: 'Jane Doe',
    }
  },
];

export async function getTimeline(input: TimelineInput = {}): Promise<TimelineResponse> {
  // Return mock data for now
  return {
    success: true,
    tweets: MOCK_TWEETS,
    hasMore: false,
    nextCursor: null,
  };
  
  // Uncomment when backend is ready
  /*
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
  */
}

export async function getFollowingTimeline(input: TimelineInput = {}): Promise<TimelineResponse> {
  // Return mock data for now
  return {
    success: true,
    tweets: MOCK_TWEETS,
    hasMore: false,
    nextCursor: null,
  };
  
  // Uncomment when backend is ready
  /*
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
  */
}

export async function getUserTimeline(userId: string, input: TimelineInput = {}): Promise<TimelineResponse> {
  // Return mock data for now
  return {
    success: true,
    tweets: MOCK_TWEETS.filter(t => t.author.id === userId),
    hasMore: false,
    nextCursor: null,
  };
  
  // Uncomment when backend is ready
  /*
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
  */
}