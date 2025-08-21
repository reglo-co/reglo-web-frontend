import { NextResponse } from 'next/server'

type Params = {
  params: Promise<{ tenant: string }>
}

export async function GET(_request: Request, { params }: Params) {
  const { tenant } = await params

  if (tenant === 'reglo' || tenant === 'vibra') {
    return NextResponse.json({ exists: true })
  }

  return NextResponse.json({ exists: false })
}
