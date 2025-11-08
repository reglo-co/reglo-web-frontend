import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    AUTH0_SECRET: z.string().min(1),
    AUTH0_DOMAIN: z.string().min(1),
    AUTH0_API_CLIENT_ID: z.string().min(1),
    AUTH0_API_CLIENT_SECRET: z.string().min(1),
    AUTH0_API_AUDIENCE: z.string().min(1),
    AUTH0_ISSUER_BASE_URL: z.string().url().optional(),
    AUTH0_BASE_URL: z.string().url().optional(),
    APP_BASE_URL: z.string().url().optional(),
    FIREBASE_PROJECT_ID: z.string().min(1),
    FIREBASE_CLIENT_EMAIL: z.string().email(),
    FIREBASE_PRIVATE_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_APP_ENV: z.enum(['development', 'test', 'production']),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_API_CLIENT_ID: process.env.AUTH0_API_CLIENT_ID,
    AUTH0_API_CLIENT_SECRET: process.env.AUTH0_API_CLIENT_SECRET,
    AUTH0_API_AUDIENCE: process.env.AUTH0_API_AUDIENCE,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    APP_BASE_URL: process.env.APP_BASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_ENV:
      process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV ?? 'development',
  },
})
