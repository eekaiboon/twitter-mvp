"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TweetList } from "@/components/tweets/tweet-list"
import { UserTweetsList } from "@/components/tweets/user-tweets-list"
import type { UserProfile } from "@/types/follow"
import type { Tweet } from "@/types/tweet"

interface ProfileTabsProps {
  user: UserProfile
  initialTweets?: Tweet[]
}

export function ProfileTabs({ user, initialTweets = [] }: ProfileTabsProps) {
  // Instead of making GraphQL queries directly in child components,
  // use a simpler approach for now
  const [activeTab, setActiveTab] = useState("tweets")
  
  // Handle tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }
  
  return (
    <Tabs defaultValue="tweets" className="w-full" onValueChange={handleTabChange}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tweets">Tweets</TabsTrigger>
        <TabsTrigger value="replies">Replies</TabsTrigger>
        <TabsTrigger value="likes">Likes</TabsTrigger>
      </TabsList>

      <TabsContent value="tweets" className="mt-6">
        {activeTab === "tweets" && (
          <UserTweetsList userId={user.id} />
        )}
      </TabsContent>

      <TabsContent value="replies" className="mt-6">
        <div className="text-center py-8 text-gray-500">
          <p>Replies functionality coming soon...</p>
        </div>
      </TabsContent>

      <TabsContent value="likes" className="mt-6">
        <div className="text-center py-8 text-gray-500">
          <p>Liked tweets functionality coming soon...</p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
