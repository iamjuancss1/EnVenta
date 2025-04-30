export interface Category {
  id: string
  name: string
  slug: string
}

export interface Specification {
  name: string
  value: string
}

export interface AdminProfile {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  avatar: string | null
  memberSince: string
  description: string
  rating: number
  reviewCount: number
  sales: number
}

export interface Seller {
  name: string
  since: string
  phone: string
  email: string
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  originalPrice: number | null
  images: string[]
  category: Category
  location: string
  isNew: boolean
  specifications: Specification[]
  seller: AdminProfile | Seller
  userId?: string
}

export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  avatar: string | null
  memberSince: string
  recentActivity: {
    title: string
    description: string
    date: string
    image: string | null
  }[]
}

export interface Purchase {
  id: string
  orderNumber: string
  productName: string
  price: number
  quantity: number
  date: string
  status: "Pendiente" | "En camino" | "Entregado"
  image: string | null
}
