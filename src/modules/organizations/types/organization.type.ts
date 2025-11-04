import { PlanNames } from '@/modules/plans/types'

export interface Organization {
  id: string
  name: string
  slug: string
  plan: PlanNames
  ownerEmail: string
  createdAt: string
  updatedAt: string
}
