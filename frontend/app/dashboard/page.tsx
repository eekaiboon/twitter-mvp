import { getCurrentUser } from "@/lib/server/auth"
import { redirect } from "next/navigation"
import { LogoutButton } from "@/components/auth/logout-button"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { TimelineSection } from "./timeline-section"
import { UserTweetsSection } from "./user-tweets-section"
import Link from "next/link"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Twitter Clone</h1>
            <div className="flex items-center space-x-4">
              <Link href="/search" className="text-sm text-blue-600 hover:text-blue-800">
                Search
              </Link>
              <Link href="/discover" className="text-sm text-blue-600 hover:text-blue-800">
                Discover
              </Link>
              <Link href={`/profile/${user.username}`} className="text-sm text-gray-600 hover:text-gray-800">
                @{user.username}
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <DashboardContent 
          user={user} 
          timelineFeed={<TimelineSection user={user} />}
          userTweets={<UserTweetsSection user={user} />}
        />
      </main>
    </div>
  )
}