import { auth } from "@workspace/auth"
import { prisma } from "@workspace/database"
import { canManageUsers } from "@workspace/permissions"
import { AcessoClient } from "@/components/admin/acesso/acesso-client"
import { ShieldAlert } from "lucide-react"

export default async function AcessoPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return (
      <div className="flex h-[80vh] items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6 bg-red-500/5 border border-red-500/10 p-8 rounded-3xl backdrop-blur-md shadow-2xl">
          <div className="mx-auto  h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-500 shadow-lg shadow-red-500/10">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">Não Autorizado</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Por favor, realize o login com uma conta administrativa para acessar esta área.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const canManage = canManageUsers(session.user.role)
  
  if (!canManage) {
    return (
      <div className="flex h-[80vh] items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6 bg-red-500/5 border border-red-500/10 p-8 rounded-3xl backdrop-blur-md shadow-2xl">
          <div className="mx-auto w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-500 shadow-lg shadow-red-500/10">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">Acesso Restrito</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Você não possui as credenciais administrativas necessárias para acessar a Central de Controle de Acessos.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Busca inicial diretamente no servidor (Zero client-side delay no primeiro carregamento!)
  const initialUsers = await prisma.usuario.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
      role: true,
      ativo: true,
      avatarUrl: true,
      _count: {
        select: {
          questoesCriadas: true
        }
      }
    },
    orderBy: {
      nome: "asc"
    }
  })

  // Transforma tipos para evitar problemas de serialização se necessário
  const serializedUsers = initialUsers.map(user => ({
    ...user,
    avatarUrl: user.avatarUrl || null
  }))

  const currentUserData = {
    id: session.user.id,
    name: session.user.name || null,
    email: session.user.email || null,
    role: session.user.role,
    avatarUrl: session.user.image || null
  }

  return (
    <AcessoClient 
      initialUsers={serializedUsers} 
      currentUser={currentUserData} 
    />
  )
}
