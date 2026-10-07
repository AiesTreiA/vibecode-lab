import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Constante PLG: ¿Cuántas subidas gratis permitimos?
const FREE_TIER_LIMIT = 1;

export async function checkFreemiumLimit(userId: string) {
  // 1. Obtener al usuario desde Supabase (suponiendo que creamos estas columnas)
  const { data: user, error } = await supabase
    .from('users')
    .select('plan_type, s3_uploads_count')
    .eq('id', userId)
    .single();

  if (error || !user) throw new Error("Usuario no encontrado");

  // 2. Lógica PLG: Si es PRO, pasa siempre
  if (user.plan_type === 'pro') {
    return { allowed: true, reason: 'pro_user' };
  }

  // 3. Si es FREE, comprobamos su conteo
  if (user.s3_uploads_count >= FREE_TIER_LIMIT) {
    return { 
      allowed: false, 
      reason: 'limit_reached',
      message: 'Has alcanzado el límite de uso gratuito. Sube a Pro para uso ilimitado.'
    };
  }

  // 4. Si aún tiene crédito, lo dejamos pasar y aumentamos el contador
  // (Nota: En una app real, aumentamos el contador DESPUÉS de que se suba el archivo con éxito)
  
  return { allowed: true, reason: 'free_tier_active' };
}
