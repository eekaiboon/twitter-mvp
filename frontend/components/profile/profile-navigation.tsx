import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/components/auth/logout-button"
import { ArrowLeft } from "lucide-react"
import type { User } from "@/types/auth"

interface ProfileNavigationProps {
  currentUser: User
}

export function ProfileNavigation({ currentUser }: ProfileNavigationProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/search" className="text-sm text-blue-600 hover:text-blue-800">
              Search
            </Link>
            <Link href="/discover" className="text-sm text-blue-600 hover:text-blue-800">
              Discover
            </Link>
            <span className="text-sm text-gray-600">@{currentUser.username}</span>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  )
}
