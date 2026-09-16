// components/ShareShotCardModal.tsx
"use client";

import { useRef, useState } from "react";
import { toPng, toBlob } from "html-to-image";

interface Props {
  stats: any;
  gameTitle: string;
  courtSvgNode: React.ReactNode; // o una ref al contenedor de la cancha
}

export const ExportCardButton = ({ stats, gameTitle }: { stats: any; gameTitle: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShareOrDownload = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);

    try {
      // 1. Generar blob de la imagen en alta calidad (scale 2 para Retina / HD)
      const blob = await toBlob(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      if (!blob) throw new Error("No se pudo generar la imagen");

      const file = new File([blob], `${stats?.selectedPlayer || "celtics"}-shot-chart.png`, {
        type: "image/png",
      });

      // 2. Si el navegador soporta compartir archivos nativamente (Celulares: IG, TikTok, X, WhatsApp)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Boston Celtics Shot Chart - ${stats?.selectedPlayer}`,
          text: `Check out ${stats?.selectedPlayer} shot profile on 2kceltics.xyz!`,
        });
      } else {
        // 3. Fallback Desktop: Descargar directo el PNG
        const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
        const link = document.createElement("a");
        link.download = `${stats?.selectedPlayer || "celtics"}-shot-chart.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error("Error al compartir imagen:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <button
        onClick={handleShareOrDownload}
        disabled={isGenerating}
        className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl border border-neutral-700 transition shadow-md active:scale-95 disabled:opacity-50"
      >
        <svg className="size-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        <span>{isGenerating ? "Exporting..." : "Share Chart"}</span>
      </button>

      {/* TARJETA OFF-SCREEN (La que se convierte a imagen HD para redes) */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none">
        <div
          ref={cardRef}
          className="w-[800px] bg-neutral-950 p-6 flex flex-col gap-4 text-white border border-neutral-800"
          style={{ fontFamily: "sans-serif" }}
        >
          {/* Header de la tarjeta con branding */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <span className="text-emerald-400 font-black tracking-widest text-lg">2KCELTICS.XYZ</span>
            <span className="text-neutral-400 text-sm font-mono">{gameTitle}</span>
          </div>

          {/* Banner de Stats del jugador */}
          <div className="flex items-center justify-between bg-neutral-900/90 rounded-2xl p-4 border border-neutral-800">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                {stats?.selectedPlayer === "ALL" ? "Team Shot Profile" : "Player Profile"}
              </span>
              <h1 className="text-2xl font-black uppercase text-white">
                {stats?.selectedPlayer === "ALL" ? "Boston Celtics" : stats?.selectedPlayer}
              </h1>
            </div>

            <div className="flex gap-4 font-mono text-center">
              <div className="px-2">
                <span className="text-[10px] text-neutral-400 uppercase block font-sans">Att</span>
                <strong className="text-lg text-white">{stats?.totalCount ?? 0}</strong>
              </div>
              <div className="border-l border-neutral-800 pl-3">
                <span className="text-[10px] text-neutral-400 uppercase block font-sans">Made</span>
                <strong className="text-lg text-amber-400">{stats?.madeCount ?? 0}</strong>
              </div>
              <div className="border-l border-neutral-800 pl-3">
                <span className="text-[10px] text-neutral-400 uppercase block font-sans">Miss</span>
                <strong className="text-lg text-rose-500">{stats?.missedCount ?? 0}</strong>
              </div>
              <div className="border-l border-neutral-800 pl-3">
                <span className="text-[10px] text-neutral-400 uppercase block font-sans">Acc</span>
                <strong className="text-lg text-blue-400">{stats?.pct ?? "0.0"}%</strong>
              </div>
            </div>
          </div>

          {/* Cancha clonada o renderizada */}
          <div className="w-full aspect-[1020/590] rounded-2xl overflow-hidden bg-[#E8D3A7]">
            {/* Acá se puede reutilizar el SVG pasándole filteredShots */}
          </div>
        </div>
      </div>
    </>
  );
};