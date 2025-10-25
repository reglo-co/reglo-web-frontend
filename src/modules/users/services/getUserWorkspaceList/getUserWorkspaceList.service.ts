import { Result } from '@/modules/common/helpers/result.types'
import { CreateWorkspaceData } from '@/modules/workspaces/services'

export type Workspace = CreateWorkspaceData & {
  id: string
}

export async function getUserWorkspaceList(): Promise<
  Result<Workspace[], Error>
> {
  try {
    const response = await fetch('/api/users/workspaces/list')

    if (!response.ok) {
      return Result.failure(new Error(`HTTP error! status: ${response.status}`))
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
      return Result.failure(
        new Error('Invalid response format: expected array')
      )
    }

    return Result.success(data)
  } catch (error) {
    return Result.failure(
      error instanceof Error ? error : new Error('Unknown error occurred')
    )
  }
}
