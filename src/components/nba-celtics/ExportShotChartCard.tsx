/* eslint-disable @next/next/no-img-element */
import React, { forwardRef } from "react";
import { BasketballCourt } from "./BasketballCourt";
import { ExportCardProps, INITIAL_FILTERS, playersNBA_season2025_26 } from '@/lib/types';
import BannerAttributes from "./BannerAttributes";
import { formatLogoAwayImage } from "@/lib/utils";


export const ExportShotChartCard = forwardRef<HTMLDivElement, ExportCardProps>(({
  shots,
  stats,
  filters,
  gameNumber,
  gameMatchup,
  gameDate
}, ref) => {

  const activeFilters = filters || INITIAL_FILTERS



  const DISTANCE_CONFIG: Record<string, { label: string; styles: string }> = {
    RIM: {
      label: "<8ft",
      styles: "bg-emerald-950/60 text-emerald-400 border-emerald-600/50",
    },
    MID: {
      label: "8-22ft",
      styles: "bg-blue-950/60 text-blue-400 border-blue-600/50",
    },
    THREE: {
      label: ">22ft",
      styles: "bg-violet-950/60 text-violet-400 border-violet-600/50",
    },
    ALL: {
      label: "All Distances",
      styles: "bg-neutral-900 text-neutral-300 border-neutral-700/80",
    },
  };

  const targetedPlayer = activeFilters.player || stats?.selectedPlayer || "ALL";
  const isAll = targetedPlayer === "ALL";
  const playerName = isAll ? "Boston Celtics" : targetedPlayer;

  const playerPhoto = !isAll ? playersNBA_season2025_26[targetedPlayer] : null;
  const currentImageSrc = isAll ? "/celtics-logo.png" : (playerPhoto || "/celtics-logo.png");


  // 1. Extraer los filtros de forma segura (sin importar si vienen en prop 'filters' o 'stats.filters')
  // const activeFilters = filters || (stats as any)?.filters;

  const rawPeriod = activeFilters?.period ? String(activeFilters.period) : "ALL";
  const periodLabel = rawPeriod === "ALL"
    ? "Full Game"
    : rawPeriod.startsWith("Q") ? rawPeriod : `Q${rawPeriod}`;

  const shotTypeLabel = activeFilters?.shotType || "ALL";
  const outcomeLabel = activeFilters?.outcome || "ALL";
  const shotTimingLabel = activeFilters?.timing || "";

  const currentDistance = activeFilters?.distance || "ALL";
  const badge = DISTANCE_CONFIG[currentDistance] || DISTANCE_CONFIG.ALL;

  return (
    <div
      ref={ref}
      style={{ width: 1280, height: 720 }}
      className="bg-[#080808] text-white p-7 flex gap-7 border-4 border-neutral-800 rounded-3xl shadow-2xl font-sans box-border select-none overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* COLUMNA IZQUIERDA: DESCRIPCIÓN, FILTROS, STATS Y LOG (ANCHO FIJO: 380px)  */}
      {/* ========================================================================= */}
      <div className="w-[380px] shrink-0 flex flex-col justify-between border-r border-neutral-800/80 pr-6">

        {/* 1. Header & Matchup */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-celtics font-black tracking-widest text-lg">
              <span className="text-celtics text-xs tracking-tight">created by &nbsp;</span>
              2KCELTICS.XYZ</p>
            <span className="text-white font-mono text-xs font-bold mt-1">{gameDate}</span>
          </div>

          <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl px-3.5 py-1.5">
            <span className="text-[9px] uppercase font-bold text-neutral-400 block tracking-wider font-sans">
              Game {gameNumber ? `#${gameNumber} ` : ""}
            </span>

            {/* ADD LOGO FOR BOTH TEAMS */}
            <div className="flex items-center gap-2 mt-1">
              <img src="/celtics-logo.png" alt="Celtics Logo" className="size-6" />
              <span className="text-lg font-black text-neutral-100 uppercase tracking-wide">
                {gameMatchup}
              </span>
              <img src={formatLogoAwayImage(gameMatchup)} alt="Away Team Logo" className="size-6" />
            </div>
          </div>
        </div>

        {/* 2. Perfil, Píldora de MOMENTUM y Badges de Filtros */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-4">
            <div className="size-20 rounded-md overflow-hidden bg-neutral-950 flex items-center justify-center shrink-0 shadow-lg">
              <img
                key={currentImageSrc}
                src={currentImageSrc}
                alt={playerName}
                width={80}
                height={80}
                className={`select-none ${isAll ? "size-20 object-contain border-none" : "size-20 object-cover object-top border-2 border-violet-300"
                  }`}
              />
            </div>

            <div className="min-w-0">
              <span className="text-[10px] font-bold text-celtics uppercase tracking-widest block">
                {isAll ? "Team Shot Profile" : "Player Shot Profile"}
              </span>
              {/* <h1 className="text-xl font-black uppercase tracking-tight text-white leading-tight truncate"> */}
              <h1 className="text-xl font-black uppercase tracking-tight truncate bg-gradient-to-r from-zinc-200 via-neutral-400 to-zinc-100 bg-clip-text text-transparent drop-shadow-sm">
                {playerName}
              </h1>
            </div>
          </div>

          {/* Tag de Momentum */}
          <div className="inline-flex items-center gap-2 bg-orange-600 border-2 border-red-500 px-2 py-1 rounded-lg w-fit">
            {/* <span className="size-2 rounded-full bg-emerald-400 animate-pulse" /> */}
            <span className="text-[10px] font-black tracking-wider uppercase text-white font-mono">
              MOMENTUM •
            </span>
          </div>

          {/* Badges de filtros protegidos contra null */}
          <div className="flex flex-wrap gap-1.5">
            <span className="bg-neutral-900 text-neutral-200 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border border-neutral-700">
              {periodLabel}
            </span>
            <span className="bg-neutral-900 text-neutral-200 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border border-neutral-700">
              {shotTypeLabel === "ALL" ? "2PT/3PT" : shotTypeLabel}
            </span>
            <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border ${outcomeLabel === "MADE"
              ? "bg-amber-950/50 text-amber-400 border-amber-600/40"
              : outcomeLabel === "MISSED"
                ? "bg-rose-950/50 text-rose-400 border-rose-600/40"
                : "bg-neutral-900 text-neutral-200 border-neutral-700"
              }`}>
              {outcomeLabel === "ALL" ? "Made/Missed" : outcomeLabel}
            </span>
            {shotTimingLabel !== "ALL" && (
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border ${shotTimingLabel === "LAST_2"
                  ? "bg-rose-950/50 text-rose-300 border-rose-600/40"
                  : "bg-violet-950/50 text-violet-300 border-violet-600/40"
                  }`}
              >
                {shotTimingLabel === "LAST_2" ? "<2 min" : "<5 min"}
              </span>
            )}

            <span
              className={`inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded border whitespace-nowrap ${badge.styles}`}
            >
              {badge.label}
            </span>

          </div>
        </div>


        {/* 3. Métricas principales */}
        <BannerAttributes stats={stats} />

        {/* 4. Mini Shot Log (lista cronológica compacta) */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-2.5 flex flex-col gap-1.5">
          <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">
            Shot Log Summary ({shots.length} shots)
          </span>
          <div className="flex flex-col gap-1">
            {shots.slice(0, 3).map((s, idx) => (
              <div key={idx} className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-neutral-300 truncate max-w-[190px]">
                  {s.actionType || s.shotType || "Jump Shot"}
                </span>
                <span className={s.eventType === "Made Shot" ? "text-amber-400 font-bold" : "text-rose-400"}>
                  {s.eventType === "Made Shot" ? "MADE" : "MISS"}
                </span>
              </div>
            ))}
            {shots.length > 3 && (
              <span className="text-[9px] text-neutral-500 font-mono text-center">
                + {shots.length - 3} more shots mapped
              </span>
            )}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* COLUMNA DERECHA: LA CANCHA COMPLETA                                      */}
      {/* ========================================================================= */}
      <div className="flex-1 flex items-center justify-center min-w-0">
        <div className="w-full aspect-[1020/590] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
          <BasketballCourt shots={shots} />
        </div>
      </div>
    </div>
  );
});



ExportShotChartCard.displayName = "ExportShotChartCard";