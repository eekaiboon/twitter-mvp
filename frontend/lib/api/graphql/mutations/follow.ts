import { gql } from "@apollo/client"

export const FOLLOW_USER_MUTATION = gql`
  mutation FollowUser($input: FollowInput!) {
    followUser(input: $input) {
      id
      followerId
      followingId
      createdAt
      follower {
        id
        username
        email
      }
      following {
        id
        username
        email
      }
    }
  }
`

export const UNFOLLOW_USER_MUTATION = gql`
  mutation UnfollowUser($input: FollowInput!) {
    unfollowUser(input: $input) {
      success
      message
    }
  }
`