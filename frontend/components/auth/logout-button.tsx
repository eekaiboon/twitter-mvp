import { logoutUser } from "@/lib/auth-actions"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  return (
    <form action={logoutUser}>
      <Button type="submit" variant="outline" size="sm">
        Logout
      </Button>
    </form>
  )
}
