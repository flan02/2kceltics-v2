import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  current_season,
  NBA_TEAMS_LOGOS,
  playerImages2K25,
  PlayoffSpans,
  SeasonSpans,
} from "./types";
import { getCurrentRound, getCurrentSpan } from "@/app/actions";

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
