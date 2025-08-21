import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    {
      user: {
        id: '1',
        email: 'teste@teste.com',
        name: 'Teste',
        avatar: 'https://picsum.photos/300/300',
      },
    },
    { status: 200 }
  )
}
