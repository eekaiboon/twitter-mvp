import { getUserTimeline } from "@/lib/server/feed"
import { TweetCard } from "./tweet-card"
import { TweetList } from "./tweet-list"

interface ServerTweetListProps {
  userId: string
}

// This is a server component that fetches the initial data
export async function ServerTweetList({ userId }: ServerTweetListProps) {
  try {
    const timelineResult = await getUserTimeline(userId, { limit: 10 })
    
    // Hydrate the client component with server-fetched data
    return <TweetList userId={userId} initialData={timelineResult} />
  } catch (error) {
    // If there's an error fetching server-side, fallback to client-side rendering
    return <TweetList userId={userId} />
  }
}