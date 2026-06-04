"use client"

import * as React from "react"
import { Moon, Sun, Palette, LayoutTemplate, Check, Box, Maximize, Zap, Layers, Wind } from "lucide-react"
import { useTheme } from "next-themes"
import { useLayout } from "@/contexts/layout-context"
import type {
    ContentLayout,
    FontFamily,
    FontSize,
    NavbarBehavior,
    Radius,
    SidebarCollapsible,
    SidebarSide,
    SidebarVariant,
    InterfaceDensity,
    VisualEffects,
    ContainerWidth,
    DarkAccent,
    TransitionType
} from "@/contexts/layout-context"
import { Button } from "@workspace/ui/components/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@workspace/ui/components/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@workspace/ui/components/sheet"
import { cn } from "@workspace/ui/lib/utils"

const FONT_SIZE_OPTIONS: { id: FontSize; label: string }[] = [
    { id: "sm", label: "Pequena" },
    { id: "base", label: "Padrão" },
    { id: "lg", label: "Grande" },
]

const RADIUS_OPTIONS: Radius[] = [0, 0.3, 0.5, 0.75, 1.0]

const DENSITY_OPTIONS: { id: InterfaceDensity; label: string }[] = [
    { id: "ultra-compact", label: "Ultra" },
    { id: "compact", label: "Compacto" },
    { id: "default", label: "Padrão" },
    { id: "comfortable", label: "Amplo" },
    { id: "spacious", label: "Spacious" },
]

const EFFECTS_OPTIONS: { id: VisualEffects; label: string }[] = [
    { id: "minimalist", label: "Mínimo" },
    { id: "glass", label: "Glass" },
    { id: "frosted", label: "Frosted" },
    { id: "soft", label: "Soft" },
    { id: "matte", label: "Matte" },
    { id: "neon", label: "Neon" },
    { id: "cyber", label: "Cyber" },
]

const CONTAINER_WIDTH_OPTIONS: { id: ContainerWidth; label: string }[] = [
    { id: "fluid", label: "Total" },
    { id: "focused", label: "Focado" },
]

const TRANSITION_OPTIONS: { id: TransitionType; label: string }[] = [
    { id: "none", label: "Nenhuma" },
    { id: "fast", label: "Rápida" },
    { id: "smooth", label: "Suave" },
    { id: "slow", label: "Lenta" },
    { id: "bounce", label: "Bounce" },
    { id: "cinematic", label: "Filme" },
]

const DARK_ACCENT_OPTIONS: { id: DarkAccent; label: string; color: string }[] = [
    { id: "midnight", label: "Midnight", color: "#0f172a" },
    { id: "black", label: "Deep Black", color: "#000000" },
    { id: "slate", label: "Slate", color: "#1e293b" },
    { id: "graphite", label: "Graphite", color: "#27272a" },
    { id: "navy", label: "Navy", color: "#171717" },
    { id: "arctic", label: "Arctic", color: "#334155" },
]

const SIDEBAR_VARIANT_OPTIONS: { id: SidebarVariant; label: string }[] = [
    { id: "sidebar", label: "Padrão" },
    { id: "floating", label: "Flutuante" },
    { id: "inset", label: "Inserida" },
]

const THEMES_MOCK = [
    { id: "default", label: "Padrão (Branco)", activeColor: "#ffffff" },
    { id: "blue", label: "Policial", activeColor: "#3b82f6" },
    { id: "rose", label: "Inteligência", activeColor: "#e11d48" },
    { id: "green", label: "Tático", activeColor: "#10b981" },
    { id: "orange", label: "Operacional", activeColor: "#f97316" },
    { id: "purple", label: "Púrpura", activeColor: "#a855f7" },
    { id: "cyan", label: "Ciano", activeColor: "#06b6d4" },
    { id: "lime", label: "Lima", activeColor: "#84cc16" },
    { id: "violet", label: "Violeta", activeColor: "#8b5cf6" },
    { id: "pink", label: "Rosa", activeColor: "#ec4899" },
    { id: "red", label: "Vermelho", activeColor: "#ef4444" },
    { id: "yellow", label: "Amarelo", activeColor: "#facc15" },
    { id: "teal", label: "Teal", activeColor: "#14b8a6" },
    { id: "indigo", label: "Índigo", activeColor: "#6366f1" },
    { id: "amber", label: "Âmbar", activeColor: "#f59e0b" },
]

export function HeaderActions() {
    const { setTheme, theme: currentTheme } = useTheme()
    const {
        variant, setVariant,
        collapsible, setCollapsible,
        side, setSide,
        fontSize, setFontSize,
        radius, setRadius,
        primaryColor, setPrimaryColor,
        density, setDensity,
        effects, setEffects,
        containerWidth, setContainerWidth,
        darkAccent, setDarkAccent,
        transition, setTransition
    } = useLayout()

    return (
        <div className="flex items-center gap-1">

            {/* 1. Theme Toggle */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-primary/10 hover:text-primary transition-all">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl mt-2 w-48">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 px-2 py-1.5">Aparência</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setTheme("light")} className="text-[10px] font-black uppercase tracking-widest cursor-pointer flex items-center justify-between">
                            Claro <Sun className="h-3.5 w-3.5 opacity-40" />
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")} className="text-[10px] font-black uppercase tracking-widest cursor-pointer flex items-center justify-between">
                            Escuro <Moon className="h-3.5 w-3.5 opacity-40" />
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")} className="text-[10px] font-black uppercase tracking-widest cursor-pointer flex items-center justify-between">
                            Sistema <span className="text-[8px] opacity-40">AUTO</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* 2. Theme Customizer */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-primary/10 hover:text-primary transition-all group">
                        <Palette className="h-[1.2rem] w-[1.2rem] group-hover:scale-110 transition-transform" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-[320px] sm:w-[400px] p-0 border-l border-border/40">
                    <div className="flex flex-col h-full bg-background">
                        <SheetHeader className="p-6 border-b border-border/10 shrink-0 text-left">
                            <div className="flex items-center gap-2 mb-1">
                                <Palette className="w-4 h-4 text-primary" />
                                <SheetTitle className="text-xs font-black uppercase tracking-[0.2em]">Estética & Tema</SheetTitle>
                            </div>
                            <SheetDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 leading-relaxed">
                                Personalize cores e tipografia.
                            </SheetDescription>
                        </SheetHeader>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                            {/* DARK ACCENTS */}
                            <div className="space-y-4">
                                <h4 className="text-[11px] font-black uppercase tracking-widest">Tom do Modo Escuro</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {DARK_ACCENT_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setDarkAccent(opt.id)}
                                            className={`flex flex-col items-center gap-2 p-2 rounded-xl border transition-all ${darkAccent === opt.id
                                                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                                    : "border-border/40 hover:bg-muted/5"
                                                }`}
                                        >
                                            <div className="w-full aspect-[2/1] rounded-lg shadow-inner flex items-center justify-center" style={{ backgroundColor: opt.color }}>
                                                {darkAccent === opt.id && <Check className="w-3 h-3 text-white" />}
                                            </div>
                                            <span className={`text-[8px] font-black uppercase tracking-widest ${darkAccent === opt.id ? "text-primary" : "text-muted-foreground/60"}`}>{opt.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* PALETAS */}
                            <div className="space-y-4">
                                <h4 className="text-[11px] font-black uppercase tracking-widest">Cor Principal</h4>
                                <div className="grid grid-cols-5 gap-3">
                                    {THEMES_MOCK.map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => setPrimaryColor(t.id)}
                                            className={`w-full aspect-square rounded-full border-2 transition-all relative flex items-center justify-center ${primaryColor === t.id ? "border-primary scale-110" : "border-transparent"
                                                }`}
                                            style={{ backgroundColor: t.activeColor }}
                                        >
                                            {primaryColor === t.id && <Check className="w-4 h-4 text-white" />}
                                        </button>
                                    ))}
                                </div>
                            </div>


                            {/* FONT SIZE */}
                            <div className="space-y-4">
                                <h4 className="text-[11px] font-black uppercase tracking-widest">Escala da Fonte</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {FONT_SIZE_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setFontSize(opt.id)}
                                            className={`h-11 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${fontSize === opt.id
                                                    ? "border-primary bg-primary/5 text-primary"
                                                    : "border-border/40 hover:bg-muted/5"
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* BORDAS */}
                            <div className="space-y-4 pb-10">
                                <h4 className="text-[11px] font-black uppercase tracking-widest">Bordas (Radius)</h4>
                                <div className="grid grid-cols-5 gap-2">
                                    {RADIUS_OPTIONS.map((r) => (
                                        <button
                                            key={r}
                                            onClick={() => setRadius(r)}
                                            className={`h-11 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${radius === r
                                                    ? "border-primary bg-primary/5 text-primary"
                                                    : "border-border/40 hover:bg-muted/5"
                                                }`}
                                        >
                                            {r.toFixed(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* 3. Layout Settings */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-primary/10 hover:text-primary transition-all group">
                        <LayoutTemplate className="h-[1.2rem] w-[1.2rem] group-hover:scale-110 transition-transform" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-[320px] sm:w-[400px] p-0 border-l border-border/40">
                    <div className="flex flex-col h-full bg-background">
                        <SheetHeader className="p-6 border-b border-border/10 shrink-0 text-left">
                            <div className="flex items-center gap-2 mb-1">
                                <LayoutTemplate className="w-4 h-4 text-primary" />
                                <SheetTitle className="text-xs font-black uppercase tracking-[0.2em]">Configuração de Layout</SheetTitle>
                            </div>
                            <SheetDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 leading-relaxed">
                                Personalize a estrutura da plataforma.
                            </SheetDescription>
                        </SheetHeader>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">

                            {/* ESTILO DA BARRA - PREMIUM PREVIEW */}
                            <div className="space-y-4">
                                <h4 className="text-[11px] font-black uppercase tracking-widest">Estilo da Barra Lateral</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {SIDEBAR_VARIANT_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setVariant(opt.id)}
                                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${variant === opt.id
                                                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                                    : "border-border/40 hover:border-primary/40 hover:bg-muted/5"
                                                }`}
                                        >
                                            <div className="w-full aspect-[4/3] rounded bg-muted/20 flex items-center justify-center relative overflow-hidden">
                                                <div className={cn(
                                                    "absolute left-0 top-0 h-full w-3 bg-primary/20",
                                                    opt.id === "floating" && "left-1 top-1 h-[80%] rounded-sm",
                                                    opt.id === "inset" && "left-1 top-1 h-[90%] rounded-sm"
                                                )} />
                                                {variant === opt.id && <Check className="w-4 h-4 text-primary z-10" />}
                                            </div>
                                            <span className={`text-[8px] font-black uppercase tracking-widest ${variant === opt.id ? "text-primary" : "text-muted-foreground/60"}`}>
                                                {opt.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* LADO DA BARRA */}
                            <div className="space-y-4">
                                <h4 className="text-[11px] font-black uppercase tracking-widest">Lado da Barra Lateral</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setSide("left")}
                                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${side === 'left' ? "border-primary bg-primary/5" : "border-border/40"}`}
                                    >
                                        <div className="w-full aspect-video rounded bg-muted/20 flex items-start justify-start p-1">
                                            <div className="h-full w-2 bg-primary/30 rounded-full" />
                                        </div>
                                        <span className="text-[8px] font-black uppercase tracking-widest">Esquerda</span>
                                    </button>
                                    <button
                                        onClick={() => setSide("right")}
                                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${side === 'right' ? "border-primary bg-primary/5" : "border-border/40"}`}
                                    >
                                        <div className="w-full aspect-video rounded bg-muted/20 flex items-start justify-end p-1">
                                            <div className="h-full w-2 bg-primary/30 rounded-full" />
                                        </div>
                                        <span className="text-[8px] font-black uppercase tracking-widest">Direita</span>
                                    </button>
                                </div>
                            </div>

                            {/* LARGURA DO CONTEÚDO */}
                            <div className="space-y-4">
                                <h4 className="text-[11px] font-black uppercase tracking-widest">Largura do Conteúdo</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {CONTAINER_WIDTH_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setContainerWidth(opt.id)}
                                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${containerWidth === opt.id ? "border-primary bg-primary/5" : "border-border/40"}`}
                                        >
                                            <div className="w-full aspect-video rounded bg-muted/20 flex items-center justify-center px-2">
                                                <div className={cn(
                                                    "h-2 bg-primary/30 rounded-full",
                                                    opt.id === "fluid" ? "w-full" : "w-1/2"
                                                )} />
                                            </div>
                                            <span className="text-[8px] font-black uppercase tracking-widest">{opt.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* DENSIDADE */}
                            <div className="space-y-4">
                                <h4 className="text-[11px] font-black uppercase tracking-widest">Densidade da Interface</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {DENSITY_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setDensity(opt.id)}
                                            className={`h-11 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${density === opt.id ? 'border-primary bg-primary/5 text-primary' : 'border-border/40'}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* EFEITOS VISUAIS */}
                            <div className="space-y-4 pb-10">
                                <h4 className="text-[11px] font-black uppercase tracking-widest">Efeitos Visuais</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {EFFECTS_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setEffects(opt.id)}
                                            className={`h-11 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${effects === opt.id ? 'border-primary bg-primary/5 text-primary' : 'border-border/40'}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
