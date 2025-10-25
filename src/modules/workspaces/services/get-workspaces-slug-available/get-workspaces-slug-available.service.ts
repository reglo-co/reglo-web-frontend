import { Result } from '@/modules/common/helpers'

export async function getWorkspacesSlugAvailable(
  slug: string
): Promise<Result<{ available: boolean }, Error>> {
  try {
    const response = await fetch(`/api/workspaces/slug/available/${slug}`)

    if (!response.ok) {
      return Result.failure(new Error(`HTTP error! status: ${response.status}`))
    }

    const data = await response.json()

    return Result.success(data)
  } catch (error) {
    return Result.failure(
      error instanceof Error ? error : new Error('Unknown error occurred')
    )
  }
}
