"use client"

import { ReactNode } from 'react'
import { FollowProvider } from './follow-provider'
import { ApolloClientProvider } from './apollo-provider'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ApolloClientProvider>
      <FollowProvider>
        {children}
      </FollowProvider>
    </ApolloClientProvider>
  )
}