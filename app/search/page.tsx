import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { getAllProducts } from "@/lib/data"
import { Header } from "@/components/header"

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  // Extraer y validar la consulta de búsqueda
  const query = searchParams.q || ""

  // Obtener todos los productos
  const allProducts = getAllProducts() || []

  // Filtrar productos de manera segura
  const filteredProducts = []

  if (query && query.trim() !== "") {
    const lowerCaseQuery = query.toLowerCase()

    for (const product of allProducts) {
      const title = (product.title || "").toLowerCase()
      const description = (product.description || "").toLowerCase()
      const categoryName = (product.category?.name || "").toLowerCase()

      if (
        title.includes(lowerCaseQuery) ||
        description.includes(lowerCaseQuery) ||
        categoryName.includes(lowerCaseQuery)
      ) {
        filteredProducts.push(product)
      }
    }
  }

  // Determinar si hay resultados
  const hasResults = filteredProducts.length > 0

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
          <h1 className="text-3xl font-bold">Resultados de búsqueda</h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} productos encontrados para &quot;{query}&quot;
          </p>
        </div>

        {hasResults ? (
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
      </div>
    </>
  )
}
