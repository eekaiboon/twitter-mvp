import { Card, CardContent } from "@/components/ui/card"

export function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-20" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
              <div className="h-8 bg-gray-200 rounded animate-pulse w-16" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-0">
              {/* Cover skeleton */}
              <div className="h-48 bg-gray-200 animate-pulse" />

              <div className="px-6 pb-6">
                {/* Avatar and button skeleton */}
                <div className="flex justify-between items-end -mt-16 mb-4">
                  <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse w-24 mb-4" />
                </div>

                {/* Profile info skeleton */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-48" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-64" />
                  </div>

                  <div className="h-16 bg-gray-200 rounded animate-pulse" />

                  <div className="flex items-center space-x-6">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs skeleton */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded animate-pulse w-20" />
              ))}
            </div>

            {/* Tweet skeletons */}
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                      <div className="space-y-1">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
