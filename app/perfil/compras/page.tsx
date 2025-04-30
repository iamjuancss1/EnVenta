import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Package, Truck, CheckCircle } from "lucide-react"
import { getUserPurchases } from "@/lib/data"
import { formatPrice } from "@/lib/utils"

export default function PurchasesPage() {
  const purchases = getUserPurchases()

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6">
        <Link href="/perfil">
          <Button variant="ghost" size="sm" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver a mi perfil
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Mis compras</h1>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="shipping">En camino</TabsTrigger>
          <TabsTrigger value="completed">Entregadas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-6">
            {purchases.map((purchase) => (
              <Card key={purchase.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Pedido #{purchase.orderNumber}</span>
                        <span className="text-sm text-muted-foreground">{purchase.date}</span>
                      </div>
                      <Badge
                        variant={
                          purchase.status === "Entregado"
                            ? "default"
                            : purchase.status === "En camino"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {purchase.status === "Entregado" && <CheckCircle className="mr-1 h-3 w-3" />}
                        {purchase.status === "En camino" && <Truck className="mr-1 h-3 w-3" />}
                        {purchase.status === "Pendiente" && <Package className="mr-1 h-3 w-3" />}
                        {purchase.status}
                      </Badge>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={purchase.image || "/placeholder.svg?height=96&width=96"}
                          alt={purchase.productName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-medium">{purchase.productName}</h3>
                          <p className="text-sm text-muted-foreground">Cantidad: {purchase.quantity}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{formatPrice(purchase.price)}</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Ver detalles
                            </Button>
                            {purchase.status === "Entregado" && <Button size="sm">Calificar</Button>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="space-y-6">
            {purchases
              .filter((purchase) => purchase.status === "Pendiente")
              .map((purchase) => (
                <Card key={purchase.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Pedido #{purchase.orderNumber}</span>
                          <span className="text-sm text-muted-foreground">{purchase.date}</span>
                        </div>
                        <Badge variant="secondary">
                          <Package className="mr-1 h-3 w-3" />
                          {purchase.status}
                        </Badge>
                      </div>

                      <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={purchase.image || "/placeholder.svg?height=96&width=96"}
                            alt={purchase.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="font-medium">{purchase.productName}</h3>
                            <p className="text-sm text-muted-foreground">Cantidad: {purchase.quantity}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{formatPrice(purchase.price)}</span>
                            <Button variant="outline" size="sm">
                              Ver detalles
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="shipping" className="mt-6">
          <div className="space-y-6">
            {purchases
              .filter((purchase) => purchase.status === "En camino")
              .map((purchase) => (
                <Card key={purchase.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Pedido #{purchase.orderNumber}</span>
                          <span className="text-sm text-muted-foreground">{purchase.date}</span>
                        </div>
                        <Badge variant="outline">
                          <Truck className="mr-1 h-3 w-3" />
                          {purchase.status}
                        </Badge>
                      </div>

                      <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={purchase.image || "/placeholder.svg?height=96&width=96"}
                            alt={purchase.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="font-medium">{purchase.productName}</h3>
                            <p className="text-sm text-muted-foreground">Cantidad: {purchase.quantity}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{formatPrice(purchase.price)}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Ver detalles
                              </Button>
                              <Button size="sm">Rastrear</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="space-y-6">
            {purchases
              .filter((purchase) => purchase.status === "Entregado")
              .map((purchase) => (
                <Card key={purchase.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Pedido #{purchase.orderNumber}</span>
                          <span className="text-sm text-muted-foreground">{purchase.date}</span>
                        </div>
                        <Badge>
                          <CheckCircle className="mr-1 h-3 w-3" />
                          {purchase.status}
                        </Badge>
                      </div>

                      <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={purchase.image || "/placeholder.svg?height=96&width=96"}
                            alt={purchase.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="font-medium">{purchase.productName}</h3>
                            <p className="text-sm text-muted-foreground">Cantidad: {purchase.quantity}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{formatPrice(purchase.price)}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Ver detalles
                              </Button>
                              <Button size="sm">Calificar</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
