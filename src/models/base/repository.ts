import { Database } from 'firebase-firestore-lite'
import { auth } from '@/services/AuthService'

const db = new Database({ projectId: 'sandbox', auth })

export abstract class BaseRepository<T extends Object> {
  abstract get collectionName(): string

  async find(id: string): Promise<T> {
    return (db.ref(`${this.collectionName}/${id}`).get() as unknown) as T
  }

  async all(): Promise<T[]> {
    return (db.ref(this.collectionName).get() as unknown) as T[]
  }
}
