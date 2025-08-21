import { NextResponse } from 'next/server'

export async function GET(_req: Request, ctx: { params: { tenant: string } }) {
  return NextResponse.json({
    ok: true,
    tenant: ctx.params.tenant,
    ts: Date.now(),
  })
}
