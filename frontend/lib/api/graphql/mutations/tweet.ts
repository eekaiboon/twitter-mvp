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