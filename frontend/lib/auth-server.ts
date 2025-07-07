'use server';

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Server-side only auth actions
export async function logoutUser() {
  // For server actions
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
  
  redirect("/auth/login")
}

// For server components
export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    // Decode JWT to get user info
    const payload = JSON.parse(atob(token.split(".")[1]))
    return payload.user || payload
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}