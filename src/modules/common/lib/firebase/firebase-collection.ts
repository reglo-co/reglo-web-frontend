import { getServerFirestore } from '@/modules/common/lib/firebase'
import {
  CollectionReference,
  DocumentData,
  Query,
} from 'firebase-admin/firestore'

export type FirebaseCollectionName =
  | 'subscriptions'
  | 'plans'
  | 'workspaces_plans'
  | 'users_workspaces'

export class FirebaseCollection {
  private readonly collection: CollectionReference<DocumentData>
  public readonly query: FirebaseCollectionQuery

  constructor(collectionName: FirebaseCollectionName) {
    this.collection = getServerFirestore().collection(collectionName)
    this.query = new FirebaseCollectionQuery(this.collection)
  }

  async create(data: DocumentData) {
    const docRef = await this.collection.add(data)
    return docRef.id
  }

  async withId(id: string) {
    const docRef = this.collection.doc(id)
    const doc = await docRef.get()
    return doc.data()
  }

  async all() {
    const docs = await this.collection.get()
    return docs.docs.map((doc) => doc.data())
  }

  async update(id: string, data: DocumentData) {
    const docRef = this.collection.doc(id)
    await docRef.update(data)
  }

  async delete(id: string) {
    const docRef = this.collection.doc(id)
    await docRef.delete()
  }

  public async build() {
    const snapshot = await this.collection.get()
    return snapshot.docs.map((doc) => doc.data())
  }
}

class FirebaseCollectionQuery {
  private collection: CollectionReference<DocumentData> | Query<DocumentData>

  constructor(collection: CollectionReference<DocumentData>) {
    this.collection = collection
  }

  public equal(field: string, value: unknown) {
    this.collection = this.collection.where(field, '==', value)
    return this
  }

  public greaterThan(field: string, value: unknown) {
    this.collection = this.collection.where(field, '>', value)
    return this
  }

  public lessThan(field: string, value: unknown) {
    this.collection = this.collection.where(field, '<', value)
    return this
  }

  public greaterThanOrEqual(field: string, value: unknown) {
    this.collection = this.collection.where(field, '>=', value)
    return this
  }

  public lessThanOrEqual(field: string, value: unknown) {
    this.collection = this.collection.where(field, '<=', value)
    return this
  }

  public orderBy(field: string, direction: 'asc' | 'desc') {
    this.collection = this.collection.orderBy(field, direction)
    return this
  }

  public limit(limit: number) {
    this.collection = this.collection.limit(limit)
    return this
  }

  public in(field: string, values: unknown[]) {
    this.collection = this.collection.where(field, 'in', values)
    return this
  }

  public async build() {
    const snapshot = await this.collection.get()
    return snapshot.docs.map((doc) => doc.data())
  }
}
