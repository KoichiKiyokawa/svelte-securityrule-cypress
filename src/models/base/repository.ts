import { Database } from 'firebase-firestore-lite'
import { auth } from '@/services/AuthService'
import { firebaseConfig } from '@/env'

const db = new Database({ projectId: firebaseConfig.projectId, auth })

export type WithID<T> = T & { id: string }

/**
 * Date型を再帰的にstringに変換する
 */
export type DateStringify<T extends Object> = {
  [K in keyof T]: T[K] extends Date
    ? string
    : T[K] extends Array<Date>
    ? string[]
    : T[K] extends Object
    ? DateStringify<T[K]>
    : T[K]
}

export abstract class BaseRepository<T extends Object> {
  abstract get collectionName(): string

  async find(id: string): Promise<WithID<T>> {
    const res = await db.ref(`${this.collectionName}/${id}`).get()
    const { __meta__, ...data } = res
    return { ...data, id: __meta__.id } as WithID<T>
  }

  async all(): Promise<WithID<T>[]> {
    const res = await db.ref(this.collectionName).list()
    return res.documents.map((doc) => {
      const { __meta__, ...data } = doc
      return { ...data, id: __meta__.id } as WithID<T>
    })
  }

  async create(data: T): Promise<WithID<T>> {
    const res = await db.ref(this.collectionName).add(data)
    if (res == null) throw Error('no id returned after create')
    return { ...data, id: res.id }
  }

  async update(id: string, data: T): Promise<WithID<T>> {
    await db.ref(`${this.collectionName}/${id}`).update(data, { updateMask: false })
    return { ...data, id }
  }
}
