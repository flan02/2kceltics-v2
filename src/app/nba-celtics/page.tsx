import MainStatsMenu from "@/components/nba-celtics/MainStatsMenu";
import { GameOption } from "@/lib/types";
import { getAvailableGames, getShotsByGameId } from "@/services/db/shotChart";
import { Metadata } from "next";

export const dynamic = "force-dynamic"; // Evita que se cachee mientras probás

type Props = { searchParams: Promise<{ gameId?: string }> };

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
    description: `Shot distribution, shooting splits and visual analytics for Boston Celtics vs ${matchupTitle}.`,
    openGraph: {
      title: `Boston Celtics Shot Chart · ${matchupTitle}`,
      description: `Analiza los tiros, porcentajes y volumen de juego en 2KCeltics.`,
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
  const { gameId } = await searchParams;

  const games = (await getAvailableGames()) as GameOption[];

  // 1. Verificamos si el gameId de la URL existe realmente en los partidos cargados
  const isValidGame = games.some((g) => g.gameId === gameId);

  // 2. Si es válido usamos ese; si es trucho o no viene, tomamos el más reciente (games[0])
  const activeGameId = isValidGame ? gameId! : games[0]?.gameId || "";

  // 3. Traemos los tiros del partido válido
  const shots = activeGameId ? await getShotsByGameId(activeGameId) : [];

  return (
    <main className="min-h-screen py-8">
      <h1 className="text-2xl tracking-tight leading-snug lg:tracking-normal lg:text-5xl font-bold text-center text-celtics mb-8">
        CELTICS SHOT CHART SEASON 2025-26
      </h1>
      <MainStatsMenu
        availableGames={games}
        activeGameId={activeGameId}
        shots={shots}
      />
    </main>
  );
}

export default NbaCeltics;