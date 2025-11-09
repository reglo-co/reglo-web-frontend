export type RouteContext = {
  params?: Promise<Record<string, string | string[]>>
}

export type Auth0User = {
  sub?: string
  email?: string
  name?: string
}

export type Auth0Session = {
  user?: Auth0User
}

export type SessionData = {
  userEmail: string
  userId: string
  userName: string
}

export type RouteParams<T extends Record<string, string>> = T

export type ApiRouteHandler<TContext = RouteContext> = (
  req: Request,
  context: TContext
) => Promise<Response> | Response

export type SimpleApiRouteHandler = () => Promise<Response> | Response

