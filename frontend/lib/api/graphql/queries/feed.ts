import { gql } from "@apollo/client"

export const GET_TIMELINE_QUERY = gql`
  query GetTimeline($input: TimelineInput!) {
    getTimeline(input: $input) {
      tweets {
        id
        content
        createdAt
        author {
          id
          username
          email
        }
        likesCount
        retweetsCount
        repliesCount
        isLiked
        isRetweeted
      }
      hasMore
      nextCursor
    }
  }
`

export const GET_FOLLOWING_TIMELINE_QUERY = gql`
  query GetFollowingTimeline($input: TimelineInput!) {
    getFollowingTimeline(input: $input) {
      tweets {
        id
        content
        createdAt
        author {
          id
          username
          email
        }
        likesCount
        retweetsCount
        repliesCount
        isLiked
        isRetweeted
      }
      hasMore
      nextCursor
    }
  }
`

export const GET_USER_TIMELINE_QUERY = gql`
  query GetUserTimeline($userId: ID!, $input: TimelineInput!) {
    getUserTimeline(userId: $userId, input: $input) {
      tweets {
        id
        content
        createdAt
        author {
          id
          username
          email
        }
        likesCount
        retweetsCount
        repliesCount
        isLiked
        isRetweeted
      }
      hasMore
      nextCursor
    }
  }
`