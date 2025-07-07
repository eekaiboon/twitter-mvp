import type { Tweet } from "./tweet" // Assuming Tweet is defined in another file

export interface TimelineTweet extends Tweet {
  isLiked?: boolean
  isRetweeted?: boolean
}

export interface TimelineResponse {
  success: boolean
  tweets?: TimelineTweet[]
  hasMore?: boolean
  nextCursor?: string
  error?: string
}

export interface TimelineInput {
  limit?: number
  cursor?: string
}
