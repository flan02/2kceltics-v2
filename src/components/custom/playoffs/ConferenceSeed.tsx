'use client'
import { FormField } from '@/components/ui/form'
import Image from 'next/image'
import { useState } from 'react'
import { Game } from './UpdatePlayoffsForm'
import { Round } from '@/lib/types'
import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import { formatRound, getRival, getRoundBadgeStyle, getSeriesScore } from '@/lib/utils'

type Props = {
  seeds: any[];
  conference: 'WEST' | 'EAST';
  control: Control<any>;
  allSeeds: any[];
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
}

const ConferenceSeed = ({ seeds, conference, control, setValue, getValues, allSeeds }: Props) => {

  const initGames: Game[] = seeds.map((seed: any) => ({
    id: seed.id,
    wins: seed.wins ?? 0,
    team_code: seed.team_code,
    position: String(seed.position),
    losses: seed.losses ?? 0,
    disabled: false,
    eliminated: seed.eliminated ?? false,
    round: seed.round ?? Round.FIRST_ROUND,
    conference: seed.conference
  }))

  // console.log("These are teams in the playoffs bracket", seeds);

  const [games, setGames] = useState<Game[]>(initGames);

  // Calcula la siguiente ronda según las victorias acumuladas
  const getNextRound = (wins: number, conf: 'WEST' | 'EAST') => {
    const w = Number(wins);
    if (w >= 12) return Round.FINALS;
    if (w >= 8) return conf === 'EAST' ? Round.ECF : Round.WCF;
    if (w >= 4) return conf === 'EAST' ? Round.ECSF : Round.WCSF;
    return Round.FIRST_ROUND;
  };

  // Helper para obtener todos los equipos del formulario sincronizados
  const getAllTeamsFromForm = (): Game[] => {
    const currentValues = getValues();
    return Object.values(currentValues)
      .filter((val: any) => val && val.id)
      .map((val: any) => ({
        id: val.id,
        position: String(val.position),
        conference: val.conference,
        wins: Number(val.wins ?? 0),
        losses: Number(val.losses ?? 0),
        eliminated: Boolean(val.eliminated),
        round: val.round ?? Round.FIRST_ROUND,
        team_code: val.team_code ?? "",
        disabled: false,
      }));
  };



  const handleWin = (winnerId: string) => {
    const winner = games.find((g) => g.id === winnerId);
    if (!winner) return;

    if (winner.disabled) {
      alert("Solo podés actualizar un partido por turno.");
      return;
    }

    if (winner.wins >= 16) {
      alert("¡Llegó a 16 victorias, ya es campeón!");
      return;
    }

    // Obtenemos el snapshot completo de equipos (incluyendo los de la otra conferencia si están en el form)
    const currentValues = getValues();
    const allGamesFromForm: Game[] = Object.values(currentValues).map((val: any) => ({
      id: val.id,
      position: String(val.position),
      conference: val.conference,
      wins: Number(val.wins ?? 0),
      losses: Number(val.losses ?? 0),
      eliminated: Boolean(val.eliminated),
      round: val.round ?? Round.FIRST_ROUND,
      team_code: '',
      disabled: false,
    }));

    const rival = getRival(winner, allGamesFromForm);

    if (!rival) {
      alert("No se encontró el rival o la serie anterior de la llave aún no finalizó.");
      return;
    }


    const nextWinnerWins = Number(winner.wins) + 1;
    const nextRivalLosses = Number(rival.losses) + 1;

    // Se cierra la serie al llegar a 4, 8, 12 o 16 victorias
    const isSeriesOver = nextWinnerWins % 4 === 0;
    const nextWinnerRound = getNextRound(nextWinnerWins, winner.conference);

    // 1. Actualizamos el Ganador en el Formulario
    setValue(`seed_${winner.conference}_${winner.position}.wins`, nextWinnerWins);
    setValue(`seed_${winner.conference}_${winner.position}.round`, nextWinnerRound);

    // 2. Actualizamos el Rival en el Formulario (+1 derrota, y si cerró la serie se marca eliminado)
    setValue(`seed_${rival.conference}_${rival.position}.losses`, nextRivalLosses);
    if (isSeriesOver) {
      setValue(`seed_${rival.conference}_${rival.position}.eliminated`, true);
    }

    // 3. Sincronizamos el estado local
    setGames((prev) =>
      prev.map((g) => {
        if (g.id === winner.id) {
          return {
            ...g,
            wins: nextWinnerWins,
            round: nextWinnerRound,
            disabled: true,
          };
        }
        if (g.id === rival.id) {
          return {
            ...g,
            losses: nextRivalLosses,
            eliminated: isSeriesOver ? true : g.eliminated,
            disabled: true,
          };
        }
        return g;
      })
    );
  };

  return (
    <section className="space-y-2">
      <h1 className="uppercase text-celtics dark:text-celtics text-2xl text-center mb-6">
        {conference} CONFERENCE
      </h1>

      {games
        .sort((a, b) => Number(a.position) - Number(b.position))
        .map((seed) => {
          const allTeams = getAllTeamsFromForm();
          const rival = getRival(seed, allTeams);
          const hasNoRivalYet = !rival;
          const isButtonDisabled = seed.eliminated || seed.disabled || hasNoRivalYet;
          const score = getSeriesScore(seed, allTeams);
          return (
            <section
              key={seed.id}
              className={`p-2 rounded-md ${seed.eliminated
                ? "bg-zinc-100 opacity-50 dark:bg-black dark:opacity-40"
                : "border dark:bg-zinc-900/50 dark:hover:bg-zinc-800/30 hover:bg-zinc-100/50"
                }`}
            >
              <div className={`${seed.eliminated ? "line-through opacity-50" : ""} flex items-center space-x-2 text-lg text-muted-foreground dark:text-zinc-400`}>
                <Image
                  src={`/logos/${seed.team_code}.png`}
                  width={34}
                  height={34}
                  alt={seed.team_code}
                />
                <p className="flex items-center space-x-2 font-medium">
                  <span>{seed.team_code} ({seed.position})</span>
                  {/* Badge destacado para la ronda */}
                  <span className={`text-xs px-2 py-0.5 rounded font-semibold ${getRoundBadgeStyle(seed.round)}`}>
                    {formatRound(seed.round)}
                  </span>


                  <span className="text-zinc-400">|</span>
                  <p>
                    {score.wins} <span className="text-celtics font-bold">W</span>{' '}
                    {score.losses} <span className="text-red-500 font-bold">L</span>
                  </p>

                </p>
              </div>


              <div className="flex space-x-4 items-center mt-2">
                <button
                  onClick={() => handleWin(seed.id)}
                  disabled={isButtonDisabled}
                  type="button"
                  title={hasNoRivalYet && !seed.eliminated ? "Esperando la definición de la otra serie" : ""}
                  className={`px-3 py-1.5 rounded-md border text-sm font-semibold transition-colors ${isButtonDisabled
                    ? "border-zinc-300 dark:border-zinc-700 text-zinc-400 dark:text-zinc-600 cursor-not-allowed bg-zinc-100/50 dark:bg-zinc-800/30"
                    : "border-celtics text-celtics hover:bg-celtics hover:text-black"
                    }`}
                >
                  +1 WIN
                </button>
                {/* Badge de Eliminado al extremo derecho */}
                {seed.eliminated && (
                  <span className="ml-auto text-[8px] px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30">
                    Eliminated
                  </span>
                )}

              </div>

              {/* Campos ocultos controlados para Prisma */}
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
                name={`seed_${conference}_${seed.position}.playoffsId`}
                render={({ field }) => <input type="hidden" {...field} />}
              />
              <FormField
                control={control}
                name={`seed_${conference}_${seed.position}.round`}
                render={({ field }) => <input type="hidden" {...field} />}
              />
              <FormField
                control={control}
                name={`seed_${conference}_${seed.position}.eliminated`}
                render={({ field }) => (
                  <input type="hidden" value={String(seed.eliminated)} />
                )}
              />

            </section>)
        })}
    </section>
  );
}

export default ConferenceSeed