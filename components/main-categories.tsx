import Link from "next/link"
import {
  Smartphone,
  Car,
  Tv,
  HomeIcon,
  ShoppingBag,
  Shirt,
  Gamepad2,
  Baby,
  Wrench,
  Utensils,
  Dumbbell,
  Palette,
} from "lucide-react"

// Definir categorías con sus iconos y slugs
const categories = [
  { name: "Tecnología", icon: Smartphone, slug: "tecnologia" },
  { name: "Vehículos", icon: Car, slug: "vehiculos" },
  { name: "Electrodomésticos", icon: Tv, slug: "electrodomesticos" },
  { name: "Hogar y Muebles", icon: HomeIcon, slug: "hogar-muebles" },
  { name: "Supermercado", icon: ShoppingBag, slug: "supermercado" },
  { name: "Moda", icon: Shirt, slug: "moda" },
  { name: "Juegos y Juguetes", icon: Gamepad2, slug: "juegos-juguetes" },
  { name: "Bebés", icon: Baby, slug: "bebes" },
  { name: "Herramientas", icon: Wrench, slug: "herramientas" },
  { name: "Alimentos y Bebidas", icon: Utensils, slug: "alimentos-bebidas" },
  { name: "Deportes y Fitness", icon: Dumbbell, slug: "deportes-fitness" },
  { name: "Arte y Artesanías", icon: Palette, slug: "arte-artesanias" },
]

export function MainCategories() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <Link
            key={category.slug}
            href={`/categoria/${category.slug}`}
            className="flex flex-col items-center justify-center p-4 bg-background rounded-lg border hover:border-primary transition-colors"
          >
            <div className="mb-2 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium text-center">{category.name}</span>
          </Link>
        )
      })}
    </div>
  )
}
