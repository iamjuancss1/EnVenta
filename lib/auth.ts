"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Tipos
export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  avatar?: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  sendPasswordResetEmail: (email: string) => Promise<void>
  resetPassword: (code: string, newPassword: string) => Promise<void>
  sendMagicLink: (email: string) => Promise<void>
  verifyMagicLink: (token: string) => Promise<void>
}

// Contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Proveedor de autenticación
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Verificar si hay un usuario en localStorage al cargar
  useEffect(() => {
    // Asegurarse de que estamos en el navegador antes de usar localStorage
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Error parsing stored user:", error)
        if (typeof window !== "undefined") {
          localStorage.removeItem("user")
        }
      }
    }
    setLoading(false)
  }, [])

  // Simular base de datos de usuarios
  const [users] = useState<User[]>([
    {
      id: "admin1",
      name: "Admin",
      email: "admin@enventa.com",
      role: "admin",
      avatar: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "vendor1",
      name: "Juan Pérez",
      email: "vendedor@enventa.com",
      role: "user",
      avatar: "/placeholder.svg?height=200&width=200",
    },
  ])

  // Función para iniciar sesión
  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Simular una llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Buscar usuario por email (en una app real, esto sería una llamada a API)
      const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

      if (!foundUser) {
        throw new Error("Usuario no encontrado")
      }

      // En una app real, verificaríamos la contraseña con el hash almacenado
      // Aquí simplemente simulamos que la contraseña es correcta

      // Guardar usuario en localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(foundUser))
      }
      setUser(foundUser)

      // Redirigir al usuario a la página principal
      router.push("/")
    } catch (error: any) {
      throw new Error(error.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  // Función para registrar un nuevo usuario
  const register = async (name: string, email: string, password: string) => {
    setLoading(true)
    try {
      // Simular una llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Verificar si el email ya está registrado
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error("El correo electrónico ya está registrado")
      }

      // Crear nuevo usuario
      const newUser: User = {
        id: `user${users.length + 1}`,
        name,
        email,
        role: "user",
      }

      // Guardar usuario en localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(newUser))
      }
      setUser(newUser)

      // Redirigir al usuario a la página principal
      router.push("/")
    } catch (error: any) {
      throw new Error(error.message || "Error al registrar usuario")
    } finally {
      setLoading(false)
    }
  }

  // Función para cerrar sesión
  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
    setUser(null)
    router.push("/")
  }

  // Función para enviar email de restablecimiento de contraseña
  const sendPasswordResetEmail = async (email: string) => {
    setLoading(true)
    try {
      // Simular una llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Verificar si el email existe
      const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
      if (!foundUser) {
        throw new Error("No existe una cuenta con este correo electrónico")
      }

      // En una app real, enviaríamos un email con un código
      // Aquí simulamos que el código es "123456"

      // Redirigir a la página para ingresar el código
      router.push("/auth/reset-password/verify")
    } catch (error: any) {
      throw new Error(error.message || "Error al enviar el correo de restablecimiento")
    } finally {
      setLoading(false)
    }
  }

  // Función para restablecer contraseña con código
  const resetPassword = async (code: string, newPassword: string) => {
    setLoading(true)
    try {
      // Simular una llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Verificar el código (en una app real, esto sería una verificación en el servidor)
      if (code !== "123456") {
        throw new Error("Código inválido")
      }

      // En una app real, actualizaríamos la contraseña en la base de datos

      // Redirigir a la página de inicio de sesión
      router.push("/auth/login?reset=success")
    } catch (error: any) {
      throw new Error(error.message || "Error al restablecer la contraseña")
    } finally {
      setLoading(false)
    }
  }

  // Función para enviar magic link
  const sendMagicLink = async (email: string) => {
    setLoading(true)
    try {
      // Simular una llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Verificar si el email existe
      const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
      if (!foundUser) {
        throw new Error("No existe una cuenta con este correo electrónico")
      }

      // En una app real, enviaríamos un email con un link mágico
      // Aquí simulamos que el token es "magic-token-123"

      // Mostrar mensaje de éxito
      return
    } catch (error: any) {
      throw new Error(error.message || "Error al enviar el enlace mágico")
    } finally {
      setLoading(false)
    }
  }

  // Función para verificar magic link
  const verifyMagicLink = async (token: string) => {
    setLoading(true)
    try {
      // Simular una llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Verificar el token (en una app real, esto sería una verificación en el servidor)
      if (token !== "magic-token-123") {
        throw new Error("Enlace inválido o expirado")
      }

      // En una app real, obtendríamos el usuario asociado al token
      const magicLinkUser = users[1] // Simulamos que es el segundo usuario

      // Guardar usuario en localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(magicLinkUser))
      }
      setUser(magicLinkUser)

      // Redirigir al usuario a la página principal
      router.push("/")
    } catch (error: any) {
      throw new Error(error.message || "Error al verificar el enlace mágico")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        sendPasswordResetEmail,
        resetPassword,
        sendMagicLink,
        verifyMagicLink,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook para usar el contexto de autenticación
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
