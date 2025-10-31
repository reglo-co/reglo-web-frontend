export type PlanTypes = 'starter' | 'pro'

export type PlanAvailable = {
  planId: PlanTypes
  quantity: number
  usersPerOrganization: number
}

export type PlanCollection = {
  id: PlanTypes
  priceMonthly: number
  priceYearly: number
  workspaceLimit: number
  organizationLimit: number
  collaboratorLimit: number
}
