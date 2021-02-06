import Auth from 'firebase-auth-lite'
import { firebaseConfig } from '../env'

export const auth = new Auth({ apiKey: firebaseConfig.apiKey })

export class AuthService {
  static login(email: string, password: string): Promise<void> {
    return auth.signIn(email, password)
  }

  static logout(): Promise<void> {
    return auth.signOut()
  }

  static async checkAuth(): Promise<boolean> {
    try {
      await auth.fetchProfile()
      return true
    } catch {
      return false
    }
  }
}
