import { NextRequest, NextResponse } from 'next/server'
import { handleWildcardSubdomain } from './modules/middleware/wildcard-subdomain'

export default function middleware(req: NextRequest) {
  const response = handleWildcardSubdomain(req)
  if (response) return response

  return NextResponse.next()
}

export const wildcardSubdomainConfig = {
  matcher: ['/((?!_next|.*\\..*|favicon.ico|robots.txt|sitemap.xml).*)'],
}
