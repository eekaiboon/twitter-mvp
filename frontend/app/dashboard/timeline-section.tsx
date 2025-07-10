import { getUserTweets } from "@/lib/server/tweets"
import TimelineFeedWrapper from "./timeline-feed-wrapper"
import type { User } from "@/types/auth"

interface TimelineSectionProps {
  user: User
}

export async function TimelineSection({ user }: TimelineSectionProps) {
  // Use user tweets instead of following timeline until timeline is implemented
  try {
    // For now, use the same user tweets as the user tweets section
    // This will be replaced with actual timeline data in Milestone 4
    const userTweetsData = await getUserTweets(user.id)
    
    // Use client wrapper to avoid direct client component with server data
    return (
      <div>
        <div className="mb-4 text-center bg-blue-50 py-2 px-4 rounded-md text-blue-600 text-sm">
          Timeline feed will be implemented in Milestone 4. Showing your tweets instead.
        </div>
        <TimelineFeedWrapper initialData={userTweetsData} />
      </div>
    )
  } catch (error) {
    // Fall back to client-side rendering if server fetch fails
    return <TimelineFeedWrapper initialData={{ success: false, tweets: [], error: "Failed to load" }} />
  }
}