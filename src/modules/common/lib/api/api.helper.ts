import type { Options } from 'ky'
import ky from 'ky'

export type API_ENDPOINTS =
  | 'organizations/create'
  | `organizations/slug/available/${string}`
  | `organizations/${string}`
  | 'me/plans/availables'
  | 'me/organizations/created'
  | 'me/organizations/availables'
  | `me/organizations/access/${string}`

const prefixUrl = process.env.NEXT_PUBLIC_API_URL

let serverCookieHeaderProvider: (() => Promise<string | undefined>) | null =
  null

export function setServerCookieHeaderProvider(
  provider: () => Promise<string | undefined>
) {
  serverCookieHeaderProvider = provider
}

const kyInstance = ky.create({
  prefixUrl,
  hooks: {
    beforeRequest: [
      async (request) => {
        if (typeof window !== 'undefined') return
        let cookieHeader: string | undefined
        if (serverCookieHeaderProvider) {
          cookieHeader = await serverCookieHeaderProvider()
        } else {
          try {
            const { cookies } = await import('next/headers')
            const store = await cookies()
            const all = store.getAll()
            cookieHeader = all.length
              ? all
                  .map(
                    (c: { name: string; value: string }) =>
                      `${c.name}=${c.value}`
                  )
                  .join('; ')
              : undefined
          } catch {
            // ignore if next/headers is not available in this context
          }
        }
        if (!cookieHeader) return
        request.headers.set('cookie', cookieHeader)
      },
    ],
  },
})

export async function apiGet<TResponse>(
  endpoint: API_ENDPOINTS,
  options?: Options
) {
  return kyInstance.get(endpoint, options).json<TResponse>()
}

export async function apiPost<TResponse, TBody = unknown>(
  endpoint: API_ENDPOINTS,
  body?: TBody,
  options?: Options
) {
  return kyInstance.post(endpoint, { ...options, json: body }).json<TResponse>()
}

export async function apiPut<TResponse, TBody = unknown>(
  endpoint: API_ENDPOINTS,
  body?: TBody,
  options?: Options
) {
  return kyInstance.put(endpoint, { ...options, json: body }).json<TResponse>()
}

export async function apiPatch<TResponse, TBody = unknown>(
  endpoint: API_ENDPOINTS,
  body?: TBody,
  options?: Options
) {
  return kyInstance
    .patch(endpoint, { ...options, json: body })
    .json<TResponse>()
}

export async function apiDelete<TResponse>(
  endpoint: API_ENDPOINTS,
  options?: Options
) {
  return kyInstance.delete(endpoint, options).json<TResponse>()
}
