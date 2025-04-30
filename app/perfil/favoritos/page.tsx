import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Heart } from "lucide-react"
import { getUserFavorites } from "@/lib/data"
import { ProductCard } from "@/components/product-card"

export default function FavoritesPage() {
  const favorites = getUserFavorites()

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6">
        <Link href="/perfil">
          <Button variant="ghost" size="sm" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver a mi perfil
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Mis favoritos</h1>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Heart className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No tienes productos favoritos</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Explora nuestro catálogo y guarda tus productos favoritos para encontrarlos fácilmente después
          </p>
          <Link href="/">
            <Button>Explorar productos</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
