import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react"
import type { Tweet } from "@/types/tweet"
import Link from "next/link"

interface TweetCardProps {
  tweet: Tweet
}

export function TweetCard({ tweet }: TweetCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return diffInMinutes < 1 ? "now" : `${diffInMinutes}m`
    } else if (diffInHours < 24) {
      return `${diffInHours}h`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d`
    }
  }

  return (
    <Card className="w-full hover:bg-gray-50 transition-colors">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Tweet Header */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">{tweet.author.username.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Link href={`/@${tweet.author.username}`} className="font-semibold text-gray-900 hover:underline">
                @{tweet.author.username}
              </Link>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500 text-sm">{formatDate(tweet.createdAt)}</span>
            </div>
          </div>

          {/* Tweet Content */}
          <div className="pl-12">
            <p className="text-gray-900 text-base leading-relaxed whitespace-pre-wrap">{tweet.content}</p>
          </div>

          {/* Tweet Actions */}
          <div className="pl-12 flex items-center justify-between max-w-md">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500 hover:bg-blue-50 p-2">
              <MessageCircle className="w-4 h-4 mr-1" />
              <span className="text-sm">{tweet.repliesCount}</span>
            </Button>

            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500 hover:bg-green-50 p-2">
              <Repeat2 className="w-4 h-4 mr-1" />
              <span className="text-sm">{tweet.retweetsCount}</span>
            </Button>

            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500 hover:bg-red-50 p-2">
              <Heart className="w-4 h-4 mr-1" />
              <span className="text-sm">{tweet.likesCount}</span>
            </Button>

            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500 hover:bg-blue-50 p-2">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
