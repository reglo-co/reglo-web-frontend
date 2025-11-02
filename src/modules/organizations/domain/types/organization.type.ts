import { PlanNames } from '@/modules/plans/domain/types'

export interface Organization {
  id: string
  name: string
  slug: string
  plan: PlanNames
  ownerId: string
  createdAt: string
  updatedAt: string
}
