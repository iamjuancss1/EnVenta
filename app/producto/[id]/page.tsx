"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, MapPin, Heart, AlertCircle } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { getProductById } from "@/lib/data"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { useAuth } from "@/lib/auth"
import { Header } from "@/components/header"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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

    // Redirigir a WhatsApp con el número del vendedor
    if (product && product.seller && product.seller.phone) {
      try {
        const phoneNumber = product.seller.phone.replace(/\+/g, "").replace(/\s/g, "")
        const message = `Hola, estoy interesado en tu producto "${product.title}" en EnVenta`
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

        // Asegurarse de que estamos en el navegador antes de usar window.open
        if (typeof window !== "undefined") {
          window.open(whatsappUrl, "_blank")
        }
      } catch (error) {
        console.error("Error opening WhatsApp:", error)
      }
    }
  }

  const handleAddToFavorites = () => {
    if (!user) {
      router.push(`/auth/login?redirect=/producto/${params.id}`)
    } else {
      // Aquí iría la lógica para añadir a favoritos
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

  // Verificar si el usuario actual es el vendedor del producto
  const isOwner =
    user && product.userId && (user.id === product.userId || (product.seller && user.id === product.seller.id))

  return (
    <>
      <Header />
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <Link href={`/categoria/${product.category.slug}`}>
          <Button variant="ghost" size="sm" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver a {product.category.name}
          </Button>
        </Link>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <ProductImageGallery images={product.images} title={product.title} />

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Link href={`/categoria/${product.category.slug}`}>
                  <Badge variant="outline">{product.category.name}</Badge>
                </Link>
                {product.isNew && <Badge>Nuevo</Badge>}
              </div>
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg line-through text-muted-foreground">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge variant="outline" className="text-green-600">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{product.location}</span>
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
                      {product.seller && product.seller.name ? product.seller.name.charAt(0) : "V"}
                    </div>
                    <div>
                      <p className="font-medium">{product.seller ? product.seller.name : "Vendedor"}</p>
                      <p className="text-sm text-muted-foreground">
                        Vendedor desde{" "}
                        {product.seller && (product.seller.memberSince || product.seller.since || "2023")}
                      </p>
                    </div>
                  </div>

                  {/* Solo mostrar email si el usuario es el dueño del producto */}
                  {isOwner && product.seller && product.seller.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <span>Email: {product.seller.email}</span>
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
                  <p>{product.description}</p>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="mt-4">
                <ul className="space-y-2">
                  {product.specifications &&
                    product.specifications.map((spec: any, index: number) => (
                      <li key={index} className="flex">
                        <span className="font-medium min-w-[150px]">{spec.name}:</span>
                        <span>{spec.value}</span>
                      </li>
                    ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}
