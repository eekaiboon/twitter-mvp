import { notFound, redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/server/auth"
import { getUserProfile } from "@/lib/server/profile"
import { getFollowing } from "@/lib/server/follow"
import { UserList } from "@/components/users/user-list"

interface FollowingPageProps {
  params: {
    username: string
  }
}

export default async function FollowingPage({ params }: FollowingPageProps) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect("/auth/login")
  }

  const profileResult = await getUserProfile(params.username)

  if (!profileResult.success || !profileResult.user) {
    notFound()
  }

  const followingResult = await getFollowing(profileResult.user.id)
  const following = followingResult.success ? followingResult.users : []

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              @{params.username}&#39;s Following
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">@{currentUser.username}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              People @{params.username} follows
            </h2>
            <UserList users={following} currentUserId={currentUser.id} />
          </div>
        </div>
      </main>
    </div>
  )
}