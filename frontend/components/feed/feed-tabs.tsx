"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TimelineFeed } from "./timeline-feed"
import { TweetList } from "@/components/tweets/tweet-list"

interface FeedTabsProps {
  userId: string
}

export function FeedTabs({ userId }: FeedTabsProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleTweetCreated = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <Tabs defaultValue="timeline" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
        <TabsTrigger value="your-tweets">Your Tweets</TabsTrigger>
      </TabsList>

      <TabsContent value="timeline" className="mt-6">
        <TimelineFeed refreshTrigger={refreshTrigger} />
      </TabsContent>

      <TabsContent value="your-tweets" className="mt-6">
        <TweetList userId={userId} refreshTrigger={refreshTrigger} />
      </TabsContent>
    </Tabs>
  )
}
