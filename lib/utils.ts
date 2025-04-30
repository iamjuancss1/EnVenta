import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined) {
    return "$0"
  }

  // Formato simple para evitar problemas
  return `$${price.toLocaleString("es-CO")}`
}
