'use client';

import { deleteCookie } from './cookies';

export function clientLogoutUser() {
  // Delete token from cookie
  deleteCookie("auth-token");
  
  // Redirect to login page
  window.location.href = "/auth/login";
}