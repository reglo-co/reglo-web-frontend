import { ApiResponse } from '@core/entities'

export function handleApiError(error: unknown, context: string): Response {
  console.error(`[${context}]`, error)

  const errorMessage =
    error instanceof Error ? error.message : String(error)

  return ApiResponse.internalServerError(`[${context}] ${errorMessage}`)
}

export function tryCatchApiRoute<T>(
  handler: () => Promise<T>,
  context: string
): Promise<T | Response> {
  return handler().catch((error) => handleApiError(error, context))
}

