import { getUserProfile } from "@/lib/follow-actions"
import { getCurrentUser } from "@/lib/auth-server"
import { redirect, notFound } from "next/navigation"
import { PublicProfileHeader } from "@/components/profile/public-profile-header"
import { PublicProfileTabs } from "@/components/profile/public-profile-tabs"
import { ProfileNavigation } from "@/components/profile/profile-navigation"

interface PublicProfilePageProps {
  params: {
    username: string
  }
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  // Remove @ symbol if present
  const username = params.username.startsWith("@") ? params.username.slice(1) : params.username

  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect("/auth/login")
  }

  const profileResult = await getUserProfile(username)

  if (!profileResult.success || !profileResult.user) {
    notFound()
  }

  const isOwnProfile = currentUser.id === profileResult.user.id

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileNavigation currentUser={currentUser} />

      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <PublicProfileHeader user={profileResult.user} isOwnProfile={isOwnProfile} />
          <PublicProfileTabs user={profileResult.user} />
        </div>
      </main>
    </div>
  )
}

// Generate metadata for the profile page
export async function generateMetadata({ params }: PublicProfilePageProps) {
  const username = params.username.startsWith("@") ? params.username.slice(1) : params.username

  try {
    const profileResult = await getUserProfile(username)

    if (profileResult.success && profileResult.user) {
      return {
        title: `@${profileResult.user.username} - Twitter Clone`,
        description: profileResult.user.bio || `View @${profileResult.user.username}'s profile on Twitter Clone`,
      }
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
  }

  return {
    title: "Profile - Twitter Clone",
    description: "User profile on Twitter Clone",
  }
}