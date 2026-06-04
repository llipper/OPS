"use client"

import { useState, useTransition } from "react"
import { Save, Loader2, Power, Hash, Settings2, Camera, Trash2 } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Switch } from "@workspace/ui/components/switch"
import { useImageCrop } from "../hooks/use-image-crop"
import { CropDialog } from "./crop-dialog"
import { ColorPickerInput } from "./color-picker-input"

interface EditModalProps {
  item: {
    id: string
    title: string
    sigla: string
    active: boolean
    imageUrl?: string
    ano?: number
    cargo?: string
    cor?: string | null
    nivel: string
    formato?: string
    quantidadeAlternativas?: number
  }
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (id: string, data: any, nivel: string) => Promise<void>
}

const NIVEL_LABELS: Record<string, string> = {
  disciplina: "Disciplina",
  assunto: "Assunto",
  topico: "Tópico",
  subtopico: "Subtópico",
  carreira: "Carreira",
  instituicao: "Instituição",
  orgao: "Órgão",
  concurso: "Concurso",
  cargo: "Cargo",
  dificuldade: "Dificuldade",
  nivelEducacional: "Nível Educacional",
  banca: "Banca",
  tipoQuestao: "Tipo de Questão",
}

export function EditModal({ item, open, onOpenChange, onSave }: EditModalProps) {
  const [isPending, startTransition] = useTransition()
  const [nome, setNome] = useState(item.title)
  const hasSigla = item.nivel === "disciplina" || item.nivel === "banca" || item.nivel === "dificuldade" || item.nivel === "tipoQuestao"
  const [sigla, setSigla] = useState(hasSigla ? item.sigla : "")
  const [active, setActive] = useState(item.active)
  const [ano, setAno] = useState(item.ano || new Date().getFullYear())
  const [cor, setCor] = useState(item.cor || "#FFD700")
  const [formato, setFormato] = useState(item.formato || "ALTERNATIVAS")
  const [quantidadeAlternativas, setQuantidadeAlternativas] = useState(item.quantidadeAlternativas || 5)

  // Utiliza o hook de upload/crop isolado
  const {
    previewUrl,
    selectedFile,
    fileInputRef,
    cropModalOpen,
    setCropModalOpen,
    rawImageUrl,
    handleFileChange,
    handleCropConfirm,
    clearImage,
  } = useImageCrop(item.imageUrl || "")

  const label = NIVEL_LABELS[item.nivel] || "Item"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    startTransition(async () => {
      try {
        if (item.nivel === "concurso") {
          const formData = new FormData()
          formData.append("nome", nome)
          formData.append("ativo", String(active))
          formData.append("ano", String(ano))

          if (selectedFile) {
            // Converte o File para base64 para evitar o bug de 0 bytes em Server Actions
            const base64 = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader()
              reader.onloadend = () => resolve(reader.result as string)
              reader.onerror = reject
              reader.readAsDataURL(selectedFile)
            })
            formData.append("fileBase64", base64)
            formData.append("fileType", selectedFile.type || "image/png")
          } else {
            formData.append("imagemUrl", previewUrl) // Mantém a atual
          }
          await onSave(item.id, formData, item.nivel)
        } else {
          const payload: any = {
            nome,
            ativo: active
          }
          if (hasSigla) {
            payload.sigla = sigla.toUpperCase()
          }
          if (item.nivel === "dificuldade") {
            payload.cor = cor
          }
          if (item.nivel === "tipoQuestao") {
            payload.formato = formato
            payload.quantidadeAlternativas = formato === "ALTERNATIVAS" ? quantidadeAlternativas : (formato === "CERTO_ERRADO" ? 2 : 0)
          }
          await onSave(item.id, payload, item.nivel)
        }
        onOpenChange(false)
      } catch (err) {
        console.error(err)
      }
    })
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[480px] border-primary/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-primary" />
              Editar {label}
            </DialogTitle>
            <DialogDescription>
              Modifique as configurações de &ldquo;{item.title}&rdquo;.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <div className="space-y-4">
              {/* Campo Nome */}
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Nome do Item
                </Label>
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  placeholder="Nome..."
                  className="h-11 bg-muted/30 focus-visible:ring-primary font-medium"
                />
              </div>

              {/* Sigla / Código */}
              {hasSigla && (
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                    <Hash className="w-3.5 h-3.5" />
                    Sigla / Código
                  </Label>
                  <Input
                    value={sigla}
                    onChange={(e) => setSigla(e.target.value)}
                    placeholder="Ex: DADM"
                    maxLength={10}
                    className="uppercase h-11 bg-muted/30 focus-visible:ring-primary font-mono"
                  />
                </div>
              )}

              {/* Concurso - Upload de Imagem e Ano */}
              {item.nivel === "concurso" && (
                <div className="space-y-5 p-4 rounded-xl border bg-muted/10">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl bg-muted border overflow-hidden shrink-0 group shadow-md">
                      {previewUrl ? (
                        <>
                          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={clearImage}
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all"
                          >
                            <Trash2 className="w-5 h-5 text-destructive" />
                          </button>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <Camera className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <Label className="text-xs font-semibold">Brasão do Concurso</Label>
                      <p className="text-[10px] text-muted-foreground">PNG ou JPG quadrado, recomendável 200x200px</p>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="h-8"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Selecionar Imagem
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Ano do Certame
                    </Label>
                    <Input
                      type="number"
                      value={ano}
                      onChange={(e) => setAno(Number(e.target.value))}
                      placeholder="Ex: 2024"
                      className="h-11 bg-muted/30 focus-visible:ring-primary"
                    />
                  </div>
                </div>
              )}

              {/* Seletor de Cor (Dificuldade) */}
              {item.nivel === "dificuldade" && (
                <ColorPickerInput value={cor} onChange={setCor} />
              )}

              {/* Status Ativo / Inativo */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border bg-muted/5">
                <div className="space-y-0.5">
                  <Label className="text-sm font-semibold flex items-center gap-2 cursor-pointer">
                    <Power className={`w-4 h-4 ${active ? "text-emerald-500" : "text-muted-foreground"}`} />
                    Status Ativo
                  </Label>
                  <p className="text-xs text-muted-foreground">Define se o item aparece nos filtros de alunos</p>
                </div>
                <Switch checked={active} onCheckedChange={setActive} />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-muted/50">
              <DialogClose asChild>
                <Button variant="ghost" type="button" className="hover:bg-muted/50">Cancelar</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending} className="px-8 bg-primary hover:bg-primary/90 font-bold min-w-[120px]">
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar Alterações"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de Crop Modularizado */}
      <CropDialog
        open={cropModalOpen}
        onOpenChange={setCropModalOpen}
        rawImageUrl={rawImageUrl}
        onCropConfirm={handleCropConfirm}
      />
    </>
  )
}
