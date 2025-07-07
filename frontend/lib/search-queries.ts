import { gql } from "@apollo/client"

export const SEARCH_TWEETS_QUERY = gql`
  query SearchTweets($input: SearchInput!) {
    searchTweets(input: $input) {
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
        highlightedContent
        matchedHashtags
        matchedKeywords
      }
      hasMore
      nextCursor
      totalCount
    }
  }
`

export const SEARCH_HASHTAGS_QUERY = gql`
  query SearchHashtags($query: String!, $limit: Int) {
    searchHashtags(query: $query, limit: $limit) {
      hashtag
      count
      trending
    }
  }
`

export const GET_TRENDING_HASHTAGS_QUERY = gql`
  query GetTrendingHashtags($limit: Int) {
    getTrendingHashtags(limit: $limit) {
      hashtag
      count
      trending
    }
  }
`

export const GET_SEARCH_SUGGESTIONS_QUERY = gql`
  query GetSearchSuggestions($query: String!, $limit: Int) {
    getSearchSuggestions(query: $query, limit: $limit) {
      type
      value
      count
    }
  }
`
