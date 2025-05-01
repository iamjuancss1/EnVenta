"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Users, Package, AlertTriangle, CheckCircle, XCircle, Eye } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { getAllProducts } from "@/lib/data"
import { Header } from "@/components/header"
import { DataTable } from "@/components/data-table"
import { formatPrice } from "@/lib/utils"

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Redirigir si el usuario no es administrador
  useEffect(() => {
    if (user) {
      const userIsAdmin = user.role === "admin"
      setIsAdmin(userIsAdmin)

      if (!userIsAdmin) {
        router.push("/")
      } else {
        // Cargar productos
        setProducts(getAllProducts())
      }
      setIsLoading(false)
    } else {
      router.push("/auth/login")
    }
  }, [user, router])

  // Si está cargando o no es admin, no mostrar nada
  if (isLoading || !isAdmin) {
    return null
  }

  // Columnas para la tabla de productos
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: "Título",
      cell: ({ row }) => {
        const title = row.getValue("title")
        return <div className="max-w-[200px] truncate font-medium">{title}</div>
      },
    },
    {
      accessorKey: "category",
      header: "Categoría",
      cell: ({ row }) => {
        const category = row.getValue("category")
        return category ? category.name : ""
      },
    },
    {
      accessorKey: "price",
      header: "Precio",
      cell: ({ row }) => {
        const price = row.getValue("price")
        return formatPrice(price)
      },
    },
    {
      accessorKey: "seller",
      header: "Vendedor",
      cell: ({ row }) => {
        const seller = row.getValue("seller")
        return seller ? seller.name : ""
      },
    },
    {
      accessorKey: "isNew",
      header: "Estado",
      cell: ({ row }) => {
        const isNew = row.getValue("isNew")
        return <Badge variant={isNew ? "default" : "outline"}>{isNew ? "Nuevo" : "Usado"}</Badge>
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const id = row.getValue("id")
        return (
          <div className="flex items-center gap-2">
            <Link href={"/producto/" + id}>
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
                <span className="sr-only">Ver</span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="sr-only">Aprobar</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-red-600">
              <XCircle className="h-4 w-4" />
              <span className="sr-only">Rechazar</span>
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <>
      <Header />
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Volver a inicio
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Panel de administración</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Usuarios</CardTitle>
              <CardDescription>Total de usuarios registrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">24</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Productos</CardTitle>
              <CardDescription>Total de productos publicados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{products.length}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Reportes</CardTitle>
              <CardDescription>Productos reportados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="text-2xl font-bold">2</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="products">
            <TabsList>
              <TabsTrigger value="products">Productos</TabsTrigger>
              <TabsTrigger value="users">Usuarios</TabsTrigger>
              <TabsTrigger value="reports">Reportes</TabsTrigger>
            </TabsList>
            <TabsContent value="products" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de productos</CardTitle>
                  <CardDescription>Administra los productos publicados en la plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable columns={columns} data={products} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="users" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de usuarios</CardTitle>
                  <CardDescription>Administra los usuarios registrados en la plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="py-4 text-center text-muted-foreground">Funcionalidad en desarrollo</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reports" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de reportes</CardTitle>
                  <CardDescription>Administra los reportes de productos y usuarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="py-4 text-center text-muted-foreground">Funcionalidad en desarrollo</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
