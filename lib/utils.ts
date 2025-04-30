import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | null | undefined): string {
  // Simplificación extrema para evitar cualquier problema con operadores
  if (price === null || price === undefined) {
    return "$0"
  }

  try {
    return "$" + price.toLocaleString("es-CO")
  } catch (error) {
    return "$0"
  }
}
