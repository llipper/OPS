#!/usr/bin/env node

import { createWriteStream } from "node:fs"
import { mkdir, writeFile } from "node:fs/promises"
import { basename, join } from "node:path"
import { Readable } from "node:stream"
import { pipeline } from "node:stream/promises"

const DEFAULT_URL = "https://www.pciconcursos.com.br/provas/policia"
const FALLBACK_URL = "https://www.pciconcursos.com.br/provas/policial"
const DEFAULT_OUTPUT_DIR = "downloads/pciconcursos-provas-policia"
const USER_AGENT = "ConcursoMasterDownloader/1.0 (+local study archive)"

const args = parseArgs(process.argv.slice(2))
const startUrl = args.url ?? DEFAULT_URL
const outputDir = args.output ?? DEFAULT_OUTPUT_DIR
const delayMs = Number(args.delay ?? 700)
const limit = args.limit ? Number(args.limit) : Number.POSITIVE_INFINITY
const dryRun = Boolean(args["dry-run"])

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function main() {
  await mkdir(outputDir, { recursive: true })

  const categoryPages = await collectCategoryPages(startUrl)
  const examPages = await collectExamPages(categoryPages)
  const selectedExamPages = examPages.slice(0, limit)

  console.log(`Paginas de listagem: ${categoryPages.length}`)
  console.log(`Provas encontradas: ${examPages.length}`)
  console.log(`Provas selecionadas: ${selectedExamPages.length}`)

  const manifest = []

  for (const [index, exam] of selectedExamPages.entries()) {
    console.log(`[${index + 1}/${selectedExamPages.length}] ${exam.title}`)

    const html = await fetchHtml(exam.url)
    const pdfs = extractPdfLinks(html, exam.url)
    const examDir = join(outputDir, sanitizeFileName(`${exam.title}-${exam.year ?? "sem-ano"}`))
    await mkdir(examDir, { recursive: true })

    const item = {
      title: exam.title,
      year: exam.year,
      agency: exam.agency,
      board: exam.board,
      pageUrl: exam.url,
      files: [],
    }

    for (const pdf of pdfs) {
      const targetPath = join(examDir, sanitizeFileName(pdf.fileName))
      item.files.push({ label: pdf.label, url: pdf.url, path: targetPath })

      if (dryRun) {
        console.log(`  - ${pdf.fileName}`)
        continue
      }

      await downloadFile(pdf.url, targetPath)
      console.log(`  - baixado: ${pdf.fileName}`)
      await sleep(delayMs)
    }

    manifest.push(item)
    await sleep(delayMs)
  }

  await writeFile(join(outputDir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8")
  console.log(`Manifesto salvo em: ${join(outputDir, "manifest.json")}`)
}

async function collectCategoryPages(url) {
  const visited = new Set()
  const queue = [url]

  while (queue.length > 0) {
    const current = queue.shift()
    if (!current || visited.has(current)) continue

    let html
    try {
      html = await fetchHtml(current)
    } catch (error) {
      if (current === DEFAULT_URL) {
        queue.push(FALLBACK_URL)
        continue
      }
      throw error
    }

    visited.add(current)

    for (const link of extractLinks(html, current)) {
      if (isSameCategoryPage(link.url, url) && !visited.has(link.url)) {
        queue.push(link.url)
      }
    }
  }

  return Array.from(visited)
}

async function collectExamPages(categoryPages) {
  const exams = new Map()

  for (const pageUrl of categoryPages) {
    const html = await fetchHtml(pageUrl)
    const rows = extractExamRows(html, pageUrl)

    for (const row of rows) {
      if (!exams.has(row.url)) exams.set(row.url, row)
    }

    await sleep(delayMs)
  }

  return Array.from(exams.values())
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": USER_AGENT,
      accept: "text/html,application/xhtml+xml",
    },
  })

  if (!response.ok) {
    throw new Error(`Falha ao carregar ${url}: HTTP ${response.status}`)
  }

  return await response.text()
}

async function downloadFile(url, targetPath) {
  const response = await fetch(url, {
    headers: {
      "user-agent": USER_AGENT,
      accept: "application/pdf,*/*",
    },
  })

  if (!response.ok || !response.body) {
    throw new Error(`Falha ao baixar ${url}: HTTP ${response.status}`)
  }

  await pipeline(Readable.fromWeb(response.body), createWriteStream(targetPath))
}

function extractExamRows(html, baseUrl) {
  const text = html
    .replace(/\r?\n/g, " ")
    .replace(/<\/tr>/gi, "\n")
    .replace(/<\/td>/gi, " | ")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/\s+/g, " ")

  const links = extractLinks(html, baseUrl).filter((link) => isExamPage(link.url))

  return links.map((link) => {
    const line = text
      .split("\n")
      .find((row) => normalizeText(row).includes(normalizeText(link.label)))

    const parts = line?.split("|").map((part) => part.trim()).filter(Boolean) ?? []

    return {
      title: link.label,
      url: link.url,
      year: parts.find((part) => /^\d{4}$/.test(part)),
      agency: parts[2],
      board: parts[3],
    }
  })
}

function extractPdfLinks(html, baseUrl) {
  const pdfLinks = extractLinks(html, baseUrl)
    .filter((link) => /\.pdf(?:$|\?)/i.test(link.url) && /\/provas\//i.test(link.url))
    .map((link) => ({
      label: link.label,
      url: link.url,
      fileName: decodeURIComponent(basename(new URL(link.url).pathname)),
    }))

  const downloadLinks = pdfLinks.filter((link) => /^baixar\b/i.test(link.label))
  const preferredLinks = downloadLinks.length > 0 ? downloadLinks : pdfLinks
  const uniqueByFileName = new Map()

  for (const link of preferredLinks) {
    if (!uniqueByFileName.has(link.fileName)) {
      uniqueByFileName.set(link.fileName, link)
    }
  }

  return Array.from(uniqueByFileName.values())
}

function extractLinks(html, baseUrl) {
  const links = []
  const regex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi
  let match

  while ((match = regex.exec(html)) !== null) {
    const href = decodeHtml(match[1])
    const label = decodeHtml(match[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim())
    const url = new URL(href, baseUrl).toString()
    links.push({ label, url })
  }

  return links
}

function isExamPage(url) {
  return new URL(url).pathname.startsWith("/provas/download/")
}

function isSameCategoryPage(url, currentUrl) {
  const current = new URL(currentUrl)
  const candidate = new URL(url)
  const basePath = current.pathname.replace(/\/\d+$/, "")
  const candidatePath = candidate.pathname.replace(/\/$/, "")

  return (
    candidate.origin === current.origin &&
    (candidatePath === basePath || candidatePath.startsWith(`${basePath}/`)) &&
    new RegExp(`^${escapeRegExp(basePath)}(?:/\\d+)?$`).test(candidatePath)
  )
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function parseArgs(values) {
  const parsed = {}

  for (let index = 0; index < values.length; index++) {
    const value = values[index]

    if (!value.startsWith("--")) continue

    const key = value.slice(2)
    const next = values[index + 1]

    if (!next || next.startsWith("--")) {
      parsed[key] = true
      continue
    }

    parsed[key] = next
    index++
  }

  return parsed
}

function sanitizeFileName(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160)
}

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
