"use client"

import { clientLogoutUser } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const handleLogout = () => {
    clientLogoutUser()
  }

  return (
    <Button onClick={handleLogout} variant="outline" size="sm">
      Logout
    </Button>
  )
}