import type { Category, Product, UserProfile, Purchase, AdminProfile } from "@/types/product"

// Categorías basadas en Mercado Libre
const categories: Category[] = [
  { id: "1", name: "Tecnología", slug: "tecnologia" },
  { id: "2", name: "Vehículos", slug: "vehiculos" },
  { id: "3", name: "Electrodomésticos", slug: "electrodomesticos" },
  { id: "4", name: "Hogar y Muebles", slug: "hogar-muebles" },
  { id: "5", name: "Supermercado", slug: "supermercado" },
  { id: "6", name: "Moda", slug: "moda" },
  { id: "7", name: "Juegos y Juguetes", slug: "juegos-juguetes" },
  { id: "8", name: "Bebés", slug: "bebes" },
  { id: "9", name: "Herramientas", slug: "herramientas" },
  { id: "10", name: "Alimentos y Bebidas", slug: "alimentos-bebidas" },
  { id: "11", name: "Deportes y Fitness", slug: "deportes-fitness" },
  { id: "12", name: "Arte y Artesanías", slug: "arte-artesanias" },
]

// Perfil de administrador
const adminProfile: AdminProfile = {
  id: "admin1",
  name: "Admin",
  email: "admin@mercadoversatil.com",
  phone: "+57 300 123 4567",
  address: "Calle 100 #15-20",
  city: "Bogotá",
  state: "Cundinamarca",
  zipCode: "110111",
  avatar: "/placeholder.svg?height=200&width=200",
  memberSince: "Enero 2020",
  description:
    "Administrador de la plataforma MercadoVersátil. Ofrecemos productos de alta calidad con envíos a todo Colombia.",
  rating: 4.8,
  reviewCount: 156,
  sales: 243,
}

// Productos de ejemplo
const products: Product[] = [
  {
    id: "1",
    title: "Smartphone Samsung Galaxy A54",
    description:
      "Smartphone Samsung Galaxy A54 con 128GB de almacenamiento, 8GB RAM, pantalla Super AMOLED de 6.4 pulgadas y cámara de 50MP.",
    price: 1349990,
    originalPrice: 1499990,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: categories[0],
    location: "Bogotá, Colombia",
    isNew: true,
    specifications: [
      { name: "Marca", value: "Samsung" },
      { name: "Modelo", value: "Galaxy A54" },
      { name: "Almacenamiento", value: "128GB" },
      { name: "RAM", value: "8GB" },
      { name: "Pantalla", value: "6.4 pulgadas Super AMOLED" },
    ],
    seller: adminProfile,
    userId: "admin1",
  },
  {
    id: "2",
    title: "Laptop HP Pavilion 15",
    description:
      "Laptop HP Pavilion 15 con procesador Intel Core i5, 8GB de RAM, 512GB SSD y pantalla Full HD de 15.6 pulgadas.",
    price: 2649990,
    originalPrice: 2949990,
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    category: categories[0],
    location: "Medellín, Colombia",
    isNew: false,
    specifications: [
      { name: "Marca", value: "HP" },
      { name: "Modelo", value: "Pavilion 15" },
      { name: "Procesador", value: "Intel Core i5" },
      { name: "RAM", value: "8GB" },
      { name: "Almacenamiento", value: "512GB SSD" },
    ],
    seller: adminProfile,
    userId: "admin1",
  },
  {
    id: "3",
    title: "Sofá Cama 3 Plazas",
    description:
      "Sofá cama de 3 plazas con estructura de madera, tapizado en tela de alta calidad y mecanismo de apertura fácil.",
    price: 1299990,
    originalPrice: null,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: categories[3],
    location: "Cali, Colombia",
    isNew: true,
    specifications: [
      { name: "Material", value: "Madera y tela" },
      { name: "Dimensiones", value: "220x90x85 cm" },
      { name: "Color", value: "Gris" },
      { name: "Capacidad", value: "3 personas" },
    ],
    seller: adminProfile,
    userId: "admin1",
  },
  {
    id: "4",
    title: "Bicicleta de Montaña Trek Marlin 5",
    description:
      "Bicicleta de montaña Trek Marlin 5 con cuadro de aluminio, suspensión delantera y cambios Shimano de 8 velocidades.",
    price: 2149990,
    originalPrice: 2399990,
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    category: categories[10],
    location: "Barranquilla, Colombia",
    isNew: false,
    specifications: [
      { name: "Marca", value: "Trek" },
      { name: "Modelo", value: "Marlin 5" },
      { name: "Tamaño de cuadro", value: 'M (17.5")' },
      { name: "Velocidades", value: "8" },
      { name: "Frenos", value: "Disco hidráulico" },
    ],
    seller: adminProfile,
    userId: "admin1",
  },
  {
    id: "5",
    title: "Refrigerador Samsung Side by Side",
    description:
      "Refrigerador Samsung Side by Side con dispensador de agua y hielo, 26 pies cúbicos y tecnología de enfriamiento Twin Cooling Plus.",
    price: 5299990,
    originalPrice: 5999990,
    images: ["/placeholder.svg?height=600&width=600"],
    category: categories[2],
    location: "Bogotá, Colombia",
    isNew: true,
    specifications: [
      { name: "Marca", value: "Samsung" },
      { name: "Modelo", value: "RS27T5200S9" },
      { name: "Capacidad", value: "26 pies cúbicos" },
      { name: "Color", value: "Acero inoxidable" },
      { name: "Dimensiones", value: "178x91x72 cm" },
    ],
    seller: adminProfile,
    userId: "admin1",
  },
  {
    id: "6",
    title: "Juego de Mesa Catan",
    description:
      "Juego de mesa Catan, el clásico juego de estrategia y negociación para 3-4 jugadores. Incluye tablero modular, cartas y fichas.",
    price: 189990,
    originalPrice: null,
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    category: categories[6],
    location: "Medellín, Colombia",
    isNew: false,
    specifications: [
      { name: "Marca", value: "Devir" },
      { name: "Jugadores", value: "3-4" },
      { name: "Edad recomendada", value: "+10 años" },
      { name: "Duración", value: "75 minutos" },
      { name: "Idioma", value: "Español" },
    ],
    seller: adminProfile,
    userId: "admin1",
  },
]

// Datos de usuario de ejemplo
const userProfile: UserProfile = {
  id: "1",
  name: "Carlos Rodríguez",
  email: "carlos.rodriguez@example.com",
  phone: "+57 300 987 6543",
  address: "Calle Reforma 123",
  city: "Bogotá",
  state: "Cundinamarca",
  zipCode: "110111",
  avatar: "/placeholder.svg?height=200&width=200",
  memberSince: "Enero 2022",
  recentActivity: [
    {
      title: "Smartphone Samsung Galaxy A54",
      description: "Compraste este producto",
      date: "15 de abril, 2024",
      image: "/placeholder.svg?height=64&width=64",
    },
    {
      title: "Laptop HP Pavilion 15",
      description: "Añadiste este producto a favoritos",
      date: "10 de abril, 2024",
      image: "/placeholder.svg?height=64&width=64",
    },
    {
      title: "Bicicleta de Montaña Trek Marlin 5",
      description: "Visitaste este producto",
      date: "5 de abril, 2024",
      image: "/placeholder.svg?height=64&width=64",
    },
  ],
}

// Compras del usuario
const userPurchases: Purchase[] = [
  {
    id: "1",
    orderNumber: "MV-12345",
    productName: "Smartphone Samsung Galaxy A54",
    price: 1349990,
    quantity: 1,
    date: "15 de abril, 2024",
    status: "Entregado",
    image: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "2",
    orderNumber: "MV-12346",
    productName: "Juego de Mesa Catan",
    price: 189990,
    quantity: 1,
    date: "1 de abril, 2024",
    status: "Entregado",
    image: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "3",
    orderNumber: "MV-12347",
    productName: "Laptop HP Pavilion 15",
    price: 2649990,
    quantity: 1,
    date: "20 de abril, 2024",
    status: "En camino",
    image: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "4",
    orderNumber: "MV-12348",
    productName: "Sofá Cama 3 Plazas",
    price: 1299990,
    quantity: 1,
    date: "22 de abril, 2024",
    status: "Pendiente",
    image: "/placeholder.svg?height=96&width=96",
  },
]

// Funciones para obtener datos
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const category = getCategoryBySlug(categorySlug)
  if (!category) return []
  return products.filter((product) => product.category.id === category.id)
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getAllProducts(): Product[] {
  return products
}

export function getAllCategories(): Category[] {
  return categories
}

export function getUserProfile(): UserProfile {
  return userProfile
}

export function getUserPurchases(): Purchase[] {
  return userPurchases
}

export function getUserFavorites(): Product[] {
  // Simulamos que el usuario tiene algunos productos favoritos
  return [products[1], products[3], products[5]]
}

export function getAdminProfile(): AdminProfile {
  return adminProfile
}

export function getProductsByUser(userId: string): Product[] {
  return products.filter((product) => product.userId === userId)
}
