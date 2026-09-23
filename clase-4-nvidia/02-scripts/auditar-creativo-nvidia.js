#!/usr/bin/env node

/**
 * Script de auditoría de anuncios y creativos usando NVIDIA NIM (Free Tier).
 * Modelo: meta/llama-3.2-11b-vision-instruct
 * 
 * Uso:
 *   node clase-04-material/02-scripts/auditar-creativo-nvidia.js [ruta-imagen]
 */

const fs = require('fs');
const path = require('path');

// Cargar variables de entorno de .env
function cargarEnv(archivo) {
  if (fs.existsSync(archivo)) {
    const lineas = fs.readFileSync(archivo, 'utf8').split('\n');
    for (const linea of lineas) {
      const trimmed = linea.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const index = trimmed.indexOf('=');
      if (index !== -1) {
        const key = trimmed.slice(0, index).trim();
        let val = trimmed.slice(index + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

cargarEnv(path.join(process.cwd(), '.env'));
cargarEnv(path.join(process.cwd(), '.env.local'));
cargarEnv(path.join(__dirname, '.env'));
cargarEnv(path.join(__dirname, '..', '..', '.env'));

const apiKey = process.env.NVIDIA_API_KEY;

async function auditar() {
  console.log("==================================================");
  console.log("   AUDITOR DE CREATIVOS CON NVIDIA NIM (VISIÓN)   ");
  console.log("==================================================");

  if (!apiKey || apiKey.startsWith('nvapi-xxxx')) {
    console.log("\n⚠️  No se encontró la variable NVIDIA_API_KEY.");
    console.log("👉 Asegúrate de agregarla en tu archivo .env:");
    console.log("   NVIDIA_API_KEY=nvapi-tuClaveRealAqui\n");
    process.exit(0);
  }

  const imageArg = process.argv[2] || path.join(__dirname, 'test-anuncio.png');

  if (!fs.existsSync(imageArg)) {
    console.error(`❌ No existe el archivo de imagen: ${imageArg}`);
    process.exit(1);
  }

  const ext = path.extname(imageArg).toLowerCase();
  const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg';
  const base64Data = fs.readFileSync(imageArg).toString("base64");

  console.log(`\n📸 Imagen cargada: ${imageArg} (${(base64Data.length * 0.75 / 1024).toFixed(1)} KB)`);
  console.log("🚀 Enviando a NVIDIA NIM (meta/llama-3.2-11b-vision-instruct)...");

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "meta/llama-3.2-11b-vision-instruct",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Actúa como media buyer experto en Meta Ads y evaluador de startups Corfo. Analiza esta pieza publicitaria de validación para fletes y logística: 1) Claridad del gancho (Hook), 2) Claridad del dolor que resuelve, 3) Recomendaciones para bajar el CPC y mejorar la conversión de la landing."
              },
              {
                type: "image_url",
                image_url: { url: `data:${mimeType};base64,${base64Data}` }
              }
            ]
          }
        ],
        temperature: 0.2,
        max_tokens: 600
      })
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Error HTTP ${response.status}: ${errText}`);
    }

    const data = await response.json();
    console.log("\n--- RESULTADO DE LA AUDITORÍA DE CREATIVO ---\n");
    console.log(data.choices[0].message.content);
    console.log("\n-----------------------------------------------\n");
  } catch (err) {
    console.error("❌ Error al llamar a NVIDIA NIM:", err.message);
  }
}

auditar();
