import { TokenSetSchema } from "@/zod/validation"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


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
