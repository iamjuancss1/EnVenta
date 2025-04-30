"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, MapPin, Heart, AlertCircle } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { getProductById } from "@/lib/data"
import { useAuth } from "@/lib/auth"
import { Header } from "@/components/header"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Product } from "@/types/product"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    const fetchProduct = () => {
      try {
        const productData = getProductById(params.id)
        if (!productData) {
          setError("Producto no encontrado")
        } else {
          setProduct(productData)
        }
      } catch (err) {
        setError("Error al cargar el producto")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const handleContactSeller = () => {
    if (!user) {
      router.push(`/auth/login?redirect=/producto/${params.id}`)
      return
    }

    // Simplificado para evitar problemas
    alert("Contactando al vendedor...")
  }

  const handleAddToFavorites = () => {
    if (!user) {
      router.push(`/auth/login?redirect=/producto/${params.id}`)
    } else {
      alert("Producto añadido a favoritos")
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="flex items-center justify-center h-64">
            <p>Cargando producto...</p>
          </div>
        </div>
      </>
    )
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || "Producto no encontrado"}</AlertDescription>
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
  const sellerEmail = product.seller?.email || ""
  const sellerInitial = sellerName.charAt(0) || "V"

  // Imágenes
  const images =
    product.images && product.images.length > 0 ? product.images : ["/placeholder.svg?height=600&width=600"]
  const currentImage = images[selectedImageIndex] || images[0]
  const hasMultipleImages = images.length > 1

  // Calcular descuento
  let hasDiscount = false
  let discountText = ""
  let formattedOriginalPrice = ""

  if (originalPrice !== null && originalPrice > 0 && price > 0) {
    hasDiscount = originalPrice > price
    if (hasDiscount) {
      const discountPercentage = Math.round(100 - (price * 100) / originalPrice)
      discountText = `${discountPercentage}% OFF`
      formattedOriginalPrice = formatPrice(originalPrice)
    }
  }

  // Verificar si el usuario es el dueño del producto
  let isOwner = false
  if (user && product.userId) {
    isOwner = user.id === product.userId
  }
  if (user && product.seller && user.id === product.seller.id) {
    isOwner = true
  }

  return (
    <>
      <Header />
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <Link href={categorySlug ? `/categoria/${categorySlug}` : "/"}>
          <Button variant="ghost" size="sm" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </Link>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          {/* Galería de imágenes simplificada */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <Image src={currentImage || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
            </div>

            {hasMultipleImages && (
              <div className="flex gap-2 overflow-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                      selectedImageIndex === index ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${title} - Miniatura ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
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
                <span className="text-3xl font-bold">{formatPrice(price)}</span>
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
              {!isOwner && (
                <Button className="flex-1" onClick={handleContactSeller}>
                  Contactar al vendedor
                </Button>
              )}
              <Button variant="outline" size="icon" onClick={handleAddToFavorites}>
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
                      {sellerInitial}
                    </div>
                    <div>
                      <p className="font-medium">{sellerName}</p>
                      <p className="text-sm text-muted-foreground">Vendedor desde {sellerSince}</p>
                    </div>
                  </div>

                  {isOwner && sellerEmail && (
                    <div className="flex items-center gap-2 text-sm">
                      <span>Email: {sellerEmail}</span>
                    </div>
                  )}

                  {!user && (
                    <p className="text-xs text-muted-foreground mt-2">
                      <Link
                        href={`/auth/login?redirect=/producto/${params.id}`}
                        className="text-primary hover:underline"
                      >
                        Inicia sesión
                      </Link>{" "}
                      para contactar al vendedor
                    </p>
                  )}
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
