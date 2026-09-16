import React, { forwardRef } from "react";
import Image from "next/image";
import { BasketballCourt } from "./BasketballCourt";

interface Props {
  shots: any[];
  stats: any;
  gameMatchup: string;
  playerImageSrc: string;
}

export const ExportShotChartCard = forwardRef<HTMLDivElement, Props>(({
  shots,
  stats,
  gameMatchup,
  playerImageSrc,
}, ref) => {
  const isAll = !stats || stats.selectedPlayer === "ALL";
  const playerName = isAll ? "Boston Celtics" : stats.selectedPlayer;

  return (
    <div
      ref={ref}
      style={{ width: 1280, height: 720 }}
      className="bg-[#080808] text-white p-7 flex gap-7 border-4 border-neutral-800 rounded-3xl shadow-2xl font-sans box-border select-none overflow-hidden"
    >
      {/* ================= COLUMNA IZQUIERDA: FICHA TÉCNICA (360px) ================= */}
      <div className="w-[360px] shrink-0 flex flex-col justify-between border-r border-neutral-800/80 pr-6">

        {/* Top: Header Branding & Partido */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-emerald-400 font-black tracking-widest text-lg">2KCELTICS.XYZ</span>
            <span className="text-neutral-500 font-mono text-xs">2025-26 Season</span>
          </div>

          <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl px-3.5 py-2">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider font-sans">
              Matchup
            </span>
            <span className="text-sm font-black text-neutral-100 uppercase tracking-wide">
              {gameMatchup}
            </span>
          </div>
        </div>

        {/* Middle: Foto + Nombre + Tipo de Perfil */}
        <div className="flex flex-col gap-4 my-auto">
          <div className="size-28 rounded-2xl overflow-hidden bg-neutral-950 border-2 border-neutral-700 flex items-center justify-center shadow-lg">
            <Image
              src={playerImageSrc}
              alt={playerName}
              width={112}
              height={112}
              className={`select-none ${isAll ? "size-20 object-contain" : "size-28 object-cover object-top"
                }`}
            />
          </div>

          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
              {isAll ? "Team Shot Profile" : "Player Shot Profile"}
            </span>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white leading-tight mt-0.5">
              {playerName}
            </h1>
          </div>
        </div>

        {/* Bottom: Métricas Clave */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 grid grid-cols-4 gap-2 text-center font-mono">
          <div>
            <span className="text-[10px] text-neutral-400 uppercase block font-sans">Att</span>
            <strong className="text-xl text-white font-bold">{stats?.totalCount ?? 0}</strong>
          </div>
          <div className="border-l border-neutral-800">
            <span className="text-[10px] text-neutral-400 uppercase block font-sans">Made</span>
            <strong className="text-xl text-amber-400 font-bold">{stats?.madeCount ?? 0}</strong>
          </div>
          <div className="border-l border-neutral-800">
            <span className="text-[10px] text-neutral-400 uppercase block font-sans">Miss</span>
            <strong className="text-xl text-rose-500 font-bold">{stats?.missedCount ?? 0}</strong>
          </div>
          <div className="border-l border-neutral-800">
            <span className="text-[10px] text-neutral-400 uppercase block font-sans">Acc</span>
            <strong className="text-xl text-blue-400 font-bold">{stats?.pct ?? "0.0"}%</strong>
          </div>
        </div>

      </div>

      {/* ================= COLUMNA DERECHA: CANCHA COMPLETA (860px) ================= */}
      <div className="flex-1 flex items-center justify-center min-w-0">
        <div className="w-full aspect-[1020/590] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
          <BasketballCourt shots={shots} />
        </div>
      </div>
    </div>
  );
});

ExportShotChartCard.displayName = "ExportShotChartCard";