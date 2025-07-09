'use client';

import { redirect } from "next/navigation"
import { graphqlClient } from "../client"
import { SIGNUP_MUTATION, LOGIN_MUTATION } from "../graphql/mutations/auth"
import { setCookie, deleteCookie } from "../../client/cookies"
import type { SignupInput, LoginInput, AuthResponse } from "@/types/auth"

export async function signupUser(input: SignupInput): Promise<AuthResponse> {
  try {
    const { data } = await graphqlClient.mutate({
      mutation: SIGNUP_MUTATION,
      variables: { input },
    })

    if (data?.signup?.token) {
      // Set JWT token in cookie (client-side)
      setCookie("auth-token", data.signup.token, 7) // 7 days
      
      return { success: true, user: data.signup.user }
    }

    return { success: false, error: "Signup failed" }
  } catch (error: any) {
    console.error("Signup error:", error)

    // Handle GraphQL errors
    if (error.graphQLErrors?.length > 0) {
      return { success: false, error: error.graphQLErrors[0].message }
    }

    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function loginUser(input: LoginInput): Promise<AuthResponse> {
  try {
    const { data } = await graphqlClient.mutate({
      mutation: LOGIN_MUTATION,
      variables: { input },
    })

    if (data?.login?.token) {
      // Set JWT token in cookie (client-side)
      setCookie("auth-token", data.login.token, 7) // 7 days
      
      return { success: true, user: data.login.user }
    }

    return { success: false, error: "Login failed" }
  } catch (error: any) {
    console.error("Login error:", error)

    // Handle GraphQL errors
    if (error.graphQLErrors?.length > 0) {
      return { success: false, error: error.graphQLErrors[0].message }
    }

    return { success: false, error: "Invalid email or password" }
  }
}

export async function logoutUser() {
  // Delete token from cookies (client-side)
  deleteCookie("auth-token")
  redirect("/auth/login")
}