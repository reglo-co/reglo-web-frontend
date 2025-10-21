import { Response } from '@/modules/common/helpers'
import { FirebaseStore } from '@/modules/common/lib/firebase'
import { auth } from '@clerk/nextjs/server'

const store = new FirebaseStore()

export async function GET() {
  try {
    const { userId } = await auth()

    console.log('userId', userId)

    if (!userId) {
      return Response.unauthorized('Not authenticated')
    }

    const result = await store.query('users_workspaces', {
      where: [['userId', '==', userId]],
    })

    if (result.ok) {
      return Response.ok(result.data)
    }

    return Response.internalServerError(result.error.message)
  } catch (error) {
    console.error('GET /users/workspaces/list error:', error)
    return Response.internalServerError('Internal Server Error')
  }
}
