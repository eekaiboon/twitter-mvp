"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Hash, TrendingUp } from "lucide-react"
import { getTrendingHashtags } from "@/lib/search-actions"

interface TrendingHashtag {
  hashtag: string
  count: number
  trending: boolean
}

export function TrendingHashtags() {
  const [hashtags, setHashtags] = useState<TrendingHashtag[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTrendingHashtags = async () => {
      try {
        const result = await getTrendingHashtags(10)
        if (result.success && result.hashtags) {
          setHashtags(result.hashtags)
        }
      } catch (error) {
        console.error("Error fetching trending hashtags:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrendingHashtags()
  }, [])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Trending Hashtags</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                </div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (hashtags.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Trending Hashtags</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-4">No trending hashtags available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>Trending Hashtags</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {hashtags.map((hashtag, index) => (
            <div
              key={hashtag.hashtag}
              className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 w-4">{index + 1}</span>
                <Hash className="w-4 h-4 text-blue-500" />
                <span className="font-medium">#{hashtag.hashtag}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {hashtag.count.toLocaleString()}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
