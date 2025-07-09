import { getFollowingTimeline } from "@/lib/server/feed"
import TimelineFeedWrapper from "./timeline-feed-wrapper"
import type { User } from "@/types/auth"

interface TimelineSectionProps {
  user: User
}

export async function TimelineSection({ user }: TimelineSectionProps) {
  // Server-side fetch of timeline data
  try {
    const timelineData = await getFollowingTimeline({ limit: 10 })
    // Use client wrapper to avoid direct client component with server data
    return <TimelineFeedWrapper initialData={timelineData} />
  } catch (error) {
    // Fall back to client-side rendering if server fetch fails
    return <TimelineFeedWrapper initialData={{ success: false, tweets: [], error: "Failed to load" }} />
  }
}