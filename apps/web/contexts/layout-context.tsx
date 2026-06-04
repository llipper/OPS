"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react"

export type SidebarVariant = "sidebar" | "floating" | "inset"
export type SidebarCollapsible = "offcanvas" | "icon" | "none"
export type SidebarSide = "left" | "right"
export type ContentLayout = "full" | "centered"
export type NavbarBehavior = "relative" | "sticky"
export type FontSize = "sm" | "base" | "lg"
export type Radius = 0 | 0.3 | 0.5 | 0.75 | 1.0
export type FontFamily = "sans" | "mono" | "serif" | "quicksand" | "inter" | "outfit" | "roboto" | "lexend"

// Novos Tipos
export type InterfaceDensity = "compact" | "default" | "comfortable" | "spacious" | "ultra-compact"
export type VisualEffects = "minimalist" | "glass" | "frosted" | "neon" | "soft" | "matte" | "cyber"
export type ContainerWidth = "fluid" | "focused"
export type DarkAccent = "midnight" | "black" | "slate" | "graphite" | "navy" | "emerald" | "crimson" | "violet" | "mocha" | "arctic"
export type TransitionType = "none" | "smooth" | "fast" | "slow" | "bounce" | "cinematic"

interface LayoutContextProps {
  // Layout Base
  variant: SidebarVariant
  setVariant: (variant: SidebarVariant) => void
  collapsible: SidebarCollapsible
  setCollapsible: (collapsible: SidebarCollapsible) => void
  side: SidebarSide
  setSide: (side: SidebarSide) => void
  contentLayout: ContentLayout
  setContentLayout: (layout: ContentLayout) => void
  navbarBehavior: NavbarBehavior
  setNavbarBehavior: (behavior: NavbarBehavior) => void

  // Theme Base
  fontSize: FontSize
  setFontSize: (size: FontSize) => void
  radius: Radius
  setRadius: (radius: Radius) => void
  primaryColor: string
  setPrimaryColor: (color: string) => void
  fontFamily: FontFamily
  setFontFamily: (font: FontFamily) => void

  // Novas Configurações
  density: InterfaceDensity
  setDensity: (density: InterfaceDensity) => void
  effects: VisualEffects
  setEffects: (effects: VisualEffects) => void
  containerWidth: ContainerWidth
  setContainerWidth: (width: ContainerWidth) => void
  darkAccent: DarkAccent
  setDarkAccent: (accent: DarkAccent) => void
  transition: TransitionType
  setTransition: (transition: TransitionType) => void
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined)

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  // Layout States
  const [variant, setVariant] = useState<SidebarVariant>("sidebar")
  const [collapsible, setCollapsible] = useState<SidebarCollapsible>("icon")
  const [side, setSide] = useState<SidebarSide>("left")
  const [contentLayout, setContentLayout] = useState<ContentLayout>("full")
  const [navbarBehavior, setNavbarBehavior] = useState<NavbarBehavior>("sticky")

  // Theme States
  const [fontSize, setFontSize] = useState<FontSize>("base")
  const [radius, setRadius] = useState<Radius>(0.5)
  const [primaryColor, setPrimaryColor] = useState<string>("default")
  const [fontFamily, setFontFamily] = useState<FontFamily>("sans")

  // Novos Estados
  const [density, setDensity] = useState<InterfaceDensity>("default")
  const [effects, setEffects] = useState<VisualEffects>("glass")
  const [containerWidth, setContainerWidth] = useState<ContainerWidth>("fluid")
  const [darkAccent, setDarkAccent] = useState<DarkAccent>("midnight")
  const [transition, setTransition] = useState<TransitionType>("smooth")

  // Carregar do localStorage ao montar
  useEffect(() => {
    const saved = localStorage.getItem("concurso-layout-settings-v2")
    if (saved) {
      try {
        const config = JSON.parse(saved)
        queueMicrotask(() => {
          if (config.variant) setVariant(config.variant)
          if (config.collapsible) setCollapsible(config.collapsible)
          if (config.side) setSide(config.side)
          if (config.contentLayout) setContentLayout(config.contentLayout)
          if (config.navbarBehavior) setNavbarBehavior(config.navbarBehavior)
          if (config.fontSize) setFontSize(config.fontSize)
          if (config.radius) setRadius(config.radius)
          if (config.primaryColor) setPrimaryColor(config.primaryColor)
          if (config.fontFamily) setFontFamily(config.fontFamily)

          if (config.density) setDensity(config.density)
          if (config.effects) setEffects(config.effects)
          if (config.containerWidth) setContainerWidth(config.containerWidth)
          if (config.darkAccent) setDarkAccent(config.darkAccent)
          if (config.transition) setTransition(config.transition)

          setMounted(true)
        })
        return
      } catch (e) {
        console.error("Erro ao carregar configurações do layout", e)
      }
    }
    queueMicrotask(() => setMounted(true))
  }, [])

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    if (!mounted) return

    const config = {
      variant, collapsible, side, contentLayout, navbarBehavior,
      fontSize, radius, primaryColor, fontFamily,
      density, effects, containerWidth, darkAccent, transition
    }
    localStorage.setItem("concurso-layout-settings-v2", JSON.stringify(config))
  }, [variant, collapsible, side, contentLayout, navbarBehavior, fontSize, radius, primaryColor, fontFamily, density, effects, containerWidth, darkAccent, transition, mounted])

  // Efeito para aplicar Variáveis CSS Globais
  useEffect(() => {
    const root = document.documentElement

    // Radius & Font Size
    root.style.setProperty("--radius", `${radius}rem`)
    if (fontSize === "sm") root.style.fontSize = "14px"
    else if (fontSize === "base") root.style.fontSize = "16px"
    else if (fontSize === "lg") root.style.fontSize = "18px"

    // Densidade
    root.setAttribute("data-density", density)

    // Efeitos
    root.setAttribute("data-effects", effects)

    // Largura do Container
    if (containerWidth === "focused") root.setAttribute("data-container", "focused")
    else root.setAttribute("data-container", "fluid")

    // Acento Escuro
    root.setAttribute("data-dark-accent", darkAccent)

    // Transição
    root.setAttribute("data-transition", transition)

  }, [radius, fontSize, density, effects, containerWidth, darkAccent, transition])

  // Efeito para aplicar a paleta de cores (Data-Theme)
  useEffect(() => {
    const root = document.documentElement
    if (primaryColor === "default") {
      root.removeAttribute("data-theme")
    } else {
      root.setAttribute("data-theme", primaryColor)
    }
  }, [primaryColor])

  // Efeito para aplicar a Fonte (Data-Font)
  useEffect(() => {
    document.documentElement.setAttribute("data-font", fontFamily)
  }, [fontFamily])

  return (
    <LayoutContext.Provider value={{
      variant, setVariant,
      collapsible, setCollapsible,
      side, setSide,
      contentLayout, setContentLayout,
      navbarBehavior, setNavbarBehavior,
      fontSize, setFontSize,
      radius, setRadius,
      primaryColor, setPrimaryColor,
      fontFamily, setFontFamily,
      density, setDensity,
      effects, setEffects,
      containerWidth, setContainerWidth,
      darkAccent, setDarkAccent,
      transition, setTransition
    }}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider")
  }
  return context
}
