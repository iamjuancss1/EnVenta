// Este script busca posibles errores de sintaxis JSX relacionados con operadores de comparación
const fs = require("fs")
const path = require("path")

// Directorios a escanear
const directories = ["app", "components", "lib"]

// Extensiones de archivo a escanear
const extensions = [".tsx", ".jsx", ".ts", ".js"]

// Patrones problemáticos a buscar
const problematicPatterns = [
  // Operadores de comparación sin espacios en JSX
  /<[^>]*?[a-zA-Z]>[a-zA-Z]/g,
  // Operadores de comparación en JSX sin escapar
  /<[^>]*?[a-zA-Z]<[a-zA-Z]/g,
  // Posibles operadores genéricos mal formados
  /[a-zA-Z]<[a-zA-Z]+=[a-zA-Z]/g,
  // Posibles operadores de comparación en expresiones JSX
  /{[^}]*?[a-zA-Z]>[a-zA-Z][^}]*?}/g,
  /{[^}]*?[a-zA-Z]<[a-zA-Z][^}]*?}/g,
  // Posibles errores en tipos genéricos
  /[a-zA-Z]<[a-zA-Z]+,[a-zA-Z]/g,
  // Posibles errores con el operador ternario
  /\?[^:]*?<[a-zA-Z]/g,
  /\?[^:]*?>[a-zA-Z]/g,
]

// Función para escanear un archivo
function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8")
    const lines = content.split("\n")

    let hasIssues = false

    problematicPatterns.forEach((pattern, patternIndex) => {
      let match
      while ((match = pattern.exec(content)) !== null) {
        // Encontrar el número de línea
        let lineNumber = 0
        let charCount = 0
        for (let i = 0; i < lines.length; i++) {
          if (charCount + lines[i].length + 1 > match.index) {
            lineNumber = i + 1
            break
          }
          charCount += lines[i].length + 1 // +1 para el carácter de nueva línea
        }

        // Obtener el contexto (la línea completa)
        const line = lines[lineNumber - 1] || ""

        console.log(`\x1b[31mPosible error en ${filePath}:${lineNumber}\x1b[0m`)
        console.log(`Patrón problemático #${patternIndex + 1}: ${pattern}`)
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
  console.log("Buscando posibles errores de sintaxis JSX...")

  let hasIssues = false

  for (const dir of directories) {
    const dirPath = path.join(process.cwd(), dir)
    if (fs.existsSync(dirPath)) {
      const dirHasIssues = scanDirectory(dirPath)
      hasIssues = hasIssues || dirHasIssues
    }
  }

  if (!hasIssues) {
    console.log("\x1b[32mNo se encontraron problemas potenciales.\x1b[0m")
  } else {
    console.log("\x1b[33mSe encontraron posibles problemas. Revisa los archivos mencionados.\x1b[0m")
  }
}

main()
