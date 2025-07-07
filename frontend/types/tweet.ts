export interface Tweet {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    username: string
    email: string
  }
  likesCount: number
  retweetsCount: number
  repliesCount: number
}

export interface CreateTweetInput {
  content: string
}

export interface TweetResponse {
  success: boolean
  tweet?: Tweet
  error?: string
}

export interface TweetsResponse {
  success: boolean
  tweets?: Tweet[]
  error?: string
}
