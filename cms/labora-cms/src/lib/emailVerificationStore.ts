export type PendingVerification = {
  code: string
  expiresAt: number
  attempts: number
  lastSentAt: number
}

type Store = Map<string, PendingVerification>

declare global {
  // eslint-disable-next-line no-var
  var __leadUniEmailVerificationStore: Store | undefined
}

const store: Store = globalThis.__leadUniEmailVerificationStore ?? new Map<string, PendingVerification>()

globalThis.__leadUniEmailVerificationStore ??= store

export const emailVerificationStore = store

export const normalizeEmail = (email: string): string => email.trim().toLowerCase()

export const generate4DigitCode = (): string => {
  return String(Math.floor(1000 + Math.random() * 9000))
}
