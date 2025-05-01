import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, MapPin, Heart, AlertCircle } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { getProductById } from "@/lib/data"
import { Header } from "@/components/header"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ProductPage({ params }) {
  // Obtener el producto
  const product = getProductById(params.id)

  // Si no hay producto, mostrar error
  if (!product) {
    return (
      <>
        <Header />
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Producto no encontrado</AlertDescription>
          </Alert>
          <div className="mt-4">
            <Link href="/">
              <Button>Volver a inicio</Button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  // Preparar datos seguros para el JSX
  const id = product.id || ""
  const title = product.title || "Producto sin título"
  const price = product.price || 0
  const originalPrice = product.originalPrice || null
  const description = product.description || "Sin descripción"
  const location = product.location || "Sin ubicación"
  const isNew = product.isNew === true
  const categoryName = product.category?.name || "Sin categoría"
  const categorySlug = product.category?.slug || ""
  const sellerName = product.seller?.name || "Vendedor"
  const sellerSince = product.seller?.memberSince || product.seller?.since || "2023"

  // Imágenes
  const images =
    product.images && product.images.length > 0 ? product.images : ["/placeholder.svg?height=600&width=600"]

  // Calcular descuento
  let hasDiscount = false
  let discountText = ""
  let formattedOriginalPrice = ""

  if (originalPrice !== null && originalPrice > 0 && price > 0) {
    if (originalPrice > price) {
      hasDiscount = true
      const discountPercentage = Math.round(100 - (price * 100) / originalPrice)
      discountText = discountPercentage + "% OFF"
      formattedOriginalPrice = formatPrice(originalPrice)
    }
  }

  // Formatear precio actual
  const formattedPrice = formatPrice(price)

  return (
    <>
      <Header />
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <Link href={categorySlug ? "/categoria/" + categorySlug : "/"}>
          <Button variant="ghost" size="sm" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </Link>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          {/* Galería de imágenes simplificada */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <Image src={images[0] || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-auto pb-2">
                {images.map((image, index) => (
                  <div key={index} className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={title + " - Miniatura " + (index + 1)}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{categoryName}</Badge>
                {isNew && <Badge>Nuevo</Badge>}
              </div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-3xl font-bold">{formattedPrice}</span>
                {hasDiscount && (
                  <>
                    <span className="text-lg line-through text-muted-foreground">{formattedOriginalPrice}</span>
                    <Badge variant="outline" className="text-green-600">
                      {discountText}
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{location}</span>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1">Contactar al vendedor</Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Añadir a favoritos</span>
              </Button>
            </div>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Información del vendedor</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {sellerName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{sellerName}</p>
                      <p className="text-sm text-muted-foreground">Vendedor desde {sellerSince}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="description">Descripción</TabsTrigger>
                <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <div className="prose max-w-none">
                  <p>{description}</p>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="mt-4">
                <ul className="space-y-2">
                  {product.specifications && product.specifications.length > 0 ? (
                    product.specifications.map((spec, index) => (
                      <li key={index} className="flex">
                        <span className="font-medium min-w-[150px]">{spec.name || ""}:</span>
                        <span>{spec.value || ""}</span>
                      </li>
                    ))
                  ) : (
                    <li>No hay especificaciones disponibles</li>
                  )}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}
