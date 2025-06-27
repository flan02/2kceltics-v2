import { TokenSetSchema } from "@/zod/validation"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { playerImages2K25 } from "./types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTierName = (tier: string) => {
  // tier.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()) // ? Capitalize first letter of each word
  return tier.replace(/_/g, ' ').toUpperCase().replace(/\b\w/g, (char) => char.toUpperCase())

}

export const calculatePercentage = (points: number, limit: number, previousLimit: number): number => {
  const diff = limit - previousLimit
  if (diff === 0) return 0
  return Math.round(((points - previousLimit) / diff) * 100);
}

export function formatDate(joinDate: Date): string {
  const join = new Date(joinDate);
  const now = new Date();

  // Verificar si la fecha es válida
  if (isNaN(join.getTime())) {
    return '';
  }

  // Calcular la diferencia en años, meses y días
  let years = now.getFullYear() - join.getFullYear();
  let months = now.getMonth() - join.getMonth();
  let days = now.getDate() - join.getDate();

  // Ajustar si los días son negativos
  if (days < 0) {
    months--;
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += previousMonth.getDate();
  }

  // Ajustar si los meses son negativos
  if (months < 0) {
    years--;
    months += 12;
  }

  // Formatear el resultado
  let result = '';
  if (years > 0) {
    result += `${years} year${years > 1 ? 's' : ''}`;
    if (months > 0) {
      result += ` y ${months} month${months > 1 ? 's' : ''}`;
    }
  } else if (months > 0) {
    result += `${months} month${months > 1 ? 's' : ''}`;
    if (days > 0) {
      result += ` y ${days} day${days > 1 ? 's' : ''}`;
    }
  } else {
    result += `${days} day${days > 1 ? 's' : ''}`;
  }

  return result;
}

export function formatDateShort(joinDate: Date): string {
  const join = new Date(joinDate);
  const now = new Date();

  // Verificar si la fecha es válida
  if (isNaN(join.getTime())) {
    return '';
  }

  // Calcular la diferencia en años, meses y días
  let years = now.getFullYear() - join.getFullYear();
  let months = now.getMonth() - join.getMonth();
  let days = now.getDate() - join.getDate();

  // Ajustar si los días son negativos
  if (days < 0) {
    months--;
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += previousMonth.getDate();
  }

  // Ajustar si los meses son negativos
  if (months < 0) {
    years--;
    months += 12;
  }

  // Formatear el resultado
  let result = '';
  if (years > 0) {
    result += `${years}y`;
    if (months > 0) {
      result += ` ${months}m`;
    }
  } else if (months > 0) {
    result += `${months}m`;
    if (days > 0) {
      result += ` ${days}d`;
    }
  } else {
    result += ` ${days}d`;
  }

  return result;
}

// Fc to validate before saving in MongoDB
export function validateTokenSet(data: any) {
  return TokenSetSchema.safeParse(data);
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
