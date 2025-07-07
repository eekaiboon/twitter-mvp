import { getCurrentUser } from "@/lib/auth-server"
import { redirect } from "next/navigation"
import { UserSearch } from "@/components/users/user-search"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function DiscoverPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4 space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Discover People</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Find people to follow</h2>
            <UserSearch />
          </div>
        </div>
      </main>
    </div>
  )
}