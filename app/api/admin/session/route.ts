import { NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE } from '@/lib/admin-session-constants'
import { deriveAdminSessionToken } from '@/lib/admin-session-node'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 días

export async function POST(request: Request) {
  const secret = process.env.ADMIN_DASHBOARD_SECRET
  if (!secret) {
    return NextResponse.json(
      { error: 'El acceso administrativo no está configurado en el servidor.' },
      { status: 503 },
    )
  }

  let body: { password?: string }
  try {
    body = (await request.json()) as { password?: string }
  } catch {
    return NextResponse.json({ error: 'Cuerpo JSON inválido.' }, { status: 400 })
  }

  const password = body.password ?? ''
  if (password !== secret) {
    return NextResponse.json({ error: 'Contraseña incorrecta.' }, { status: 401 })
  }

  const token = deriveAdminSessionToken(secret)
  const res = NextResponse.json({ success: true })
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ success: true })
  res.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  })
  return res
}
