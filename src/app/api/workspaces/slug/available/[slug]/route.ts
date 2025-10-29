import { Response } from '@/modules/common/helpers'
import { FirebaseCollection } from '@/modules/common/lib/firebase'
import { NextRequest } from 'next/server'

export async function GET(
  _: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      slug: string
    }>
  }
) {
  const slug = (await params).slug

  const workspacesCollection = new FirebaseCollection('workspaces')

  const workspaces = await workspacesCollection.query
    .equal('slug', slug)
    .build()

  if (workspaces.length > 0) {
    return Response.ok({ available: false })
  }

  return Response.ok({ available: true })
}
