'use client';

import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"
import { getCookie } from "../client/cookies"

// Load dev error messages in development
if (process.env.NODE_ENV === "development") {
  // Dynamic import to avoid including in production bundle
  import("@apollo/client/dev").then(({ loadDevMessages, loadErrorMessages }) => {
    loadDevMessages();
    loadErrorMessages();
  }).catch(e => {
    console.error("Error loading Apollo dev messages:", e);
  });
}

// Use the public URL for the GraphQL endpoint
const API_URL = typeof window !== 'undefined' 
  ? window.location.origin.replace(/:\d+/, ':4000') + '/graphql'  // For development: replace frontend port with backend port
  : 'http://localhost:4000/graphql'; // Fallback

// Create HTTP link for requests
const httpLink = createHttpLink({
  uri: API_URL,
  credentials: 'include',
})

// Add auth headers to requests
const authLink = setContext((_, { headers }) => {
  // Get token from cookie
  const token = getCookie('auth-token')
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Operation: ${operation.operationName}`,
      )
    })
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
  }
})

// For safety, check if window exists (client-side only)
let apolloClient: ApolloClient<any> | null = null;

// Only create the client on the client side
if (typeof window !== 'undefined') {
  apolloClient = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: "all",
      },
      query: {
        errorPolicy: "all",
      },
      mutate: {
        errorPolicy: "all",
      },
    },
    connectToDevTools: process.env.NODE_ENV === 'development',
  })
}

export const graphqlClient = apolloClient!