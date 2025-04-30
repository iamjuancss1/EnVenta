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
    { name: "Tecnología", slug: "tecnologia" },
    { name: "Vehículos", slug: "vehiculos" },
    { name: "Electrodomésticos", slug: "electrodomesticos" },
    { name: "Hogar y Muebles", slug: "hogar-muebles" },
    { name: "Supermercado", slug: "supermercado" },
    { name: "Moda", slug: "moda" },
    { name: "Juegos y Juguetes", slug: "juegos-juguetes" },
    { name: "Bebés", slug: "bebes" },
    { name: "Herramientas", slug: "herramientas" },
    { name: "Alimentos y Bebidas", slug: "alimentos-bebidas" },
    { name: "Deportes y Fitness", slug: "deportes-fitness" },
    { name: "Arte y Artesanías", slug: "arte-artesanias" },
  ]

  // Renderizar los iconos de forma segura
  const renderIcon = (slug: string) => {
    switch (slug) {
      case "tecnologia":
        return <Smartphone className="h-6 w-6" />
      case "vehiculos":
        return <Car className="h-6 w-6" />
      case "electrodomesticos":
        return <Tv className="h-6 w-6" />
      case "hogar-muebles":
        return <HomeIcon className="h-6 w-6" />
      case "supermercado":
        return <ShoppingBag className="h-6 w-6" />
      case "moda":
        return <Shirt className="h-6 w-6" />
      case "juegos-juguetes":
        return <Gamepad2 className="h-6 w-6" />
      case "bebes":
        return <Baby className="h-6 w-6" />
      case "herramientas":
        return <Wrench className="h-6 w-6" />
      case "alimentos-bebidas":
        return <Utensils className="h-6 w-6" />
      case "deportes-fitness":
        return <Dumbbell className="h-6 w-6" />
      case "arte-artesanias":
        return <Palette className="h-6 w-6" />
      default:
        return <Smartphone className="h-6 w-6" />
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/categoria/${category.slug}`}
          className="flex flex-col items-center justify-center p-4 bg-background rounded-lg border hover:border-primary transition-colors"
        >
          <div className="mb-2 text-primary">{renderIcon(category.slug)}</div>
          <span className="text-sm font-medium text-center">{category.name}</span>
        </Link>
      ))}
    </div>
  )
}
