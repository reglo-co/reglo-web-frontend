import { Response } from '@/modules/common/helpers'
import { FirebaseCollection } from '@/modules/common/lib/firebase'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return Response.unauthorized('Not authenticated')
    }

    console.log('userId', userId)

    const usersWorkspacesCollection = new FirebaseCollection('users_workspaces')
    const workspacesCollection = new FirebaseCollection('workspaces')

    const usersWorkspaces = await usersWorkspacesCollection.query
      .equal('userId', userId)
      .build()

    console.log('usersWorkspaces', usersWorkspaces)

    const workspaceIds = usersWorkspaces.map(
      (userWorkspace) => userWorkspace.workspaceId
    )

    console.log('workspaceIds', workspaceIds)

    const workspaces = await workspacesCollection.query
      .in('id', workspaceIds)
      .build()

    console.log('workspaces', workspaces)

    return Response.ok(workspaces)
  } catch (error) {
    console.error('GET /users/workspaces/list error:', error)
    return Response.internalServerError('Internal Server Error')
  }
}
