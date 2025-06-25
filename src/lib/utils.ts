import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { playerImages2K25 } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function keysToLowerCase(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value])
  );
}


export function normalizeSeasonPlayerInput(raw: Record<string, any>): Record<string, any> {

  return {
    name: raw["Name"],
    pos: raw["POS"],
    season: "NBA2K25", // si querés forzarla o pasala dinámica
    gamespan: 40, // raw["gamespan"],
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