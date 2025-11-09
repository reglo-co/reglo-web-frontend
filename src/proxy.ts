import { auth0 } from '@lib/auth0'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const PUBLIC_ROUTES = {
  ROOT: '/',
  LOGIN: '/auth/login',
  CALLBACK: '/auth/callback',
  LOGOUT: '/auth/logout',
} as const

function isPublicRoute(pathname: string): boolean {
  const publicRoutePaths = Object.values(PUBLIC_ROUTES)

  return publicRoutePaths.some(
    (route) => pathname === route || pathname.startsWith(route)
  )
}

function createLoginRedirect(requestUrl: string): NextResponse {
  return NextResponse.redirect(new URL(PUBLIC_ROUTES.LOGIN, requestUrl))
}

async function handleAuthenticatedRequest(
  request: NextRequest
): Promise<NextResponse> {
  return await auth0.middleware(request)
}

async function handleUnauthenticatedRequest(
  request: NextRequest
): Promise<NextResponse> {
  const userSession = await auth0.getSession()

  if (!userSession) {
    return createLoginRedirect(request.url)
  }

  return await handleAuthenticatedRequest(request)
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const currentPathname = request.nextUrl.pathname

  if (isPublicRoute(currentPathname)) {
    return await handleAuthenticatedRequest(request)
  }

  return await handleUnauthenticatedRequest(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
