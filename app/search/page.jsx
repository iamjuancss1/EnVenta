import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { getAllProducts } from "@/lib/data"
import { Header } from "@/components/header"

export default function SearchPage({ searchParams }) {
  // Extraer y validar la consulta de búsqueda
  const query = searchParams.q || ""

  // Obtener todos los productos
  const allProducts = getAllProducts() || []

  // Filtrar productos de manera segura
  const filteredProducts = []

  if (query && query.trim() !== "") {
    const lowerCaseQuery = query.toLowerCase()

    for (let i = 0; i < allProducts.length; i++) {
      const product = allProducts[i]
      if (!product) continue

      const title = (product.title || "").toLowerCase()
      const description = (product.description || "").toLowerCase()

      let categoryName = ""
      if (product.category && product.category.name) {
        categoryName = product.category.name.toLowerCase()
      }

      // Usar indexOf en lugar de includes para evitar problemas
      const matchesTitle = title.indexOf(lowerCaseQuery) !== -1
      const matchesDescription = description.indexOf(lowerCaseQuery) !== -1
      const matchesCategory = categoryName.indexOf(lowerCaseQuery) !== -1

      if (matchesTitle || matchesDescription || matchesCategory) {
        filteredProducts.push(product)
      }
    }
  }

  // Determinar si hay resultados
  const hasResults = filteredProducts.length > 0

  // Renderizar la página
  if (hasResults) {
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
              {filteredProducts.length} productos encontrados para "{query}"
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </>
    )
  } else {
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
            <p className="text-muted-foreground">0 productos encontrados para "{query}"</p>
          </div>

          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No se encontraron productos</h2>
            <p className="text-muted-foreground mb-6">
              Intenta con otros términos de búsqueda o explora nuestras categorías
            </p>
            <Link href="/">
              <Button>Ver todas las categorías</Button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}
