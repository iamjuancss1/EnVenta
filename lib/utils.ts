import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | null | undefined): string {
  // Si el precio es nulo o indefinido, devolver cadena vacía
  if (price === null || price === undefined) {
    return ""
  }

  // Asegurarse de que el precio es un número
  const numericPrice = Number(price)

  // Si no es un número válido, devolver cadena vacía
  if (isNaN(numericPrice)) {
    return ""
  }

  try {
    // Formatear el precio como moneda colombiana
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericPrice)
  } catch (error) {
    console.error("Error formatting price:", error)
    // Fallback simple en caso de error
    return `$${numericPrice}`
  }
}
