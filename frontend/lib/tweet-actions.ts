import { graphqlClient } from "./graphql-client"
import { CREATE_TWEET_MUTATION, GET_USER_TWEETS_QUERY } from "./tweet-mutations"
import type { CreateTweetInput, TweetResponse, TweetsResponse } from "@/types/tweet"

export async function createTweet(input: CreateTweetInput): Promise<TweetResponse> {
  try {
    const { data } = await graphqlClient.mutate({
      mutation: CREATE_TWEET_MUTATION,
      variables: { input },
      // Refetch queries to update the UI
      refetchQueries: ["GetUserTweets", "GetTimeline"],
    })

    if (data?.createTweet) {
      return { success: true, tweet: data.createTweet }
    }

    return { success: false, error: "Failed to create tweet" }
  } catch (error: any) {
    console.error("Create tweet error:", error)

    if (error.graphQLErrors?.length > 0) {
      return { success: false, error: error.graphQLErrors[0].message }
    }

    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getUserTweets(userId: string): Promise<TweetsResponse> {
  try {
    const { data } = await graphqlClient.query({
      query: GET_USER_TWEETS_QUERY,
      variables: { userId },
      fetchPolicy: "cache-and-network",
    })

    if (data?.getUserTweets) {
      return { success: true, tweets: data.getUserTweets }
    }

    return { success: false, error: "Failed to fetch tweets" }
  } catch (error: any) {
    console.error("Get user tweets error:", error)

    if (error.graphQLErrors?.length > 0) {
      return { success: false, error: error.graphQLErrors[0].message }
    }

    return { success: false, error: "An unexpected error occurred" }
  }
}
