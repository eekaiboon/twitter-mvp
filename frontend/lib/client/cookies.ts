// Get cookie by name (client-side)
export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined // Only run on client side
  
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1)
    }
  }
  return undefined
}

// Set cookie (client-side)
export function setCookie(name: string, value: string, days: number = 7): void {
  if (typeof document === 'undefined') return // Only run on client side
  
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`
}

// Delete cookie (client-side)
export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return // Only run on client side
  
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict`
}