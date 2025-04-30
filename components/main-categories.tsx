import Link from "next/link"
import {
  Smartphone,
  Car,
  Tv,
  Home,
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
  { name: "Tecnología", icon: <Smartphone className="h-6 w-6" />, slug: "tecnologia" },
  { name: "Vehículos", icon: <Car className="h-6 w-6" />, slug: "vehiculos" },
  { name: "Electrodomésticos", icon: <Tv className="h-6 w-6" />, slug: "electrodomesticos" },
  { name: "Hogar y Muebles", icon: <Home className="h-6 w-6" />, slug: "hogar-muebles" },
  { name: "Supermercado", icon: <ShoppingBag className="h-6 w-6" />, slug: "supermercado" },
  { name: "Moda", icon: <Shirt className="h-6 w-6" />, slug: "moda" },
  { name: "Juegos y Juguetes", icon: <Gamepad2 className="h-6 w-6" />, slug: "juegos-juguetes" },
  { name: "Bebés", icon: <Baby className="h-6 w-6" />, slug: "bebes" },
  { name: "Herramientas", icon: <Wrench className="h-6 w-6" />, slug: "herramientas" },
  { name: "Alimentos y Bebidas", icon: <Utensils className="h-6 w-6" />, slug: "alimentos-bebidas" },
  { name: "Deportes y Fitness", icon: <Dumbbell className="h-6 w-6" />, slug: "deportes-fitness" },
  { name: "Arte y Artesanías", icon: <Palette className="h-6 w-6" />, slug: "arte-artesanias" },
]

export function MainCategories() {
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
