import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { emailVerificationStore, normalizeEmail } from '@/lib/emailVerificationStore'

const MAX_ATTEMPTS = 5

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const email = normalizeEmail(body?.email || '')
    const code = String(body?.code || '').trim()

    if (!email || !code) {
      return Response.json({ error: 'Correo y código son obligatorios.' }, { status: 400 })
    }

    const pending = emailVerificationStore.get(email)

    if (!pending) {
      return Response.json(
        { error: 'No hay una verificación pendiente para este correo.' },
        { status: 404 },
      )
    }

    if (Date.now() > pending.expiresAt) {
      emailVerificationStore.delete(email)
      return Response.json(
        { error: 'El código venció. Solicita uno nuevo.' },
        { status: 410 },
      )
    }

    if (pending.attempts >= MAX_ATTEMPTS) {
      emailVerificationStore.delete(email)
      return Response.json(
        { error: 'Superaste el número máximo de intentos. Solicita un nuevo código.' },
        { status: 429 },
      )
    }

    if (pending.code !== code) {
      pending.attempts += 1
      emailVerificationStore.set(email, pending)
      return Response.json({ error: 'Código incorrecto.' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    const existing = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
      limit: 1,
      depth: 0,
    })

    if (existing.totalDocs > 0) {
      emailVerificationStore.delete(email)
      return Response.json({ error: 'Ese correo ya está registrado.' }, { status: 409 })
    }

    const createdUser = await payload.create({
      collection: 'users',
      data: {
        email: pending.email,
        password: pending.password,
        role: pending.role,
      },
    })

    emailVerificationStore.delete(email)

    return Response.json({
      ok: true,
      user: {
        id: createdUser.id,
        email: createdUser.email,
        role: createdUser.role,
      },
    })
  } catch (error) {
    console.error('Error verificando código/registro:', error)
    return Response.json(
      { error: 'No se pudo completar el registro.' },
      { status: 500 },
    )
  }
}
