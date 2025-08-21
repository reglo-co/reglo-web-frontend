import { cookies } from 'next/headers'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL

export async function api(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies()

  const secure_url = new URL(url, APP_URL)
  const result = await fetch(secure_url, {
    ...options,
    credentials: 'include',
    headers: {
      cookie: cookieStore.toString(),
    },
  })
  return result.json()
}
