"use client"

import * as React from "react"
import { 
  createUsuario, 
  updateUsuario, 
  deleteUsuario,
  getUsuarios
} from "@/actions/users-actions"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Badge } from "@workspace/ui/components/badge"
import { Switch } from "@workspace/ui/components/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@workspace/ui/components/dialog"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@workspace/ui/components/select"
import { toast } from "sonner"
import { 
  UserPlus, 
  Search, 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  UserCog, 
  Trash2, 
  Edit2, 
  Loader2, 
  Lock, 
  Check, 
  Key
} from "lucide-react"
import { useLayout } from "@/contexts/layout-context"
import { cn } from "@workspace/ui/lib/utils"

const ROLE_CONFIG: Record<string, { label: string; badge: string; desc: string }> = {
  SUPER_ADMIN: { 
    label: "Super Admin", 
    badge: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    desc: "Acesso total irrestrito ao sistema"
  },
  ADMIN: { 
    label: "Administrador", 
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    desc: "Gestão operacional e administrativa"
  },
  PROFESSOR: { 
    label: "Professor", 
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    desc: "Criação e curadoria de conteúdo/questões"
  },
  REVISOR: { 
    label: "Revisor", 
    badge: "bg-teal-500/10 text-teal-400 border-teal-500/30",
    desc: "Revisão e homologação de questões"
  },
  ALUNO: { 
    label: "Aluno", 
    badge: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    desc: "Estudo e realização de simulados"
  },
  SUPORTE: { 
    label: "Suporte", 
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    desc: "Atendimento e auxílio operacional"
  }
}

interface AcessoClientProps {
  initialUsers: any[]
  currentUser: {
    id: string
    name?: string | null
    email?: string | null
    role: string
    avatarUrl?: string | null
  }
}

export function AcessoClient({ initialUsers, currentUser }: AcessoClientProps) {
  const [users, setUsers] = React.useState<any[]>(initialUsers)
  const [loading, setLoading] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeTab, setActiveTab] = React.useState<"docente" | "aluno">("docente")

  // Contexto de Layout
  const { containerWidth } = useLayout()

  // Estados de Modais
  const [createOpen, setCreateOpen] = React.useState(false)
  const [editOpen, setEditOpen] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState<any | null>(null)

  // Estados de Formulários
  const [isPending, startTransition] = React.useTransition()
  const [nome, setNome] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [role, setRole] = React.useState<any>("ALUNO")
  const [ativo, setAtivo] = React.useState(true)

  const loadData = React.useCallback(async () => {
    try {
      setLoading(true)
      const data = await getUsuarios()
      setUsers(data)
    } catch (err: any) {
      console.error(err)
      toast.error("Erro ao recarregar usuários.")
    } finally {
      setLoading(false)
    }
  }, [])

  // Handlers
  const handleOpenCreate = () => {
    setNome("")
    setEmail("")
    setPassword("")
    setRole("ALUNO")
    setAtivo(true)
    setCreateOpen(true)
  }

  const handleOpenEdit = (user: any) => {
    setSelectedUser(user)
    setNome(user.nome)
    setEmail(user.email)
    setPassword("")
    setRole(user.role)
    setAtivo(user.ativo)
    setEditOpen(true)
  }

  const handleOpenDelete = (user: any) => {
    setSelectedUser(user)
    setDeleteOpen(true)
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        await createUsuario({ nome, email, password, role, ativo })
        toast.success("Usuário criado com sucesso!")
        setCreateOpen(false)
        loadData()
      } catch (err: any) {
        toast.error(err.message || "Erro ao criar usuário.")
      }
    })
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return
    startTransition(async () => {
      try {
        await updateUsuario(selectedUser.id, {
          nome,
          email,
          role,
          ativo,
          password: password.trim() !== "" ? password : undefined
        })
        toast.success("Usuário atualizado com sucesso!")
        setEditOpen(false)
        loadData()
      } catch (err: any) {
        toast.error(err.message || "Erro ao atualizar usuário.")
      }
    })
  }

  const handleDeleteSubmit = async () => {
    if (!selectedUser) return
    startTransition(async () => {
      try {
        await deleteUsuario(selectedUser.id)
        toast.success("Usuário excluído com sucesso!")
        setDeleteOpen(false)
        loadData()
      } catch (err: any) {
        toast.error(err.message || "Erro ao excluir usuário.")
      }
    })
  }

  const handleToggleStatus = async (user: any, checked: boolean) => {
    try {
      await updateUsuario(user.id, { ativo: checked })
      toast.success(`Usuário ${checked ? "ativado" : "desativado"} com sucesso!`)
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, ativo: checked } : u))
    } catch (err: any) {
      toast.error(err.message || "Erro ao alterar status.")
    }
  }

  // Filtros
  const filteredUsers = React.useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        user.nome.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      
      const isStudent = user.role === "ALUNO"
      const isStaff = user.role !== "ALUNO"

      if (activeTab === "docente") {
        return matchesSearch && isStaff
      } else {
        return matchesSearch && isStudent
      }
    })
  }, [users, searchQuery, activeTab])

  // Contadores
  const stats = React.useMemo(() => {
    const total = users.length
    const docentes = users.filter(u => u.role !== "ALUNO").length
    const alunos = users.filter(u => u.role === "ALUNO").length
    const inativos = users.filter(u => !u.ativo).length

    return { total, docentes, alunos, inativos }
  }, [users])

  return (
    <div className="flex-1 p-8 pt-6 bg-background">
      <div className={cn(
        "space-y-6 animate-in fade-in duration-500",
        containerWidth === "focused" ? "max-w-7xl mx-auto" : "w-full"
      )}>
      
      {/* Header Premium */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Gerencie permissões, crie contas administrativas e defina o acesso de alunos e do corpo docente.</p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Controle de Acesso</h1>
        </div>

        <Button 
          onClick={handleOpenCreate}
          className="gap-2 shadow-lg hover:scale-[1.02] transition-transform bg-primary text-primary-foreground"
        >
          <UserPlus className="w-4 h-4" />
          Novo Usuário
        </Button>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 bg-muted/20 border border-muted/50 rounded-2xl flex items-center gap-4 hover:border-primary/20 transition-all group">
          <div className="p-3.5 bg-primary/5 border border-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total de Usuários</p>
            <h3 className="text-2xl font-extrabold">{loading ? "..." : stats.total}</h3>
          </div>
        </div>

        <div className="p-5 bg-muted/20 border border-muted/50 rounded-2xl flex items-center gap-4 hover:border-primary/20 transition-all group">
          <div className="p-3.5 bg-violet-500/5 border border-violet-500/10 rounded-xl text-violet-400 group-hover:scale-110 transition-transform">
            <UserCog className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Corpo Docente</p>
            <h3 className="text-2xl font-extrabold">{loading ? "..." : stats.docentes}</h3>
          </div>
        </div>

        <div className="p-5 bg-muted/20 border border-muted/50 rounded-2xl flex items-center gap-4 hover:border-primary/20 transition-all group">
          <div className="p-3.5 bg-blue-500/5 border border-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total de Alunos</p>
            <h3 className="text-2xl font-extrabold">{loading ? "..." : stats.alunos}</h3>
          </div>
        </div>

        <div className="p-5 bg-muted/20 border border-muted/50 rounded-2xl flex items-center gap-4 hover:border-primary/20 transition-all group">
          <div className="p-3.5 bg-red-500/5 border border-red-500/10 rounded-xl text-red-400 group-hover:scale-110 transition-transform">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Inativos / Bloqueados</p>
            <h3 className="text-2xl font-extrabold">{loading ? "..." : stats.inativos}</h3>
          </div>
        </div>

      </div>

      {/* Filtros e Sistema de Abas */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        
        {/* Abas */}
        <div className="flex items-center gap-1.5 p-1 bg-muted/30 border border-muted rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("docente")}
            className={`flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all w-full sm:w-auto ${
              activeTab === "docente" 
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/10" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <UserCog className="w-3.5 h-3.5" />
            Corpo Docente ({loading ? "..." : stats.docentes})
          </button>
          
          <button
            onClick={() => setActiveTab("aluno")}
            className={`flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all w-full sm:w-auto ${
              activeTab === "aluno" 
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/10" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Alunos ({loading ? "..." : stats.alunos})
          </button>
        </div>

        {/* Busca */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome ou e-mail..."
            className="pl-10 h-10 bg-muted/20 border-muted focus-visible:ring-primary/30"
          />
        </div>

      </div>

      {/* Tabela de Usuários */}
      <div className="rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-xs text-muted-foreground font-medium animate-pulse">Buscando listagem de acesso...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-6">
            <div className="w-12 h-12 rounded-xl bg-muted border border-muted/50 flex items-center justify-center text-muted-foreground mb-4">
              <Search className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm">Nenhum usuário encontrado</h4>
            <p className="text-xs text-muted-foreground max-w-xs mt-1">
              Tente redefinir o termo buscado ou crie um novo usuário para esta categoria.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-muted bg-muted/25 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                  <th className="py-4 px-5">Nome / Identificação</th>
                  <th className="py-4 px-5">E-mail</th>
                  <th className="py-4 px-5">Nível de Acesso</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/30">
                {filteredUsers.map((user) => {
                  const roleCfg = ROLE_CONFIG[user.role] || { label: user.role, badge: "bg-muted text-muted-foreground", desc: "" }
                  const initials = user.nome.split(" ").slice(0, 2).map((n: string) => n[0]).join("").toUpperCase()
                  
                  return (
                    <tr key={user.id} className="group hover:bg-muted/10 transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary font-bold text-sm shadow-md overflow-hidden shrink-0">
                            {user.avatarUrl ? (
                              <img src={user.avatarUrl} alt={user.nome} className="w-full h-full object-cover" />
                            ) : (
                              initials
                            )}
                          </div>
                          <div className="space-y-0.5">
                            <span className="font-bold text-sm block group-hover:text-primary transition-colors">{user.nome}</span>
                            <span className="text-[10px] text-muted-foreground font-mono">ID: {user.id.substring(0, 8)}...</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-5">
                        <span className="text-sm font-medium font-mono text-muted-foreground/90">{user.email}</span>
                      </td>

                      <td className="py-3.5 px-5">
                        <div className="space-y-0.5">
                          <Badge variant="outline" className={`text-[10px] font-bold rounded-lg ${roleCfg.badge}`}>
                            {roleCfg.label}
                          </Badge>
                        </div>
                      </td>

                      <td className="py-3.5 px-5">
                        <Switch 
                          checked={user.ativo} 
                          onCheckedChange={(checked) => handleToggleStatus(user, checked)}
                          className="data-[state=checked]:bg-primary"
                        />
                      </td>

                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleOpenEdit(user)}
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>

                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleOpenDelete(user)}
                            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>

                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* --- DIALOG DE CRIAÇÃO --- */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <UserPlus className="w-5 h-5 text-primary" />
              Novo Usuário
            </DialogTitle>
            <DialogDescription>
              Cadastre um novo usuário preenchendo as informações e definindo seu cargo.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateSubmit} className="space-y-6 pt-4">
            
            <div className="space-y-4">
              
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Nome Completo</Label>
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: João da Silva"
                  required
                  className="h-11 bg-muted/30 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">E-mail</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex: joao@eliteops.com.br"
                  required
                  className="h-11 bg-muted/30 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Senha de Acesso</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Deixe em branco para usar a padrão (EliteOps123)"
                  className="h-11 bg-muted/30 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Cargo / Role</Label>
                <Select value={role} onValueChange={(val: any) => setRole(val)}>
                  <SelectTrigger className="w-full h-11 rounded-lg bg-muted/30 border-input focus:ring-2 focus:ring-primary text-left">
                    <SelectValue placeholder="Selecione um cargo" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg shadow-xl">
                    <SelectItem value="ALUNO">Aluno (Estudo e Simulados)</SelectItem>
                    <SelectItem value="PROFESSOR">Professor (Curadoria & Questões)</SelectItem>
                    <SelectItem value="REVISOR">Revisor (Revisão Técnica)</SelectItem>
                    <SelectItem value="SUPORTE">Suporte (Atendimento Operacional)</SelectItem>
                    
                    {/* Restrição de Admin: Apenas SUPER_ADMIN pode definir cargos administrativos seniores */}
                    {currentUser?.role === "SUPER_ADMIN" && (
                      <>
                        <SelectItem value="ADMIN">Administrador (Gestão Operacional)</SelectItem>
                        <SelectItem value="SUPER_ADMIN">Super Admin (Acesso Total)</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground mt-1">
                  💡 {ROLE_CONFIG[role]?.desc || ""}
                </p>
              </div>

              <div className="flex items-center justify-between p-4 border border-primary/10 rounded-xl bg-primary/5">
                <div className="space-y-1">
                  <Label className="text-sm font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    Status Ativo
                  </Label>
                  <p className="text-[10px] text-muted-foreground">
                    Define se o usuário poderá realizar login no sistema imediatamente.
                  </p>
                </div>
                <Switch checked={ativo} onCheckedChange={setAtivo} className="data-[state=checked]:bg-primary" />
              </div>

            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-muted/50">
              <DialogClose asChild>
                <Button variant="ghost" type="button">Cancelar</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Criando...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Criar Usuário
                  </>
                )}
              </Button>
            </div>

          </form>
        </DialogContent>
      </Dialog>

      {/* --- DIALOG DE EDIÇÃO --- */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <UserCog className="w-5 h-5 text-primary" />
              Editar Usuário
            </DialogTitle>
            <DialogDescription>
              Altere as credenciais, o cargo ou o status de acesso do usuário.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-6 pt-4">
            
            <div className="space-y-4">
              
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Nome Completo</Label>
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome do usuário"
                  required
                  className="h-11 bg-muted/30 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">E-mail</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail de login"
                  required
                  className="h-11 bg-muted/30 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5" />
                  Redefinir Senha
                </Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Preencha apenas se quiser alterar a senha atual"
                  className="h-11 bg-muted/30 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Cargo / Role</Label>
                <Select value={role} onValueChange={(val: any) => setRole(val)}>
                  <SelectTrigger className="w-full h-11 rounded-lg bg-muted/30 border-input focus:ring-2 focus:ring-primary text-left">
                    <SelectValue placeholder="Selecione um cargo" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg shadow-xl">
                    <SelectItem value="ALUNO">Aluno (Estudo e Simulados)</SelectItem>
                    <SelectItem value="PROFESSOR">Professor (Curadoria & Questões)</SelectItem>
                    <SelectItem value="REVISOR">Revisor (Revisão Técnica)</SelectItem>
                    <SelectItem value="SUPORTE">Suporte (Atendimento Operacional)</SelectItem>
                    
                    {/* Restrição de Admin: Apenas SUPER_ADMIN pode promover ou gerenciar cargos seniores */}
                    {currentUser?.role === "SUPER_ADMIN" && (
                      <>
                        <SelectItem value="ADMIN">Administrador (Gestão Operacional)</SelectItem>
                        <SelectItem value="SUPER_ADMIN">Super Admin (Acesso Total)</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground mt-1">
                  💡 {ROLE_CONFIG[role]?.desc || ""}
                </p>
              </div>

              <div className="flex items-center justify-between p-4 border border-primary/10 rounded-xl bg-primary/5">
                <div className="space-y-1">
                  <Label className="text-sm font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    Status Ativo
                  </Label>
                  <p className="text-[10px] text-muted-foreground">
                    Define se o usuário poderá realizar login no sistema.
                  </p>
                </div>
                <Switch checked={ativo} onCheckedChange={setAtivo} className="data-[state=checked]:bg-primary" />
              </div>

            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-muted/50">
              <DialogClose asChild>
                <Button variant="ghost" type="button">Cancelar</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </div>

          </form>
        </DialogContent>
      </Dialog>

      {/* --- DIALOG DE CONFIRMAÇÃO DE EXCLUSÃO --- */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-destructive">
              <Trash2 className="w-5 h-5" />
              Excluir Usuário?
            </DialogTitle>
            <DialogDescription>
              Esta ação removerá permanentemente a conta de <strong>{selectedUser?.nome}</strong> e não poderá ser desfeita.
            </DialogDescription>
          </DialogHeader>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-muted/50">
            <DialogClose asChild>
              <Button variant="ghost" type="button">Cancelar</Button>
            </DialogClose>
            <Button 
              onClick={handleDeleteSubmit}
              disabled={isPending} 
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold px-6"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Excluindo...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Confirmar Exclusão
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      </div>
    </div>
  )
}
