// Archivo: app/auth/callback/route.ts
// Este Route Handler procesa el código temporal devuelto por Google OAuth / Magic Links
// e intercambia dicho código por una sesión persistente de Supabase en cookies del navegador.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Redirección exitosa a la página de inicio o panel
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Si ocurre un error con el código OAuth, redirigir al login con mensaje de error
  return NextResponse.redirect(`${origin}/login?error=oauth_callback_failed`);
}
