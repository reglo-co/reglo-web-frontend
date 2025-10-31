import { PlanTypes } from '@/modules/plans/types'

export type OrganizationCollection = {
  id: string
  name: string
  plan: PlanTypes
  slug: string
  userId: string
}

export type OrganizationAvailable = {
  plan: PlanTypes
  priceMonthly: number
  priceYearly: number
  workspaceLimit: number
  collaboratorLimit: number
  organizationsRemaining: number
}
