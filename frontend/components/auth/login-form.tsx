"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loginUser } from "@/lib/auth-client" // Updated import
import { validateLoginForm } from "@/lib/validation"
import type { LoginFormData, FormErrors } from "@/types/auth"

export function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear field-specific error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setServerError("")

    // Client-side validation
    const validationErrors = validateLoginForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setIsLoading(false)
      return
    }

    try {
      const result = await loginUser(formData)

      if (result.success) {
        router.push("/dashboard")
      } else {
        setServerError(result.error || "Invalid email or password")
      }
    } catch (error) {
      setServerError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {serverError && (
        <Alert variant="destructive">
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? "border-red-500" : ""}
            placeholder="Enter your email"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? "border-red-500" : ""}
            placeholder="Enter your password"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>
      </div>

      <div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </div>

      <div className="text-center">
        <span className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </span>
      </div>
    </form>
  )
}