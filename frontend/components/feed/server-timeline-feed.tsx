import { getFollowingTimeline } from "@/lib/server/feed"
import { TimelineFeed } from "./timeline-feed"
import type { TimelineResponse } from "@/types/feed"

// Server component to fetch initial timeline data
export async function ServerTimelineFeed() {
  try {
    const timelineResult = await getFollowingTimeline({ limit: 10 })
    
    // Hydrate client component with server-fetched data
    return <TimelineFeed initialData={timelineResult} />
  } catch (error) {
    // On error, fall back to client-side rendering
    return <TimelineFeed />
  }
}