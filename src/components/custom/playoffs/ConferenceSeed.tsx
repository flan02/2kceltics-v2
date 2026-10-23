'use client'
import { FormField } from '@/components/ui/form'
import Image from 'next/image'
import { useState } from 'react'
import { Game } from './UpdatePlayoffsForm'
import { Round } from '@/lib/types'
import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import { formatRound, getRival, getRoundBadgeStyle, getSeriesScore, isWaitingForPreviousRound } from '@/lib/utils'

type Props = {
  conference: 'WEST' | 'EAST';
  control: Control<any>;
  allGames: Game[];
  handleWin: (id: string) => void;
}

const ConferenceSeed = ({ conference, control, allGames, handleWin }: Props) => {



  const conferenceGames = allGames.filter((g) => g.conference === conference);

  return (
    <section className="space-y-2">
      <h1 className="uppercase text-celtics dark:text-celtics text-2xl text-center mb-6">
        {conference} CONFERENCE
      </h1>

      {conferenceGames
        .sort((a, b) => Number(a.position) - Number(b.position))
        .map((seed) => {
          // Buscamos rival y calculamos récords consultando el universo de 16 equipos (allGames)
          const rival = getRival(seed, allGames);
          const hasNoRivalYet = !rival;
          const waitingRound = isWaitingForPreviousRound(seed.wins, allGames);
          const isButtonDisabled = seed.eliminated || seed.disabled || hasNoRivalYet || waitingRound;
          const score = getSeriesScore(seed, allGames);

          return (
            <section
              key={seed.id}
              className={`p-2 rounded-md ${seed.eliminated
                ? 'bg-zinc-100 opacity-50 dark:bg-black dark:opacity-40'
                : 'border dark:bg-zinc-900/50 dark:hover:bg-zinc-800/30 hover:bg-zinc-100/50'
                }`}
            >
              <div
                className={`${seed.eliminated ? 'line-through' : ''
                  } flex items-center space-x-2 text-lg text-muted-foreground dark:text-zinc-600`}
              >
                <Image
                  src={`/logos/${seed.team_code}.png`}
                  width={34}
                  height={34}
                  alt={seed.team_code}
                />
                <div className="flex items-center space-x-2">
                  <span>
                    {seed.team_code} ({seed.position})
                  </span>

                  <span
                    className={`text-xs px-2 py-0.5 rounded font-semibold ${getRoundBadgeStyle(
                      seed.round
                    )}`}
                  >
                    {formatRound(seed.round)}
                  </span>

                  <span className="text-zinc-400">|</span>

                  <p>
                    {score.wins} <span className="text-celtics font-bold">W</span>{' '}
                    {score.losses} <span className="text-red-500 font-bold">L</span>
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 items-center mt-2">
                <button
                  onClick={() => handleWin(seed.id)}
                  disabled={isButtonDisabled}
                  type="button"
                  title={
                    hasNoRivalYet && !seed.eliminated
                      ? 'Esperando rival'
                      : ''
                  }
                  className={`px-3 py-1.5 rounded-md border text-sm font-semibold transition-colors ${isButtonDisabled
                    ? 'border-zinc-300 dark:border-zinc-700 text-zinc-400 dark:text-zinc-600 cursor-not-allowed bg-zinc-100/50 dark:bg-zinc-800/30'
                    : 'border-blue-500 text-blue-400 hover:bg-blue-400 hover:text-blue-700'
                    }`}
                >
                  +1 WIN
                </button>

                {seed.eliminated && (
                  <span className="ml-auto text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30">
                    Eliminated
                  </span>
                )}

                {/* FormFields ocultos para persistir la data en Prisma */}
                <FormField
                  control={control}
                  name={`seed_${conference}_${seed.position}.eliminated`}
                  render={({ field }) => (
                    <input type="hidden" {...field} value={String(seed.eliminated)} />
                  )}
                />
                <FormField
                  control={control}
                  name={`seed_${conference}_${seed.position}.id`}
                  render={({ field }) => <input type="hidden" {...field} />}
                />
                <FormField
                  control={control}
                  name={`seed_${conference}_${seed.position}.position`}
                  render={({ field }) => <input type="hidden" {...field} />}
                />
                <FormField
                  control={control}
                  name={`seed_${conference}_${seed.position}.conference`}
                  render={({ field }) => <input type="hidden" {...field} />}
                />
                <FormField
                  control={control}
                  name={`seed_${conference}_${seed.position}.round`}
                  render={({ field }) => <input type="hidden" {...field} />}
                />
                <FormField
                  control={control}
                  name={`seed_${conference}_${seed.position}.playoffsId`}
                  render={({ field }) => <input type="hidden" {...field} />}
                />
              </div>
            </section>
          );
        })}
    </section>
  );
}

export default ConferenceSeed