import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  current_season,
  NBA_TEAMS_LOGOS,
  playerImages2K25,
  PlayoffSpans,
  SeasonSpans,
  TeamState,
} from "./types";
import { getCurrentRound, getCurrentSpan } from "@/app/actions";
import { Round } from "@prisma/client";
import { Game } from "@/components/custom/playoffs/UpdatePlayoffsForm";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function keysToLowerCase(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value]),
  );
}

export async function normalizeSeasonPlayerInput(
  raw: Record<string, any>,
): Promise<Record<string, any>> {
  console.log("adding new data...");

  let nextSpan: number;
  let stage;
  const isPlayoffs = process.env.CURRENT_STAGE!;
  //let span = await getCurrentSpan()
  const nextGamespan = async (): Promise<number> => {
    // This function should retrieve the next gamespan from the database.}
    const span = await getCurrentSpan();
    const index = SeasonSpans.indexOf(span);
    if (index === -1) {
      throw new Error(`Invalid currentGame value: ${span}`);
    }

    return SeasonSpans[index];
  };

  const nextPlayoffSpan = async (): Promise<number> => {
    // This function should retrieve the next gamespan from the database.}
    const span = await getCurrentRound();
    const index = PlayoffSpans.indexOf(span as any);
    if (index === -1) {
      throw new Error(`Invalid currentGame value: ${span}`);
    }

    return PlayoffSpans[index];
  };

  if (isPlayoffs != "PO") {
    stage = "RS";
    nextSpan = await nextGamespan();
  } else {
    stage = "PO";

    // added manually
    // nextSpan = 1 // ? Reset to 1 for playoffs
    // * In NBA 2K25 Playoffs only uploaded gamespan = 1, I couldn't find a way to get the following gamespan automatically. Fix it for NBA2K26 Playoffs
    nextSpan = await nextPlayoffSpan();
    console.log("next playoff span", nextSpan);
    // TODO: I should create a fc that checks into the db for: length of combination between (stage: 'PO' & gamespan) -> (ej: 1) and plus one (+1)
    // ! Check unicity because there will be 15 fields with gamespan 1, we only need get this value one time.
  }

  return {
    name: raw["Name"],
    pos: raw["POS"],
    season: current_season,
    stage: stage,
    gamespan: nextSpan, // raw["gamespan"]
    gs: parseInt(raw["GS"]),
    gp: parseInt(raw["GP"]),
    min: parseFloat(raw["MIN"]),
    pts: parseFloat(raw["PTS"]),
    reb: parseFloat(raw["REB"]),
    ast: parseFloat(raw["AST"]),
    stl: parseFloat(raw["STL"]),
    blk: parseFloat(raw["BLK"]),
    to: parseFloat(raw["TO"]),
    fls: parseFloat(raw["FLS"]),
    fgPct: parseFloat(raw["FG%"] ?? "0"),
    fgm: parseFloat(raw["FGM"]),
    fga: parseFloat(raw["FGA"]),
    tpPct: parseFloat(raw["3P%"] ?? "0"),
    tpm: parseFloat(raw["3PM"]),
    tpa: parseFloat(raw["3PA"]),
    ftPct: parseFloat(raw["FT%"] ?? "0"),
    ftm: parseFloat(raw["FTM"]),
    fta: parseFloat(raw["FTA"]),
    pa: parseFloat(raw["PA"]),
    ofgm: parseFloat(raw["oFGM"]),
    ofga: parseFloat(raw["oFGA"]),
    plusMinus: parseFloat(raw["+/-"]),
  };
}

export function getImagePath(name: string): string {
  if (!name) return "/default.png";
  return (
    playerImages2K25[name] ||
    "/" + name.replace(".", "").replace(" ", "").toLowerCase() + ".png"
  );
}

export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getCurrentPlayoffs() {
  const actual_year = new Date().getFullYear();
  const first_year = actual_year - 1;
  const last_year = actual_year - 2000;
  return `${first_year}/${last_year}`;
}

export function truncateWords(text: string, limit: number) {
  const words = text.split(" ");
  if (words.length <= limit) return text;

  return words.slice(0, limit).join(" ") + "...";
}

export function parsedSeasonTitle(title: string): string {
  let parsedTitle: string = "";
  if (title == "RS") parsedTitle = "Regular Season";
  else if (title == "PO") parsedTitle = "Playoffs";

  return parsedTitle;
}

export function formatShortDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC", // Evita desfases por zona horaria local
  }).format(new Date(date));
}

/**
 * Extrae el tricódigo del rival desde un string tipo "#82 BOS vs. ORL - Apr 12"
 * o "BOS vs. CHI" y devuelve la ruta completa a la imagen del logo.
 */
export function formatLogoAwayImage(matchup: string): string {
  if (!matchup) return "/logos/nba-logo.png"; // Fallback por defecto

  // Busca 3 letras mayúsculas inmediatamente después de "vs." o "@"
  // Ejemplo: "vs. ORL" -> captura "ORL" | "@ CHA" -> captura "CHA"
  const match = matchup.match(/(?:vs\.?|@)\s*([A-Z]{3})/i);

  if (!match || !match[1]) {
    return "/logos/nba-logo.png";
  }

  const teamCode = match[1].toUpperCase();
  const logoFileName = NBA_TEAMS_LOGOS[teamCode];

  // Si existe en el diccionario devuelve la ruta, sino un fallback
  return logoFileName ? `/logos/${logoFileName}` : "/logos/nba-logo.png";
}

/**
 * Genera un nombre de archivo descriptivo, con fecha y en minúsculas.
 * Ejemplo: "bos-vs-tor-apr-5-jaylen-brown-shot-chart.png"
 */
export function formatExportFileName(
  matchup: string,
  selectedPlayer?: string,
  gameDate?: string,
): string {
  // 1. Limpiar matchup: quita el número de partido "#78 ", reemplaza "@" por "at", y "vs." por "vs"
  let cleanMatchup = (matchup || "")
    .replace(/^#\d+\s*/, "") // quita '#78 '
    .replace(/@/g, "at") // '@' -> 'at' (ej: bos-at-cha)
    .replace(/vs\.?/gi, "vs")
    .replace(/[^a-zA-Z0-9\s-]/g, "") // quita puntos y caracteres especiales
    .trim()
    .replace(/\s*-\s*/g, "-") // normaliza espacios alrededor de guiones existentes
    .replace(/\s+/g, "-"); // espacios restantes a guiones

  // 2. Si el matchup no incluía la fecha pero la recibís por parámetro, la sumamos
  if (
    gameDate &&
    !cleanMatchup
      .toLowerCase()
      .includes(gameDate.toLowerCase().replace(/\s+/g, "-"))
  ) {
    const cleanDate = gameDate
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    cleanMatchup = cleanMatchup ? `${cleanMatchup}-${cleanDate}` : cleanDate;
  }

  // 3. Normalizar nombre del jugador / equipo
  const playerSlug =
    !selectedPlayer || selectedPlayer === "ALL"
      ? "boston-celtics"
      : selectedPlayer.trim().replace(/\s+/g, "-");

  // 4. Armar el nombre completo y forzar toLowerCase()
  const baseName = cleanMatchup
    ? `${cleanMatchup}-${playerSlug}-shot-chart.png`
    : `${playerSlug}-shot-chart.png`;

  return baseName.toLowerCase();
}

export const getPercentage = (made: number, att: number): number => {
  if (!att || att === 0) return 0;
  return Number(((made / att) * 100).toFixed(1));
};

export function findPlayoffsRival(
  team: TeamState,
  allTeams: TeamState[],
): TeamState | null {
  const pos = Number(team.position);
  const sameConf = allTeams.filter(
    (t) => t.conference === team.conference && !t.eliminated,
  );

  // 1. Primera Ronda (wins < 4)
  if (team.wins < 4) {
    const rivalPos = 9 - pos;
    return sameConf.find((t) => Number(t.position) === rivalPos) || null;
  }

  // 2. Semifinales de Conferencia (wins entre 4 y 7)
  if (team.wins >= 4 && team.wins < 8) {
    const isTopHalf = [1, 8, 4, 5].includes(pos);
    const targetGroup = isTopHalf
      ? [1, 8].includes(pos)
        ? [4, 5]
        : [1, 8]
      : [3, 6].includes(pos)
        ? [2, 7]
        : [3, 6];

    return (
      sameConf.find(
        (t) => targetGroup.includes(Number(t.position)) && t.wins >= 4,
      ) || null
    );
  }

  // 3. Final de Conferencia (wins entre 8 y 11)
  if (team.wins >= 8 && team.wins < 12) {
    const isTopHalf = [1, 8, 4, 5].includes(pos);
    const targetGroup = isTopHalf ? [3, 6, 2, 7] : [1, 8, 4, 5];

    return (
      sameConf.find(
        (t) => targetGroup.includes(Number(t.position)) && t.wins >= 8,
      ) || null
    );
  }

  // 4. The Finals (wins >= 12)
  if (team.wins >= 12) {
    const otherConf = allTeams.filter(
      (t) => t.conference !== team.conference && !t.eliminated,
    );
    return otherConf.find((t) => t.wins >= 12) || null;
  }

  return null;
}

export function determineRound(wins: number, conference: any) {
  if (conference === "EAST") {
    if (wins > 3 && wins < 8) return Round.ECSF;
    if (wins > 7 && wins < 12) return Round.ECF;
    if (wins > 11 && wins < 17) return Round.FINALS;
  } else if (conference === "WEST") {
    if (wins > 3 && wins < 8) return Round.WCSF;
    if (wins > 7 && wins < 12) return Round.WCF;
    if (wins > 11 && wins < 17) return Round.FINALS;
  }
  return Round.FIRST_ROUND;
}

// Helper para formatear el nombre de la ronda
export const formatRound = (round: string) => {
  switch (round) {
    case "FIRST_ROUND":
      return "1st Round";
    case "ECSF":
    case "WCSF":
      return "Semis";
    case "ECF":
    case "WCF":
      return "Conf. Finals";
    case "FINALS":
      return "The Finals";
    default:
      return round;
  }
};

export const getRoundBadgeStyle = (round: string) => {
  switch (round) {
    case "FIRST_ROUND":
      // Gris neutro
      return "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700";

    case "ECSF":
    case "WCSF":
      // Semis: Azul / Celeste
      return "bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30";

    case "ECF":
    case "WCF":
      // Finales de Conferencia: Naranja / Ámbar
      return "bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/30";

    case "FINALS":
      // The Finals: Dorado / Amarillo oro
      return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/40 font-bold";

    default:
      return "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400";
  }
};

// Encuentra al rival activo para emparejarlo en la serie
export const getRival = (winner: Game, allGames: Game[]): Game | null => {
  const pos = Number(winner.position);

  // 1. Primera Ronda (1 vs 8, 2 vs 7, 3 vs 6, 4 vs 5)
  if (winner.wins < 4) {
    const rivalPos = String(9 - pos);
    return (
      allGames.find(
        (g) => g.conference === winner.conference && g.position === rivalPos,
      ) || null
    );
  }

  // 2. Semifinales de Conferencia (wins 4 a 7)
  if (winner.wins >= 4 && winner.wins < 8) {
    const isTop = [1, 8, 4, 5].includes(pos);
    const targetPositions = isTop
      ? [1, 8].includes(pos)
        ? ["4", "5"]
        : ["1", "8"]
      : [3, 6].includes(pos)
        ? ["2", "7"]
        : ["3", "6"];

    return (
      allGames.find(
        (g) =>
          g.conference === winner.conference &&
          targetPositions.includes(g.position) &&
          !g.eliminated &&
          g.wins >= 4,
      ) || null
    );
  }

  // 3. Finales de Conferencia (wins 8 a 11)
  if (winner.wins >= 8 && winner.wins < 12) {
    const isTop = [1, 8, 4, 5].includes(pos);
    const targetPositions = isTop ? ["3", "6", "2", "7"] : ["1", "8", "4", "5"];
    return (
      allGames.find(
        (g) =>
          g.conference === winner.conference &&
          targetPositions.includes(g.position) &&
          !g.eliminated &&
          g.wins >= 8,
      ) || null
    );
  }

  // 4. The Finals (wins >= 12)
  if (winner.wins >= 12) {
    return (
      allGames.find(
        (g) =>
          g.conference !== winner.conference && !g.eliminated && g.wins >= 12,
      ) || null
    );
  }

  return null;
};

// Helper para calcular W y L de la ronda actual
export function getSeriesScore(team: Game, allTeams: Game[]) {
  // 1. Determinamos la base de victorias de la ronda actual
  let winsBase = 0;
  if (team.wins >= 12)
    winsBase = 12; // The Finals
  else if (team.wins >= 8)
    winsBase = 8; // Finals de Conf
  else if (team.wins >= 4)
    winsBase = 4; // Semis
  else winsBase = 0; // 1st Round

  // Victorias en la serie actual:
  const currentRoundWins = Math.max(0, Math.min(team.wins - winsBase, 4));

  // 2. Si el equipo está eliminado, sus derrotas en esa serie son 4
  if (team.eliminated) {
    return {
      wins: currentRoundWins,
      losses: 4,
    };
  }

  // 3. Si sigue en carrera, sus derrotas son las victorias de su rival en la ronda
  const rival = getRival(team, allTeams);
  if (!rival) {
    return {
      wins: currentRoundWins,
      losses: 0,
    };
  }

  let rivalWinsBase = 0;
  if (rival.wins >= 12) rivalWinsBase = 12;
  else if (rival.wins >= 8) rivalWinsBase = 8;
  else if (rival.wins >= 4) rivalWinsBase = 4;
  else rivalWinsBase = 0;

  const currentRoundLosses = Math.max(
    0,
    Math.min(rival.wins - rivalWinsBase, 4),
  );

  return {
    wins: currentRoundWins,
    losses: currentRoundLosses,
  };
}

// Cálculo limpio de victorias para la ronda actual
export const getRoundWins = (totalWins: number, conferenceFinals: boolean) => {
  if (conferenceFinals) {
    // Finales de Conferencia (ronda 3): victorias del 8 al 12
    return Math.max(0, Math.min(totalWins - 8, 4));
  }
  // Semifinales (ronda 2): victorias del 4 al 8
  return Math.max(0, Math.min(totalWins - 4, 4));
};

// Verifica si hay equipos compitiendo en una ronda inferior
export const isWaitingForPreviousRound = (
  currentWins: number,
  allGames: Game[],
) => {
  // Si está listo para Semis (4 a 7 wins), espera que todos terminen 1st Round (< 4 wins)
  if (currentWins >= 4 && currentWins < 8) {
    return allGames.some((g) => !g.eliminated && g.wins < 4);
  }
  // Si está listo para Conf. Finals (8 a 11 wins), espera que todos terminen Semis (< 8 wins)
  if (currentWins >= 8 && currentWins < 12) {
    return allGames.some((g) => !g.eliminated && g.wins < 8);
  }
  // Si está listo para Finals (>= 12 wins), espera que terminen Conf. Finals (< 12 wins)
  if (currentWins >= 12) {
    return allGames.some((g) => !g.eliminated && g.wins < 12);
  }
  return false;
};

/* 
FG%: getPercentage(fgm, fga)

3P%: getPercentage(fg3m, fg3a)

FT%: getPercentage(ftm, fta)

2P%: getPercentage(fgm - fg3m, fga - fg3a)

eFG% (Effective Field Goal %): ((fgm + 0.5 * fg3m) / fga) * 100

TS% (True Shooting %): (pts / (2 * (fga + 0.44 * fta))) * 100

*/
