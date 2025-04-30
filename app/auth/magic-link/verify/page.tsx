"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { Header } from "@/components/header"

export default function VerifyMagicLinkPage() {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const { verifyMagicLink } = useAuth()

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError("Enlace inválido o expirado")
        setIsLoading(false)
        return
      }

      try {
        await verifyMagicLink(token)
      } catch (err: any) {
        setError(err.message || "Error al verificar el enlace mágico")
      } finally {
        setIsLoading(false)
      }
    }

    verifyToken()
  }, [token, verifyMagicLink])

  return (
    <>
      <Header />
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Verificando enlace mágico</CardTitle>
            <CardDescription>Estamos verificando tu enlace mágico</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col items-center justify-center py-6">
            {isLoading ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-center">Verificando tu enlace mágico...</p>
              </>
            ) : error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Inicio de sesión exitoso. Redirigiendo...</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
