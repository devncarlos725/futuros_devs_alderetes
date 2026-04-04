import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ADMIN_SESSION_COOKIE } from '@/lib/admin-session-constants'
import { deriveAdminSessionTokenEdge } from '@/lib/admin-session-edge'

export async function middleware(request: NextRequest) {
  const secret = process.env.ADMIN_DASHBOARD_SECRET
  if (!secret) {
    return new NextResponse(
      'Configuración incompleta: falta ADMIN_DASHBOARD_SECRET en el servidor.',
      { status: 503 },
    )
  }

  const expected = await deriveAdminSessionTokenEdge(secret)
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value

  if (token !== expected) {
    const login = new URL('/admin/login', request.url)
    login.searchParams.set(
      'next',
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    )
    return NextResponse.redirect(login)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard', '/admin/dashboard/:path*'],
}
