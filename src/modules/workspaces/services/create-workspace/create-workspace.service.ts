import { Result } from '@/modules/common/helpers'

export interface CreateWorkspaceData {
  name: string
  slug: string
  plan: string
  collaborators: Array<{
    email: string
    role: string
  }>
}

export async function createWorkspace(
  data: CreateWorkspaceData
): Promise<Result<{ slug: string }, Error>> {
  try {
    const response = await fetch('/api/workspaces/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      return Result.failure(new Error(`HTTP error! status: ${response.status}`))
    }

    const result = await response.json()

    return Result.success(result)
  } catch (error) {
    return Result.failure(
      error instanceof Error ? error : new Error('Unknown error occurred')
    )
  }
}
