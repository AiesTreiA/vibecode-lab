# Guía Rápida: Tokenomics en Antigravity y Multimodalidad Gratuita con NVIDIA NIM

Esta guía complementa la lectura obligatoria de [`public/docs/model_consumption_guide.md`](../../public/docs/model_consumption_guide.md) para que entiendas la economía de las APIs y cómo aprovechar modelos gratuitos de visión sin gastar tu cuota diaria.

---

## 1. La Regla de Oro del Consumo: Entrada vs. Salida

En cualquier LLM o Agente (Gemini, Claude, GPT):

1. **Tokens de Entrada (Prompt & Contexto):**
   - Es todo lo que el modelo **lee** (tus archivos de código, imágenes, instrucciones).
   - Tienen un costo de cómputo bajo.

2. **Tokens de Salida (Completion & Código Generado):**
   - Es todo lo que el modelo **escribe** visiblemente.
   - Son sustancialmente más costosos en tiempo y cuota (entre 3x y 5x más que la entrada).

3. **Thinking Tokens (El costo invisible de razonamiento):**
   - En modelos con pensamiento profundo (como **Claude Sonnet/Opus Thinking** o Gemini en `High`), el modelo genera un monólogo interno reflexivo antes de responder.
   - **Esos tokens de pensamiento computan como tokens de salida.** Por eso, 1 prompt en Claude Opus puede consumir lo equivalente a 15 prompts en Gemini Flash.

---

## 2. Mapa Mental en Antigravity: ¿Cuándo usar qué?

Basado en la guía oficial de consumo de la plataforma:

| Categoría | Modelo en Antigravity | Factor Cuota | Cuándo usarlo |
| :--- | :--- | :---: | :--- |
| **Caballo de Batalla (Día completo)** | **Gemini 3.8 Flash** (`Low` / `Medium`) | **0.8x - 1.0x** | Desarrollo general, creación de componentes, scripts, refactors y preguntas frecuentes. |
| **Lógica Compleja / Debugging** | **Gemini 3.8 Flash** (`High`) | **1.5x** | Algoritmos intrincados o cuando Flash necesita analizar dependencias a fondo. |
| **Open Weights / Alternativa** | **GPT-OSS 120B** (`Medium`) | **2.5x** | Pruebas de código y revisiones intermedias sin sesgo propietario. |
| **Ingesta Masiva de Repos** | **Gemini 3.1 Pro** (`Low`) | **3.0x** | Lectura de proyectos grandes o muchos archivos sin inflar la cuota de razonamiento. |
| **Cirugía Mayor / Arquitectura** | **Gemini 3.1 Pro** (`High`) | **4.8x** | Diseño de arquitectura crítica y seguridad. |
| **Máxima Precisión (Uso Quirúrgico)** | **Claude Sonnet 4.6 (Thinking)** | **6.0x** | Bugs muy difíciles, interfaces de alta fidelidad o lógica asíncrona estricta. |
| **Investigación Frontera (Reserva)** | **Claude Opus 4.6 (Thinking)** | **14.0x** | Conceptos teóricos o problemas algorítmicos no resueltos (dura 1–2 horas continuas). |

---

## 3. El Hack de NVIDIA NIM: Visión y Video Gratuito

Para evitar gastar tu cuota de Antigravity en tareas de visión por computadora (analizar imágenes de anuncios, mockups, capturas de pantalla de la landing):

1. **¿Qué es?** NVIDIA hospeda modelos de última generación optimizados con TensorRT-LLM en `build.nvidia.com`.
2. **Créditos Gratis:** Al registrarte con cualquier correo obtienes **1,000 créditos API gratis**, suficientes para cientos de auditorías.
3. **Compatibilidad Estándar:** Usa exactamente la misma biblioteca cliente de OpenAI. Solo cambias dos líneas:
   - `baseURL: "https://integrate.api.nvidia.com/v1"`
   - `apiKey: process.env.NVIDIA_API_KEY`
4. **Modelo Recomendado:** `meta/llama-3.2-11b-vision-instruct` para análisis de imágenes de anuncios y landings.
