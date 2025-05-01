import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price) {
  // Implementación ultra simple
  if (!price) return "$0"

  // Convertir a string y añadir el símbolo de dólar
  return "$" + String(price)
}
