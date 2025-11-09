import { Result } from '@core/entities'

export type ServiceError = {
  message: string
  context: string
  originalError?: unknown
  statusCode?: number
}

export class ServiceLogger {
  static error(
    context: string,
    error: unknown,
    additionalInfo?: Record<string, unknown>
  ): void {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const logData = {
      context,
      error: errorMessage,
      timestamp: new Date().toISOString(),
      ...additionalInfo,
    }

    console.error(`[Service Error]`, logData)
  }

  static warn(
    context: string,
    message: string,
    additionalInfo?: Record<string, unknown>
  ): void {
    const logData = {
      context,
      message,
      timestamp: new Date().toISOString(),
      ...additionalInfo,
    }

    console.warn(`[Service Warning]`, logData)
  }

  static info(
    context: string,
    message: string,
    additionalInfo?: Record<string, unknown>
  ): void {
    const logData = {
      context,
      message,
      timestamp: new Date().toISOString(),
      ...additionalInfo,
    }

    console.info(`[Service Info]`, logData)
  }
}

export function formatServiceError(
  serviceName: string,
  error: unknown
): string {
  const errorMessage =
    error instanceof Error ? error.message : 'Unknown error occurred'
  return `[${serviceName}] ${errorMessage}`
}

export function createServiceError(
  serviceName: string,
  error: unknown,
  statusCode?: number
): ServiceError {
  return {
    message: formatServiceError(serviceName, error),
    context: serviceName,
    originalError: error,
    statusCode,
  }
}

export async function executeService<T>(
  serviceName: string,
  operation: () => Promise<T>,
  options?: {
    fallback?: T
    shouldLogError?: boolean
  }
): Promise<Result<T>> {
  const { fallback, shouldLogError = true } = options || {}

  try {
    const data = await operation()
    return Result.success(data)
  } catch (error) {
    if (shouldLogError) {
      ServiceLogger.error(serviceName, error)
    }

    if (fallback !== undefined) {
      ServiceLogger.warn(serviceName, 'Using fallback value after error')
      return Result.success(fallback)
    }

    const serviceError = createServiceError(serviceName, error)
    return Result.failure(new Error(serviceError.message))
  }
}

export function extractHttpStatusFromError(error: unknown): number | undefined {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as { response?: { status?: number } }).response
    return response?.status
  }
  return undefined
}

export function isClientError(statusCode?: number): boolean {
  return statusCode !== undefined && statusCode >= 400 && statusCode < 500
}

export function isServerError(statusCode?: number): boolean {
  return statusCode !== undefined && statusCode >= 500 && statusCode < 600
}
