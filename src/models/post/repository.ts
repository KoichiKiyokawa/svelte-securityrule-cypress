import { BaseRepository } from '../base/repository'
import { UserRepository } from '../user/repository'
import type { Post } from './entity'

export class PostRepository extends BaseRepository<Post> {
  get collectionName() {
    return `users/${this.userID}/posts`
  }

  constructor(private readonly userID: string) {
    super()
  }

  async create(data: Omit<Post, 'authorName'>) {
    const { name: authorName } = await new UserRepository().find(this.userID)
    return super.create({ ...data, authorName })
  }
}
