'use client'
import { updateSeedSchema } from "@/zod/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"
import ConferenceSeed from "./ConferenceSeed"
import LoadingButton from "@/components/reutilizable/LoadingButton"
import { resetPlayoffs, updateSeed } from "@/app/playoffs/action"
import { useRouter } from 'next/navigation';
import { useState } from "react"
import { Round } from "@/lib/types"
import { getRival } from "@/lib/utils"

type Props = {
  seeds: any,
  gamesPlayed: any,
  playoffsId: string
}

export interface Game {
  id: string;
  wins: number;
  team_code: string;
  position: string;
  losses: number;
  disabled: boolean;
  eliminated: boolean;
  round: string;
  conference: 'WEST' | 'EAST';
}

const UpdatePlayoffsForm = ({ seeds, gamesPlayed, playoffsId }: Props) => {
  const router = useRouter();

  const [isResetting, setIsResetting] = useState(false);


  const [allGames, setAllGames] = useState<Game[]>(() =>
    seeds.map((seed: any) => ({
      id: seed.id,
      wins: seed.wins ?? 0,
      team_code: seed.team_code,
      position: String(seed.position),
      losses: seed.losses ?? 0,
      disabled: false,
      eliminated: seed.eliminated ?? false,
      round: seed.round ?? Round.FIRST_ROUND,
      conference: seed.conference,
    }))
  );

  const activeTeams = allGames.filter((g) => !g.eliminated);

  const champion = allGames.find((g) => g.wins >= 16);
  const isChampionCrowned = Boolean(champion);


  const hasPendingMatchups = activeTeams.some((team) => {
    const rival = getRival(team, allGames);
    return Boolean(rival) && !team.disabled;
  })


  const handleReset = async () => {
    const confirmed = window.confirm("⚠️ Are you sure you want to reset all playoffs?\n\nThis action will set all wins and losses to 0, unmark eliminated teams, and return all teams to First Round.");

    if (!confirmed) return;

    try {
      setIsResetting(true);
      if (!playoffsId) return;

      const res = await resetPlayoffs(playoffsId);

      if (res?.success) {
        toast({
          title: "Playoffs resetted successfully",
          description: "Everything is back to First Round.",
        });
        window.location.reload();
      } else {
        alert("There was an error resetting the playoffs.");
      }
    } catch (error) {
      console.error("Error al reiniciar", error);
    } finally {
      setIsResetting(false);
    }
  };


  // Helper seguro que no depende del orden del array de Prisma
  const getInitialSeed = (conference: 'WEST' | 'EAST', pos: number) => {
    const found = seeds.find(
      (s: any) => s.conference === conference && Number(s.position) === pos
    );
    return {
      id: found?.id || '',
      wins: found?.wins ?? 0,
      losses: found?.losses ?? 0,
      position: found?.position ?? String(pos),
      eliminated: found?.eliminated ?? false,
      conference,
      playoffsId
    };
  };

  const getNextRound = (wins: number, conf: 'WEST' | 'EAST') => {
    const w = Number(wins);
    if (w >= 12) return Round.FINALS;
    if (w >= 8) return conf === 'EAST' ? Round.ECF : Round.WCF;
    if (w >= 4) return conf === 'EAST' ? Round.ECSF : Round.WCSF;
    return Round.FIRST_ROUND;
  };

  const handleWin = (winnerId: string) => {
    const winner = allGames.find((g) => g.id === winnerId);
    if (!winner || winner.disabled || winner.wins >= 16) return;

    const rival = getRival(winner, allGames);
    if (!rival) {
      alert("There is no rival for this team or previous series is not over yet.");
      return;
    }

    const nextWinnerWins = Number(winner.wins) + 1;
    const nextRivalLosses = Number(rival.losses) + 1;
    const isSeriesOver = nextWinnerWins % 4 === 0;
    const nextWinnerRound = getNextRound(nextWinnerWins, winner.conference);

    // Actualizamos React Hook Form
    setValue(`seed_${winner.conference}_${winner.position}.wins` as any, nextWinnerWins);
    setValue(`seed_${winner.conference}_${winner.position}.round` as any, nextWinnerRound);
    setValue(`seed_${rival.conference}_${rival.position}.losses` as any, nextRivalLosses);
    if (isSeriesOver) {
      setValue(`seed_${rival.conference}_${rival.position}.eliminated` as any, true);
    }

    // Actualizamos el estado GLOBAL: impacta a ambas columnas al mismo tiempo
    setAllGames((prev) =>
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
            disabled: true, // 👈 Bloquea al rival de inmediato, sea del Este o del Oeste
          };
        }
        return g;
      })
    );
  };


  async function onSubmit(values: z.infer<typeof updateSeedSchema>) {
    if (isChampionCrowned) {
      alert("Playoffs finished. No more games can be added.");
      return;
    }
    try {
      //console.log("VALUES ON FORM", values)
      const res = await updateSeed(values)

      if (res?.success) {
        toast({
          title: `Seed updated successfully`,
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-zinc-500">
              <code className="">{JSON.stringify(values, null, 2)}</code>
            </pre>
          ),
        })
        router.refresh();
      }
    } catch (error) {
      console.log("You couldnt update your playoffs data", error);
    }
  }

  const form = useForm<z.infer<typeof updateSeedSchema>>({
    resolver: zodResolver(updateSeedSchema),
    defaultValues: {
      seed_WEST_1: getInitialSeed('WEST', 1),
      seed_WEST_2: getInitialSeed('WEST', 2),
      seed_WEST_3: getInitialSeed('WEST', 3),
      seed_WEST_4: getInitialSeed('WEST', 4),
      seed_WEST_5: getInitialSeed('WEST', 5),
      seed_WEST_6: getInitialSeed('WEST', 6),
      seed_WEST_7: getInitialSeed('WEST', 7),
      seed_WEST_8: getInitialSeed('WEST', 8),

      seed_EAST_1: getInitialSeed('EAST', 1),
      seed_EAST_2: getInitialSeed('EAST', 2),
      seed_EAST_3: getInitialSeed('EAST', 3),
      seed_EAST_4: getInitialSeed('EAST', 4),
      seed_EAST_5: getInitialSeed('EAST', 5),
      seed_EAST_6: getInitialSeed('EAST', 6),
      seed_EAST_7: getInitialSeed('EAST', 7),
      seed_EAST_8: getInitialSeed('EAST', 8),
    }
  });

  const { register, handleSubmit, formState, watch, trigger, control, setValue, getValues, setFocus, formState: { isSubmitting, isSubmitted, errors } } = form
  const isUpdateDisabled = isSubmitting || hasPendingMatchups;
  return (


    <Form {...form} >
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 space-y-16 lg:space-y-0 lg:space-x-2 border rounded-lg p-8 lg:p-16">
        <div className="space-y-2">
          <ConferenceSeed
            conference={"WEST"}
            control={control}
            allGames={allGames}
            handleWin={handleWin}
          />

        </div>
        <div className="space-y-2">
          <ConferenceSeed
            conference={"EAST"}
            control={control}
            allGames={allGames}
            handleWin={handleWin}
          />

        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 text-zinc-500 pt-6">
          <div className="flex items-center space-x-3">
            {isChampionCrowned ? (
              <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                🏆 {champion?.team_code} is the World Champions
              </p>
            ) : (
              <p className="text-sm lg:text-base">
                Ready to save games ({gamesPlayed + 1} played)
              </p>
            )}

            <LoadingButton
              className="dark:bg-celtics hover:dark:bg-celtics/80 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              loading={isSubmitting}
              disabled={isChampionCrowned || isUpdateDisabled}
            >
              Update
            </LoadingButton>
          </div>

          {/* Botón de Emergencia / Reset */}
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting || isResetting}
            className="px-3 py-2 text-xs font-semibold rounded-md border border-red-500/40 text-red-600 dark:text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResetting ? "Resetting..." : "⚠️ Reset Playoffs"}
          </button>
        </div>
      </form>
    </Form>

  )
}

export default UpdatePlayoffsForm
