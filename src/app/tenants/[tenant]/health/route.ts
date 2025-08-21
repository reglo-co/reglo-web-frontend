// app/(area-logada)/sites/[tenant]/health/route.ts
import { NextResponse } from 'next/server'

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ tenant: string }> }
) {
  const { tenant } = await ctx.params
  return NextResponse.json({ ok: true, tenant, ts: Date.now() })
}
