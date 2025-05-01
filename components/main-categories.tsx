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

export function MainCategories() {
  // Definir categorías con sus iconos y slugs
  const categories = [
    { name: "Tecnología", slug: "tecnologia", icon: Smartphone },
    { name: "Vehículos", slug: "vehiculos", icon: Car },
    { name: "Electrodomésticos", slug: "electrodomesticos", icon: Tv },
    { name: "Hogar y Muebles", slug: "hogar-muebles", icon: HomeIcon },
    { name: "Supermercado", slug: "supermercado", icon: ShoppingBag },
    { name: "Moda", slug: "moda", icon: Shirt },
    { name: "Juegos y Juguetes", slug: "juegos-juguetes", icon: Gamepad2 },
    { name: "Bebés", slug: "bebes", icon: Baby },
    { name: "Herramientas", slug: "herramientas", icon: Wrench },
    { name: "Alimentos y Bebidas", slug: "alimentos-bebidas", icon: Utensils },
    { name: "Deportes y Fitness", slug: "deportes-fitness", icon: Dumbbell },
    { name: "Arte y Artesanías", slug: "arte-artesanias", icon: Palette },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <Link
            key={category.slug}
            href={"/categoria/" + category.slug}
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
