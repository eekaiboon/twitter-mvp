export interface TargetUser {
  id: string
  username: string
  email: string
  followersCount: number
  followingCount: number
  isFollowedByMe: boolean
}

export interface UserProfile {
  id: string
  username: string
  email: string
  createdAt: string
  followersCount: number
  followingCount: number
  isFollowedByMe: boolean
  // Add optional fields that we'll compute or mock on the client side if needed
  tweetsCount?: number
}

export interface FollowInput {
  targetUserId: string
  username: string
}

export interface FollowResponse {
  success: boolean
  targetUser?: TargetUser
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
