import { BaseRepository } from '../base/repository'
import type { User } from './entity'

export class UserRepository extends BaseRepository<User> {
  get collectionName() {
    return 'users'
  }
}
