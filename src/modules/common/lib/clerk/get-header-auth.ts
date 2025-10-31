import { auth } from '@clerk/nextjs/server'

export async function getHeaderAuth() {
  const { getToken } = await auth()
  const token = await getToken()

  if (!token) {
    return undefined
  }

  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
}
