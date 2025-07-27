import { getUserProfile } from "@/lib/server/profile"
import { getCurrentUser } from "@/lib/server/auth"
import { getUserTweets } from "@/lib/server/tweet"
import { redirect, notFound } from "next/navigation"
import { ClientProfilePage } from "./client-page"

export default async function ProfilePage(
  { params }: { params: Promise<{ username: string }> }
) {
  // First await the params object to get the username
  const { username } = await params

  // Get the current user
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect("/auth/login")
  }
  
  // Fetch profile data
  const profileResult = await getUserProfile(username)

  if (!profileResult.success || !profileResult.user) {
    notFound()
  }

  // Compare by username since it's the most reliable method
  const isOwnProfile = currentUser.username === profileResult.user.username

  // Fetch the user's tweets server-side to avoid Apollo Client issues
  const tweetsResult = await getUserTweets(profileResult.user.id)
  
  // Use client component to avoid NextJS dynamic API issues
  // Add a timestamp to force rerendering and avoid stale data
  const timestamp = Date.now()
  
  return (
    <ClientProfilePage
      key={`profile-${username}-${timestamp}`}
      currentUser={currentUser}
      profileUser={profileResult.user}
      isOwnProfile={isOwnProfile}
      initialTweets={tweetsResult.success ? tweetsResult.tweets : []}
    />
  )
}