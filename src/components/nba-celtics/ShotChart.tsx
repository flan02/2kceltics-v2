"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import BasketballCourt from "./BasketballCourt";
import { ShotChartExportData } from "./ExportShotChartCard";

export interface ShotItem {
  id: string;
  locX: number;
  locY: number;
  eventType: string;
  playerName: string;
  actionType: string;
  shotType: string; // "2PT Field Goal" | "3PT Field Goal"
  period: number | "ALL";
  shotDistance: number;
  minutesRemaining: number;
  secondsRemaining: number;
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
  onExportDataFilter?: (filters: ShotChartExportData) => void;
  courtRef?: React.Ref<HTMLDivElement>;
}

export interface CourtFilters {
  player: string;   // "ALL" | nombre del jugador
  period: string;   // "ALL" | "Q1" | "Q2" | "Q3" | "Q4"
  shotType: string;    // "ALL" | "2PT" | "3PT"
  outcome: string;  // "ALL" | "Made" | "Missed"
}

export const INITIAL_FILTERS: CourtFilters = {
  player: "ALL",
  period: "ALL",
  shotType: "ALL",
  outcome: "ALL",
};

export interface CourtExportData {
  filteredShots: ShotItem[];
  filters: {
    player: string;
    period: string;
    shotType: string;
    outcome: string;
  };
}

type PeriodFilter = "ALL" | 1 | 2 | 3 | 4;

export default function ShotChart({ shots, onStatsChange, onExportDataFilter, courtRef }: ShotChartProps) {
  // const [exportFilters, setExportFilters] = useState<CourtFilters>(INITIAL_FILTERS);

  const [selectedPlayer, setSelectedPlayer] = useState<string>("ALL");
  const [shotTypeFilter, setShotTypeFilter] = useState<"ALL" | "2PT" | "3PT">("ALL");
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>("ALL");
  const [outcomeFilter, setOutcomeFilter] = useState<"ALL" | "MADE" | "MISSED">("ALL");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extraer nombres únicos ordenados
  const players = ["ALL", ...Array.from(new Set(shots.map((s) => s.playerName))).sort()];

  const filteredShots = useMemo(() => {
    return shots.filter((s) => {
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
  }, [shots, selectedPlayer, shotTypeFilter, selectedPeriod, outcomeFilter]);

  const filterAsideRef = useRef<HTMLElement | null>(null);

  const madeCount = filteredShots.filter((s) => s.eventType === "Made Shot").length;
  const totalCount = filteredShots.length;
  const pct = totalCount > 0 ? ((madeCount / totalCount) * 100).toFixed(1) : "0.0";
  const missedCount = totalCount - madeCount;

  useEffect(() => {
    // 1. Enviar métricas al Banner
    onStatsChange?.({
      totalCount,
      madeCount,
      missedCount,
      pct,
      selectedPlayer,
    });

    // 2. Enviar datos a la tarjeta de exportación
    onExportDataFilter?.({
      filteredShots,
      filters: {
        player: selectedPlayer,
        period: String(selectedPeriod),
        shotType: shotTypeFilter,
        outcome: outcomeFilter,
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shots, selectedPlayer, selectedPeriod, shotTypeFilter, outcomeFilter]);

  return (
    // <div className="w-full max-w-[1600px] mx-auto px-1 lg:px-4 flex flex-col xl:flex-row gap-6 items-start">
    <div className="w-full max-w-[1600px] mx-auto px-1 lg:px-4 flex flex-col xl:flex-row gap-6 items-center xl:items-stretch">
      {/* COLUMNA DERECHA: Cancha a escala completa */}
      <main className="flex-1 w-full min-w-0">
        <div
          ref={courtRef} // <-- Enganchamos la ref acá
          className="relative w-full aspect-[510/590] md:aspect-[1020/590] rounded-2xl overflow-hidden ..."
        >
          <BasketballCourt shots={filteredShots} />
        </div>
      </main>

      {/* Solo aparece si hay filtros distintos de ALL */}
      {(shotTypeFilter !== "ALL" || selectedPeriod !== "ALL" || outcomeFilter !== "ALL") && (
        <div className="visible lg:hidden flex items-center gap-1.5 px-2 py-1 mb-2 overflow-x-auto text-[10px] md:text-lg font-mono">
          <span className="text-neutral-500 uppercase tracking-wider font-sans font-bold text-[9px] md:text-lg">
            Filters:
          </span>

          {shotTypeFilter !== "ALL" && (
            <span className="bg-neutral-800 text-neutral-200 px-2 py-0.5 rounded-full border border-neutral-700 flex items-center gap-1">
              {shotTypeFilter}
              <button onClick={() => setShotTypeFilter("ALL")} className="text-neutral-400 hover:text-white">✕</button>
            </span>
          )}

          {selectedPeriod !== "ALL" && (
            <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
              Q{selectedPeriod}
              <button onClick={() => setSelectedPeriod("ALL")} className="text-emerald-400 hover:text-white">✕</button>
            </span>
          )}

          {outcomeFilter !== "ALL" && (
            <span className={`px-2 py-0.5 rounded-full border flex items-center gap-1 ${outcomeFilter === "MADE"
              ? "bg-amber-950/80 text-amber-300 border-amber-800"
              : "bg-rose-950/80 text-rose-300 border-rose-800"
              }`}>
              {outcomeFilter}
              <button onClick={() => setOutcomeFilter("ALL")} className="hover:text-white">✕</button>
            </span>
          )}

          {/* Reset rápido */}
          <button
            onClick={() => {
              setShotTypeFilter("ALL");
              setSelectedPeriod("ALL");
              setOutcomeFilter("ALL");
            }}
            className="text-neutral-500 hover:text-neutral-300 underline text-[9px] md:text-xs underline-offset-2 ml-1 uppercase"
          >
            Clear
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setIsFilterOpen(true)
          setTimeout(() => {
            filterAsideRef.current?.scrollIntoView({
              behavior: "smooth", // animación suave
              block: "center",    // clava el componente exactamente al medio vertical de la pantalla
            });
          }, 50);
        }}
        className="lg:hidden flex items-center mx-auto bg-violet-400 justify-center gap-2 text-white dark:text-neutral-950 font-black px-4 py-3 rounded-full shadow-2xl active:scale-95 cursor-pointer"
      >
        {/* Icono Trueno ⚡ */}
        <svg
          className="size-4 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
        </svg>
        <span className="text-xs uppercase tracking-wider text-white dark:text-black">Filters</span>
      </button>

      {isFilterOpen && (
        <div
          onClick={() => setIsFilterOpen(false)}
          className="xl:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-10 transition-opacity"
        />
      )}

      {/* COLUMNA LATERAL: Filtros y Estadísticas */}
      <aside
        ref={filterAsideRef}
        className={`bg-white lg:bg-white/30 dark:bg-neutral-900/95 border border-slate-700 rounded-2xl shadow-2xl backdrop-blur-md fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[92%] max-w-sm max-h-[85vh] overflow-y-auto px-5 pb-8 py-5 lg:p-5 xl:static xl:w-80 xl:max-w-none xl:translate-x-0 xl:translate-y-0 xl:z-auto xl:max-h-none xl:overflow-visible xl:p-5 xl:shrink-0 ${isFilterOpen ? "flex flex-col gap-4" : "hidden xl:flex xl:flex-col xl:gap-4"}`}
      >
        {/* Header Mobile: Título + Botón ✕ Close */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800 xl:hidden">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-celtics">
              Shot Filters
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsFilterOpen(false)}
            className="text-neutral-400 hover:text-white text-xs font-black uppercase px-2 py-1 rounded-md transition-colors cursor-pointer"
          >
            ❌ Close
          </button>
        </div>

        {/* 1. Selector de Jugadores */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-celtics mb-2">
            Players
          </label>

          {/* Vista Mobile: Select desplegable nativo */}
          <div className="xl:hidden">
            <select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white font-semibold outline-none focus:border-emerald-500 transition-colors"
            >
              {players.map((player) => (
                <option key={player} value={player} className="bg-neutral-900 text-white">
                  {player === "ALL" ? "All Players (Team)" : player}
                </option>
              ))}
            </select>
          </div>

          {/* Vista Desktop: Grilla de chips/botones */}
          <div className="hidden xl:flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
            {players.map((player) => (
              <button
                key={player}
                type="button"
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
            Shot Range
          </label>
          <div className="grid grid-cols-3 gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
            {[
              { label: "All", value: "ALL" },
              { label: "2PT", value: "2PT" },
              { label: "3PT", value: "3PT" },
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setShotTypeFilter(tab.value as "ALL" | "2PT" | "3PT")}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${shotTypeFilter === tab.value
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
                type="button"
                onClick={() => setSelectedPeriod(tab.value as any)}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${selectedPeriod === tab.value
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
            Outcome
          </label>
          <div className="grid grid-cols-3 gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
            {[
              { label: "All", value: "ALL", activeColor: "bg-neutral-800 text-white" },
              { label: "Made", value: "MADE", activeColor: "bg-amber-500 text-neutral-950 font-bold" },
              { label: "Missed", value: "MISSED", activeColor: "bg-rose-600 text-white font-bold" },
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setOutcomeFilter(tab.value as "ALL" | "MADE" | "MISSED")}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${outcomeFilter === tab.value
                  ? `${tab.activeColor} shadow-sm`
                  : "text-neutral-400 hover:text-white"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Botón Aplicar en Mobile */}
        <button
          type="button"
          onClick={() => setIsFilterOpen(false)}
          className="xl:hidden w-full mt-2 py-3 bg-teal-400 hover:bg-teal-500 text-neutral-950 font-black rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-transform cursor-pointer"
        >
          Apply & View Court
        </button>
      </aside>


    </div>
  );
}