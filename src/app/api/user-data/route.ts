import { auth } from '@clerk/nextjs/server'
import { Response } from '@common/helpers'
import { getServerFirestore } from '@common/lib/firebase/get-server-firestore'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return Response.unauthorized('Not authenticated')
    }

    const db = getServerFirestore()
    const docRef = db.collection('users').doc(userId)
    const docSnap = await docRef.get()

    if (!docSnap.exists) {
      return Response.notFound('User not found')
    }

    const data = {
      id: docSnap.id,
      ...docSnap.data(),
    }

    return Response.ok(data)
  } catch (error) {
    console.error('GET /user-data error:', error)
    return Response.internalServerError('Internal Server Error')
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return Response.unauthorized()
    }

    const data = await req.json()
    const db = getServerFirestore()
    const docRef = db.collection('users').doc(userId)
    await docRef.set(data)

    return Response.ok({ success: true })
  } catch (error) {
    console.error('POST /user-data error:', error)
    return Response.internalServerError()
  }
}
