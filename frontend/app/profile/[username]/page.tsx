import { getUserProfile } from "@/lib/server/profile"
import { getCurrentUser } from "@/lib/server/auth"
import { redirect, notFound } from "next/navigation"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileTabs } from "@/components/profile/profile-tabs"

interface ProfilePageProps {
  params: {
    username: string
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect("/auth/login")
  }

  const profileResult = await getUserProfile(params.username)

  if (!profileResult.success || !profileResult.user) {
    notFound()
  }

  const isOwnProfile = currentUser.id === profileResult.user.id

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">@{currentUser.username}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <ProfileHeader user={profileResult.user} isOwnProfile={isOwnProfile} />
          <ProfileTabs user={profileResult.user} />
        </div>
      </main>
    </div>
  )
}