#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, normalize } from "node:path"

const SOURCE_MANIFEST = "downloads/pciconcursos-provas-policia/manifest.json"
const OUTPUT_FILE = "scratch/pm-ce-soldado-dev/pm-ce-soldado-index.json"

const TARGET_YEARS = new Set(["2006", "2008", "2012", "2014", "2021", "2025"])

const BOARD_BY_SLUG = [
  "cebraspe",
  "cespe",
  "cev-uece",
  "fgv",
  "funcab",
  "selecon",
  "uece",
  "vunesp",
]

function getSlug(pageUrl) {
  return pageUrl.split("/").at(-1) ?? ""
}

function getYear(slug, fallback) {
  const match = slug.match(/-(\d{4})$/)
  return match?.[1] ?? fallback
}

function getBoard(slug) {
  const board = BOARD_BY_SLUG.find((item) => slug.includes(`-${item}-`))
  return board?.toUpperCase() ?? null
}

function classifyFile(file) {
  const value = `${file.label} ${file.path}`.toLowerCase()

  if (value.includes("gabarito") || value.includes("gab_")) {
    return "answer_key"
  }

  return "exam"
}

function normalizePath(path) {
  return normalize(path).replaceAll("\\", "/")
}

function buildIndex(items) {
  return items
    .filter((item) => {
      const slug = getSlug(item.pageUrl)

      return (
        slug.includes("policia-militar-ce") &&
        (slug.startsWith("soldado-") || slug.startsWith("soldado-do-qppm-"))
      )
    })
    .map((item) => {
      const slug = getSlug(item.pageUrl)
      const year = getYear(slug, item.year)

      return {
        id: `pm-ce-soldado-${year}`,
        career: "Policial",
        state: "CE",
        institution: "Policia Militar do Ceara",
        role: item.title === "Soldado do QPPM" ? "Soldado do QPPM" : "Soldado",
        normalizedRole: "Soldado",
        year,
        board: getBoard(slug),
        source: {
          provider: "PCI Concursos",
          pageUrl: item.pageUrl,
        },
        files: item.files.map((file) => ({
          type: classifyFile(file),
          label: file.label,
          url: file.url,
          path: normalizePath(file.path),
        })),
        analysisStatus: {
          noticeMapped: false,
          questionsExtracted: false,
          answerKeyMapped: item.files.some((file) => classifyFile(file) === "answer_key"),
          topicsMapped: false,
        },
      }
    })
    .filter((item) => TARGET_YEARS.has(item.year))
    .sort((a, b) => Number(a.year) - Number(b.year))
}

async function main() {
  const manifest = JSON.parse(await readFile(SOURCE_MANIFEST, "utf8"))
  const contests = buildIndex(manifest)

  const payload = {
    meta: {
      name: "PM CE Soldado - indice de desenvolvimento",
      description:
        "Recorte isolado para testar a analise cruzada de editais, provas, gabaritos e incidencia historica.",
      sourceManifest: SOURCE_MANIFEST,
      generatedAt: new Date().toISOString(),
      primaryAnalysisYears: ["2008", "2012", "2014", "2021", "2025"],
      complementaryYears: ["2006"],
    },
    contests,
  }

  await mkdir(dirname(OUTPUT_FILE), { recursive: true })
  await writeFile(OUTPUT_FILE, `${JSON.stringify(payload, null, 2)}\n`, "utf8")

  console.log(`Concursos normalizados: ${contests.length}`)
  console.log(`Arquivo gerado: ${OUTPUT_FILE}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
