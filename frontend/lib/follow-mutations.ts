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

export const GET_USER_PROFILE_QUERY = gql`
  query GetUserProfile($username: String!) {
    getUserProfile(username: $username) {
      id
      username
      email
      bio
      createdAt
      followersCount
      followingCount
      tweetsCount
      isFollowing
      isFollowedBy
    }
  }
`

export const GET_FOLLOWERS_QUERY = gql`
  query GetFollowers($userId: ID!, $limit: Int, $offset: Int) {
    getFollowers(userId: $userId, limit: $limit, offset: $offset) {
      id
      username
      email
      followersCount
      followingCount
      isFollowing
    }
  }
`

export const GET_FOLLOWING_QUERY = gql`
  query GetFollowing($userId: ID!, $limit: Int, $offset: Int) {
    getFollowing(userId: $userId, limit: $limit, offset: $offset) {
      id
      username
      email
      followersCount
      followingCount
      isFollowing
    }
  }
`

export const SEARCH_USERS_QUERY = gql`
  query SearchUsers($query: String!, $limit: Int) {
    searchUsers(query: $query, limit: $limit) {
      id
      username
      email
      followersCount
      followingCount
      isFollowing
    }
  }
`
