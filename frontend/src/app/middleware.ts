// /app/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token') // Verifica o token nos cookies

  if (!token) {
    // Se não encontrar o token, redireciona para login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se o token existir, permite o acesso
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard'], // Aplica a proteção somente no dashboard
}
