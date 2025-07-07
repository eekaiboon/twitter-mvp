"use client"

import { useState, useEffect } from "react"
import { ImageIcon } from "lucide-react"

interface ProfileMediaProps {
  userId: string
}

export function ProfileMedia({ userId }: ProfileMediaProps) {
  const [mediaItems, setMediaItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading media
    const timer = setTimeout(() => {
      setMediaItems([])
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [userId])

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (mediaItems.length === 0) {
    return (
      <div className="text-center py-12">
        <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No media yet</h3>
        <p className="text-gray-600">Photos and videos will appear here</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {mediaItems.map((item, index) => (
        <div key={index} className="aspect-square bg-gray-100 rounded-lg" />
      ))}
    </div>
  )
}
