"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TweetList } from "@/components/tweets/tweet-list"
import { ProfileLikes } from "./profile-likes"
import { ProfileMedia } from "./profile-media"
import type { UserProfile } from "@/types/follow"

interface PublicProfileTabsProps {
  user: UserProfile
}

export function PublicProfileTabs({ user }: PublicProfileTabsProps) {
  return (
    <Tabs defaultValue="tweets" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="tweets">
          Tweets
          <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded-full">{user.tweetsCount}</span>
        </TabsTrigger>
        <TabsTrigger value="replies">Replies</TabsTrigger>
        <TabsTrigger value="media">Media</TabsTrigger>
        <TabsTrigger value="likes">Likes</TabsTrigger>
      </TabsList>

      <TabsContent value="tweets" className="mt-6">
        <TweetList userId={user.id} refreshTrigger={0} />
      </TabsContent>

      <TabsContent value="replies" className="mt-6">
        <div className="text-center py-12 text-gray-500">
          <p>Replies functionality coming soon...</p>
        </div>
      </TabsContent>

      <TabsContent value="media" className="mt-6">
        <ProfileMedia userId={user.id} />
      </TabsContent>

      <TabsContent value="likes" className="mt-6">
        <ProfileLikes userId={user.id} />
      </TabsContent>
    </Tabs>
  )
}
