export type CollectionSubscription = {
  userId: string
  planId: string
}

export type CollectionPlan = {
  id: string
  priceMonthly: number
  priceYearly: number
  limits: {
    workspace: number
    usersPerWorkspace: number
  }
}

export type CollectionUserWorkspace = {
  userId: string
  workspaceId: string
}
