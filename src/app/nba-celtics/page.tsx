import MainStatsMenu from "@/components/nba-celtics/MainStatsMenu";
import { CourtFilters, GameOption } from "@/lib/types";
import { getAvailableGames, getShotsByGameId } from "@/services/db/shotChart";
import { Metadata } from "next";

export const dynamic = "force-dynamic"; // Evita que se cachee mientras probás

type FilterParams = {
  gameId?: string;
  player?: string;
  range?: string;
  period?: string;
  outcome?: string;
  distance?: string;
  time?: string;
}

type Props = { searchParams: Promise<FilterParams> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { gameId } = await searchParams;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://2kceltics.xyz";

  // Buscamos los partidos para armar un título personalizado si existe el id
  const games = (await getAvailableGames()) as GameOption[];
  const currentGame = games.find((g) => g.gameId === gameId) || games[0];
  const matchupTitle = currentGame ? currentGame.matchup : "Boston Celtics";

  const pageUrl = `${baseUrl}/nba-celtics${currentGame?.gameId ? `?gameId=${currentGame.gameId}` : ""}`;
  const ogImageUrl = `${baseUrl}/og-preview.png`; // Asegurate de tener esta imagen en /public

  return {
    title: `Celtics Shot Chart - ${matchupTitle} | 2KCeltics`,
    description: `Shot distribution, shooting splits and visual analytics for the ${matchupTitle} game.`,
    openGraph: {
      title: `Boston Celtics Shot Chart · ${matchupTitle}`,
      description: `Analize the shot distribution and stats for the ${matchupTitle} game.`,
      url: pageUrl,
      siteName: "2KCeltics",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Celtics Shot Chart ${matchupTitle}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Boston Celtics Shot Chart · ${matchupTitle}`,
      description: `Shot distribution y estadísticas interactivas.`,
      images: [ogImageUrl],
    },
  };
}

async function NbaCeltics({ searchParams }: Props) {
  // searchParams lee lo que router.push escribió en la URL
  const { gameId, player, shotType, period, outcome, distance, timing } = await searchParams as CourtFilters;

  const games = (await getAvailableGames()) as GameOption[];

  // 1. Verificamos si el gameId de la URL existe realmente en los partidos cargados
  const isValidGame = games.some((g) => g.gameId === gameId);

  // 2. Si es válido usamos ese; si es trucho o no viene, tomamos el más reciente (games[0])
  const activeGameId = isValidGame ? gameId! : games[0]?.gameId || "";

  // 3. Traemos los tiros del partido válido
  const shots = activeGameId ? await getShotsByGameId(activeGameId) : [];



  const INITIAL_FILTERS = {
    player: player || "ALL",
    shotType: shotType || "ALL",
    period: period || "ALL",
    outcome: outcome || "ALL",
    distance: distance || "ALL",
    timing: timing || "ALL",
  };

  return (
    <main className="min-h-screen py-8">
      <h1 className="text-2xl tracking-tight leading-snug lg:tracking-normal lg:text-5xl font-bold text-center text-celtics mb-8">
        CELTICS SHOT CHART SEASON 2025-26
      </h1>
      <MainStatsMenu
        availableGames={games}
        activeGameId={activeGameId}
        shots={shots}
        initialFilters={INITIAL_FILTERS}
      />
    </main>
  );
}

export default NbaCeltics;