import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from './api.helper'

export const api = {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  patch: apiPatch,
  delete: apiDelete,
}

export type { API_ENDPOINTS } from './api.helper'
