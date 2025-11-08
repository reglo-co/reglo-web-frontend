import { Auth0Client } from '@auth0/nextjs-auth0/server'
import { env } from '@env'

const issuerBaseUrl =
  env.AUTH0_ISSUER_BASE_URL ?? `https://${env.AUTH0_DOMAIN}`
const baseUrl = env.AUTH0_BASE_URL ?? env.APP_BASE_URL

process.env.AUTH0_SECRET = env.AUTH0_SECRET
process.env.AUTH0_ISSUER_BASE_URL = issuerBaseUrl

if (baseUrl) {
  process.env.AUTH0_BASE_URL = baseUrl
}

export const auth0 = new Auth0Client({
  signInReturnToPath: '/console',
})
