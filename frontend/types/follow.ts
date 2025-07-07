export interface FollowRelationship {
  id: string
  followerId: string
  followingId: string
  createdAt: string
  follower: {
    id: string
    username: string
    email: string
  }
  following: {
    id: string
    username: string
    email: string
  }
}

export interface UserProfile {
  id: string
  username: string
  email: string
  bio?: string
  location?: string
  website?: string
  createdAt: string
  followersCount: number
  followingCount: number
  tweetsCount: number
  isFollowing: boolean
  isFollowedBy: boolean
}

export interface FollowInput {
  userId: string
}

export interface FollowResponse {
  success: boolean
  relationship?: FollowRelationship
  error?: string
}

export interface UserProfileResponse {
  success: boolean
  user?: UserProfile
  error?: string
}

export interface UsersResponse {
  success: boolean
  users?: UserProfile[]
  error?: string
}
