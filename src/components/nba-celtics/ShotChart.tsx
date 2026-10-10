"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import BasketballCourt from "./BasketballCourt";
import OutcomeComponent from "./OutcomeComponent";
import ShotDistanceComponent from "./ShotDistanceComponent";
import { DistanceRange, OutcomeFilter, PeriodFilter, ShotChartProps, ShotTimingFilter, ShotTypeFilter } from "@/lib/types";
import ShotTimingComponent from "./ShotTimingComponent";
import QuarterComponent from "./QuarterComponent";
import ShotRangeComponent from "./ShotRangeComponent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface FilterState {
  player: string;
  shotType: ShotTypeFilter;
  period: PeriodFilter;
  outcome: OutcomeFilter;
  distance: DistanceRange;
  timing: ShotTimingFilter;
}




export default function ShotChart({ shots, onStatsChange, onExportDataFilter, courtRef, initialFilters }: ShotChartProps) {

  const DEFAULT_FILTERS: FilterState = {
    player: initialFilters?.player || "ALL",
    shotType: (initialFilters?.shotType as ShotTypeFilter) || "ALL",
    period: (initialFilters?.period as PeriodFilter) || "ALL",
    outcome: (initialFilters?.outcome as OutcomeFilter) || "ALL",
    distance: (initialFilters?.distance as DistanceRange) || "ALL",
    timing: (initialFilters?.timing as ShotTimingFilter) || "ALL",
  };

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extraer nombres únicos ordenados
  const players = ["ALL", ...Array.from(new Set(shots.map((s) => s.playerName))).sort()];

  const filteredShots = useMemo(() => {
    return shots.filter((s) => {
      const matchPlayer = filters.player === "ALL" || s.playerName === filters.player;
      const matchType =
        filters.shotType === "ALL" ||
        (filters.shotType === "3PT" && s.shotType?.startsWith("3PT")) ||
        (filters.shotType === "2PT" && s.shotType?.startsWith("2PT"));
      const matchPeriod = filters.period === "ALL" || String(s.period) === String(filters.period);
      const shotOutcome =
        filters.outcome === "ALL" ||
        (filters.outcome === "MADE" && s.eventType === "Made Shot") ||
        (filters.outcome === "MISSED" && s.eventType === "Missed Shot");

      // 🏀 Filtro de distancia por rangos analíticos
      const dist = Number(s.shotDistance);
      const matchDistance =
        filters.distance === "ALL" ||
        (filters.distance === "RIM" && dist < 8) ||
        (filters.distance === "MID" && dist >= 8 && dist < 22) ||
        (filters.distance === "THREE" && dist >= 22);

      // ⏱️ Filtro de Timing (Minutos restantes en el reloj)
      const mins = Number(s.minutesRemaining ?? 12);
      const matchTiming =
        filters.timing === "ALL" ||
        (filters.timing === "LAST_5" && mins < 5) ||
        (filters.timing === "LAST_2" && mins < 2);

      return matchPlayer && matchType && matchPeriod && shotOutcome && matchDistance && matchTiming;
    });
  }, [filters, shots]);

  const filterAsideRef = useRef<HTMLElement | null>(null);

  const madeCount = filteredShots.filter((s) => s.eventType === "Made Shot").length;
  const totalCount = filteredShots.length;
  const pct = totalCount > 0 ? ((madeCount / totalCount) * 100).toFixed(1) : "0.0";
  const missedCount = totalCount - madeCount;

  const handlePlayerChange = (player: string) => {
    // 1. Resetea los filtros secundarios en memoria y guarda el nuevo jugador
    setFilters({
      ...DEFAULT_FILTERS,
      player
    });

    // 2. Tomamos los parámetros actuales (para no perder gameId)
    const params = new URLSearchParams(searchParams.toString());

    // 3. Limpiamos de la URL los filtros secundarios del jugador anterior
    ["shotType", "period", "outcome", "distance", "timing"].forEach((key) => {
      params.delete(key);
    });

    // 4. Si eligió un jugador concreto lo agregamos; si puso "ALL" lo sacamos
    if (player && player !== "ALL") {
      params.set("player", player);
    } else {
      params.delete("player");
    }

    // 5. Impactamos en la URL silenciosamente
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const handleFilterChange = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    // 1. Actualizamos el estado interno de React
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

    // 2. Tomamos los parámetros actuales que ya tiene la URL
    const params = new URLSearchParams(searchParams.toString());

    // 3. Si el valor es distinto de "ALL" y no está vacío, lo agregamos/actualizamos.
    //    Si el usuario volvió a poner "ALL", lo borramos de la URL para mantenerla limpia.
    if (value && value !== "ALL" && value !== "") {
      params.set(key, String(value));
    } else {
      params.delete(key);
    }

    // 4. Actualizamos la barra de direcciones sin recargar la página
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    // 1. Enviar métricas al Banner
    onStatsChange?.({
      totalCount,
      madeCount,
      missedCount,
      pct,
      selectedPlayer: filters.player,
    });

    // 2. Enviar datos a la tarjeta de exportación
    onExportDataFilter?.({
      filteredShots,
      filters: {
        player: filters.player,
        period: String(filters.period),
        shotType: filters.shotType,
        outcome: filters.outcome,
        distance: filters.distance,
        timing: filters.timing,
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    if (initialFilters) {
      setFilters({
        player: initialFilters.player || "ALL",
        shotType: (initialFilters.shotType as ShotTypeFilter) || "ALL",
        // Convertimos a número para que coincida con 1 | 2 | 3 | 4
        period:
          initialFilters.period && initialFilters.period !== "ALL"
            ? (Number(initialFilters.period) as PeriodFilter)
            : "ALL",
        outcome: (initialFilters.outcome as OutcomeFilter) || "ALL",
        distance: (initialFilters.distance as DistanceRange) || "ALL",
        timing: (initialFilters.timing as ShotTimingFilter) || "ALL",
      });
    } else {
      setFilters(DEFAULT_FILTERS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shots, initialFilters]);

  return (
    // <div className="w-full max-w-[1600px] mx-auto px-1 lg:px-4 flex flex-col xl:flex-row gap-6 items-start">
    <div className="w-full max-w-[1600px] mx-auto px-1 lg:px-4 flex flex-col xl:flex-row gap-6 items-center xl:items-stretch">
      {/* COLUMNA DERECHA: Cancha a escala completa */}
      <main className="flex-1 w-full min-w-0">
        <div
          ref={courtRef} // <-- Enganchamos la ref acá
          className="relative w-full aspect-[510/590] md:aspect-[1020/590] rounded-2xl overflow-hidden"
        >
          <BasketballCourt shots={filteredShots} isExport={false} />

          {shots.length === 0 && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity">
              <span className="text-xs font-mono text-neutral-300 uppercase tracking-widest animate-pulse">
                Loading game shots...
              </span>
            </div>
          )}
        </div>
      </main>

      {/* Solo aparece si hay filtros distintos de ALL */}
      {(filters.shotType !== "ALL" || filters.period !== "ALL" || filters.outcome !== "ALL" || filters.distance !== "ALL") && (
        <div className="visible lg:hidden flex items-center gap-1.5 px-2 py-1 mb-2 overflow-x-auto text-[10px] md:text-lg font-mono">
          <span className="text-neutral-500 uppercase tracking-wider font-sans font-bold text-[9px] md:text-lg">
            Filters:
          </span>

          {filters.shotType !== "ALL" && (
            <span className="bg-neutral-800 text-neutral-200 px-2 py-0.5 rounded-full border border-neutral-700 flex items-center gap-1">
              {filters.shotType}
              <button onClick={() => handleFilterChange("shotType", "ALL")} className="text-neutral-400 hover:text-white">✕</button>
            </span>
          )}

          {filters.period !== "ALL" && (
            <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
              Q{filters.period}
              <button onClick={() => handleFilterChange("period", "ALL")} className="text-emerald-400 hover:text-white">✕</button>
            </span>
          )}

          {filters.outcome !== "ALL" && (
            <span className={`px-2 py-0.5 rounded-full border flex items-center gap-1 ${filters.outcome === "MADE"
              ? "bg-amber-950/80 text-amber-300 border-amber-800"
              : "bg-rose-950/80 text-rose-300 border-rose-800"
              }`}>
              {filters.outcome === "MADE" ? "Made" : "Missed"}
              <button onClick={() => handleFilterChange("outcome", "ALL")} className="hover:text-white">✕</button>
            </span>
          )}

          {filters.distance !== "ALL" && (
            <span className={`px-2 py-0.5 rounded-full border flex items-center gap-1 ${filters.distance === "RIM"
              ? "bg-cyan-950/80 text-cyan-300 border-cyan-800"
              : "bg-violet-950/80 text-violet-300 border-violet-800"
              }`}>
              {filters.distance === "RIM" ? "<8ft" : filters.distance === "MID" ? "8-22ft" : "22ft+"}
              <button onClick={() => handleFilterChange("distance", "ALL")} className="hover:text-white">✕</button>
            </span>
          )}

          {filters.timing !== "ALL" && (
            <span className="bg-amber-950/80 text-amber-300 border border-amber-800 px-2 py-0.5 rounded-full flex items-center gap-1">
              {filters.timing === "LAST_5" ? "< 5 min" : "< 2 min"}
              <button onClick={() => handleFilterChange("timing", "ALL")} className="hover:text-white">✕</button>
            </span>
          )}

          {/* Reset rápido */}
          <button
            onClick={() => {
              setFilters(DEFAULT_FILTERS);
              const params = new URLSearchParams();
              const gameId = searchParams.get("gameId");
              if (gameId) params.set("gameId", gameId);
              router.replace(`${pathname}?${params.toString()}`, { scroll: false });
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
              value={filters.player}
              onChange={(e) => {
                handlePlayerChange(e.target.value);
                //setIsFilterOpen(false); // Descomentá esta línea si querés que se cierre solo al elegir jugador
              }}
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
                // onClick={() => setSelectedPlayer(player)}
                onClick={() => handlePlayerChange(player)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${filters.player === player
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
        <ShotRangeComponent
          shotTypeFilter={filters.shotType}
          setShotTypeFilter={(value) => handleFilterChange("shotType", value)}
        />
        {/* 3. Selector de Cuartos */}
        <QuarterComponent
          selectedPeriod={filters.period} setSelectedPeriod={(value) => handleFilterChange("period", value)} />
        {/* 4. Selector de Resultado: All / Made / Missed */}
        <OutcomeComponent outcomeFilter={filters.outcome} setOutcomeFilter={(value) => handleFilterChange("outcome", value)} />
        {/* 5. Selector de Distancia: All / RIM / MID / THREE */}
        <ShotDistanceComponent distanceFilter={filters.distance} setDistanceFilter={(value) => handleFilterChange("distance", value)} />
        {/* 6. Selector de Tiempo: All / Last 5m / Last 2m */}
        <ShotTimingComponent timingFilter={filters.timing} setTimingFilter={(value) => handleFilterChange("timing", value)} />

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