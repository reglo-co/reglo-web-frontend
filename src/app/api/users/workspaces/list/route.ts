import { Response } from '@/modules/common/helpers'
import { getServerFirestore } from '@/modules/common/lib/firebase/get-server-firestore'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return Response.unauthorized('Not authenticated')
    }

    const db = getServerFirestore()
    const querySnapshot = await db
      .collection('users_workspaces')
      .where('userId', '==', userId)
      .get()

    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return Response.ok(documents)
  } catch (error) {
    console.error('GET /users/workspaces/list error:', error)
    return Response.internalServerError('Internal Server Error')
  }
}
