import { auth0 } from '@lib/auth0'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

function isPublicRoute(pathname: string): boolean {
  if (pathname === '/') return true
  if (pathname.startsWith('/auth/login')) return true
  if (pathname.startsWith('/auth/callback')) return true
  if (pathname.startsWith('/auth/logout')) return true
  return false
}

export async function proxy(request: NextRequest) {
  if (isPublicRoute(request.nextUrl.pathname)) {
    return await auth0.middleware(request)
  }

  const session = await auth0.getSession()

  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return await auth0.middleware(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
