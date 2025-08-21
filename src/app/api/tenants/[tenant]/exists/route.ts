import { NextResponse } from 'next/server'

type Params = {
  params: { tenant: string }
}

export async function GET(_request: Request, { params }: Params) {
  const { tenant } = await params

  if (tenant === 'nodal' || tenant === 'vibra' || tenant === 'mesainc') {
    return NextResponse.json({ exists: true })
  }

  return NextResponse.json({ exists: false })
}
