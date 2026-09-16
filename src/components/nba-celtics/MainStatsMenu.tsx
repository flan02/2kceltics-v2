
'use client'
import ShotChart, { ShotItem, ShotStats } from '@/components/nba-celtics/ShotChart';
import GameSelector from './GameSelector';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { playersNBA_season2025_26 } from '@/lib/types';
import Link from 'next/link';
import { ExportCardButton } from './ExportCardButton';
import { ExportShotChartCard } from "./ExportShotChartCard";


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
  const isLoading = !rawShots || rawShots.length === 0 || stats === null;

  const courtContainerRef = useRef<HTMLDivElement>(null);
  const exportCardRef = useRef<HTMLDivElement>(null);

  const currentGame = availableGames.find((g) => g.gameId === activeGameId);
  const matchupText = currentGame?.matchup || "Boston Celtics";

  // 1. Identificamos si explícitamente se pidió ver todo el equipo
  const isAll = !stats || stats.selectedPlayer === "ALL";

  // 2. Buscamos la foto en tu diccionario de la temporada
  const playerPhoto = stats?.selectedPlayer
    ? playersNBA_season2025_26[stats.selectedPlayer]
    : null;

  // 3. Solo mostramos el logo si es "ALL" o si no encontramos foto para ese jugador
  const playerImageSrc = isAll
    ? "/celtics-logo.png"
    : playerPhoto || "/celtics-logo.png";

  return (
    <div className="w-full max-w-[1500px] mx-auto px-2 lg:px-4 py-2 lg:py-4 flex flex-col gap-4">
      {/* FILA SUPERIOR: GameSelector a la izquierda + Banner de Stats a la derecha */}
      <div className="w-full flex flex-col xl:flex-row gap-4 items-stretch">
        {/* 1. Selector de Partido (Ancho fijo en XL) */}
        <div className="w-full xl:w-80 shrink-0 space-y-1">
          <GameSelector
            availableGames={availableGames}
            activeGameId={activeGameId}
            shots={rawShots}
          />

          {/* Export and Share button */}
          <div className="flex justify-end xl:justify-center">
            <ExportCardButton
              stats={stats}
              gameMatchup={matchupText}
              // courtRef={courtContainerRef}
              courtRef={exportCardRef}
            />
          </div>
        </div>

        {/* 2. Banner de Estadísticas del Jugador (Ocupa todo el ancho restante) */}
        <div className="dark relative overflow-hidden flex-1 w-full min-w-0 !bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-3 sm:p-4 shadow-xl min-h-[96px] sm:min-h-[104px] flex items-center">
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

          {/* Overlay negro puro */}
          <div className="absolute inset-0 !bg-black/40 z-0 pointer-events-none" />

          {/* CONTENIDO CONDICIONAL */}
          {isLoading ? (
            /* SKELETON (Se muestra mientras isLoading sea true) */
            <div className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 animate-pulse">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto min-w-0">
                <div className="size-12 sm:size-16 rounded-full bg-neutral-800 shrink-0 border border-neutral-700/50" />
                <div className="flex flex-col gap-2 min-w-0">
                  <div className="h-2.5 sm:h-3 w-28 bg-neutral-800 rounded" />
                  <div className="h-5 sm:h-6 w-40 sm:w-52 bg-neutral-800 rounded" />
                </div>
              </div>

              <div className="w-full sm:w-auto grid grid-cols-4 gap-2 !bg-black/85 px-3 lg:px-6 py-2 rounded-xl border border-neutral-800 shrink-0">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center gap-1.5 ${i > 0 ? "border-l border-neutral-800 pl-2 sm:pl-3" : ""
                      }`}
                  >
                    <div className="h-2 w-7 bg-neutral-800 rounded" />
                    <div className="h-4 sm:h-5 w-8 bg-neutral-700 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* CONTENIDO REAL (Se muestra cuando llegan las stats) */
            <div className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 transition-opacity duration-300">
              {/* Perfil: Avatar + Nombre */}
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto min-w-0">
                <div className="size-12 sm:size-16 shrink-0 flex items-center justify-center bg-neutral-950 overflow-hidden">
                  <Image
                    key={playerImageSrc}
                    src={playerImageSrc}
                    alt={
                      stats?.selectedPlayer === "ALL"
                        ? "Celtics Logo"
                        : stats?.selectedPlayer || "Player"
                    }
                    width={80}
                    height={80}
                    priority
                    className={`select-none transition-opacity duration-150 ${stats?.selectedPlayer === "ALL"
                      ? "size-12 sm:size-20 object-contain"
                      : "size-12 sm:size-16 rounded-sm object-cover object-top border-[0.5px] lg:border border-violet-300"
                      }`}
                  />
                </div>

                <div className="min-w-0">
                  <span className="text-[9px] sm:text-xs font-bold uppercase tracking-widest text-celtics block">
                    {stats?.selectedPlayer === "ALL"
                      ? "Team Shot Profile"
                      : "Player Shot Profile"}
                  </span>
                  <h2 className="text-base sm:text-xl md:text-2xl font-black uppercase tracking-tight truncate bg-gradient-to-r from-zinc-200 via-neutral-400 to-zinc-100 bg-clip-text text-transparent drop-shadow-sm">
                    {stats?.selectedPlayer === "ALL"
                      ? "Boston Celtics"
                      : stats?.selectedPlayer}
                  </h2>
                </div>
              </div>

              {/* Métricas: Att / Made / Miss / Acc */}
              <div className="w-full sm:w-auto grid grid-cols-4 gap-2 !bg-black/85 px-3 lg:px-6 py-2 rounded-xl border border-neutral-800 font-mono text-center shrink-0">
                <div>
                  <span className="text-[9px] lg:text-sm !text-neutral-400 uppercase block font-sans">
                    Att
                  </span>
                  <strong className="text-sm sm:text-base !text-white">
                    {stats?.totalCount ?? 0}
                  </strong>
                </div>
                <div className="border-l border-neutral-800 pl-2 sm:pl-3">
                  <span className="text-[9px] lg:text-sm !text-neutral-400 uppercase block font-sans">
                    Made
                  </span>
                  <strong className="text-sm sm:text-base !text-amber-400">
                    {stats?.madeCount ?? 0}
                  </strong>
                </div>
                <div className="border-l border-neutral-800 pl-2 sm:pl-3">
                  <span className="text-[9px] lg:text-sm !text-neutral-400 uppercase block font-sans">
                    Miss
                  </span>
                  <strong className="text-sm sm:text-base !text-rose-500">
                    {stats?.missedCount ?? 0}
                  </strong>
                </div>
                <div className="border-l border-neutral-800 pl-2 sm:pl-3">
                  <span className="text-[9px] lg:text-sm !text-neutral-400 uppercase block font-sans">
                    Acc
                  </span>
                  <strong className="text-sm sm:text-base !text-blue-400">
                    {stats?.pct ?? "0.0"}%
                  </strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FILA INFERIOR: ShotChart (Cancha + Panel de Filtros) */}
      <div className="w-full">
        <ShotChart
          shots={rawShots}
          onStatsChange={setStats}
        // courtRef={courtContainerRef}
        />
      </div>

      {/* TARJETA OCULTA PARA EXPORTAR: html-to-image le saca la foto a este nodo */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none">
        <ExportShotChartCard
          ref={exportCardRef}
          shots={rawShots}
          stats={stats}
          gameMatchup={matchupText}
          playerImageSrc={playerImageSrc}
        />
      </div>

      <br className="" />
      <Link href='/' className="w-min mx-auto dark:bg-white dark:text-black bg-black text-white rounded-md px-4 py-2 uppercase text-xs font-bold">back</Link>
    </div>
  );
}