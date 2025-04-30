"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import { User, LogOut, Bell, HelpCircle, Home, ChevronDown, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Variable global simulada (en una app real, esto se manejaría con un contexto global)
const hasVisitedNotifications = false

export function Header() {
  const { user, logout } = useAuth()
  const [notificationCount, setNotificationCount] = useState(3)
  const [showNotificationCount, setShowNotificationCount] = useState(true)

  // Escuchar eventos de notificaciones leídas
  useEffect(() => {
    const handleNotificationsRead = () => {
      setNotificationCount(0)
      setShowNotificationCount(false)
    }

    // Simular recepción de nueva notificación
    const handleNewNotification = () => {
      setNotificationCount((prev) => prev + 1)
      setShowNotificationCount(true)
    }

    window.addEventListener("notificationsRead", handleNotificationsRead)

    // Esto es solo para demostración - en una app real, esto vendría de un sistema de notificaciones en tiempo real
    const newNotificationInterval = setInterval(() => {
      // Solo añadir notificaciones si el usuario ya ha visitado la página de notificaciones
      if (hasVisitedNotifications && Math.random() > 0.9) {
        handleNewNotification()
      }
    }, 30000) // Cada 30 segundos hay una pequeña probabilidad de recibir una notificación

    return () => {
      window.removeEventListener("notificationsRead", handleNotificationsRead)
      clearInterval(newNotificationInterval)
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">EnVenta</span>
        </Link>
        <SearchBar />
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/publicar">
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Subir nuevo producto</span>
                  <span className="inline sm:hidden">Subir</span>
                </Button>
              </Link>
              <Link href="/notificaciones">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {showNotificationCount && notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                      {notificationCount}
                    </Badge>
                  )}
                  <span className="sr-only">Notificaciones</span>
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg?height=32&width=32"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/" className="flex items-center">
                      <Home className="mr-2 h-4 w-4" />
                      <span>Inicio</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={user.role === "admin" ? "/perfil/admin" : "/perfil"} className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Mi perfil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/ayuda" className="flex items-center">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Ayuda</span>
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Panel de administración</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="flex items-center text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Iniciar sesión
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Crear cuenta</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
