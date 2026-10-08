"use client";

import { useState, RefObject } from "react";
import { toPng } from "html-to-image";
import { formatExportFileName } from "@/lib/utils";

interface Props {
  stats: any;
  gameMatchup: string;
  courtRef: RefObject<HTMLDivElement | null>;
}

export const ExportCardButton = ({ stats, gameMatchup, courtRef }: Props) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!courtRef.current) {
      console.warn("courtRef.current no está montado aún");
      return;
    }

    setIsGenerating(true);

    try {
      const node = courtRef.current;

      // 1. Exportar en alta resolución (2x para pantallas Retina / alta fidelidad)
      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        cacheBust: true,
        skipFonts: true,
      });

      const fileName = formatExportFileName(gameMatchup, stats?.selectedPlayer);

      // 2. Convertir dataUrl en Blob (solución estándar para compatibilidad con navegadores móviles)
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      // 3. Descarga directa forzada (funciona idéntico en desktop y móvil)
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // 4. Limpieza del elemento y liberación de memoria
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch (err) {
      console.error("Error al exportar la imagen:", err);
      alert("No se pudo generar la imagen. Intenta de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isGenerating}
      className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl border border-neutral-700 shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
    >
      <svg
        className={`size-4 text-emerald-400 ${isGenerating ? "animate-spin" : ""}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        {isGenerating ? (
          <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="10" />
        ) : (
          <>
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </>
        )}
      </svg>
      <span>{isGenerating ? "Exporting..." : "Export Chart"}</span>
    </button>
  );
};