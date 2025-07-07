import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, UserX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-4">
          <UserX className="w-16 h-16 mx-auto text-gray-400" />
          <h1 className="text-2xl font-bold text-gray-900">Profile not found</h1>
          <p className="text-gray-600">The profile you're looking for doesn't exist or may have been deleted.</p>
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>

          <Button variant="outline" asChild className="w-full bg-transparent">
            <Link href="/discover">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Discover Users
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
