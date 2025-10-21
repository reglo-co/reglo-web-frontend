import { NextResponse } from 'next/server'

/**
 * Utilitário para criar respostas HTTP humanizadas
 */
export class Response {
  /**
   * 200 - OK
   */
  static ok<T>(data?: T, init?: ResponseInit) {
    return NextResponse.json(data, { status: 200, ...init })
  }

  /**
   * 201 - Created
   */
  static created<T>(data?: T, init?: ResponseInit) {
    return NextResponse.json(data, { status: 201, ...init })
  }

  /**
   * 204 - No Content
   */
  static noContent(init?: ResponseInit) {
    return new NextResponse(null, { status: 204, ...init })
  }

  /**
   * 400 - Bad Request
   */
  static badRequest(message?: string, init?: ResponseInit) {
    return NextResponse.json(
      { error: message || 'Bad Request' },
      { status: 400, ...init }
    )
  }

  /**
   * 401 - Unauthorized
   */
  static unauthorized(message?: string, init?: ResponseInit) {
    return NextResponse.json(
      { error: message || 'Unauthorized' },
      { status: 401, ...init }
    )
  }

  /**
   * 403 - Forbidden
   */
  static forbidden(message?: string, init?: ResponseInit) {
    return NextResponse.json(
      { error: message || 'Forbidden' },
      { status: 403, ...init }
    )
  }

  /**
   * 404 - Not Found
   */
  static notFound(message?: string, init?: ResponseInit) {
    return NextResponse.json(
      { error: message || 'Not Found' },
      { status: 404, ...init }
    )
  }

  /**
   * 409 - Conflict
   */
  static conflict(message?: string, init?: ResponseInit) {
    return NextResponse.json(
      { error: message || 'Conflict' },
      { status: 409, ...init }
    )
  }

  /**
   * 422 - Unprocessable Entity
   */
  static unprocessableEntity(message?: string, init?: ResponseInit) {
    return NextResponse.json(
      { error: message || 'Unprocessable Entity' },
      { status: 422, ...init }
    )
  }

  /**
   * 429 - Too Many Requests
   */
  static tooManyRequests(message?: string, init?: ResponseInit) {
    return NextResponse.json(
      { error: message || 'Too Many Requests' },
      { status: 429, ...init }
    )
  }

  /**
   * 500 - Internal Server Error
   */
  static internalServerError(message?: string, init?: ResponseInit) {
    return NextResponse.json(
      { error: message || 'Internal Server Error' },
      { status: 500, ...init }
    )
  }

  /**
   * 502 - Bad Gateway
   */
  static badGateway(message?: string, init?: ResponseInit) {
    return NextResponse.json(
      { error: message || 'Bad Gateway' },
      { status: 502, ...init }
    )
  }

  /**
   * 503 - Service Unavailable
   */
  static serviceUnavailable(message?: string, init?: ResponseInit) {
    return NextResponse.json(
      { error: message || 'Service Unavailable' },
      { status: 503, ...init }
    )
  }

  /**
   * 504 - Gateway Timeout
   */
  static gatewayTimeout(message?: string, init?: ResponseInit) {
    return NextResponse.json(
      { error: message || 'Gateway Timeout' },
      { status: 504, ...init }
    )
  }
}
