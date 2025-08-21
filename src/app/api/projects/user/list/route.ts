import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    {
      list: [
        {
          slug: 'mesainc',
          name: 'Mesainc',
          avatar: 'https://picsum.photos/300/301',
          plan: 'Free',
        },
        {
          slug: 'vibra',
          name: 'Vibra',
          avatar: 'https://picsum.photos/301/300',
          plan: 'Starter',
        },
        {
          slug: 'nodal',
          name: 'Reglo',
          avatar: 'https://picsum.photos/301/301',
          plan: 'Enterprise',
        },
      ],
    },
    { status: 200 }
  )
}
