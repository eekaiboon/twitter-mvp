"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TweetList } from "@/components/tweets/tweet-list"
import type { UserProfile } from "@/types/follow"

interface ProfileTabsProps {
  user: UserProfile
}

export function ProfileTabs({ user }: ProfileTabsProps) {
  return (
    <Tabs defaultValue="tweets" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tweets">Tweets</TabsTrigger>
        <TabsTrigger value="replies">Replies</TabsTrigger>
        <TabsTrigger value="likes">Likes</TabsTrigger>
      </TabsList>

      <TabsContent value="tweets" className="mt-6">
        <TweetList userId={user.id} refreshTrigger={0} />
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
