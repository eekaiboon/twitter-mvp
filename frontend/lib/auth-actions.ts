import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { graphqlClient } from "./graphql-client"
import { SIGNUP_MUTATION, LOGIN_MUTATION } from "./graphql-mutations"
import type { SignupInput, LoginInput, AuthResponse } from "@/types/auth"

export async function signupUser(input: SignupInput): Promise<AuthResponse> {
  try {
    const { data } = await graphqlClient.mutate({
      mutation: SIGNUP_MUTATION,
      variables: { input },
    })

    if (data?.signup?.token) {
      // Set JWT token in HTTP-only cookie
      const cookieStore = await cookies()
      cookieStore.set("auth-token", data.signup.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

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
      // Set JWT token in HTTP-only cookie
      const cookieStore = await cookies()
      cookieStore.set("auth-token", data.login.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

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
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
  redirect("/auth/login")
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    // Decode JWT to get user info (you might want to validate it properly)
    const payload = JSON.parse(atob(token.split(".")[1]))
    return payload.user
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}
