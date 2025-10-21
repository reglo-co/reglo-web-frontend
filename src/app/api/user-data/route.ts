import { auth } from '@clerk/nextjs/server'
import { Response } from '@common/helpers'
import { FirebaseStore } from '@common/lib/firebase'

const store = new FirebaseStore()

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return Response.unauthorized('Not authenticated')
    }

    const result = await store.get('users', userId)

    if (result.ok) {
      return Response.ok(result.data)
    }

    return Response.internalServerError(result.error.message)
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
    const result = await store.set('users', userId, data)

    if (result.ok) {
      return Response.ok({ success: true })
    }

    return Response.internalServerError(result.error.message)
  } catch (error) {
    console.error('POST /user-data error:', error)
    return Response.internalServerError()
  }
}
