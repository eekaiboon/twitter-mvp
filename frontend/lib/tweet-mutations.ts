import { gql } from "@apollo/client"

export const CREATE_TWEET_MUTATION = gql`
  mutation CreateTweet($input: CreateTweetInput!) {
    createTweet(input: $input) {
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
    }
  }
`

export const GET_USER_TWEETS_QUERY = gql`
  query GetUserTweets($userId: ID!) {
    getUserTweets(userId: $userId) {
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
    }
  }
`

export const GET_TIMELINE_QUERY = gql`
  query GetTimeline($limit: Int, $offset: Int) {
    getTimeline(limit: $limit, offset: $offset) {
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
    }
  }
`
