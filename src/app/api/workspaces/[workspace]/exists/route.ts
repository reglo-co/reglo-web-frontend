import { NextResponse } from 'next/server'

type Params = {
  params: Promise<{ workspace: string }>
}

export async function GET(_request: Request, { params }: Params) {
  const { workspace } = await params

  if (workspace === 'reglo' || workspace === 'vibra') {
    return NextResponse.json({ exists: true })
  }

  return NextResponse.json({ exists: false })
}
