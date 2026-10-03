import { TeamComparisonProps } from "@/lib/types";
import { ArrowUp, ArrowDown } from "lucide-react";


const TrendIndicator: React.FC<{ current: number; season: number }> = ({ current, season }) => {
  const diff = current - season;
  const isBetter = diff >= 0;
  const color = isBetter ? "text-green-400 z-10" : "text-red-500 z-10";
  const Icon = isBetter ? ArrowUp : ArrowDown;

  return (
    <p className={`font-mono text-xs sm:text-base ${color} flex items-center justify-end gap-0.5 sm:gap-1 font-semibold`}>
      <Icon className="size-3 sm:size-4 shrink-0" strokeWidth={3} />
      <span>{Math.abs(diff).toFixed(1)}%</span>
    </p>
  );
};

export const TeamSeasonComparison: React.FC<TeamComparisonProps> = ({ seasonData, matchPctData }) => {

  if (!seasonData) {
    return (
      <div className="w-full flex justify-center py-4 px-2 sm:px-0">
        <div className="animate-pulse h-28 w-full max-w-4xl bg-neutral-900/60 rounded-xl sm:rounded-2xl border border-neutral-800" />
      </div>
    );
  }

  const rows = [
    {
      label: "Total FG%",
      match: Number(matchPctData.fgPct) || 0,
      season: Number(seasonData.seasonFg) || 0,
    },
    {
      label: "2-Pointers",
      match: Number(matchPctData.fg2Pct) || 0,
      season: Number(seasonData.seasonFg2) || 0,
    },
    {
      label: "3-Pointers",
      match: Number(matchPctData.fg3Pct) || 0,
      season: Number(seasonData.seasonFg3) || 0,
    },
  ];

  return (
    <div className="w-full flex justify-center py-4 sm:py-8 px-2 sm:px-0">
      <div className="w-full dark relative overflow-hidden max-w-4xl !bg-[#0b0f12] border border-neutral-800/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 shadow-2xl">
        {/* Background video continuo en loop */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none !opacity-60 z-0"
        >
          <source
            src="https://res.cloudinary.com/dhbig9jt8/video/upload/v1789435877/film-grain-background_ka1tdo.mp4"
            type="video/mp4"
          />
        </video>

        {/* Encabezado: apilado en mobile, fila en desktop */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800/60 pb-2.5 sm:pb-3 mb-3 sm:mb-4 gap-1 sm:gap-0">
          <span className="text-xs sm:text-base uppercase tracking-wider text-neutral-300 font-bold z-10">TEAM STATS (ALL FG%)</span>
          <span className="text-[11px] sm:text-sm font-mono text-neutral-300 z-10">Current Game vs Regular Season</span>
        </div>

        {/* Cabecera de columnas con proporciones ajustadas */}
        <div className="grid grid-cols-4 text-[11px] sm:text-sm font-semibold uppercase tracking-wider pb-2 border-b border-neutral-800/40">
          <span className="z-10 text-celtics">Metric</span>
          <span className="text-center z-10 text-celtics">This Game</span>
          <span className="text-center z-10 text-celtics">Reg Season</span>
          <span className="text-right z-10 text-celtics">Trend</span>
        </div>

        {/* Filas renderizadas limpias */}
        {rows.map((row, idx) => (
          <div
            key={row.label}
            className={`grid grid-cols-4 items-center py-2.5 sm:py-3 text-xs sm:text-base font-mono ${idx !== rows.length - 1 ? "border-b border-neutral-800/30" : ""
              }`}
          >
            <span className="font-sans font-bold text-neutral-400 z-10 truncate">
              {row.label}
            </span>
            <span className="text-center font-bold text-white z-10 text-xs sm:text-lg">
              {row.match.toFixed(1)}%
            </span>
            <span className="text-center text-neutral-400 z-10 text-xs sm:text-lg">
              {row.season.toFixed(1)}%
            </span>
            <TrendIndicator current={row.match} season={row.season} />
          </div>
        ))}

        {/* <span className="text-white z-10">Agregar volumen de disparos - disparos totales lanzados (% 2pt y % 3pt) y compararlos con el % de temporada</span> */}

      </div>
    </div>
  );
};
