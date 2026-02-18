export type PendingRegistration = {
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'user' | 'admin'
  code: string
  expiresAt: number
  attempts: number
  lastSentAt: number
}

type Store = Map<string, PendingRegistration>

declare global {
  // eslint-disable-next-line no-var
  var __leadUniEmailVerificationStore: Store | undefined
}

const store: Store = globalThis.__leadUniEmailVerificationStore ?? new Map<string, PendingRegistration>()

globalThis.__leadUniEmailVerificationStore ??= store

export const emailVerificationStore = store

export const normalizeEmail = (email: string): string => email.trim().toLowerCase()

export const generate4DigitCode = (): string => {
  return String(Math.floor(1000 + Math.random() * 9000))
}
