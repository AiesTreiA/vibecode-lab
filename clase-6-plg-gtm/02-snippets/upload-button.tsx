'use client'

import { useState } from 'react'
import posthog from 'posthog-js'
import { Button } from "@/components/ui/button" // Asumiendo que usan shadcn/ui

export default function FileUploadWithPaywall() {
  const [file, setFile] = useState<File | null>(null)
  const [showPaywall, setShowPaywall] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);

    try {
      // 1. Pedir permiso a Next.js (y verificar Freemium)
      const res = await fetch('/api/route-s3-upload', {
        method: 'POST',
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          userId: 'usuario_actual_id', // Reemplazar con Auth del usuario (Supabase)
        })
      });

      const data = await res.json();

      // 2. Si el servidor nos bloquea por ser Freemium:
      if (res.status === 403 && data.requiresUpgrade) {
        // [GTM] Rastrear en PostHog que el usuario chocó con el Paywall
        posthog.capture('paywall_shown', { trigger: 's3_upload_limit' });
        setShowPaywall(true);
        setIsUploading(false);
        return;
      }

      // 3. Si todo va bien, subir directo a AWS S3
      if (data.url) {
        await fetch(data.url, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type }
        });
        
        // Éxito: El archivo está en S3
        alert("¡Archivo subido exitosamente y procesado por IA!");
      }

    } catch (error) {
      console.error(error);
    }
    
    setIsUploading(false);
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <Button onClick={handleUpload} disabled={!file || isUploading}>
        {isUploading ? "Analizando..." : "Subir y Analizar con IA"}
      </Button>

      {/* Paywall Modal Básico */}
      {showPaywall && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg text-black max-w-sm">
            <h2 className="text-xl font-bold mb-2">Límite Gratuito Alcanzado</h2>
            <p className="mb-4 text-sm">Has usado tu subida gratuita. Actualiza al plan Pro para analizar archivos ilimitados con nuestra IA.</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowPaywall(false)}>Cancelar</Button>
              <Button onClick={() => {
                posthog.capture('checkout_started');
                window.location.href = '/pricing'; // Redirigir a pasarela (Clase 5)
              }}>Actualizar a Pro</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
