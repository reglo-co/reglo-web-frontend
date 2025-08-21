'use server'

import { api } from '@/lib/api'
import type { ProjectMinimal } from '@/modules/project/typings'

export async function getProjectUserListAction(): Promise<ProjectMinimal[]> {
  const response = await api('/api/projects/user/list')

  if (response.error) {
    return []
  }

  return response.list
}
