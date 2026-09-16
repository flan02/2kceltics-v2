"use client";

import { useState, RefObject } from "react";
import { toPng } from "html-to-image";

interface Props {
  stats: any;
  gameMatchup: string;
  courtRef: RefObject<HTMLDivElement | null>;
}

export const ExportCardButton = ({ stats, gameMatchup, courtRef }: Props) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShare = async () => {
    if (!courtRef.current) {
      console.warn("courtRef.current no está montado aún");
      return;
    }
    setIsGenerating(true);

    try {

      const node = courtRef.current;

      // 1. Exportar la cancha actual en alta resolución (2x para Retina / redes)
      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        cacheBust: true,
        skipFonts: true, // Crucial: evita trabas al procesar tipografías del sistema
      });

      const playerName = stats?.selectedPlayer === "ALL" ? "Boston Celtics" : stats?.selectedPlayer || "Celtics";
      const fileName = `${playerName.replace(/\s+/g, "-")}-shot-chart.png`;
      // const file = new File([blob], fileName, { type: "image/png" });

      // 2. Detección real de dispositivo móvil
      const isMobileDevice = typeof window !== "undefined" && (
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints > 1 && window.innerWidth < 1024)
      );

      // 2. Mobile (Android/iOS): Abre el panel de compartir nativo
      if (isMobileDevice && typeof navigator !== "undefined" && navigator.canShare) {
        try {
          const res = await fetch(dataUrl);
          const blob = await res.blob();
          const file = new File([blob], fileName, { type: "image/png" });

          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: `Celtics Shot Chart - ${stats?.selectedPlayer || "Boston Celtics"}`,
              text: `Shot profile ${gameMatchup} en 2kceltics.xyz`,
            });
            setIsGenerating(false);
            return;
          }

          // 4. Flujo Desktop: Descarga directa a disco (evita el popup de Windows)
          const link = document.createElement("a");
          link.download = fileName;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (shareErr) {
          console.log("Compartir cancelado o no disponible:", shareErr);
        }
      } else {
        // 3. Desktop fallback: Descarga directa en archivo PNG
        const dataUrl = await toPng(courtRef.current, { pixelRatio: 2 });
        const link = document.createElement("a");
        link.download = fileName;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error("Error al compartir:", err);
      alert("No se pudo generar la imagen. Intenta de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
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