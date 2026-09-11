"use client";

import { useEffect, useState } from "react";
import BasketballCourt from "./BasketballCourt";

export interface ShotItem {
  id: string;
  locX: number;
  locY: number;
  eventType: string;
  playerName: string;
  actionType: string;
  shotType: string; // "2PT Field Goal" | "3PT Field Goal"
  period: number | "ALL";
  playerId?: number; // Opcional por si viene desde la API
}

export interface ShotStats {
  totalCount: number;
  madeCount: number;
  missedCount: number;
  pct: string;
  selectedPlayer: string;
}

interface ShotChartProps {
  shots: ShotItem[];
  onStatsChange?: (stats: ShotStats) => void;
}

type PeriodFilter = "ALL" | 1 | 2 | 3 | 4;

export default function ShotChart({ shots, onStatsChange }: ShotChartProps) {

  const [selectedPlayer, setSelectedPlayer] = useState<string>("ALL");
  const [shotTypeFilter, setShotTypeFilter] = useState<"ALL" | "2PT" | "3PT">("ALL");
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>("ALL");
  const [outcomeFilter, setOutcomeFilter] = useState<"ALL" | "MADE" | "MISSED">("ALL");

  // Extraer nombres únicos ordenados
  const players = ["ALL", ...Array.from(new Set(shots.map((s) => s.playerName))).sort()];

  const filteredShots = shots.filter((s) => {
    const matchPlayer = selectedPlayer === "ALL" || s.playerName === selectedPlayer;
    const matchType =
      shotTypeFilter === "ALL" ||
      (shotTypeFilter === "3PT" && s.shotType?.startsWith("3PT")) ||
      (shotTypeFilter === "2PT" && s.shotType?.startsWith("2PT"));
    const matchPeriod = selectedPeriod === "ALL" || String(s.period) === String(selectedPeriod);
    const shotOutcome =
      outcomeFilter === "ALL" ||
      (outcomeFilter === "MADE" && s.eventType === "Made Shot") ||
      (outcomeFilter === "MISSED" && s.eventType === "Missed Shot");

    return matchPlayer && matchType && matchPeriod && shotOutcome;
  });


  const madeCount = filteredShots.filter((s) => s.eventType === "Made Shot").length;
  const totalCount = filteredShots.length;
  const pct = totalCount > 0 ? ((madeCount / totalCount) * 100).toFixed(1) : "0.0";
  const missedCount = totalCount - madeCount;

  // Enviar métricas al componente padre
  useEffect(() => {
    onStatsChange?.({
      totalCount,
      madeCount,
      missedCount,
      pct,
      selectedPlayer,
    });
  }, [totalCount, madeCount, missedCount, pct, selectedPlayer, onStatsChange]);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 flex flex-col xl:flex-row gap-6 items-start">
      {/* COLUMNA DERECHA: Cancha a escala completa */}
      <main className="flex-1 w-full min-w-0">
        <BasketballCourt shots={filteredShots} />
      </main>

      {/* COLUMNA LATERAL: Filtros y Estadísticas */}
      <aside className="w-full xl:w-80 shrink-0 flex flex-col gap-4 bg-neutral-900/90 border border-neutral-800 p-5 rounded-2xl shadow-xl">

        {/* 1. Selector de Jugadores */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-celtics mb-2">
            Players
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
            {players.map((player) => (
              <button
                key={player}
                onClick={() => setSelectedPlayer(player)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${selectedPlayer === player
                  ? "bg-celtics text-white shadow-md shadow-emerald-900/40"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white"
                  }`}
              >
                {player === "ALL" ? "All Players" : player}
              </button>
            ))}
          </div>
        </div>

        <hr className="border-neutral-800" />

        {/* 2. Tipo de Tiro: 2PT / 3PT */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
            Shot Type
          </label>
          <div className="grid grid-cols-3 gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
            {[
              { label: "All", value: "ALL" },
              { label: "2PT", value: "2PT" },
              { label: "3PT", value: "3PT" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setShotTypeFilter(tab.value as "ALL" | "2PT" | "3PT")}
                className={`py-1 text-xs font-semibold rounded-lg transition-all ${shotTypeFilter === tab.value
                  ? "bg-neutral-800 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Selector de Cuartos */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
            Periods
          </label>
          <div className="grid grid-cols-5 gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
            {[
              { label: "All", value: "ALL" },
              { label: "Q1", value: 1 },
              { label: "Q2", value: 2 },
              { label: "Q3", value: 3 },
              { label: "Q4", value: 4 },
            ].map((tab) => (
              <button
                key={tab.label}
                onClick={() => setSelectedPeriod(tab.value as any)}
                className={`py-1 text-xs font-bold rounded-lg transition-all ${selectedPeriod === tab.value
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Selector de Resultado: All / Made / Missed */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
            Shot type
          </label>
          <div className="grid grid-cols-3 gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
            {[
              { label: "All", value: "ALL", activeColor: "bg-neutral-800 text-white" },
              { label: "Made", value: "MADE", activeColor: "bg-amber-500 text-neutral-950 font-bold" },
              { label: "Missed", value: "MISSED", activeColor: "bg-rose-600 text-white font-bold" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setOutcomeFilter(tab.value as "ALL" | "MADE" | "MISSED")}
                className={`py-1 text-xs font-semibold rounded-lg transition-all ${outcomeFilter === tab.value
                  ? `${tab.activeColor} shadow-sm`
                  : "text-neutral-400 hover:text-white"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <hr className="border-white" />

      </aside>
    </div>
  );
}