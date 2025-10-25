import { Response } from '@/modules/common/helpers'
import { FirebaseCollection } from '@/modules/common/lib/firebase'
import { auth } from '@clerk/nextjs/server'

export async function POST(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return Response.unauthorized('Not authenticated')
  }

  const { name, slug, plan, collaborators } = await request.json()

  const workspacesCollection = new FirebaseCollection('workspaces')
  const usersWorkspacesCollection = new FirebaseCollection('users_workspaces')

  const workspaceId = await workspacesCollection.create({
    name,
    slug,
    plan,
    collaborators,
    userId,
  })

  if (!workspaceId) {
    return Response.internalServerError('Failed to create workspace')
  }

  await usersWorkspacesCollection.create({
    userId,
    workspaceId: workspaceId,
  })

  return Response.created({ slug })
}
