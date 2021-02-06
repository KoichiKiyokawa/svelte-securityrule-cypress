import Auth from 'firebase-auth-lite'
import { firebaseConfig } from '../env'

export const auth = new Auth(firebaseConfig.apiKey)

export class AuthService {
  static login(email: string, password: string): Promise<void> {
    return auth.signIn(email, password)
  }
}
