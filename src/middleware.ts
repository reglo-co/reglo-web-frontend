import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/organizations(.*)'])
const isAuthRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])
const isSignOutRoute = createRouteMatcher(['/sign-out(.*)'])
const isPublicRoute = createRouteMatcher(['/waitlist(.*)'])
const isApiRoute = createRouteMatcher(['/api(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId, getToken } = await auth()

  // Se o usuário está logado e tenta acessar páginas de auth, redireciona para organizações
  if (userId && isAuthRoute(req)) {
    return NextResponse.redirect(new URL('/organizations', req.url))
  }

  // Se o usuário está logado e tenta acessar waitlist, redireciona para organizações
  if (userId && isPublicRoute(req)) {
    return NextResponse.redirect(new URL('/organizations', req.url))
  }

  // Se o usuário não está logado e tenta acessar sign-out, redireciona para sign-in
  if (!userId && isSignOutRoute(req)) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  // Protege rotas que requerem autenticação
  if (isProtectedRoute(req)) {
    await auth.protect()
  }

  // Autentica e injeta credenciais nas rotas de API
  if (isApiRoute(req)) {
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = await getToken()
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('authorization', `Bearer ${token}`)
    requestHeaders.set('x-user-id', userId)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
