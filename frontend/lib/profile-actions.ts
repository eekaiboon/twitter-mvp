import { graphqlClient } from "./graphql-client"
import { UPDATE_PROFILE_MUTATION } from "./profile-mutations"

interface UpdateProfileInput {
  bio?: string
  location?: string
  website?: string
}

interface UpdateProfileResponse {
  success: boolean
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
      return { success: true }
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
