import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full text-center space-y-8 p-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Twitter Clone</h1>
          <p className="text-lg text-gray-600">Connect with friends and the world around you</p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full" size="lg">
            <Link href="/auth/signup">Get Started</Link>
          </Button>

          <Button asChild variant="outline" className="w-full bg-transparent" size="lg">
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
