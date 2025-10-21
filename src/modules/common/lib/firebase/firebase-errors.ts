/**
 * Tipos de erro específicos para operações do Firebase
 */

export enum FirebaseErrorType {
  DOCUMENT_NOT_FOUND = 'DOCUMENT_NOT_FOUND',
  DOCUMENT_ALREADY_EXISTS = 'DOCUMENT_ALREADY_EXISTS',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  INVALID_ARGUMENT = 'INVALID_ARGUMENT',
  UNAVAILABLE = 'UNAVAILABLE',
  DEADLINE_EXCEEDED = 'DEADLINE_EXCEEDED',
  RESOURCE_EXHAUSTED = 'RESOURCE_EXHAUSTED',
  INTERNAL = 'INTERNAL',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  UNKNOWN = 'UNKNOWN',
  NETWORK_ERROR = 'NETWORK_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  BATCH_ERROR = 'BATCH_ERROR',
  TRANSACTION_ERROR = 'TRANSACTION_ERROR',
}

export interface FirebaseError {
  type: FirebaseErrorType
  message: string
  code?: string
  details?: unknown
  timestamp: Date
}

/**
 * Cria um erro do Firebase
 */
export function createFirebaseError(
  type: FirebaseErrorType,
  message: string,
  code?: string,
  details?: unknown
): FirebaseError {
  return {
    type,
    message,
    code,
    details,
    timestamp: new Date(),
  }
}

/**
 * Converte um erro nativo do Firebase para nosso tipo de erro
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromFirebaseError(error: any): FirebaseError {
  const errorCode = error?.code || 'unknown'
  const errorMessage = error?.message || 'Erro desconhecido do Firebase'

  let type: FirebaseErrorType

  switch (errorCode) {
    case 'not-found':
      type = FirebaseErrorType.DOCUMENT_NOT_FOUND
      break
    case 'already-exists':
      type = FirebaseErrorType.DOCUMENT_ALREADY_EXISTS
      break
    case 'permission-denied':
      type = FirebaseErrorType.PERMISSION_DENIED
      break
    case 'invalid-argument':
      type = FirebaseErrorType.INVALID_ARGUMENT
      break
    case 'unavailable':
      type = FirebaseErrorType.UNAVAILABLE
      break
    case 'deadline-exceeded':
      type = FirebaseErrorType.DEADLINE_EXCEEDED
      break
    case 'resource-exhausted':
      type = FirebaseErrorType.RESOURCE_EXHAUSTED
      break
    case 'internal':
      type = FirebaseErrorType.INTERNAL
      break
    case 'unauthenticated':
      type = FirebaseErrorType.UNAUTHENTICATED
      break
    default:
      type = FirebaseErrorType.UNKNOWN
  }

  return createFirebaseError(type, errorMessage, errorCode, error)
}

/**
 * Cria erros específicos para diferentes operações
 */
export const FirebaseErrors = {
  documentNotFound: (collection: string, docId: string) =>
    createFirebaseError(
      FirebaseErrorType.DOCUMENT_NOT_FOUND,
      `Documento não encontrado: ${collection}/${docId}`,
      'not-found',
      { collection, docId }
    ),

  documentAlreadyExists: (collection: string, docId: string) =>
    createFirebaseError(
      FirebaseErrorType.DOCUMENT_ALREADY_EXISTS,
      `Documento já existe: ${collection}/${docId}`,
      'already-exists',
      { collection, docId }
    ),

  permissionDenied: (operation: string) =>
    createFirebaseError(
      FirebaseErrorType.PERMISSION_DENIED,
      `Permissão negada para operação: ${operation}`,
      'permission-denied',
      { operation }
    ),

  invalidArgument: (argument: string, value: unknown) =>
    createFirebaseError(
      FirebaseErrorType.INVALID_ARGUMENT,
      `Argumento inválido: ${argument}`,
      'invalid-argument',
      { argument, value }
    ),

  validationError: (field: string, message: string) =>
    createFirebaseError(
      FirebaseErrorType.VALIDATION_ERROR,
      `Erro de validação no campo '${field}': ${message}`,
      'validation-error',
      { field, message }
    ),

  batchError: (operation: string, error: unknown) =>
    createFirebaseError(
      FirebaseErrorType.BATCH_ERROR,
      `Erro em operação em lote: ${operation}`,
      'batch-error',
      { operation, originalError: error }
    ),

  transactionError: (operation: string, error: unknown) =>
    createFirebaseError(
      FirebaseErrorType.TRANSACTION_ERROR,
      `Erro em transação: ${operation}`,
      'transaction-error',
      { operation, originalError: error }
    ),

  networkError: (operation: string) =>
    createFirebaseError(
      FirebaseErrorType.NETWORK_ERROR,
      `Erro de rede durante operação: ${operation}`,
      'network-error',
      { operation }
    ),
}
