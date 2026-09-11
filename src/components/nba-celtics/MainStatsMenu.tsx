
'use client'
import ShotChart, { ShotItem, ShotStats } from '@/components/nba-celtics/ShotChart';
import GameSelector from './GameSelector';
import { useState } from 'react';
import Image from 'next/image';
import { playersNBA_season2025_26 } from '@/lib/types';


export interface GameOption {
  gameId: string;
  gameDate: string | Date;
  matchup: string;
  status?: string;
}

interface Props {
  availableGames: GameOption[];
  activeGameId: string;
  shots: ShotItem[];
}

export default function MainStatsMenu({ availableGames, activeGameId, shots: rawShots }: Props) {

  const [stats, setStats] = useState<ShotStats | null>(null);

  // const playerImageSrc =
  //   stats?.selectedPlayer !== "ALL" && playersNBA_season2025_26[stats!.selectedPlayer]
  //     ? playersNBA_season2025_26[stats!.selectedPlayer]
  //     : "/celtics-logo.png";
  const isSpecificPlayer = Boolean(stats && stats.selectedPlayer !== "ALL");
  const playerImageSrc =
    isSpecificPlayer && stats?.selectedPlayer && playersNBA_season2025_26[stats.selectedPlayer]
      ? playersNBA_season2025_26[stats.selectedPlayer]
      : "/celtics-logo.png";


  return (
    <div className="w-full max-w-[1700px] mx-auto px-4 py-4 flex flex-col xl:flex-row gap-6 items-start justify-center">
      {/* BARRA LATERAL IZQUIERDA: Selector + Filtros */}
      <aside className="w-full xl:w-80 shrink-0 flex flex-col gap-4">
        {/* 1. Selector de Partido */}
        <GameSelector
          availableGames={availableGames}
          activeGameId={activeGameId}
          shots={rawShots}
        />
      </aside>

      {/* ÁREA PRINCIPAL: Cancha que ocupa todo el espacio restante */}
      <article className="flex-1 w-full min-w-0 flex flex-col">
        <section>
          {stats && (
            <div className="max-w-[900px] bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 md:p-5 mb-4 ml-3 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Caja de tamaño fijo invariable: nunca cambia la altura del layout */}
                <div className="size-20 shrink-0 flex items-center justify-center">
                  <Image
                    src={playerImageSrc}
                    alt={stats.selectedPlayer === "ALL" ? "Celtics Logo" : stats.selectedPlayer}
                    width={100}
                    height={100}
                    className={`select-none transition-transform duration-200 ${stats.selectedPlayer === "ALL"
                      ? "size-[72px] object-contain"
                      : "w-20 h-20 object-cover object-top border-4 border-violet-300"
                      }`}
                  />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-celtics block">
                    {stats.selectedPlayer === "ALL" ? "Team Shot Profile" : "Player Shot Profile"}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight bg-gradient-to-r from-zinc-200 via-neutral-400 to-zinc-100 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] filter contrast-125">
                    {stats.selectedPlayer === "ALL" ? "Boston Celtics" : stats.selectedPlayer}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 bg-neutral-950 px-5 py-2.5 rounded-xl border border-neutral-800 font-mono text-center">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase block font-sans">Attempts</span>
                  <strong className="text-lg text-white">{stats.totalCount}</strong>
                </div>
                <div className="border-l border-neutral-800 pl-4">
                  <span className="text-[10px] text-neutral-400 uppercase block font-sans">Made</span>
                  <strong className="text-lg text-amber-400">{stats.madeCount}</strong>
                </div>
                <div className="border-l border-neutral-800 pl-4">
                  <span className="text-[10px] text-neutral-400 uppercase block font-sans">Missed</span>
                  <strong className="text-lg text-rose-500">{stats.missedCount}</strong>
                </div>
                <div className="border-l border-neutral-800 pl-4">
                  <span className="text-[10px] text-neutral-400 uppercase block font-sans">Accuracy</span>
                  <strong className="text-lg text-blue-500">{stats.pct}%</strong>
                </div>
              </div>
            </div>
          )}
        </section>
        <ShotChart shots={rawShots} onStatsChange={setStats} />
      </article>
    </div>
  );
}