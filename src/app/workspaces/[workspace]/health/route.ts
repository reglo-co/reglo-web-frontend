// app/(area-logada)/sites/[workspace]/health/route.ts
import { NextResponse } from 'next/server'

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ workspace: string }> }
) {
  const { workspace } = await ctx.params
  return NextResponse.json({ ok: true, workspace, ts: Date.now() })
}
