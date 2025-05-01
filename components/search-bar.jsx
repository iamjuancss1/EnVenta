"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  function handleSearch(e) {
    e.preventDefault()

    // Validar que el término de búsqueda no esté vacío
    const trimmedTerm = searchTerm.trim()

    if (trimmedTerm !== "") {
      // Codificar el término de búsqueda para la URL
      const encodedTerm = encodeURIComponent(trimmedTerm)
      // Navegar a la página de resultados
      router.push("/search?q=" + encodedTerm)
    }
  }

  function handleChange(e) {
    setSearchTerm(e.target.value)
  }

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
      <div className="relative flex items-center">
        <Input
          type="search"
          placeholder="Buscar productos, marcas y más..."
          className="w-full pr-10"
          value={searchTerm}
          onChange={handleChange}
        />
        <Button type="submit" variant="ghost" size="icon" className="absolute right-0">
          <Search className="h-4 w-4" />
          <span className="sr-only">Buscar</span>
        </Button>
      </div>
    </form>
  )
}
