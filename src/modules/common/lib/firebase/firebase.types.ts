export type CollectionSubscription = {
  userId: string
  planId: string
}

export type CollectionPlan = {
  id: string
  priceMonthly: number
  priceYearly: number
  limits: {
    organization: number
    usersPerOrganization: number
  }
}

export type CollectionUserOrganization = {
  userId: string
  organizationId: string
}
