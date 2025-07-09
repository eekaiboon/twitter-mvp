"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { User } from "@/types/auth"
import { TimelineFeed } from "@/components/feed/timeline-feed"
import { TweetList } from "@/components/tweets/tweet-list"

interface DashboardTabsProps {
  user: User
  timelineFeed: React.ReactNode
  userTweets: React.ReactNode
}

export function DashboardTabs({ user, timelineFeed, userTweets }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState("timeline")
  
  return (
    <Tabs defaultValue="timeline" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
        <TabsTrigger value="your-tweets">Your Tweets</TabsTrigger>
      </TabsList>

      <TabsContent value="timeline" className="mt-6">
        {timelineFeed}
      </TabsContent>

      <TabsContent value="your-tweets" className="mt-6">
        {userTweets}
      </TabsContent>
    </Tabs>
  )
}