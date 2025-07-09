import { getUserTimeline } from "@/lib/server/feed"
import TweetListWrapper from "./tweet-list-wrapper"
import type { User } from "@/types/auth"

interface UserTweetsSectionProps {
  user: User
}

export async function UserTweetsSection({ user }: UserTweetsSectionProps) {
  // Server-side fetch of user tweets
  try {
    const userTweetsData = await getUserTimeline(user.id, { limit: 10 })
    // Use client wrapper to avoid direct client component with server data
    return <TweetListWrapper userId={user.id} initialData={userTweetsData} />
  } catch (error) {
    // Fall back to client-side rendering if server fetch fails
    return <TweetListWrapper userId={user.id} initialData={{ success: false, tweets: [], error: "Failed to load" }} />
  }
}