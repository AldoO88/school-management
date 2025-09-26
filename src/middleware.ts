// src/middleware.ts
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// Define las rutas que son públicas (accesibles sin iniciar sesión)
const publicPages = ['/', '/login'];

// Define las rutas que son solo para usuarios no autenticados (no deben verlas si ya iniciaron sesión)
const authPages = ['/login', '/'];

export default function middleware(req: NextRequest) {
  // Extrae el idioma y la ruta de la URL
  // ej: /es/dashboard -> locale = 'es', pathname = '/dashboard'
  const pathname = req.nextUrl.pathname.replace(/^\/(es|en)/, '') || '/';
  const locale = req.nextUrl.pathname.split('/')[1] || 'es';
  
  const authToken = req.cookies.get('authToken')?.value;

  // --- Lógica de Protección ---

  // 1. Si el usuario está logueado
  if (authToken) {
    // Y está intentando acceder a una página de autenticación (como /login)
    if (authPages.includes(pathname)) {
      // Redirígelo al dashboard
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
    }
  }

  // 2. Si el usuario NO está logueado
  if (!authToken) {
    // Y está intentando acceder a una ruta que NO es pública
    const isProtectedRoute = !publicPages.includes(pathname);
    if (isProtectedRoute) {
      // Redirígelo al login
      return NextResponse.redirect(new URL(`/${locale}/`, req.url));
    }
  }

  // 3. Si no se necesita ninguna redirección, simplemente maneja el idioma
  return createIntlMiddleware({
    locales: ['es', 'en'],
    defaultLocale: 'es',
  })(req);
}

export const config = {
  // Rutas a las que se aplica este middleware
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};