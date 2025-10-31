import { Response } from '@/modules/common/helpers'
import { FirebaseCollection } from '@/modules/common/lib/firebase'
import { auth } from '@clerk/nextjs/server'

export async function POST(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return Response.unauthorized('Not authenticated')
  }

  const { name, slug, plan, collaborators } = await request.json()

  const organizationsCollection = new FirebaseCollection('organizations')
  const usersOrganizationsCollection = new FirebaseCollection(
    'users_organizations'
  )

  const organizationId = await organizationsCollection.create({
    name,
    slug,
    plan,
    collaborators,
    creator: userId,
  })

  if (!organizationId) {
    return Response.internalServerError('Failed to create organization')
  }

  await usersOrganizationsCollection.create({
    userId,
    organizationId: organizationId,
  })

  return Response.created({ slug })
}
