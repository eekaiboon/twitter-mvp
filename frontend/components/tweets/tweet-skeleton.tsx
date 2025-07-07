import { Card, CardContent } from "@/components/ui/card"

export function TweetSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header skeleton */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="space-y-1">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
            </div>
          </div>

          {/* Content skeleton */}
          <div className="pl-12 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>

          {/* Actions skeleton */}
          <div className="pl-12 flex items-center space-x-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-6 h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
