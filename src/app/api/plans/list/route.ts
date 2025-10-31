import { Response } from '@/modules/common/helpers'
import { FirebaseCollection } from '@/modules/common/lib/firebase/firebase-collection'

export async function GET() {
  const plansCollection = new FirebaseCollection('plans')

  const plans = await plansCollection.query.build()

  return Response.ok(plans)
}
