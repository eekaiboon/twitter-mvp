'use client';

import { graphqlClient } from "../client"
import { UPDATE_PROFILE_MUTATION } from "../graphql/mutations/profile"
import type { UserProfileResponse } from "@/types/follow"

export interface UpdateProfileInput {
  bio?: string
  location?: string
  website?: string
}

export interface UpdateProfileResponse {
  success: boolean
  profile?: {
    id: string
    username: string
    email: string
    bio?: string
    location?: string
    website?: string
    createdAt: string
  }
  error?: string
}

export async function updateUserProfile(input: UpdateProfileInput): Promise<UpdateProfileResponse> {
  try {
    const { data } = await graphqlClient.mutate({
      mutation: UPDATE_PROFILE_MUTATION,
      variables: { input },
      refetchQueries: ["GetUserProfile"],
    })

    if (data?.updateProfile) {
      return { 
        success: true, 
        profile: data.updateProfile 
      }
    }

    return { success: false, error: "Failed to update profile" }
  } catch (error: any) {
    console.error("Update profile error:", error)

    if (error.graphQLErrors?.length > 0) {
      return { success: false, error: error.graphQLErrors[0].message }
    }

    return { success: false, error: "An unexpected error occurred" }
  }
}