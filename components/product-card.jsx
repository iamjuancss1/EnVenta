import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import { formatPrice } from "@/lib/utils"

export function ProductCard(props) {
  // Verificación de seguridad
  if (!props || !props.product) {
    return null
  }

  const product = props.product

  // Extraer datos de forma segura
  const id = product.id || ""
  const title = product.title || "Producto sin título"
  const price = product.price || 0
  const location = product.location || "Sin ubicación"
  const isNew = product.isNew === true

  // Obtener la primera imagen o usar una predeterminada
  let imageUrl = "/placeholder.svg?height=300&width=300"
  if (product.images && product.images.length > 0) {
    imageUrl = product.images[0]
  }

  // Formatear precio
  const formattedPrice = formatPrice(price)

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link href={"/producto/" + id}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          {isNew && <Badge className="absolute top-2 right-2">Nuevo</Badge>}
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold line-clamp-2">{title}</h3>
            <p className="text-2xl font-bold">{formattedPrice}</p>
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
