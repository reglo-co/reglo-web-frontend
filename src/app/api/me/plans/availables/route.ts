import { Response } from '@/modules/common/helpers'
import { auth } from '@clerk/nextjs/server'

import {
  CollectionPlan,
  CollectionSubscription,
  CollectionUserOrganization,
  FirebaseCollection,
} from '@/modules/common/lib/firebase'

/**
 * Endpoint para buscar planos disponíveis do usuário
 * Retorna a quantidade de organizações disponíveis para cada plano
 */
export async function GET() {
  // Verificar autenticação
  const { userId } = await auth()

  if (!userId) {
    return Response.unauthorized('Not authenticated')
  }

  // Inicializar coleções do Firebase
  const subscriptionsCollection = new FirebaseCollection('subscriptions')
  const usersOrganizationsCollection = new FirebaseCollection(
    'users_organizations'
  )
  const plansCollection = new FirebaseCollection('plans')

  try {
    // Buscar assinaturas do usuário
    const userSubscriptions = await getUserSubscriptions(
      subscriptionsCollection,
      userId
    )

    // Se não há assinaturas, retornar lista vazia
    if (userSubscriptions.length === 0) {
      return Response.ok({
        data: [],
      })
    }

    // Buscar planos das assinaturas
    const userPlans = await getPlansFromSubscriptions(
      plansCollection,
      userSubscriptions
    )

    // Contar organizações atuais do usuário
    const currentOrganizationCount = await getCurrentOrganizationCount(
      usersOrganizationsCollection,
      userId
    )

    // Calcular organizações disponíveis para cada plano
    const availablePlans = calculateAvailableOrganizations(
      userPlans,
      currentOrganizationCount
    )

    return Response.ok({
      data: availablePlans,
    })
  } catch (error) {
    console.error('Erro ao buscar planos do usuário:', error)
    return Response.internalServerError('Internal Server Error')
  }
}

/**
 * Busca todas as assinaturas de um usuário
 */
async function getUserSubscriptions(
  collection: FirebaseCollection,
  userId: string
): Promise<CollectionSubscription[]> {
  return (await collection.query
    .equal('userId', userId)
    .build()) as CollectionSubscription[]
}

/**
 * Busca os planos baseados nas assinaturas
 */
async function getPlansFromSubscriptions(
  collection: FirebaseCollection,
  subscriptions: CollectionSubscription[]
): Promise<CollectionPlan[]> {
  const planIds = subscriptions.map((sub) => sub.planId)

  return (await collection.query.in('id', planIds).build()) as CollectionPlan[]
}

/**
 * Conta quantas organizações o usuário já possui
 */
async function getCurrentOrganizationCount(
  collection: FirebaseCollection,
  userId: string
): Promise<number> {
  const userOrganizations = (await collection.query
    .equal('userId', userId)
    .build()) as CollectionUserOrganization[]

  return userOrganizations.length
}

/**
 * Calcula quantas organizações estão disponíveis para cada plano
 */
function calculateAvailableOrganizations(
  plans: CollectionPlan[],
  currentOrganizationCount: number
) {
  const availablePlans = plans.map((plan) => {
    const maxOrganizations = plan.limits.organization
    const remainingOrganizations = Math.max(
      0,
      maxOrganizations - currentOrganizationCount
    )

    return {
      planId: plan.id,
      quantity: remainingOrganizations,
      usersPerOrganization: plan.limits.usersPerOrganization,
    }
  })

  return availablePlans.filter((plan) => plan.quantity > 0)
}
