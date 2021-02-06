import { Database } from 'firebase-firestore-lite'
import { auth } from '@/services/AuthService'
import { firebaseConfig } from '@/env'

const db = new Database({ projectId: firebaseConfig.projectId, auth })

export abstract class BaseRepository<T extends Object> {
  abstract get collectionName(): string

  async find(id: string): Promise<T> {
    return (db.ref(`${this.collectionName}/${id}`).get() as unknown) as T
  }

  async all(): Promise<T[]> {
    return (db
      .ref(this.collectionName)
      .list()
      .then((res) => res.documents) as unknown) as T[]
  }
}
