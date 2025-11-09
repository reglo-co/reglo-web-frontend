import { ApiResponse } from '@core/entities'
import { auth0 } from '@lib/auth0'
import { Auth0Session, SessionData, Auth0User } from './types'

export async function getSessionData(): Promise<
  { success: true; data: SessionData } | { success: false; response: Response }
> {
  const session = (await auth0.getSession()) as Auth0Session | null

  const userEmail = session?.user?.email
  const userId = session?.user?.sub
  const userName = session?.user?.name

  if (!userEmail || !userId) {
    return {
      success: false,
      response: ApiResponse.unauthorized('Unauthorized'),
    }
  }

  return {
    success: true,
    data: {
      userEmail,
      userId,
      userName: userName ?? userEmail,
    },
  }
}

export function getActorData(session: Auth0Session | null, userEmail?: string) {
  const actorId = session?.user?.sub ?? userEmail ?? 'unknown'
  const actorName = session?.user?.name ?? userEmail ?? 'unknown'

  return { actorId, actorName }
}

