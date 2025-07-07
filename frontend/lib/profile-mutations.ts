import { gql } from "@apollo/client"

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      username
      email
      bio
      location
      website
      updatedAt
    }
  }
`
