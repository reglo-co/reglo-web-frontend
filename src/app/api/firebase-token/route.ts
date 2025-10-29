import { auth } from '@clerk/nextjs/server'
import { getAuth } from 'firebase-admin/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Obtém informações do usuário autenticado no Clerk
    const { userId, sessionId, getToken } = await auth()

    if (!userId || !sessionId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Obtém o JWT do Clerk baseado no template criado (ex: "firebase")
    const clerkToken = await getToken({ template: 'firebase' })

    if (!clerkToken) {
      return NextResponse.json(
        { error: 'Failed to get Clerk token' },
        { status: 401 }
      )
    }

    // Cria o Custom Token do Firebase com o mesmo userId do Clerk
    const firebaseToken = await getAuth().createCustomToken(userId)

    return NextResponse.json({ firebaseToken })
  } catch (error) {
    console.error('Firebase token error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
