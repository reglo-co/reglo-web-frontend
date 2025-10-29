import { Response } from '@/modules/common/helpers'
import { auth } from '@clerk/nextjs/server'

import {
  CollectionPlan,
  CollectionSubscription,
  CollectionUserWorkspace,
  FirebaseCollection,
} from '@/modules/common/lib/firebase'

/**
 * Endpoint para buscar planos disponíveis do usuário
 * Retorna a quantidade de workspaces disponíveis para cada plano
 */
export async function GET() {
  // Verificar autenticação
  const { userId } = await auth()

  if (!userId) {
    return Response.unauthorized('Not authenticated')
  }

  // Inicializar coleções do Firebase
  const subscriptionsCollection = new FirebaseCollection('subscriptions')
  const usersWorkspacesCollection = new FirebaseCollection('users_workspaces')
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

    // Contar workspaces atuais do usuário
    const currentWorkspaceCount = await getCurrentWorkspaceCount(
      usersWorkspacesCollection,
      userId
    )

    // Calcular workspaces disponíveis para cada plano
    const availablePlans = calculateAvailableWorkspaces(
      userPlans,
      currentWorkspaceCount
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
 * Conta quantos workspaces o usuário já possui
 */
async function getCurrentWorkspaceCount(
  collection: FirebaseCollection,
  userId: string
): Promise<number> {
  const userWorkspaces = (await collection.query
    .equal('userId', userId)
    .build()) as CollectionUserWorkspace[]

  return userWorkspaces.length
}

/**
 * Calcula quantos workspaces estão disponíveis para cada plano
 */
function calculateAvailableWorkspaces(
  plans: CollectionPlan[],
  currentWorkspaceCount: number
) {
  const availablePlans = plans.map((plan) => {
    const maxWorkspaces = plan.limits.workspace
    const remainingWorkspaces = Math.max(
      0,
      maxWorkspaces - currentWorkspaceCount
    )

    return {
      planId: plan.id,
      quantity: remainingWorkspaces,
      usersPerWorkspace: plan.limits.usersPerWorkspace,
    }
  })

  return availablePlans.filter((plan) => plan.quantity > 0)
}
