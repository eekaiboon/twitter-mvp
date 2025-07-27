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
import type { User } from "@/types/auth"

interface TweetComposerProps {
  onTweetCreated?: () => void
  user?: User
}

export function TweetComposer({ onTweetCreated, user }: TweetComposerProps) {
  console.log('[TweetComposer] Received user:', user ? JSON.stringify(user, null, 2) : 'undefined');
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
      console.log('[TweetComposer] Starting tweet creation');
      
      // The user ID is stored in the 'sub' field in the JWT token
      // This follows the JWT standard where 'sub' means subject (user identifier)
      const userId = user?.sub;
      
      console.log('[TweetComposer] Creating new tweet with:', {
        userId: userId,
        username: user?.username,
        tweetContent: content.trim().substring(0, 20) + '...'
      });
      
      // Create a local tweet object
      const now = new Date();
      const newTweet: Tweet = {
        id: `local-${Date.now()}`,
        content: content.trim(),
        createdAt: now.toISOString(),
        author: {
          // Use the 'sub' field from JWT as the author ID
          // Convert to string format to match ID conventions in the API
          id: String(userId), // Just use the numeric ID directly, the comparison function will handle matching
          username: user?.username || '',
          displayName: user?.username || '',
        },
        likesCount: 0,
        retweetsCount: 0,
        repliesCount: 0
      };
      
      if (!user || userId === undefined) {
        console.error('[TweetComposer] Error: User ID (sub) is missing');
        setError('Unable to create tweet - missing user information');
        setIsLoading(false);
        return;
      }

      // Save to local storage
      console.log('[TweetComposer] Full tweet object:', JSON.stringify(newTweet, null, 2));
      try {
        addLocalTweet(newTweet);
        console.log('[TweetComposer] Tweet saved successfully');
      } catch (storageError) {
        console.error('[TweetComposer] Error saving to local storage:', storageError);
        throw storageError; // Re-throw to be caught by outer try-catch
      }
      
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
      console.error('[TweetComposer] Error creating tweet:', err);
      setError("An unexpected error occurred: " + (err instanceof Error ? err.message : String(err)))
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
              <span className="text-white font-semibold text-sm">{user?.username?.[0]?.toUpperCase() || 'Y'}</span>
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