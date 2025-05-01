"use client"

import { useState } from "react"
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

export function Header() {
  const { user, logout } = useAuth()
  const [notificationCount] = useState(3)

  // Preparar datos seguros para el JSX
  const userName = user ? user.name : ""
  const userAvatar = user ? user.avatar || "/placeholder.svg?height=32&width=32" : "/placeholder.svg?height=32&width=32"
  const userInitial = userName ? userName.charAt(0) : ""
  const isAdmin = user ? user.role === "admin" : false
  const isLoggedIn = user !== null && user !== undefined
  const showNotificationBadge = notificationCount > 0

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">EnVenta</span>
        </Link>
        <SearchBar />
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
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
                  {showNotificationBadge && (
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
                      <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
                      <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">{userName}</span>
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
                    <Link href={isAdmin ? "/perfil/admin" : "/perfil"} className="flex items-center">
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
