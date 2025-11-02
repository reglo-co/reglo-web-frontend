import { auth0 } from '@/lib/auth0'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

function isPublicRoute(pathname: string): boolean {
  if (pathname === '/') return true
  if (pathname.startsWith('/auth/login')) return true
  if (pathname.startsWith('/auth/callback')) return true
  if (pathname.startsWith('/auth/logout')) return true
  return false
}

function hasSessionCookie(request: NextRequest): boolean {
  const cookieHeader = request.headers.get('cookie') || ''
  return cookieHeader.includes('appSession') || cookieHeader.includes('auth0')
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isPublicRoute(pathname)) {
    return await auth0.middleware(request)
  }

  if (!hasSessionCookie(request)) {
    if (pathname.startsWith('/auth/login')) {
      return await auth0.middleware(request)
    }
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('returnTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return await auth0.middleware(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
