import { Auth0Client } from '@auth0/nextjs-auth0/server'

if (!process.env.AUTH0_SECRET || process.env.AUTH0_SECRET.trim().length === 0) {
  throw new Error('Missing AUTH0_SECRET environment variable')
}

if (!process.env.AUTH0_ISSUER_BASE_URL && process.env.AUTH0_DOMAIN) {
  process.env.AUTH0_ISSUER_BASE_URL = `https://${process.env.AUTH0_DOMAIN}`
}

if (!process.env.AUTH0_BASE_URL && process.env.APP_BASE_URL) {
  process.env.AUTH0_BASE_URL = process.env.APP_BASE_URL
}

export const auth0 = new Auth0Client()
