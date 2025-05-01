import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined) {
    return "$0"
  }

  // Implementación manual sin usar toLocaleString
  const priceStr = String(price)
  let result = ""

  for (let i = 0; i < priceStr.length; i++) {
    if ((priceStr.length - i) % 3 === 0 && i > 0) {
      result += "."
    }
    result += priceStr[i]
  }

  return "$" + result
}
