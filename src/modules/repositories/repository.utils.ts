import { FirebaseCollection } from '@lib/firebase'
import { FIRESTORE_IN_LIMIT } from './repository.constants'

export const normalizeEmail = (email: string): string => email.toLowerCase().trim()

export const getCurrentTimestamp = (): string => new Date().toISOString()

export const chunkArray = <T>(array: T[], size: number = FIRESTORE_IN_LIMIT): T[][] => {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

export const queryInChunks = async <T>(
  collection: FirebaseCollection,
  field: string,
  values: string[],
  additionalFilters?: Record<string, unknown>
): Promise<T[]> => {
  if (values.length === 0) return []

  const chunks = chunkArray(values)
  const results: T[] = []

  for (const chunk of chunks) {
    let query = collection.query

    if (additionalFilters) {
      for (const [key, value] of Object.entries(additionalFilters)) {
        query = query.equal(key, value)
      }
    }

    const result = await query.in(field, chunk).build()
    results.push(...(result as T[]))
  }

  return results
}

export const deduplicateByKey = <T>(items: T[], keyFn: (item: T) => string): T[] => {
  const seen = new Set<string>()
  return items.filter((item) => {
    const key = keyFn(item)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

