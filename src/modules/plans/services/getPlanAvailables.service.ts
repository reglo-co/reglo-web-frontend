import { Result } from '@/modules/common/helpers'
import { PlanAvailable } from '@/modules/plans/types'
import { api } from '@/modules/common/helpers/api'

export type GetPlanAvailablesResponse = Result<PlanAvailable[], Error>

export async function getPlanAvailables(): Promise<GetPlanAvailablesResponse> {
  try {
    const data = await api.get<PlanAvailable[]>('/me/plans/availables')

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
