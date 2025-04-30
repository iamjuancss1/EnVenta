import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Plus, Store, Package, Settings, User } from "lucide-react"
import { getAdminProfile, getProductsByUser } from "@/lib/data"
import { ProductCard } from "@/components/product-card"

export default function AdminProfilePage() {
  const admin = getAdminProfile()
  const products = getProductsByUser(admin.id)

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver a inicio
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Perfil de {admin.name}</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src={admin.avatar || "/placeholder.svg?height=128&width=128"}
                    alt={admin.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{admin.name}</h2>
                  <p className="text-sm text-muted-foreground">Vendedor desde {admin.memberSince}</p>
                  <div className="mt-2 flex items-center justify-center">
                    <Badge variant="outline" className="text-green-600">
                      Vendedor verificado
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-2xl font-bold">{products.length}</p>
                  <p className="text-xs text-muted-foreground">Productos</p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-2xl font-bold">{admin.sales}</p>
                  <p className="text-xs text-muted-foreground">Ventas</p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Link href="/publicar">
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Crear publicación
                  </Button>
                </Link>
                <Link href="/perfil/admin/ventas">
                  <Button variant="outline" className="w-full">
                    <Store className="mr-2 h-4 w-4" />
                    Mis ventas
                  </Button>
                </Link>
              </div>

              <div className="mt-6 space-y-2">
                <Link
                  href="/perfil/admin"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-muted"
                >
                  <Package className="h-4 w-4" />
                  Mis publicaciones
                </Link>
                <Link
                  href="/perfil/admin/configuracion"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  <Settings className="h-4 w-4" />
                  Configuración
                </Link>
                <Link
                  href="/perfil/admin/perfil"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  <User className="h-4 w-4" />
                  Editar perfil
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Información de contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm font-medium">Email:</p>
                <p className="text-sm text-muted-foreground">{admin.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Teléfono:</p>
                <p className="text-sm text-muted-foreground">{admin.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Ubicación:</p>
                <p className="text-sm text-muted-foreground">
                  {admin.city}, {admin.state}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-9">
          <Tabs defaultValue="products">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="products">Mis publicaciones</TabsTrigger>
              <TabsTrigger value="about">Acerca de mí</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Mis publicaciones</h2>
                <Link href="/publicar">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nueva publicación
                  </Button>
                </Link>
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Package className="h-16 w-16 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No tienes publicaciones</h2>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Comienza a vender creando tu primera publicación
                  </p>
                  <Link href="/publicar">
                    <Button>Crear publicación</Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Acerca de mí</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p>{admin.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Valoraciones y opiniones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold">{admin.rating}</div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(admin.rating) ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 15.585l-6.327 3.331a1 1 0 01-1.45-1.054l1.208-7.04-5.118-4.984a1 1 0 01.555-1.705l7.073-1.027 3.162-6.403a1 1 0 011.794 0l3.162 6.403 7.073 1.027a1 1 0 01.555 1.705l-5.118 4.984 1.208 7.04a1 1 0 01-1.45 1.054L10 15.585z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Basado en {admin.reviewCount} valoraciones</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
