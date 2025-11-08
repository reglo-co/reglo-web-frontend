import { api } from '@lib/api'

export type Auth0UserLite = {
  email: string
  name: string
  avatarUrl?: string
}

type Response = {
  users: Auth0UserLite[]
}

export async function getAuth0UsersByEmailService(
  emails: string[]
): Promise<Auth0UserLite[]> {
  if (!emails.length) return []
  try {
    const res = await api.get<Response>('users/by-email', {
      searchParams: {
        emails: emails.join(','),
      },
    })
    return res.users || []
  } catch {
    return []
  }
}
