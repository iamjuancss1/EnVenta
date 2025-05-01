// Este script busca patrones específicos que podrían causar el error "Expected '>', got 'value'"
const fs = require("fs")
const path = require("path")

// Directorios a escanear
const directories = ["app", "components", "lib"]

// Extensiones de archivo a escanear
const extensions = [".tsx", ".jsx", ".ts", ".js"]

// Patrones problemáticos específicos
const problematicPatterns = [
  // Operadores de comparación sin espacios
  /[a-zA-Z0-9]>[a-zA-Z0-9]/g,
  /[a-zA-Z0-9]<[a-zA-Z0-9]/g,

  // Operadores de comparación en JSX
  /<[^>]*?[a-zA-Z0-9]>[a-zA-Z0-9][^<]*?>/g,
  /<[^>]*?[a-zA-Z0-9]<[a-zA-Z0-9][^<]*?>/g,

  // Operadores ternarios problemáticos
  /\?[^:]*?<[a-zA-Z0-9]/g,
  /\?[^:]*?>[a-zA-Z0-9]/g,

  // Expresiones JSX con operadores de comparación
  /{[^}]*?[a-zA-Z0-9]>[a-zA-Z0-9][^}]*?}/g,
  /{[^}]*?[a-zA-Z0-9]<[a-zA-Z0-9][^}]*?}/g,

  // Tipos genéricos problemáticos
  /[a-zA-Z]<[a-zA-Z]+>/g,
  /[a-zA-Z]<[a-zA-Z]+,[a-zA-Z]+>/g,

  // Operadores lógicos AND/OR seguidos de JSX
  /&&\s*<[a-zA-Z]/g,
  /\|\|\s*<[a-zA-Z]/g,
]

// Función para escanear un archivo
function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8")
    const lines = content.split("\n")

    let hasIssues = false

    problematicPatterns.forEach((pattern, index) => {
      let match
      while ((match = pattern.exec(content)) !== null) {
        // Encontrar el número de línea
        let lineNumber = 1
        let pos = 0
        for (let i = 0; i < lines.length; i++) {
          if (pos + lines[i].length >= match.index) {
            lineNumber = i + 1
            break
          }
          pos += lines[i].length + 1 // +1 para el carácter de nueva línea
        }

        // Obtener el contexto (la línea completa)
        const line = lines[lineNumber - 1] || ""

        console.log(`\x1b[31mPosible error en ${filePath}:${lineNumber}\x1b[0m`)
        console.log(`Patrón #${index + 1}: ${pattern}`)
        console.log(`Contexto: ${line.trim()}`)
        console.log("---")

        hasIssues = true
      }
    })

    return hasIssues
  } catch (error) {
    console.error(`Error al escanear ${filePath}:`, error.message)
    return false
  }
}

// Función para escanear un directorio recursivamente
function scanDirectory(dir) {
  let hasIssues = false

  try {
    const items = fs.readdirSync(dir)

    for (const item of items) {
      const itemPath = path.join(dir, item)
      const stats = fs.statSync(itemPath)

      if (stats.isDirectory()) {
        // Escanear subdirectorio
        const subDirHasIssues = scanDirectory(itemPath)
        hasIssues = hasIssues || subDirHasIssues
      } else if (stats.isFile() && extensions.includes(path.extname(itemPath))) {
        // Escanear archivo si tiene una extensión relevante
        const fileHasIssues = scanFile(itemPath)
        hasIssues = hasIssues || fileHasIssues
      }
    }
  } catch (error) {
    console.error(`Error al escanear directorio ${dir}:`, error.message)
  }

  return hasIssues
}

// Función principal
function main() {
  console.log("Buscando patrones específicos que podrían causar el error 'Expected >, got value'...")

  let hasIssues = false

  for (const dir of directories) {
    const dirPath = path.join(process.cwd(), dir)
    if (fs.existsSync(dirPath)) {
      const dirHasIssues = scanDirectory(dirPath)
      hasIssues = hasIssues || dirHasIssues
    }
  }

  if (!hasIssues) {
    console.log("\x1b[32mNo se encontraron patrones problemáticos específicos.\x1b[0m")
  } else {
    console.log("\x1b[33mSe encontraron posibles problemas. Revisa los archivos mencionados.\x1b[0m")
  }
}

main()
