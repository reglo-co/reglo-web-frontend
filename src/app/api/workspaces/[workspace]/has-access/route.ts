import { NextResponse } from 'next/server'

type Params = {
  params: Promise<{ workspace: string }>
}

export async function GET(_request: Request, { params }: Params) {
  const { workspace } = await params

  if (
    workspace === 'reglo' ||
    workspace === 'vibra' ||
    workspace === 'mesainc'
  ) {
    return NextResponse.json({ hasAccess: true })
  }

  return NextResponse.json({ hasAccess: false })
}
