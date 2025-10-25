import { Response } from '@/modules/common/helpers'
import { FirebaseCollection } from '@/modules/common/lib/firebase'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return Response.unauthorized('Not authenticated')
    }

    const usersWorkspacesCollection = new FirebaseCollection('users_workspaces')
    const workspacesCollection = new FirebaseCollection('workspaces')

    const usersWorkspaces = await usersWorkspacesCollection.query
      .equal('userId', userId)
      .build()

    const workspaceIds = usersWorkspaces.map(
      (userWorkspace) => userWorkspace.workspaceId
    )

    const workspaces = await workspacesCollection.query
      .in('id', workspaceIds)
      .build()

    return Response.ok(workspaces)
  } catch (error) {
    console.error('GET /users/workspaces/list error:', error)
    return Response.internalServerError('Internal Server Error')
  }
}
