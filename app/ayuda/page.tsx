import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronLeft, HelpCircle, Mail, MessageSquare, Phone } from "lucide-react"
import { Header } from "@/components/header"

export default function HelpPage() {
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
            <HelpCircle className="h-6 w-6" />
            <h1 className="text-3xl font-bold">Centro de ayuda</h1>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Preguntas frecuentes</CardTitle>
              <CardDescription>Respuestas a las preguntas más comunes</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>¿Cómo puedo crear una cuenta?</AccordionTrigger>
                  <AccordionContent>
                    Para crear una cuenta, haz clic en "Crear cuenta" en la parte superior derecha de la página.
                    Completa el formulario con tu información y acepta los términos y condiciones.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>¿Cómo puedo publicar un producto?</AccordionTrigger>
                  <AccordionContent>
                    Para publicar un producto, debes iniciar sesión en tu cuenta. Luego, haz clic en "Crear publicación"
                    en tu perfil y completa el formulario con la información de tu producto.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>¿Cómo contacto a un vendedor?</AccordionTrigger>
                  <AccordionContent>
                    Para contactar a un vendedor, debes iniciar sesión en tu cuenta. Luego, en la página del producto,
                    haz clic en "Contactar al vendedor" y podrás ver la información de contacto.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>¿Cómo puedo restablecer mi contraseña?</AccordionTrigger>
                  <AccordionContent>
                    Si olvidaste tu contraseña, haz clic en "Iniciar sesión" y luego en "¿Olvidaste tu contraseña?".
                    Ingresa tu correo electrónico y te enviaremos un código para restablecer tu contraseña.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contacto</CardTitle>
              <CardDescription>Ponte en contacto con nuestro equipo de soporte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>soporte@enventa.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span>+57 300 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>Chat en vivo (9am - 6pm)</span>
              </div>
              <Button className="w-full mt-4">Contactar soporte</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recursos</CardTitle>
              <CardDescription>Guías y tutoriales para usar EnVenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/ayuda/guia-publicacion" className="block hover:underline">
                Guía para publicar productos
              </Link>
              <Link href="/ayuda/consejos-venta" className="block hover:underline">
                Consejos para vender más rápido
              </Link>
              <Link href="/ayuda/seguridad" className="block hover:underline">
                Consejos de seguridad para compradores
              </Link>
              <Link href="/ayuda/terminos" className="block hover:underline">
                Términos y condiciones
              </Link>
              <Link href="/ayuda/privacidad" className="block hover:underline">
                Política de privacidad
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
