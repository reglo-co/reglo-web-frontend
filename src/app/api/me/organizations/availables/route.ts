import { Response } from '@/modules/common/helpers'
import { api } from '@/modules/common/helpers/api'
import { OrganizationCollection } from '@/modules/organizations/types'
import { PlanCollection } from '@/modules/plans/types'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return Response.unauthorized('Not authenticated')
  }

  const plans = await api.get<PlanCollection[]>('/plans/list')

  const organizationsCreated = await api.get<OrganizationCollection[]>(
    '/me/organizations/created'
  )

  if (!plans || !organizationsCreated) {
    return Response.internalServerError('Internal Server Error')
  }

  const usedByPlan = organizationsCreated.reduce<Record<string, number>>(
    (acc, org) => {
      const planId = org.plan
      acc[planId] = (acc[planId] || 0) + 1
      return acc
    },
    {}
  )

  const availableByPlan = plans.map((plan) => {
    const used = usedByPlan[plan.id] || 0
    const remaining = Math.max(0, plan.organizationLimit - used)

    return {
      plan: plan.id,
      organizationsRemaining: remaining,
      workspaceLimit: plan.workspaceLimit,
      priceMonthly: plan.priceMonthly,
      priceYearly: plan.priceYearly,
      collaboratorLimit: plan.collaboratorLimit,
    }
  })

  return Response.ok(availableByPlan)
}
