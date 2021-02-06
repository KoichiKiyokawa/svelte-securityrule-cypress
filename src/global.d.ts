declare module '@roxi/routify/hmr' {
  export default function HMR(component: any, { target: HTMLElement }, id: string)
}

declare module 'firebase-auth-lite' {
  export default class Auth {
    constructor({ apiKey: string })
    authorizedRequest(input: RequestInfo, init?: RequestInit): Promise<Response>
    fetchProfile(): Promise<void>
    signIn(email: string, password: string): Promise<void>
    listen(cb: (user: any) => void): void
  }
}
