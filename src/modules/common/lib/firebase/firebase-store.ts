import { getServerFirestore } from '@common/lib/firebase'
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  OrderByDirection,
  Query,
  Timestamp,
  Transaction,
  WhereFilterOp,
  WriteBatch,
  WriteResult,
} from 'firebase-admin/firestore'
import { FirebaseError, fromFirebaseError } from './firebase-errors'
import { Result } from './result.types'

export interface QueryOptions {
  where?: Array<[string, WhereFilterOp, unknown]>
  orderBy?: Array<[string, OrderByDirection?]>
  limit?: number
  startAfter?: DocumentSnapshot
  endBefore?: DocumentSnapshot
}

export interface SetOptions {
  merge?: boolean
  mergeFields?: string[]
}

export class FirebaseStore {
  private store: FirebaseFirestore.Firestore

  constructor() {
    this.store = getServerFirestore()
  }

  /**
   * Cria um documento com ID específico
   */
  public async set(
    collection: string,
    docId: string,
    data: DocumentData,
    options?: SetOptions
  ): Promise<Result<WriteResult, FirebaseError>> {
    try {
      const docRef = this.store.collection(collection).doc(docId)

      let result: WriteResult
      if (options?.merge) {
        result = await docRef.set(data, { merge: true })
      } else if (options?.mergeFields) {
        result = await docRef.set(data, { mergeFields: options.mergeFields })
      } else {
        result = await docRef.set(data)
      }

      return Result.success(result)
    } catch (error) {
      return Result.failure(fromFirebaseError(error))
    }
  }

  /**
   * Cria um documento com ID automático
   */
  public async add(
    collection: string,
    data: DocumentData
  ): Promise<Result<DocumentReference, FirebaseError>> {
    try {
      const docRef = await this.store.collection(collection).add(data)
      return Result.success(docRef)
    } catch (error) {
      return Result.failure(fromFirebaseError(error))
    }
  }

  /**
   * Atualiza um documento existente
   */
  public async update(
    collection: string,
    docId: string,
    data: DocumentData
  ): Promise<Result<WriteResult, FirebaseError>> {
    try {
      const docRef = this.store.collection(collection).doc(docId)
      const result = await docRef.update(data)
      return Result.success(result)
    } catch (error) {
      return Result.failure(fromFirebaseError(error))
    }
  }

  /**
   * Busca um documento específico
   */
  public async get(
    collection: string,
    docId: string
  ): Promise<Result<DocumentData | null, FirebaseError>> {
    try {
      const docRef = this.store.collection(collection).doc(docId)
      const docSnap = await docRef.get()

      if (!docSnap.exists) {
        return Result.success(null)
      }

      const data = {
        id: docSnap.id,
        ...docSnap.data(),
      }

      return Result.success(data)
    } catch (error) {
      return Result.failure(fromFirebaseError(error))
    }
  }

  /**
   * Busca um documento e retorna o DocumentSnapshot completo
   */
  public async getSnapshot(
    collection: string,
    docId: string
  ): Promise<Result<DocumentSnapshot | null, FirebaseError>> {
    try {
      const docRef = this.store.collection(collection).doc(docId)
      const docSnap = await docRef.get()

      if (!docSnap.exists) {
        return Result.success(null)
      }
      return Result.success(docSnap)
    } catch (error) {
      return Result.failure(fromFirebaseError(error))
    }
  }

  /**
   * Busca todos os documentos de uma coleção
   */
  public async getAll(
    collection: string
  ): Promise<Result<DocumentData[], FirebaseError>> {
    try {
      const querySnapshot = await this.store.collection(collection).get()
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      return Result.success(documents)
    } catch (error) {
      return Result.failure(fromFirebaseError(error))
    }
  }

  /**
   * Executa uma consulta com filtros e ordenação
   */
  public async query(
    collection: string,
    options: QueryOptions
  ): Promise<Result<DocumentData[], FirebaseError>> {
    try {
      let query: Query = this.store.collection(collection)

      // Aplicar filtros where
      if (options.where) {
        options.where.forEach(([field, operator, value]) => {
          query = query.where(field, operator, value)
        })
      }

      // Aplicar ordenação
      if (options.orderBy) {
        options.orderBy.forEach(([field, direction = 'asc']) => {
          query = query.orderBy(field, direction)
        })
      }

      // Aplicar limite
      if (options.limit) {
        query = query.limit(options.limit)
      }

      // Aplicar paginação
      if (options.startAfter) {
        query = query.startAfter(options.startAfter)
      }

      if (options.endBefore) {
        query = query.endBefore(options.endBefore)
      }

      const querySnapshot = await query.get()
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      return Result.success(documents)
    } catch (error) {
      return Result.failure(fromFirebaseError(error))
    }
  }

  /**
   * Deleta um documento
   */
  public async delete(
    collection: string,
    docId: string
  ): Promise<Result<WriteResult, FirebaseError>> {
    try {
      const docRef = this.store.collection(collection).doc(docId)
      const result = await docRef.delete()
      return Result.success(result)
    } catch (error) {
      return Result.failure(fromFirebaseError(error))
    }
  }

  /**
   * Verifica se um documento existe
   */
  public async exists(
    collection: string,
    docId: string
  ): Promise<Result<boolean, FirebaseError>> {
    try {
      const docRef = this.store.collection(collection).doc(docId)
      const docSnap = await docRef.get()
      return Result.success(docSnap.exists)
    } catch (error) {
      return Result.failure(fromFirebaseError(error))
    }
  }

  /**
   * Cria um batch para operações em lote
   */
  public createBatch(): WriteBatch {
    return this.store.batch()
  }

  /**
   * Executa operações em lote
   */
  public async executeBatch(
    batch: WriteBatch
  ): Promise<Result<WriteResult[], FirebaseError>> {
    try {
      const results = await batch.commit()
      return Result.success(results)
    } catch (error) {
      return Result.failure(fromFirebaseError(error))
    }
  }

  /**
   * Executa uma transação
   */
  public async runTransaction<T>(
    updateFunction: (transaction: Transaction) => Promise<T>
  ): Promise<Result<T, FirebaseError>> {
    try {
      const result = await this.store.runTransaction(updateFunction)
      return Result.success(result)
    } catch (error) {
      return Result.failure(fromFirebaseError(error))
    }
  }

  /**
   * Cria um timestamp do Firebase
   */
  public createTimestamp(): Timestamp {
    return Timestamp.now()
  }

  /**
   * Converte timestamp para Date
   */
  public timestampToDate(timestamp: Timestamp): Date {
    return timestamp.toDate()
  }

  /**
   * Converte Date para timestamp
   */
  public dateToTimestamp(date: Date): Timestamp {
    return Timestamp.fromDate(date)
  }

  /**
   * Obtém uma referência para um documento
   */
  public getDocRef(collection: string, docId: string): DocumentReference {
    return this.store.collection(collection).doc(docId)
  }

  /**
   * Obtém uma referência para uma coleção
   */
  public getCollectionRef(collection: string) {
    return this.store.collection(collection)
  }
}
