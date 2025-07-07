export interface SignupFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface SignupInput {
  username: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface User {
  id: string
  username: string
  email: string
  createdAt: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  error?: string
}

export interface FormErrors {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
}
