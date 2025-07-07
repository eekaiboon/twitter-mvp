"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { EditProfileModal } from "./edit-profile-modal"
import type { UserProfile } from "@/types/follow"

interface EditProfileButtonProps {
  user: UserProfile
}

export function EditProfileButton({ user }: EditProfileButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button variant="outline" onClick={() => setIsModalOpen(true)}>
        Edit Profile
      </Button>

      <EditProfileModal user={user} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
