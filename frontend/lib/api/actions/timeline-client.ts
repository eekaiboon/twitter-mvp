'use client';

import type { TimelineInput, TimelineResponse } from "@/types/feed";

// Client-side wrapper for timeline actions
// These are simple stub functions that will be replaced by dynamic imports at runtime
// to avoid server code being imported into client components

export async function getClientFollowingTimeline(input: TimelineInput = {}): Promise<TimelineResponse> {
  try {
    // Dynamically import the server action to prevent it from being included in the client bundle
    const { getFollowingTimeline } = await import('../../server/feed');
    return await getFollowingTimeline(input);
  } catch (error: any) {
    console.error("Client timeline error:", error);
    return { 
      success: false, 
      error: error.message || "An unexpected error occurred",
      tweets: []
    };
  }
}

export async function getClientUserTimeline(userId: string, input: TimelineInput = {}): Promise<TimelineResponse> {
  try {
    // Dynamically import the server action to prevent it from being included in the client bundle
    const { getUserTimeline } = await import('../../server/feed');
    return await getUserTimeline(userId, input);
  } catch (error: any) {
    console.error("Client user timeline error:", error);
    return { 
      success: false, 
      error: error.message || "An unexpected error occurred",
      tweets: []
    };
  }
}