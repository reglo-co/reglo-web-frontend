export type PlanTypes = 'starter' | 'pro'

export type PlanAvailable = {
  planId: PlanTypes
  quantity: number
  usersPerWorkspace: number
}
