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
    console.log('[Auth] Decoded user payload:', JSON.stringify(payload, null, 2))
    
    // Get the user data and ensure it has the right properties
    const userData = payload.user || payload
    console.log('[Auth] Final user data:', JSON.stringify(userData, null, 2))
    
    return userData
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}