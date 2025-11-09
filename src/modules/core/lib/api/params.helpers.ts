import { ApiResponse } from '@core/entities'
import { RouteContext } from './types'

type ParamValidationResult<T extends Record<string, string>> =
  | { success: true; params: T }
  | { success: false; response: Response }

export async function validateRouteParams<T extends Record<string, string>>(
  context: RouteContext,
  requiredParams: (keyof T)[]
): Promise<ParamValidationResult<T>> {
  if (!context.params) {
    return {
      success: false,
      response: ApiResponse.badRequest('Missing parameters'),
    }
  }

  const params = await context.params
  const validatedParams: Partial<T> = {}

  for (const paramName of requiredParams) {
    const value = params[paramName as string]

    if (!value || typeof value !== 'string') {
      return {
        success: false,
        response: ApiResponse.badRequest(`Invalid ${String(paramName)} parameter`),
      }
    }

    validatedParams[paramName] = value as T[keyof T]
  }

  return {
    success: true,
    params: validatedParams as T,
  }
}

export async function getSingleParam(
  context: RouteContext,
  paramName: string
): Promise<
  { success: true; value: string } | { success: false; response: Response }
> {
  if (!context.params) {
    return {
      success: false,
      response: ApiResponse.badRequest(`Missing ${paramName} parameter`),
    }
  }

  const params = await context.params
  const value = params[paramName]

  if (!value || typeof value !== 'string') {
    return {
      success: false,
      response: ApiResponse.badRequest(`Invalid ${paramName} parameter`),
    }
  }

  return { success: true, value }
}

