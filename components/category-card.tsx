import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function CategoryCard({ title, description, href, imageSrc }) {
  // Usar una imagen predeterminada si no se proporciona una
  const imageSource = imageSrc || "/placeholder.svg?height=200&width=300"

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link href={href}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageSource || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <span className="text-sm font-medium text-primary">Ver más</span>
        </CardFooter>
      </Link>
    </Card>
  )
}
