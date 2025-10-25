import { Result } from '@/modules/common/helpers'
import { PlanAvailable } from '@/modules/plans/types'

export type GetPlanAvailablesResponse = Result<PlanAvailable[], Error>

export async function getPlanAvailables(): Promise<GetPlanAvailablesResponse> {
  try {
    const response = await fetch('/api/me/plans/availables')

    if (!response.ok) {
      return Result.failure(new Error(`HTTP error! status: ${response.status}`))
    }

    const { data } = await response.json()

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
