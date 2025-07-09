"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServerTimelineFeed } from "./server-timeline-feed"
import { ServerTweetList } from "@/components/tweets/server-tweet-list"

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
        <ServerTimelineFeed />
      </TabsContent>

      <TabsContent value="your-tweets" className="mt-6">
        <ServerTweetList userId={userId} />
      </TabsContent>
    </Tabs>
  )
}
