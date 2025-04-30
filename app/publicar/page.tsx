"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, ChevronLeft, ImagePlus, Trash2, Loader2, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getAllCategories } from "@/lib/data"
import { formatPrice } from "@/lib/utils"

export default function CreateProductPage() {
  const router = useRouter()
  const categories = getAllCategories()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    categoryId: "",
    location: "",
    isNew: "true",
    images: [] as File[],
    specifications: [{ name: "", value: "" }],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // Verificar si ya hay 8 imágenes
    if (formData.images.length + files.length > 8) {
      setError("Solo puedes subir un máximo de 8 imágenes")
      return
    }

    const newImages = Array.from(files)
    const newPreviews: string[] = []

    // Crear URLs para previsualización
    newImages.forEach((file) => {
      const url = URL.createObjectURL(file)
      newPreviews.push(url)
    })

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }))

    setPreviewImages((prev) => [...prev, ...newPreviews])
    setError("")
  }

  const removeImage = (index: number) => {
    const updatedImages = [...formData.images]
    const updatedPreviews = [...previewImages]

    // Liberar URL de objeto
    URL.revokeObjectURL(updatedPreviews[index])

    updatedImages.splice(index, 1)
    updatedPreviews.splice(index, 1)

    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }))
    setPreviewImages(updatedPreviews)
  }

  const handleSpecificationChange = (index: number, field: "name" | "value", value: string) => {
    const updatedSpecs = [...formData.specifications]
    updatedSpecs[index][field] = value
    setFormData((prev) => ({
      ...prev,
      specifications: updatedSpecs,
    }))
  }

  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { name: "", value: "" }],
    }))
  }

  const removeSpecification = (index: number) => {
    const updatedSpecs = [...formData.specifications]
    updatedSpecs.splice(index, 1)
    setFormData((prev) => ({
      ...prev,
      specifications: updatedSpecs,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Validaciones básicas
      if (!formData.title.trim()) {
        throw new Error("El título es obligatorio")
      }

      if (!formData.description.trim()) {
        throw new Error("La descripción es obligatoria")
      }

      if (!formData.price.trim() || isNaN(Number(formData.price))) {
        throw new Error("El precio debe ser un número válido")
      }

      if (!formData.categoryId) {
        throw new Error("Debes seleccionar una categoría")
      }

      if (!formData.location.trim()) {
        throw new Error("La ubicación es obligatoria")
      }

      if (formData.images.length === 0) {
        throw new Error("Debes subir al menos una imagen")
      }

      // Aquí iría la lógica para enviar los datos al servidor
      // Simulamos un envío exitoso
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess(true)

      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push("/perfil/admin")
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Error al crear la publicación")
    } finally {
      setIsLoading(false)
    }
  }

  // Formatear el precio en tiempo real para mostrar al usuario
  const formattedPrice = formData.price ? formatPrice(Number(formData.price)) : ""

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6">
        <Link href="/perfil/admin">
          <Button variant="ghost" size="sm" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver a mi perfil
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Crear nueva publicación</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
          <Info className="h-4 w-4" />
          <AlertDescription>¡Publicación creada con éxito! Redirigiendo...</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información básica</CardTitle>
                <CardDescription>Ingresa los detalles principales de tu producto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título del producto *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Ej: Smartphone Samsung Galaxy A54"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe tu producto detalladamente"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Precio (COP) *</Label>
                  <div className="relative">
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="Ej: 1000000"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                    {formData.price && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        {formattedPrice}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoría *</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => handleSelectChange("categoryId", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación *</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Ej: Bogotá, Colombia"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Estado del producto *</Label>
                  <Select value={formData.isNew} onValueChange={(value) => handleSelectChange("isNew", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Nuevo</SelectItem>
                      <SelectItem value="false">Usado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Especificaciones</CardTitle>
                <CardDescription>Agrega las características técnicas de tu producto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.specifications.map((spec, index) => (
                  <div key={index} className="flex items-end gap-2">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`spec-name-${index}`}>Característica</Label>
                      <Input
                        id={`spec-name-${index}`}
                        placeholder="Ej: Marca"
                        value={spec.name}
                        onChange={(e) => handleSpecificationChange(index, "name", e.target.value)}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`spec-value-${index}`}>Valor</Label>
                      <Input
                        id={`spec-value-${index}`}
                        placeholder="Ej: Samsung"
                        value={spec.value}
                        onChange={(e) => handleSpecificationChange(index, "value", e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSpecification(index)}
                      disabled={formData.specifications.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar especificación</span>
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addSpecification}>
                  Agregar especificación
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Imágenes del producto</CardTitle>
                <CardDescription>Sube hasta 8 imágenes de tu producto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {previewImages.map((src, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => removeImage(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                        <span className="sr-only">Eliminar imagen</span>
                      </Button>
                    </div>
                  ))}
                  {previewImages.length < 8 && (
                    <label
                      htmlFor="image-upload"
                      className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground hover:bg-muted/50"
                    >
                      <ImagePlus className="mb-2 h-8 w-8" />
                      <span>Agregar imagen</span>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Formatos permitidos: JPG, PNG. Tamaño máximo: 5MB por imagen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vista previa</CardTitle>
                <CardDescription>Así se verá tu publicación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold text-lg">{formData.title || "Título del producto"}</h3>
                  <p className="text-2xl font-bold mt-2">
                    {formData.price ? formatPrice(Number(formData.price)) : "$ 0"}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={formData.isNew === "true" ? "default" : "outline"}>
                      {formData.isNew === "true" ? "Nuevo" : "Usado"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{formData.location || "Ubicación"}</span>
                  </div>
                  <p className="mt-4 text-sm line-clamp-3">{formData.description || "Descripción del producto"}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Publicando...
                    </>
                  ) : (
                    "Publicar producto"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

import { Badge } from "@/components/ui/badge"
