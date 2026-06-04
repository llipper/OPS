"use client"

import * as React from "react"
import { Plus, BookOpen, Hash, Scale, ListOrdered, Calendar, Shield } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@workspace/ui/components/select"
import { ColorPickerInput } from "./color-picker-input"

interface CreateModalProps {
  title?: string
  label?: string
  placeholder?: string
  showWeight?: boolean
  showOrder?: boolean
  showColor?: boolean
  showYear?: boolean
  showCargo?: boolean
  showTipoQuestaoFields?: boolean
  onCreate: (data: { 
    nome: string; 
    sigla: string; 
    peso?: number; 
    ordem?: number; 
    cor?: string;
    ano?: number;
    cargo?: string;
    formato?: string;
    quantidadeAlternativas?: number;
  }) => Promise<void>
}

export function CreateModal({
  title = "Nova Disciplina",
  label = "Nome da Disciplina",
  placeholder = "Ex: Direito Administrativo",
  showWeight = false,
  showOrder = false,
  showColor = false,
  showYear = false,
  showCargo = false,
  showTipoQuestaoFields = false,
  onCreate
}: CreateModalProps) {
  const [open, setOpen] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()
  const [formato, setFormato] = React.useState("ALTERNATIVAS")
  const [quantidadeAlternativas, setQuantidadeAlternativas] = React.useState("5")
  const [selectedColor, setSelectedColor] = React.useState("#FFD700")

  const handleSubmit = async (formData: FormData) => {
    const nome = formData.get("nome") as string
    const sigla = (formData.get("sigla") as string) || ""
    const peso = formData.get("peso") ? parseInt(formData.get("peso") as string) : undefined
    const ordem = formData.get("ordem") ? parseInt(formData.get("ordem") as string) : undefined
    const cor = showColor ? selectedColor : undefined
    const ano = formData.get("ano") ? parseInt(formData.get("ano") as string) : undefined
    const cargo = formData.get("cargo") as string || undefined
    
    const formatoVal = showTipoQuestaoFields ? (formData.get("formato") as string) : undefined
    let quantAlt: number | undefined = undefined
    if (showTipoQuestaoFields) {
      if (formatoVal === "ALTERNATIVAS") {
        quantAlt = formData.get("quantidadeAlternativas") ? parseInt(formData.get("quantidadeAlternativas") as string) : 5
      } else if (formatoVal === "CERTO_ERRADO") {
        quantAlt = 2
      } else {
        quantAlt = 0
      }
    }

    startTransition(async () => {
      await onCreate({ 
        nome, 
        sigla, 
        peso, 
        ordem, 
        cor, 
        ano, 
        cargo,
        formato: formatoVal,
        quantidadeAlternativas: quantAlt
      })
      setOpen(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-lg hover:scale-[1.02] transition-transform bg-primary text-primary-foreground">
          <Plus className="w-4 h-4" />
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border-primary/20 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <DialogDescription>
            Configure as propriedades do novo item na taxonomia.
          </DialogDescription>
        </DialogHeader>
        
        <form action={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-4">
            {/* Nome */}
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                <BookOpen className="w-3.5 h-3.5" />
                {label}
              </Label>
              <Input name="nome" required placeholder={placeholder} className="h-11 bg-muted/30 focus-visible:ring-primary" />
            </div>

            {/* Ano e Sigla / Cargo */}
            <div className="grid grid-cols-2 gap-4">
              {showYear ? (
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    Ano do Certame
                  </Label>
                  <Input name="ano" type="number" placeholder="2025" defaultValue={new Date().getFullYear()} className="h-11 bg-muted/30 focus-visible:ring-primary" />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                    <Hash className="w-3.5 h-3.5" />
                    Sigla / Código
                  </Label>
                  <Input name="sigla" placeholder="Ex: DADM" maxLength={10} className="uppercase h-11 bg-muted/30 focus-visible:ring-primary" />
                </div>
              )}

              {showCargo && (
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                    <Shield className="w-3.5 h-3.5" />
                    Cargo Principal
                  </Label>
                  <Input name="cargo" placeholder="Ex: Agente" className="h-11 bg-muted/30 focus-visible:ring-primary" />
                </div>
              )}
            </div>

            {/* Campos Específicos de Tipo de Questão */}
            {showTipoQuestaoFields && (
              <div className="space-y-4 pt-4 border-t border-muted/20">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                    <ListOrdered className="w-3.5 h-3.5" />
                    Formato / Comportamento
                  </Label>
                  <Select
                    value={formato}
                    onValueChange={setFormato}
                  >
                    <SelectTrigger className="w-full h-11 bg-muted/30 border-input rounded-md focus:ring-primary text-foreground dark:text-foreground">
                      <SelectValue placeholder="Selecione o formato" />
                    </SelectTrigger>
                    <SelectContent className="bg-background text-foreground border border-border">
                      <SelectItem value="ALTERNATIVAS">Alternativas (Múltipla Escolha)</SelectItem>
                      <SelectItem value="CERTO_ERRADO">Certo ou Errado (Julgamento)</SelectItem>
                      <SelectItem value="TEXTO">Texto (Discursiva)</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="formato" value={formato} />
                </div>

                {formato === "ALTERNATIVAS" && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    <Label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                      <Hash className="w-3.5 h-3.5" />
                      Quantidade de Alternativas
                    </Label>
                    <Select
                      value={quantidadeAlternativas}
                      onValueChange={setQuantidadeAlternativas}
                    >
                      <SelectTrigger className="w-full h-11 bg-muted/30 border-input rounded-md focus:ring-primary text-foreground dark:text-foreground">
                        <SelectValue placeholder="Selecione a quantidade" />
                      </SelectTrigger>
                      <SelectContent className="bg-background text-foreground border border-border">
                        <SelectItem value="3">3 Alternativas (A - C)</SelectItem>
                        <SelectItem value="4">4 Alternativas (A - D)</SelectItem>
                        <SelectItem value="5">5 Alternativas (A - E)</SelectItem>
                        <SelectItem value="6">6 Alternativas (A - F)</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="quantidadeAlternativas" value={quantidadeAlternativas} />
                  </div>
                )}

                {formato === "CERTO_ERRADO" && (
                  <div className="text-[11px] font-medium text-muted-foreground/80 bg-primary/5 border border-primary/10 rounded-lg p-3 animate-in fade-in slide-in-from-top-1 duration-200">
                    💡 <strong>Certo ou Errado:</strong> Este formato terá automaticamente <strong>2 alternativas</strong> (Certo e Errado).
                  </div>
                )}

                {formato === "TEXTO" && (
                  <div className="text-[11px] font-medium text-muted-foreground/80 bg-primary/5 border border-primary/10 rounded-lg p-3 animate-in fade-in slide-in-from-top-1 duration-200">
                    📝 <strong>Texto (Discursiva):</strong> Este formato não terá alternativas. O sistema exibirá um campo de texto aberto para resposta.
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {/* Peso (Opcional) */}
              {showWeight && (
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                    <Scale className="w-3.5 h-3.5" />
                    Peso (Importância)
                  </Label>
                  <Input name="peso" type="number" defaultValue="1" min="1" className="h-11 bg-muted/30 focus-visible:ring-primary" />
                </div>
              )}

              {/* Ordem (Opcional) */}
              {showOrder && (
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                    <ListOrdered className="w-3.5 h-3.5" />
                    Ordem de Exibição
                  </Label>
                  <Input name="ordem" type="number" defaultValue="0" className="h-11 bg-muted/30 focus-visible:ring-primary" />
                </div>
              )}
            </div>

            {/* Cor (Opcional) */}
            {showColor && (
              <ColorPickerInput value={selectedColor} onChange={setSelectedColor} />
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-muted/50">
            <DialogClose asChild>
              <Button variant="ghost" type="button" className="hover:bg-muted/50">Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending} className="px-8 bg-primary hover:bg-primary/90 font-bold">
              {isPending ? "Salvando..." : "Salvar Item"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
