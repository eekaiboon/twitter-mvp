"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ImageIcon, Smile } from "lucide-react"
import { addLocalTweet } from "@/lib/client/local-storage"
import type { Tweet } from "@/types/tweet"

interface TweetComposerProps {
  onTweetCreated?: () => void
}

export function TweetComposer({ onTweetCreated }: TweetComposerProps) {
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const characterCount = content.length
  const maxCharacters = 280
  const isOverLimit = characterCount > maxCharacters
  const isNearLimit = characterCount > maxCharacters * 0.8

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim() || isOverLimit) {
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess(false)

    try {
      // Create a local tweet object
      const now = new Date();
      const mockTweet: Tweet = {
        id: `local-${Date.now()}`,
        content: content.trim(),
        createdAt: now.toISOString(),
        author: {
          id: 'current-user',
          username: 'you',
          displayName: 'Current User',
        },
        likesCount: 0,
        retweetsCount: 0,
        repliesCount: 0
      };

      // Save to local storage
      addLocalTweet(mockTweet);
      
      // Clear form and show success
      setTimeout(() => {
        setContent("")
        setSuccess(true)
        onTweetCreated?.()
        setIsLoading(false)
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccess(false)
        }, 3000)
      }, 500)
    } catch (err) {
      setError("An unexpected error occurred")
      setIsLoading(false)
    }
  }

  const getCharacterCountColor = () => {
    if (isOverLimit) return "text-red-500"
    if (isNearLimit) return "text-yellow-500"
    return "text-gray-500"
  }

  return (
    <Card>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-700">Tweet posted successfully!</AlertDescription>
            </Alert>
          )}

          <div className="flex space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-sm">You</span>
            </div>

            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="What's happening?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] text-lg border-none resize-none focus:ring-0 p-0"
                disabled={isLoading}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button type="button" variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-50">
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-50">
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`text-sm ${getCharacterCountColor()}`}>
                    {characterCount}/{maxCharacters}
                  </span>
                  <Button type="submit" disabled={!content.trim() || isOverLimit || isLoading} className="px-6">
                    {isLoading ? "Posting..." : "Tweet"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}