'use server'

import { api } from '@/lib/api'
import type { WorkspaceMinimal } from '@/modules/workspaces/typings'

export async function getWorkspaceUserListAction(): Promise<
  WorkspaceMinimal[]
> {
  const response = await api('/api/workspaces/user/list')

  if (response.error) {
    return []
  }

  return response.list
}
