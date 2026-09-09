-- ==============================================================================
-- VIBECODE LAB — CLASE 3: ESTRUCTURA DE PERFILES, RLS Y TRIGGER AUTOMÁTICO
-- ==============================================================================

-- 1. CREACIÓN DE LA TABLA PÚBLICA DE PERFILES
-- Esta tabla almacena los datos de perfil accesibles por la aplicación
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. HABILITAR ROW LEVEL SECURITY (RLS)
-- Crucial: Sin esto, cualquier usuario con ANON_KEY podría leer/modificar perfiles ajenos
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. POLÍTICAS DE SEGURIDAD (RLS POLICIES)

-- Política 1: Lectura (Cada usuario solo puede ver su propio perfil)
DROP POLICY IF EXISTS "Los usuarios pueden ver su propio perfil" ON public.profiles;
CREATE POLICY "Los usuarios pueden ver su propio perfil"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Política 2: Actualización (Cada usuario solo puede editar su propio perfil)
DROP POLICY IF EXISTS "Los usuarios pueden actualizar su propio perfil" ON public.profiles;
CREATE POLICY "Los usuarios pueden actualizar su propio perfil"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- 4. FUNCIÓN Y TRIGGER PARA REPLICAR NUEVOS USUARIOS DE AUTH.USERS A PUBLIC.PROFILES
-- Se ejecuta automáticamente en Postgres cada vez que alguien se registra por email o Google OAuth

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Eliminar trigger previo si existe y volver a crearlo
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Mensaje de confirmación en consola SQL
SELECT 'Configuración de perfiles, RLS y Trigger completada exitosamente' AS status;
