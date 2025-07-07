import { graphqlClient } from "./graphql-client"
import { SEARCH_TWEETS_QUERY, GET_TRENDING_HASHTAGS_QUERY, GET_SEARCH_SUGGESTIONS_QUERY } from "./search-queries"
import type { SearchInput, SearchResponse, SearchSuggestionsResponse } from "@/types/search"

export async function searchTweets(input: SearchInput): Promise<SearchResponse> {
  try {
    const { data } = await graphqlClient.query({
      query: SEARCH_TWEETS_QUERY,
      variables: { input },
      fetchPolicy: "cache-and-network",
    })

    if (data?.searchTweets) {
      return {
        success: true,
        tweets: data.searchTweets.tweets,
        hasMore: data.searchTweets.hasMore,
        nextCursor: data.searchTweets.nextCursor,
        totalCount: data.searchTweets.totalCount,
      }
    }

    return { success: false, error: "Search failed" }
  } catch (error: any) {
    console.error("Search tweets error:", error)

    if (error.graphQLErrors?.length > 0) {
      return { success: false, error: error.graphQLErrors[0].message }
    }

    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getSearchSuggestions(query: string, limit = 5): Promise<SearchSuggestionsResponse> {
  try {
    const { data } = await graphqlClient.query({
      query: GET_SEARCH_SUGGESTIONS_QUERY,
      variables: { query, limit },
      fetchPolicy: "cache-first",
    })

    if (data?.getSearchSuggestions) {
      return {
        success: true,
        suggestions: data.getSearchSuggestions,
      }
    }

    return { success: false, error: "Failed to get suggestions" }
  } catch (error: any) {
    console.error("Get search suggestions error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getTrendingHashtags(limit = 10) {
  try {
    const { data } = await graphqlClient.query({
      query: GET_TRENDING_HASHTAGS_QUERY,
      variables: { limit },
      fetchPolicy: "cache-and-network",
    })

    if (data?.getTrendingHashtags) {
      return {
        success: true,
        hashtags: data.getTrendingHashtags,
      }
    }

    return { success: false, error: "Failed to get trending hashtags" }
  } catch (error: any) {
    console.error("Get trending hashtags error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
