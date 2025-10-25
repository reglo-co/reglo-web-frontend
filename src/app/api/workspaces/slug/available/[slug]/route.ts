import { Response } from '@/modules/common/helpers'
import { FirebaseCollection } from '@/modules/common/lib/firebase/firebase-collection'

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = await params

  const workspacesCollection = new FirebaseCollection('workspaces')

  const workspaces = await workspacesCollection.query
    .equal('slug', slug)
    .build()

  if (workspaces.length > 0) {
    return Response.ok({ available: false })
  }

  return Response.ok({ available: true })
}
