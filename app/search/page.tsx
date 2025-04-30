import { Suspense } from "react"
import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { getAllProducts } from "@/lib/data"

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const allProducts = getAllProducts()

  const filteredProducts = query
    ? allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.name.toLowerCase().includes(query.toLowerCase()),
      )
    : []

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver a inicio
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Resultados de búsqueda</h1>
        <p className="text-muted-foreground">
          {filteredProducts.length} productos encontrados para "{query}"
        </p>
      </div>

      <Suspense fallback={<div>Cargando resultados...</div>}>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No se encontraron productos</h2>
            <p className="text-muted-foreground mb-6">
              Intenta con otros términos de búsqueda o explora nuestras categorías
            </p>
            <Link href="/">
              <Button>Ver todas las categorías</Button>
            </Link>
          </div>
        )}
      </Suspense>
    </div>
  )
}
