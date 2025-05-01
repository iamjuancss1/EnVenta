"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

export function DataTable({ columns, data }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const pageSize = 10

  // Filtrar datos basados en el término de búsqueda
  const filteredData = data.filter((item) => {
    if (!searchTerm) return true

    // Buscar en todas las propiedades del item
    return Object.values(item).some((value) => {
      if (value === null || value === undefined) return false
      return String(value).toLowerCase().includes(searchTerm.toLowerCase())
    })
  })

  // Paginar datos
  const paginatedData = filteredData.slice(currentPage * pageSize, (currentPage + 1) * pageSize)

  // Calcular valores para mostrar en la interfaz
  const totalRows = data.length
  const filteredRows = filteredData.length
  const pageCount = Math.ceil(filteredRows / pageSize)
  const canPreviousPage = currentPage > 0
  const canNextPage = currentPage < pageCount - 1

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.accessorKey || column.id}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, colIndex) => {
                    const key = column.accessorKey || column.id
                    let content = row[key]

                    // Si hay una función cell personalizada, usarla
                    if (column.cell) {
                      content = column.cell({ row: { getValue: (k) => row[k] } })
                    }

                    return <TableCell key={colIndex}>{content}</TableCell>
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Mostrando {filteredRows} de {totalRows} registros
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={!canPreviousPage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={!canNextPage}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
