import { Response } from '@/modules/common/helpers'
import { FirebaseCollection } from '@/modules/common/lib/firebase'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return Response.unauthorized('Not authenticated')
    }

    const usersOrganizationsCollection = new FirebaseCollection(
      'users_organizations'
    )
    const organizationsCollection = new FirebaseCollection('organizations')

    const usersOrganizations = await usersOrganizationsCollection.query
      .equal('userId', userId)
      .build()

    const organizationIds = usersOrganizations.map(
      (userOrganization) => userOrganization.organizationId
    )

    if (organizationIds.length === 0) {
      return Response.ok([])
    }

    const organizations = await organizationsCollection.query
      .in('id', organizationIds)
      .build()

    return Response.ok(organizations)
  } catch (error) {
    console.error('GET /users/organizations/list error:', error)
    return Response.internalServerError('Internal Server Error')
  }
}
