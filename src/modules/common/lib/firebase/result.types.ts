/**
 * Result Pattern para gerenciamento de erros
 * Fornece uma forma type-safe de lidar com operações que podem falhar
 */

export type ResultType<T, E = Error> = Success<T> | Failure<E>

export interface Success<T> {
  readonly success: true
  readonly data: T
}

export interface Failure<E> {
  readonly success: false
  readonly error: E
}

/**
 * Classe Result para gerenciamento de erros com API fluida
 */
export class Result<T, E = Error> {
  private readonly _success: boolean
  private readonly _data?: T
  private readonly _error?: E

  private constructor(success: boolean, data?: T, error?: E) {
    this._success = success
    this._data = data
    this._error = error
  }

  /**
   * Cria um Result de sucesso
   */
  static success<T>(data: T): Result<T, never> {
    return new Result(true, data)
  }

  /**
   * Cria um Result de falha
   */
  static failure<E>(error: E): Result<never, E> {
    return new Result<never, E>(false, undefined, error)
  }

  /**
   * Verifica se o Result é um sucesso
   */
  get ok(): boolean {
    return this._success
  }

  /**
   * Verifica se o Result é uma falha
   */
  get isFailure(): boolean {
    return !this._success
  }

  /**
   * Extrai os dados de um Result de sucesso
   */
  get data(): T {
    if (!this._success) {
      throw new Error('Cannot access data on a failed result')
    }
    return this._data!
  }

  /**
   * Extrai o erro de um Result de falha
   */
  get error(): E {
    if (this._success) {
      throw new Error('Cannot access error on a successful result')
    }
    return this._error!
  }

  /**
   * Extrai os dados de um Result de sucesso ou retorna um valor padrão
   */
  getDataOrDefault(defaultValue: T): T {
    return this._success ? this._data! : defaultValue
  }

  /**
   * Extrai os dados de um Result de sucesso ou lança o erro
   */
  getDataOrThrow(): T {
    if (this._success) {
      return this._data!
    }
    throw this._error
  }

  /**
   * Mapeia os dados de um Result de sucesso
   */
  map<U>(mapper: (data: T) => U): Result<U, E> {
    if (this._success) {
      return Result.success(mapper(this._data!))
    }
    return Result.failure(this._error!)
  }

  /**
   * Mapeia o erro de um Result de falha
   */
  mapError<F>(mapper: (error: E) => F): Result<T, F> {
    if (!this._success) {
      return Result.failure(mapper(this._error!))
    }
    return Result.success(this._data!)
  }

  /**
   * Executa uma função se o Result for um sucesso
   */
  onSuccess(callback: (data: T) => void): this {
    if (this._success) {
      callback(this._data!)
    }
    return this
  }

  /**
   * Executa uma função se o Result for uma falha
   */
  onFailure(callback: (error: E) => void): this {
    if (!this._success) {
      callback(this._error!)
    }
    return this
  }

  /**
   * Executa uma função se o Result for um sucesso, senão executa outra função
   */
  match<U>(onSuccess: (data: T) => U, onFailure: (error: E) => U): U {
    return this._success ? onSuccess(this._data!) : onFailure(this._error!)
  }

  /**
   * Converte para o tipo ResultType original
   */
  toResult(): ResultType<T, E> {
    return this._success
      ? { success: true, data: this._data! }
      : { success: false, error: this._error! }
  }
}

// Funções utilitárias para compatibilidade com a API anterior
/**
 * Cria um Result de sucesso
 */
export function success<T>(data: T): Success<T> {
  return {
    success: true,
    data,
  }
}

/**
 * Cria um Result de falha
 */
export function failure<E>(error: E): Failure<E> {
  return {
    success: false,
    error,
  }
}

/**
 * Verifica se o Result é um sucesso
 */
export function ok<T, E>(result: ResultType<T, E>): result is Success<T> {
  return result.success
}

/**
 * Verifica se o Result é uma falha
 */
export function isFailure<T, E>(
  result: ResultType<T, E>
): result is Failure<E> {
  return !result.success
}

/**
 * Extrai os dados de um Result de sucesso ou retorna um valor padrão
 */
export function getDataOrDefault<T, E>(
  result: ResultType<T, E>,
  defaultValue: T
): T {
  return ok(result) ? result.data : defaultValue
}

/**
 * Extrai os dados de um Result de sucesso ou lança o erro
 */
export function getDataOrThrow<T, E>(result: ResultType<T, E>): T {
  if (ok(result)) {
    return result.data
  }
  throw result.error
}

/**
 * Mapeia os dados de um Result de sucesso
 */
export function mapResult<T, U, E>(
  result: ResultType<T, E>,
  mapper: (data: T) => U
): ResultType<U, E> {
  if (ok(result)) {
    return success(mapper(result.data))
  }
  return result
}

/**
 * Mapeia o erro de um Result de falha
 */
export function mapError<T, E, F>(
  result: ResultType<T, E>,
  mapper: (error: E) => F
): ResultType<T, F> {
  if (isFailure(result)) {
    return failure(mapper(result.error))
  }
  return result
}

/**
 * Executa uma função se o Result for um sucesso
 */
export function onSuccess<T, E>(
  result: ResultType<T, E>,
  callback: (data: T) => void
): void {
  if (ok(result)) {
    callback(result.data)
  }
}

/**
 * Executa uma função se o Result for uma falha
 */
export function onFailure<T, E>(
  result: ResultType<T, E>,
  callback: (error: E) => void
): void {
  if (isFailure(result)) {
    callback(result.error)
  }
}
