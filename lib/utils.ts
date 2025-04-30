import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | null | undefined): string {
  // Si el precio no es válido, devolver un valor predeterminado
  if (price === null || price === undefined || isNaN(Number(price))) {
    return "$0"
  }

  // Convertir a número para asegurar el tipo correcto
  const numericPrice = Number(price)

  try {
    // Usar Intl.NumberFormat para formatear el precio
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericPrice)
  } catch (error) {
    // En caso de error, devolver un formato simple
    return `$${numericPrice}`
  }
}
