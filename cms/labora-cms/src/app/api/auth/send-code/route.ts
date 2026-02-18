import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Resend } from 'resend'

import {
  emailVerificationStore,
  generate4DigitCode,
  normalizeEmail,
} from '@/lib/emailVerificationStore'

const CODE_TTL_MS = 10 * 60 * 1000
const RESEND_COOLDOWN_MS = 60 * 1000

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const email = normalizeEmail(body?.email || '')
    const password = String(body?.password || '')
    const firstName = String(body?.firstName || '').trim()
    const lastName = String(body?.lastName || '').trim()
    const role = body?.role === 'admin' ? 'admin' : 'user'

    if (!email || !password || !firstName || !lastName) {
      return Response.json(
        { error: 'Faltan campos obligatorios para enviar el código.' },
        { status: 400 },
      )
    }

    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { error: 'RESEND_API_KEY no está configurado en el CMS.' },
        { status: 500 },
      )
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
      return Response.json(
        { error: 'Ese correo ya está registrado.' },
        { status: 409 },
      )
    }

    const now = Date.now()
    const cached = emailVerificationStore.get(email)

    if (cached && now - cached.lastSentAt < RESEND_COOLDOWN_MS) {
      return Response.json(
        { error: 'Espera 60 segundos antes de solicitar otro código.' },
        { status: 429 },
      )
    }

    const code = generate4DigitCode()
    emailVerificationStore.set(email, {
      email,
      password,
      firstName,
      lastName,
      role,
      code,
      expiresAt: now + CODE_TTL_MS,
      attempts: 0,
      lastSentAt: now,
    })

    const resend = new Resend(process.env.RESEND_API_KEY)
    const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

    await resend.emails.send({
      from,
      to: [email],
      subject: 'Código de verificación - Bolsa Laboral LEAD UNI',
      html: `
        <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
          <h2>Verifica tu correo</h2>
          <p>Tu código de verificación es:</p>
          <p style="font-size: 32px; font-weight: 700; letter-spacing: 4px; margin: 16px 0;">${code}</p>
          <p>Este código vence en 10 minutos.</p>
        </div>
      `,
    })

    return Response.json({ ok: true, message: 'Código enviado al correo.' })
  } catch (error) {
    console.error('Error enviando código de verificación:', error)
    return Response.json(
      { error: 'No se pudo enviar el código de verificación.' },
      { status: 500 },
    )
  }
}
