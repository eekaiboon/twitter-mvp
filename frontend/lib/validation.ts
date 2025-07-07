import type { SignupFormData, LoginFormData, FormErrors } from "@/types/auth"

export function validateSignupForm(data: SignupFormData): FormErrors {
  const errors: FormErrors = {}

  // Username validation
  if (!data.username.trim()) {
    errors.username = "Username is required"
  } else if (data.username.length < 3) {
    errors.username = "Username must be at least 3 characters long"
  } else if (data.username.length > 20) {
    errors.username = "Username must be less than 20 characters"
  } else if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
    errors.username = "Username can only contain letters, numbers, and underscores"
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address"
  }

  // Password validation
  if (!data.password) {
    errors.password = "Password is required"
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters long"
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
    errors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  }

  // Confirm password validation
  if (!data.confirmPassword) {
    errors.confirmPassword = "Please confirm your password"
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match"
  }

  return errors
}

export function validateLoginForm(data: LoginFormData): FormErrors {
  const errors: FormErrors = {}

  // Email validation
  if (!data.email.trim()) {
    errors.email = "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address"
  }

  // Password validation
  if (!data.password) {
    errors.password = "Password is required"
  }

  return errors
}
