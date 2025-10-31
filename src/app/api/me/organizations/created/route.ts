import { Response } from '@/modules/common/helpers'
import { FirebaseCollection } from '@/modules/common/lib/firebase'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return Response.unauthorized('Not authenticated')
  }

  const organizationsCollection = new FirebaseCollection('organizations')

  const organizations = await organizationsCollection.query
    .equal('creator', userId)
    .build()

  if (organizations.length === 0) {
    return Response.ok([])
  }

  return Response.ok(organizations)
}
