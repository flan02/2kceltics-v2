import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { current_season, playerImages2K25, SeasonSpans } from "./types";
import { getCurrentSpan } from "@/app/actions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function keysToLowerCase(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value])
  );
}


export async function normalizeSeasonPlayerInput(raw: Record<string, any>): Promise<Record<string, any>> {

  const nextGamespan = async (): Promise<number> => {
    // This function should retrieve the next gamespan from the database.}
    const span = await getCurrentSpan()

    const index = SeasonSpans.indexOf(span);
    if (index === -1) {
      throw new Error(`Invalid currentGame value: ${span}`);
    }

    return SeasonSpans[index]
  }

  const nextSpan = await nextGamespan();


  return {
    name: raw["Name"],
    pos: raw["POS"],
    season: current_season,
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
    plusMinus: parseFloat(raw["+/-"])
  };
}


export function getImagePath(name: string): string {
  if (!name) return '/default.png';
  return (
    playerImages2K25[name] ||
    '/' + name.replace('.', '').replace(' ', '').toLowerCase() + '.png'
  );
}


export function capitalize(str: string): string {
  if (!str) return '';
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
