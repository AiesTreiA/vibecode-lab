"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { Loader2, Mail, Lock, User, AlertCircle, CheckCircle2 } from "lucide-react";

// 1. Inicialización de cliente Supabase (usando ANON KEY pública segura por RLS)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Esquema de validación con Zod
const AuthSchema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
  fullName: z.string().min(2, "El nombre debe tener al menos 2 letras").optional(),
});

export default function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Manejador de Email/Password (Login y Registro)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validación con Zod
    const validation = AuthSchema.safeParse({
      email,
      password,
      fullName: isSignUp ? fullName : undefined,
    });

    if (!validation.success) {
      setErrorMessage(validation.error.errors[0].message);
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        // Flujo de Registro
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;
        setSuccessMessage("¡Cuenta creada! Revisa tu correo o inicia sesión directamente.");
      } else {
        // Flujo de Login Seguro
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          // Prevención de enumeración de usuarios: mensaje genérico
          throw new Error("Credenciales inválidas. Por favor verifica tu correo y contraseña.");
        }

        setSuccessMessage("¡Bienvenido! Redirigiendo a tu panel...");
        window.location.href = "/";
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Ocurrió un error inesperado al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  // Manejador de Google OAuth
  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    setOauthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setErrorMessage(err.message || "Error al conectar con Google OAuth.");
      setOauthLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl text-slate-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {isSignUp ? "Crear Nueva Cuenta" : "Iniciar Sesión"}
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          {isSignUp
            ? "Únete a Vibecode Lab y comienza a construir con IA"
            : "Accede a tu panel y proyectos de clase"}
        </p>
      </div>

      {/* Botón Google OAuth */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={oauthLoading || loading}
        className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-900 font-semibold rounded-lg transition-all duration-200 shadow-sm disabled:opacity-50 mb-5"
      >
        {oauthLoading ? (
          <Loader2 className="w-5 h-5 animate-spin text-slate-600" />
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        )}
        <span>{oauthLoading ? "Conectando..." : "Continuar con Google"}</span>
      </button>

      {/* Separador Visual */}
      <div className="relative flex items-center justify-center mb-5">
        <div className="border-t border-slate-800 w-full" />
        <span className="bg-slate-900 px-3 text-xs text-slate-500 uppercase tracking-wider">
          o con correo
        </span>
        <div className="border-t border-slate-800 w-full" />
      </div>

      {/* Alertas */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-3 mb-4 text-sm text-red-400 bg-red-950/40 border border-red-900/60 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center gap-2 p-3 mb-4 text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 rounded-lg">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Nombre Completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Juan Pérez"
                className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Correo Electrónico
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu-correo@ejemplo.com"
              className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Contraseña
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {isSignUp && (
            <p className="text-[11px] text-slate-400 mt-1">
              Mínimo 8 caracteres, una mayúscula y un número.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || oauthLoading}
          className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>{isSignUp ? "Crear Cuenta" : "Iniciar Sesión"}</span>
        </button>
      </form>

      {/* Switch entre Login y Registro */}
      <div className="mt-5 text-center text-xs text-slate-400">
        {isSignUp ? "¿Ya tienes una cuenta?" : "¿Aún no tienes cuenta?"}{" "}
        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setErrorMessage(null);
            setSuccessMessage(null);
          }}
          className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-2 ml-1"
        >
          {isSignUp ? "Inicia Sesión" : "Regístrate gratis"}
        </button>
      </div>
    </div>
  );
}
