import "dotenv/config";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("\x1b[31m✖ [ERROR] NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY no encontrada en .env\x1b[0m");
  process.exit(1);
}

async function main() {
  console.log("\n⏳ Conectando con Supabase...");

  try {
    const healthRes = await fetch(`${url}/auth/v1/health`, {
      headers: { 'apikey': key }
    });

    if (healthRes.ok) {
      const data = await healthRes.json();
      console.log("\n\x1b[32m✔ [CONEXIÓN EXITOSA CON SUPABASE]\x1b[0m");
      console.log(`\x1b[36m⚡ URL:\x1b[0m ${url}`);
      console.log(`\x1b[36m⚡ Servicio Auth GoTrue:\x1b[0m Versión ${data.version}`);
    } else {
      console.error(`\n\x1b[31m✖ [ERROR AL COMUNICAR CON SUPABASE]:\x1b[0m HTTP ${healthRes.status}`);
    }
  } catch (error) {
    console.error("\n\x1b[31m✖ [ERROR AL COMUNICAR CON SUPABASE]:\x1b[0m", error.message);
  }
}

main();
