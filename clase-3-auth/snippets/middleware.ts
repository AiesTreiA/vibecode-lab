// Archivo: middleware.ts (Ubicado en la raíz del proyecto)
// Protege rutas privadas de Next.js redirigiendo al login si no existe token de autenticación.

import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Definir rutas que requieren autenticación
  const protectedRoutes = ["/admin", "/dashboard", "/agendar", "/configuracion"];

  // 2. Verificar si la ruta actual es protegida
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  // 3. Revisar si existen cookies de sesión de Supabase (sb-*-auth-token)
  const hasAuthCookie = request.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token"));

  if (isProtected && !hasAuthCookie) {
    // Redirigir al usuario al login con la URL de retorno
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Configurar el matcher para excluir estáticos y assets de Next.js
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
