import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  // Verificar si el producto existe
  if (!product) {
    return null
  }

  // Extraer y preparar datos de forma segura
  const title = product.title || "Producto sin título"
  const price = product.price || 0
  const originalPrice = product.originalPrice || null
  const location = product.location || "Sin ubicación"
  const isNew = !!product.isNew
  const image =
    product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg?height=300&width=300"

  // Calcular descuento fuera del JSX
  const hasDiscount = originalPrice !== null && originalPrice > price
  let discountPercentage = 0
  let discountText = ""

  if (hasDiscount && originalPrice && price) {
    discountPercentage = Math.round((1 - price / originalPrice) * 100)
    discountText = `${discountPercentage}% OFF`
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/producto/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          {isNew && <Badge className="absolute top-2 right-2">Nuevo</Badge>}
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold line-clamp-2">{title}</h3>
            <p className="text-2xl font-bold">{formatPrice(price)}</p>
            {hasDiscount && (
              <div className="flex items-center gap-2">
                <span className="text-sm line-through text-muted-foreground">{formatPrice(originalPrice)}</span>
                <Badge variant="outline" className="text-green-600">
                  {discountText}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-3 w-3" />
            {location}
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}
