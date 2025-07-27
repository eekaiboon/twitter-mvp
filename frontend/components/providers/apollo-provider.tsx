"use client"

import { ApolloProvider } from '@apollo/client'
import { graphqlClient } from '@/lib/api/client'
import { ReactNode } from 'react'

interface ApolloClientProviderProps {
  children: ReactNode
}

export function ApolloClientProvider({ children }: ApolloClientProviderProps) {
  // Only render the Apollo Provider on the client side
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }
  
  return (
    <ApolloProvider client={graphqlClient}>
      {children}
    </ApolloProvider>
  )
}