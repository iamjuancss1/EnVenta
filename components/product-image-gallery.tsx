"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductImageGalleryProps {
  images: string[]
  title: string
}

export function ProductImageGallery({ images = [], title = "Producto" }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  // Asegurarse de que hay al menos una imagen
  const safeImages = images && images.length > 0 ? images : ["/placeholder.svg?height=600&width=600"]

  // Asegurarse de que selectedImage está dentro de los límites
  const safeSelectedIndex = Math.min(Math.max(0, selectedImage), safeImages.length - 1)
  const currentImage = safeImages[safeSelectedIndex] || "/placeholder.svg?height=600&width=600"
  const imageAlt = `${title} - Imagen ${safeSelectedIndex + 1}`

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg border">
        <Image src={currentImage || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" priority />
      </div>

      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-auto pb-2">
          {safeImages.map((image, index) => {
            const isSelected = safeSelectedIndex === index
            const thumbnailAlt = `${title} - Miniatura ${index + 1}`

            return (
              <button
                key={index}
                className={cn(
                  "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border",
                  isSelected && "ring-2 ring-primary",
                )}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg?height=80&width=80"}
                  alt={thumbnailAlt}
                  fill
                  className="object-cover"
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
