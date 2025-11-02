import type { Options } from 'ky'
import ky from 'ky'

export type API_ENDPOINTS =
  | 'plans/list'
  | 'me/organizations/created'
  | 'me/organizations/availables'
  | 'users/organizations/list'
  | 'organizations/create'
  | `organizations/slug/available/${string}`
  | 'me/plans/availables'

const prefixUrl = process.env.NEXT_PUBLIC_API_URL

const kyInstance = ky.create({
  prefixUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [],
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
