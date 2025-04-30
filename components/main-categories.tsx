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
    { name: "Tecnología", slug: "tecnologia", icon: <Smartphone className="h-6 w-6" /> },
    { name: "Vehículos", slug: "vehiculos", icon: <Car className="h-6 w-6" /> },
    { name: "Electrodomésticos", slug: "electrodomesticos", icon: <Tv className="h-6 w-6" /> },
    { name: "Hogar y Muebles", slug: "hogar-muebles", icon: <HomeIcon className="h-6 w-6" /> },
    { name: "Supermercado", slug: "supermercado", icon: <ShoppingBag className="h-6 w-6" /> },
    { name: "Moda", slug: "moda", icon: <Shirt className="h-6 w-6" /> },
    { name: "Juegos y Juguetes", slug: "juegos-juguetes", icon: <Gamepad2 className="h-6 w-6" /> },
    { name: "Bebés", slug: "bebes", icon: <Baby className="h-6 w-6" /> },
    { name: "Herramientas", slug: "herramientas", icon: <Wrench className="h-6 w-6" /> },
    { name: "Alimentos y Bebidas", slug: "alimentos-bebidas", icon: <Utensils className="h-6 w-6" /> },
    { name: "Deportes y Fitness", slug: "deportes-fitness", icon: <Dumbbell className="h-6 w-6" /> },
    { name: "Arte y Artesanías", slug: "arte-artesanias", icon: <Palette className="h-6 w-6" /> },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/categoria/${category.slug}`}
          className="flex flex-col items-center justify-center p-4 bg-background rounded-lg border hover:border-primary transition-colors"
        >
          <div className="mb-2 text-primary">{category.icon}</div>
          <span className="text-sm font-medium text-center">{category.name}</span>
        </Link>
      ))}
    </div>
  )
}
