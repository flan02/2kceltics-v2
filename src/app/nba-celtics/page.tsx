import MainStatsMenu from '@/components/nba-celtics/MainStatsMenu';
import { getAvailableGames, getShotsByGameId } from '@/services/shotChart';


export const dynamic = "force-dynamic"; // Evita que se cachee mientras probás

type Props = {
  searchParams: Promise<{ gameId?: string }>;
};

async function NbaCeltics({ searchParams }: Props) {
  // searchParams lee lo que router.push escribió en la URL
  const { gameId } = await searchParams;

  const games = await getAvailableGames();
  const activeGameId = gameId || games[0]?.gameId!;
  const shots = await getShotsByGameId(activeGameId);

  return (
    <main className="min-h-screen py-8">
      <h1 className="text-5xl font-bold text-center text-celtics mb-8">CELTICS SHOT CHART SEASON 2025-26</h1>
      <MainStatsMenu
        availableGames={games}
        activeGameId={activeGameId}
        shots={shots}
      />
    </main>
  );
}

export default NbaCeltics