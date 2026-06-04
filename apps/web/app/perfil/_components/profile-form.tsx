"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Camera, AlertTriangle, Trash2, Loader2, Check, Search } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"
import { updateStudentAvatar, updateStudentProfile } from "@/actions/profile-actions"
import { uploadToR2 } from "@/actions/upload"
import { toast } from "sonner"

const VISIBILIDADE_OPTIONS = [
  { value: "PRIVADO", label: "Privado", desc: "Seu perfil não é visível para outros usuários" },
  { value: "BASICO_PUBLICO", label: "Básico Público", desc: "Apenas nome e foto de perfil são visíveis" },
  { value: "COMPLETO_PUBLICO", label: "Completo Público", desc: "Perfil completo visível (sobre mim, redes sociais, etc.)" },
] as const

type ProfileData = {
  email: string
  nome: string
  avatarUrl: string
  iniciais: string
  nomeExibicao: string
  bio: string
  instagram: string
  tiktok: string
  facebook: string
  linkedin: string
  visibilidade: "PRIVADO" | "BASICO_PUBLICO" | "COMPLETO_PUBLICO"
  carreira: string
  carreiraIconUrl: string
  carreiraId: string
  carreiras: Array<{
    id: string
    nome: string
    iconUrl: string
  }>
}

export function ProfileForm({ profile }: { profile: ProfileData }) {
  const [nome, setNome] = useState(profile.nome)
  const [visibilidade, setVisibilidade] = useState(profile.visibilidade)
  const [carreiraId, setCarreiraId] = useState(profile.carreiraId)
  const [nomeExibicao, setNomeExibicao] = useState(profile.nomeExibicao)
  const [bio, setBio] = useState(profile.bio)
  const [instagram, setInstagram] = useState(profile.instagram)
  const [tiktok, setTiktok] = useState(profile.tiktok)
  const [facebook, setFacebook] = useState(profile.facebook)
  const [linkedin, setLinkedin] = useState(profile.linkedin)
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl)

  const [carreiraOpen, setCarreiraOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const selectedCareer = carreiraId ? profile.carreiras.find((c) => c.id === carreiraId) : null
  const selectedCareerName = selectedCareer?.nome ?? null
  const currentCareerIconUrl = selectedCareer?.iconUrl || profile.carreiraIconUrl

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 2MB")
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("path", "avatars")

      const result = await uploadToR2(formData)

      if (result.success && result.url) {
        const avatarResult = await updateStudentAvatar({ avatarUrl: result.url })

        if (avatarResult.success && avatarResult.avatarUrl) {
          setAvatarUrl(avatarResult.avatarUrl)
          toast.success(avatarResult.message)
          router.refresh()
        } else {
          toast.error(avatarResult.message || "Foto enviada, mas não foi salva no perfil")
        }
      } else {
        toast.error(result.message || "Erro ao carregar foto")
      }
    } catch {
      toast.error("Erro ao enviar imagem")
    } finally {
      setUploading(false)
    }
  }

  async function handleSave() {
    setSaving(true)

    const result = await updateStudentProfile({
      nome,
      nomeExibicao,
      bio,
      instagram,
      tiktok,
      facebook,
      linkedin,
      carreiraId,
      visibilidade,
      avatarUrl,
    })

    if (result.success) {
      toast.success(result.message)
      router.refresh()
    } else {
      toast.error(result.message || "Erro ao atualizar perfil")
    }

    setSaving(false)
  }

  return (
    <div className="space-y-6">
      {/* Informações Pessoais */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
          <CardDescription>Atualize suas informações pessoais e de contato.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-6">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-20 w-20 border-2 border-muted">
                <AvatarImage src={avatarUrl} alt={nome} className="object-cover" />
                <AvatarFallback className="text-xl">{profile.iniciais}</AvatarFallback>
              </Avatar>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />

              <Button
                variant="outline"
                size="sm"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Camera className="mr-2 h-4 w-4" />
                )}
                {uploading ? "Enviando..." : "Alterar foto"}
              </Button>
              <p className="text-center text-[10px] text-muted-foreground max-w-[100px]">
                PNG, JPG ou WebP (Máx. 2MB)
              </p>
            </div>

            <div className="flex flex-1 gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/30">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <p className="text-xs text-amber-700 dark:text-amber-400">
                Sua foto de perfil ajuda outros estudantes e professores a identificarem você na plataforma.
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
              <Input id="email" value={profile.email} disabled />
              <p className="text-xs text-muted-foreground">
                O email não pode ser alterado. Entre em contato com o suporte se necessário.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome <span className="text-destructive">*</span></Label>
                <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                <p className="text-xs text-muted-foreground">Use seu nome completo.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nome-exibicao">Nome de Exibição</Label>
                <Input
                  id="nome-exibicao"
                  placeholder="Como você prefere ser chamado"
                  value={nomeExibicao}
                  onChange={(e) => setNomeExibicao(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Um nome alternativo que será exibido no seu perfil.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving || uploading}>
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preferência de Carreira */}
      <Card>
        <CardHeader>
          <CardTitle>Preferência de Carreira</CardTitle>
          <CardDescription>
            Selecione a carreira em que você está se preparando para participar do ranking específico.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border bg-primary/10">
                {currentCareerIconUrl ? (
                  <Image
                    src={currentCareerIconUrl}
                    alt={selectedCareerName ?? profile.carreira}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="text-xs font-semibold text-primary">
                    {profile.carreira.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <span className="font-medium">{selectedCareerName ?? profile.carreira}</span>
                <p className="text-xs text-muted-foreground">Carreira atual</p>
              </div>
            </div>

            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCarreiraOpen(!carreiraOpen)}
              >
                Alterar
              </Button>

              {carreiraOpen && (
                <div className="absolute right-0 top-10 z-50 w-64 rounded-md border bg-popover shadow-md">
                  <div className="flex items-center gap-2 border-b px-3 py-2">
                    <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <input
                      placeholder="Busca rápida..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                      autoFocus
                    />
                  </div>

                  <div className="max-h-[200px] overflow-y-auto p-1">
                    <div
                      role="option"
                      onClick={() => {
                        setCarreiraId("")
                        setCarreiraOpen(false)
                        setSearchTerm("")
                      }}
                      className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent transition-colors"
                    >
                      <div
                        className={cn(
                          "h-4 w-4 rounded border flex items-center justify-center shrink-0",
                          !carreiraId ? "bg-primary border-primary text-primary-foreground" : "border-input"
                        )}
                      >
                        {!carreiraId && <Check className="h-3 w-3" />}
                      </div>
                      <span className={!carreiraId ? "font-medium" : "text-muted-foreground"}>
                        Não definida
                      </span>
                    </div>

                    {profile.carreiras
                      .filter((c) => c.nome.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((carreira) => (
                        <div
                          key={carreira.id}
                          role="option"
                          onClick={() => {
                            setCarreiraId(carreira.id)
                            setCarreiraOpen(false)
                            setSearchTerm("")
                          }}
                          className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent transition-colors"
                        >
                          <div
                            className={cn(
                              "h-4 w-4 rounded border flex items-center justify-center shrink-0",
                              carreiraId === carreira.id
                                ? "bg-primary border-primary text-primary-foreground"
                                : "border-input"
                            )}
                          >
                            {carreiraId === carreira.id && <Check className="h-3 w-3" />}
                          </div>
                          <span className={carreiraId === carreira.id ? "font-medium" : "text-muted-foreground"}>
                            {carreira.nome}
                          </span>
                        </div>
                      ))}

                    {profile.carreiras.filter((c) =>
                      c.nome.toLowerCase().includes(searchTerm.toLowerCase())
                    ).length === 0 && (
                      <p className="py-6 text-center text-sm text-muted-foreground">
                        Nenhuma carreira encontrada.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Biografia e Redes Sociais */}
      <Card>
        <CardHeader>
          <CardTitle>Biografia e Redes Sociais</CardTitle>
          <CardDescription>Compartilhe informações sobre você e suas redes sociais.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bio">Sobre Mim</Label>
            <Textarea
              id="bio"
              placeholder="Fale mais detalhadamente sobre sua trajetória..."
              className="resize-none"
              rows={4}
              maxLength={2000}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <div className="flex justify-between">
              <p className="text-xs text-muted-foreground">Máximo de 2000 caracteres.</p>
              <p className="text-xs text-muted-foreground">{bio.length}/2000</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                placeholder="@seu_usuario"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tiktok">TikTok</Label>
              <Input
                id="tiktok"
                placeholder="@seu_usuario"
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                placeholder="seu_usuario"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                placeholder="seu_usuario"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacidade e Visibilidade */}
      <Card>
        <CardHeader>
          <CardTitle>Privacidade e Visibilidade</CardTitle>
          <CardDescription>Controle quem pode ver seu perfil e suas informações.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label>Visibilidade do Perfil</Label>
          {VISIBILIDADE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setVisibilidade(opt.value)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg border p-4 text-left transition-colors",
                visibilidade === opt.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
            >
              <div>
                <p className="text-sm font-medium">{opt.label}</p>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
              </div>
              {visibilidade === opt.value && <Badge variant="secondary">Ativo</Badge>}
            </button>
          ))}
          <div className="flex justify-end pt-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Zona de Perigo */}
      <Card className="border-destructive/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trash2 className="h-4 w-4 text-destructive" />
            <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
          </div>
          <CardDescription>Ações irreversíveis que afetam seus dados.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Limpar Estatísticas</p>
              <p className="text-xs text-muted-foreground">
                Limpa todas as suas estatísticas e rankings, incluindo dados de desempenho por matéria,
                carreira e posições em rankings.
              </p>
            </div>
            <Button variant="destructive" size="sm" disabled>
              <Trash2 className="mr-2 h-4 w-4" />
              Limpar Estatísticas
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
