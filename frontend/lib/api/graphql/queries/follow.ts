import { gql } from "@apollo/client"

export const GET_USER_PROFILE_QUERY = gql`
  query GetUserProfile($username: String!) {
    getUserProfile(username: $username) {
      id
      username
      email
      bio
      location
      website
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