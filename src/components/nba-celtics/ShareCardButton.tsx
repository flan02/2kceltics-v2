"use client";

import { useState, useRef, useEffect } from "react";
import { toBlob } from "html-to-image";
import { X } from "lucide-react";
import { FaReddit, FaWhatsapp } from "react-icons/fa6";

type Props = {
  courtRef: React.RefObject<HTMLDivElement | null>;
  gameMatchup: string;
};

const ShareCardButton = ({ courtRef, gameMatchup }: Props) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // const cleanMatchup = gameMatchup
  //   .toLowerCase()
  //   .replace(/[@vs.]+/g, "vs")
  //   .replace(/\s+/g, "-")
  //   .trim();

  const cleanMatchup = gameMatchup

  // Cerrar menú si el usuario hace clic afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpenMenu(false);
      }
    };
    if (isOpenMenu) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpenMenu]);

  const handleShareClick = async () => {
    if (isGenerating) return;

    // 1. Detectar si es móvil
    const isMobileDevice = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    // Si es móvil y tiene soporte nativo para archivos, usamos Web Share directo
    if (isMobileDevice && navigator.canShare && courtRef.current) {
      setIsGenerating(true);
      try {
        const blob = await toBlob(courtRef.current, {
          pixelRatio: 2,
          cacheBust: true,
          skipFonts: true,
          width: 1020,
          height: 590,
        });

        if (!blob) throw new Error("No se pudo generar la imagen");

        const fileName = `${cleanMatchup}-shot-chart.png`;
        const file = new File([blob], fileName, { type: "image/png" });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Boston Celtics Shot Chart - ${cleanMatchup.toUpperCase()}`,
            text: `Mirá el mapa de tiros de los Celtics vs ${cleanMatchup.toUpperCase()} en 2KCeltics.xyz`,
            url: window.location.href,
            files: [file],
          });
          return;
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error al compartir en móvil:", error);
        }
      } finally {
        setIsGenerating(false);
      }
    }

    // 2. Si es PC o no soporta compartir archivos, alternamos el menú desplegable
    setIsOpenMenu((prev) => !prev);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsOpenMenu(false);
    }, 1800);
  };

  // Enlaces directos para PC
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://2kceltics.xyz";
  const currentUrl = typeof window !== "undefined"
    ? `${baseUrl}${window.location.pathname}${window.location.search}`
    : baseUrl;
  // const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Boston Celtics Shot Chart - ${cleanMatchup.toUpperCase()} ☘️ \n`;

  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
  const redditShareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(shareText)}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}${currentUrl}`)}`;

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        type="button"
        onClick={handleShareClick}
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
        <span>{isGenerating ? "Generating..." : "Share"}</span>
      </button>

      {/* Menú flotante para Desktop */}
      {isOpenMenu && (
        <div className="absolute left-0 bottom-full mb-2 w-48 bg-neutral-950/95 backdrop-blur-md border border-neutral-800 rounded-xl shadow-2xl p-1.5 z-50 flex flex-col gap-1 text-xs">
          {/* X / Twitter */}
          <a
            href={xShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpenMenu(false)}
            className="flex items-center gap-2.5 px-3 py-2 text-neutral-200 hover:text-white hover:bg-neutral-800/80 rounded-lg transition-colors"
          >
            <X size={20} />
            <span>Share on X</span>
          </a>

          {/* Reddit */}
          <a
            href={redditShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpenMenu(false)}
            className="flex items-center gap-2.5 px-3 py-2 text-neutral-200 hover:text-white hover:bg-neutral-800/80 rounded-lg transition-colors"
          >
            <FaReddit size={16} />
            <span>Share on Reddit</span>
          </a>

          {/* WhatsApp Web */}
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpenMenu(false)}
            className="flex items-center gap-2.5 px-3 py-2 text-neutral-200 hover:text-white hover:bg-neutral-800/80 rounded-lg transition-colors"
          >
            <FaWhatsapp size={16} />
            <span>Send via WhatsApp</span>
          </a>

          <div className="h-[1px] bg-neutral-800 my-0.5" />

          {/* Copiar enlace */}
          <button
            type="button"
            onClick={copyToClipboard}
            className="flex items-center gap-2.5 px-3 py-2 text-neutral-300 hover:text-white hover:bg-neutral-800/80 rounded-lg transition-colors w-full text-left cursor-pointer"
          >
            <span>🔗</span>
            <span>{copied ? "¡Link copied!" : "Copy link"}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareCardButton;