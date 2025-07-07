'use client';

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { getCookie } from "./utils"

// Use the public URL for the GraphQL endpoint
const API_URL = typeof window !== 'undefined' 
  ? window.location.origin.replace(/:\d+/, ':4000') + '/graphql'  // For development: replace frontend port with backend port
  : 'http://localhost:4000/graphql'; // Fallback

const httpLink = createHttpLink({
  uri: API_URL,
  credentials: 'include',
})

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

export const graphqlClient = new ApolloClient({
  link: authLink.concat(httpLink),
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
})