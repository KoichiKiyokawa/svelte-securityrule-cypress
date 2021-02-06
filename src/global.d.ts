declare module '@roxi/routify/hmr' {
  export default function HMR(component: any, { target: HTMLElement }, id: string)
}

declare module 'firebase-auth-lite' {
  export default class Auth {
    constructor(apiKey: string)
    authorizedRequest(input: RequestInfo, init?: RequestInit): Promise<Response>
    signIn(email: string, password: string): Promise<void>
  }
}
