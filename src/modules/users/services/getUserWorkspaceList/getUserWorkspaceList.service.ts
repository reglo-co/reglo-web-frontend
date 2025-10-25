import { Result } from '@/modules/common/helpers/result.types'

export interface UserWorkspace {
  id: string
  userId: string
  workspaceId: string
}

export async function getUserWorkspaceList(): Promise<
  Result<UserWorkspace[], Error>
> {
  try {
    const response = await fetch('/api/users/workspaces/list')

    if (!response.ok) {
      return Result.failure(new Error(`HTTP error! status: ${response.status}`))
    }

    const data = await response.json()

    // Verifica se a resposta tem a estrutura esperada
    if (!Array.isArray(data)) {
      return Result.failure(
        new Error('Invalid response format: expected array')
      )
    }

    // Valida se cada item tem as propriedades necessárias
    const workspaces: UserWorkspace[] = data.map((item: UserWorkspace) => {
      if (!item.id || !item.userId || !item.workspaceId) {
        throw new Error('Invalid workspace item: missing required properties')
      }

      return {
        id: item.id,
        userId: item.userId,
        workspaceId: item.workspaceId,
      }
    })

    return Result.success(workspaces)
  } catch (error) {
    return Result.failure(
      error instanceof Error ? error : new Error('Unknown error occurred')
    )
  }
}
