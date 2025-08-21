'use server'

import { api } from '@/lib/api'
import type { UserMinimal } from '../typings'

export async function getUserMinimalAction(): Promise<UserMinimal | null> {
  const response = await api('/api/user/minimal')

  if (response.user.error) {
    return null
  }

  return response.user
}
