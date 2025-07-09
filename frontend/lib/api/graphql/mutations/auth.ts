import { gql } from "@apollo/client"

export const SIGNUP_MUTATION = gql`
  mutation Signup($input: CreateUserInput!) {
    signup(input: $input) {
      token
      user {
        id
        username
        email
        createdAt
      }
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        username
        email
        createdAt
      }
    }
  }
`