"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Bell, ShoppingBag, Heart, MessageCircle, X } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { Header } from "@/components/header"

// Datos de ejemplo para notificaciones
const initialNotifications = [
  {
    id: "1",
    type: "message",
    title: "Nuevo mensaje",
    description: "Has recibido un mensaje sobre tu producto 'Smartphone Samsung Galaxy A54'",
    date: "Hace 5 minutos",
    read: false,
    link: "/mensajes/1",
  },
  {
    id: "2",
    type: "like",
    title: "Producto añadido a favoritos",
    description: "Tu producto 'Laptop HP Pavilion 15' ha sido añadido a favoritos",
    date: "Hace 2 horas",
    read: false,
    link: "/producto/2",
  },
  {
    id: "3",
    type: "sale",
    title: "Nueva venta",
    description: "¡Felicidades! Tu producto 'Juego de Mesa Catan' ha sido vendido",
    date: "Hace 1 día",
    read: true,
    link: "/perfil/ventas",
  },
]

export default function NotificationsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState(initialNotifications)
  const [notificationsRead, setNotificationsRead] = useState(false)

  // Redirigir si el usuario no está autenticado
  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    } else if (!notificationsRead) {
      // Notificar que se han leído las notificaciones
      setNotificationsRead(true)

      // Asegurarse de que estamos en el navegador antes de usar CustomEvent
      if (typeof window !== "undefined") {
        try {
          window.dispatchEvent(new Event("notificationsRead"))
        } catch (error) {
          console.error("Error dispatching notificationsRead event:", error)
        }
      }
    }
  }, [user, router, notificationsRead])

  if (!user) {
    return null
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageCircle className="h-5 w-5 text-blue-500" />
      case "like":
        return <Heart className="h-5 w-5 text-red-500" />
      case "sale":
        return <ShoppingBag className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const handleDeleteNotification = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Eliminar la notificación
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  return (
    <>
      <Header />
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Volver a inicio
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Bell className="h-6 w-6" />
            <h1 className="text-3xl font-bold">Notificaciones</h1>
          </div>
        </div>

        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Link key={notification.id} href={notification.link}>
                <Card
                  className={`transition-colors hover:bg-muted/50 ${notification.read ? "" : "border-l-4 border-primary"}`}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-muted p-2">{getIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-medium ${notification.read ? "" : "font-semibold"}`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{notification.date}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 rounded-full hover:bg-destructive/10 hover:text-destructive"
                              onClick={(e) => handleDeleteNotification(notification.id, e)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Eliminar notificación</span>
                            </Button>
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No tienes notificaciones</h2>
              <p className="text-muted-foreground">Te notificaremos cuando haya actividad en tu cuenta</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
