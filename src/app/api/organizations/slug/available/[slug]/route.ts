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

  const organizationsCollection = new FirebaseCollection('organizations')

  const organizations = await organizationsCollection.query
    .equal('slug', slug)
    .build()

  if (organizations.length > 0) {
    return Response.ok({ available: false })
  }

  return Response.ok({ available: true })
}




