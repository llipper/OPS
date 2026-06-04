"use client"

import * as React from "react"
import { DisciplinasList, CreateModal } from "@/components/admin/taxonomy"
import { ItemHierarquico, TaxonLevel } from "@/components/admin/taxonomy"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@workspace/ui/components/dialog"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Calendar, Shield, Camera, Trash2, Plus, BookOpen } from "lucide-react"
import Cropper from "react-easy-crop"
import { getCroppedImg } from "@/lib/cropImage"

interface CarreirasClientProps {
  items: ItemHierarquico[]
  onDelete: (id: string, nivel: string) => Promise<void>
  onCreateRoot: (nome: string) => Promise<void>
  onCreateOrgao: (parentId: string, nome: string) => Promise<void>
  onUpdateItem: (id: string, data: { nome: string; ativo: boolean }, nivel: string) => Promise<void>
  onMoveItem: (id: string, newParentId: string | null, nivel: TaxonLevel) => Promise<void>
  onCreateConcurso: (carreiraId: string, formData: FormData) => Promise<void>
  onCreateCargo: (concursoId: string, nome: string) => Promise<void>
}

export function CarreirasClient({
  items,
  onDelete,
  onCreateRoot,
  onCreateOrgao,
  onUpdateItem,
  onMoveItem,
  onCreateConcurso,
  onCreateCargo
}: CarreirasClientProps) {
  const [addingConcursoTo, setAddingConcursoTo] = React.useState<{ id: string; name: string } | null>(null)
  const [isPending, startTransition] = React.useTransition()
  
  const [previewUrl, setPreviewUrl] = React.useState<string>("")
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const [cropModalOpen, setCropModalOpen] = React.useState(false)
  const [rawImageUrl, setRawImageUrl] = React.useState<string>("")
  const [crop, setCrop] = React.useState({ x: 0, y: 0 })
  const [zoom, setZoom] = React.useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<any>(null)

  const handleAddChild = (item: ItemHierarquico, nextNivel: TaxonLevel) => {
    if (nextNivel === "concurso") {
      setAddingConcursoTo({ id: item.rawId, name: item.title })
      setPreviewUrl("")
      setSelectedFile(null)
      setRawImageUrl("")
      return true
    }
    return false
  }

  const handleCreateChild = async (parentId: string, nome: string, nextNivel: TaxonLevel) => {
    if (nextNivel === "instituicao" || nextNivel === "orgao") {
      await onCreateOrgao(parentId, nome)
    } else if (nextNivel === "cargo") {
      await onCreateCargo(parentId, nome)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setRawImageUrl(reader.result as string)
        setCropModalOpen(true)
      }
      reader.readAsDataURL(file)
    }
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const onCropComplete = React.useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleCropComplete = React.useCallback(async () => {
    if (rawImageUrl && croppedAreaPixels) {
      try {
        const croppedFile = await getCroppedImg(rawImageUrl, croppedAreaPixels)
        if (croppedFile) {
          setSelectedFile(croppedFile)
          const reader = new FileReader()
          reader.onloadend = () => {
            setPreviewUrl(reader.result as string)
            setCropModalOpen(false)
          }
          reader.readAsDataURL(croppedFile)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }, [rawImageUrl, croppedAreaPixels])

  const handleConfirmAddConcurso = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!addingConcursoTo) return
    
    const formData = new FormData(e.currentTarget)

    if (selectedFile) {
      // Converte para base64 para evitar o bug de 0 bytes em Server Actions
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(selectedFile)
      })
      formData.append("fileBase64", base64)
      formData.append("fileType", selectedFile.type || "image/png")
    }
    
    startTransition(async () => {
      await onCreateConcurso(addingConcursoTo.id, formData)
      setAddingConcursoTo(null)
      setPreviewUrl("")
      setSelectedFile(null)
    })
  }

  return (
    <div className="space-y-6">
      <DisciplinasList
        items={items}
        createAction={
          <CreateModal 
            title="Nova Carreira" 
            label="Nome da Carreira" 
            placeholder="Ex: Segurança Pública" 
            onCreate={async (data) => await onCreateRoot(data.nome)} 
          />
        }
        title="Carreiras e Órgãos"
        subtitle="Gestão Estrutural"
        nivelMap={{ 
          carreira: "instituicao", 
          instituicao: "orgao", 
          orgao: "concurso", 
          concurso: "cargo" 
        }}
        onDelete={async (id, nivel) => await onDelete(id, nivel)}
        onCreateChild={handleCreateChild}
        onUpdateItem={onUpdateItem}
        onMoveItem={onMoveItem}
        onAddChildClick={handleAddChild}
      />

      <Dialog open={!!addingConcursoTo} onOpenChange={(open) => !open && setAddingConcursoTo(null)}>
        <DialogContent className="sm:max-w-[520px] border-primary/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <Shield className="w-5 h-5 text-primary" />
              Vincular Novo Concurso
            </DialogTitle>
            <DialogDescription>
              Adicione um concurso oficial ao órgão <strong className="text-foreground">{addingConcursoTo?.name}</strong>.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleConfirmAddConcurso} className="space-y-6 pt-4">
            {/* Upload Area */}
            <div className="flex flex-col items-center justify-center gap-4 py-6 bg-primary/5 rounded-2xl border border-primary/10">
              <div className="relative group">
                <div className="relative w-28 h-28 rounded-3xl border-2 border-dashed border-primary/20 group-hover:border-primary/50 transition-all overflow-hidden bg-background flex items-center justify-center shadow-inner">
                  {previewUrl ? (
                    <img key={previewUrl} src={previewUrl} alt="Preview" className="w-full h-full object-cover animate-in fade-in duration-500" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground/30">
                      <Shield className="w-10 h-10" />
                      <span className="text-[10px] font-bold uppercase tracking-tighter">Sem Logo</span>
                    </div>
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center bg-primary/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]"
                >
                  <Camera className="w-8 h-8 text-white" />
                </button>

                {previewUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewUrl("")
                      setSelectedFile(null)
                      if (fileInputRef.current) fileInputRef.current.value = ""
                    }}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-2 shadow-xl hover:scale-110 transition-transform z-10 border-2 border-background"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="text-center space-y-1">
                <p className="text-[10px] text-foreground font-bold uppercase tracking-widest">
                  Logo do Concurso
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Formatos aceitos: PNG, JPG (1:1)
                </p>
              </div>
              <input 
                type="file" 
                name="file"
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" />
                  Nome do Concurso
                </Label>
                <Input 
                  name="nome" 
                  required 
                  placeholder="Ex: Polícia Civil do Ceará" 
                  className="h-11 bg-muted/30 focus-visible:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    Cargo Inicial
                  </Label>
                  <Input 
                    name="cargo" 
                    placeholder="Ex: Escrivão (opcional)" 
                    className="h-11 bg-muted/30 focus-visible:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    Ano do Certame
                  </Label>
                  <Input 
                    name="ano" 
                    type="number" 
                    required 
                    placeholder="2025" 
                    min={1990} 
                    max={2100} 
                    className="h-11 bg-muted/30 focus-visible:ring-primary font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-muted/50">
              <DialogClose asChild>
                <Button variant="ghost" type="button" className="hover:bg-muted/50">Cancelar</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending} className="bg-primary hover:bg-primary/90 px-8 font-bold shadow-lg shadow-primary/20">
                {isPending ? (
                  "Salvando..."
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Vincular Concurso
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={cropModalOpen} onOpenChange={setCropModalOpen}>
        <DialogContent className="sm:max-w-[450px] border-primary/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              Ajustar Imagem
            </DialogTitle>
            <DialogDescription>
              Arraste e ajuste o zoom para centralizar o brasão.
            </DialogDescription>
          </DialogHeader>
          <div className="relative w-full h-[300px] mt-2 bg-black rounded-2xl overflow-hidden border-2 border-primary/20">
            <Cropper
              image={rawImageUrl}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="flex items-center gap-4 mt-6">
             <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => {
                setZoom(Number(e.target.value))
              }}
              className="w-full h-1.5 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-muted/50">
            <Button variant="ghost" onClick={() => setCropModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleCropComplete} className="bg-primary hover:bg-primary/90 font-bold">Confirmar Corte</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
