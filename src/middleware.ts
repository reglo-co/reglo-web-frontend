import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/organizations(.*)'])
const isAuthRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])
const isSignOutRoute = createRouteMatcher(['/sign-out(.*)'])
const isPublicRoute = createRouteMatcher(['/waitlist(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

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
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
