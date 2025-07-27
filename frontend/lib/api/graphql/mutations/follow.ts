import { gql } from "@apollo/client"

export const FOLLOW_USER_MUTATION = gql`
  mutation FollowUser($targetUserId: String!) {
    followUser(targetUserId: $targetUserId) {
      success
      targetUser {
        id
        username
        email
        followersCount
        followingCount
        isFollowedByMe
      }
      error
    }
  }
`

export const UNFOLLOW_USER_MUTATION = gql`
  mutation UnfollowUser($targetUserId: String!) {
    unfollowUser(targetUserId: $targetUserId) {
      success
      targetUser {
        id
        username
        email
        followersCount
        followingCount
        isFollowedByMe
      }
      error
    }
  }
`