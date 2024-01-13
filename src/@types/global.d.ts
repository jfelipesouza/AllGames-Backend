// Declaração de variaveis globais para ter autocomplete

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_JWT_DECODE: string
      PORT: number
      EMAIL_JWT_DECODE: string
      EMAIL_USER: string
      EMAIL_PASS: string
      EMAIL_NO_REPLY: string
      FRONT_BASE_URL: string
      COMPANY_NAME: string
      SUPABASE_URL: string
      SUPABASE_KEY: string
      ORIGIN: string
    }
  }
}
