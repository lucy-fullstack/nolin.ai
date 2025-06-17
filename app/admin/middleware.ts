import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { encrypt, decrypt } from '@/lib/encryption'

// Admin credentials
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'NolinAILucia2025!'
const AUTH_COOKIE_NAME = 'nolin_admin_auth'
const AUTH_EXPIRY_HOURS = 12 // Auth session expires after 12 hours

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME)?.value
  
  // If visiting the login page and already authenticated, redirect to admin dashboard
  if (request.nextUrl.pathname === '/admin/login') {
    if (authCookie) {
      try {
        const decrypted = decrypt(authCookie)
        const { username, password, expiry } = JSON.parse(decrypted)
        
        if (
          username === ADMIN_USERNAME && 
          password === ADMIN_PASSWORD &&
          new Date().getTime() < expiry
        ) {
          return NextResponse.redirect(new URL('/admin', request.url))
        }
      } catch (err) {
        // If error decrypting, continue to login page
        console.error('Auth cookie decryption error:', err)
      }
    }
    return NextResponse.next()
  }
  
  // Check authentication for all other admin routes
  if (!authCookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  
  try {
    const decrypted = decrypt(authCookie)
    const { username, password, expiry } = JSON.parse(decrypted)
    
    // Verify credentials and check if session is still valid
    if (
      username === ADMIN_USERNAME && 
      password === ADMIN_PASSWORD &&
      new Date().getTime() < expiry
    ) {
      return NextResponse.next()
    }
    
    // If invalid or expired, redirect to login
    return NextResponse.redirect(new URL('/admin/login', request.url))
  } catch (err) {
    console.error('Auth error:', err)
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}

export const config = {
  matcher: ['/admin', '/admin/:path*']
} 