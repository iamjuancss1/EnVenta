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
  // Asegurarse de que product y sus propiedades existan
  if (!product) {
    return null
  }

  // Calcular el porcentaje de descuento fuera del JSX
  const hasDiscount = product.originalPrice && product.price && product.originalPrice > product.price
  const discountText = hasDiscount ? `${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF` : ""

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/producto/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images?.[0] || "/placeholder.svg?height=300&width=300"}
            alt={product.title || "Producto"}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          {product.isNew && <Badge className="absolute top-2 right-2">Nuevo</Badge>}
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold line-clamp-2">{product.title || "Sin título"}</h3>
            <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
            {hasDiscount && (
              <div className="flex items-center gap-2">
                <span className="text-sm line-through text-muted-foreground">{formatPrice(product.originalPrice)}</span>
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
            {product.location || "Sin ubicación"}
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}
