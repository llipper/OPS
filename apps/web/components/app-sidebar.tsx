"use client"

import { useState, type ComponentProps, type ComponentType } from "react"
import Link from "next/link"
import {
  IconDashboard,
  IconBook,
  IconNotebook,
  IconTrophy,
  IconChartBar,
  IconMessage,
  IconFolder,
  IconAlertTriangle,
  IconBriefcase,
  IconSignal4g,
  IconSchool,
  IconBuildingBank,
  IconClipboardList,
  IconBrain,
  IconBookmark,
  IconLibrary,
  IconChevronRight,
  IconShieldLock
} from "@tabler/icons-react"

import { useLayout } from "@/contexts/layout-context"
import { NavUser } from "@/components/nav-user"
import { canViewAdminSection, hasPermission, PERMISSIONS, type Permission, type Role } from "@workspace/permissions"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from "@workspace/ui/components/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@workspace/ui/components/dropdown-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import { PoliceBadgeIcon } from "@hugeicons/core-free-icons"

// ─── Tipos ───────────────────────────────────────────────────────────────────

type AppSidebarProps = ComponentProps<typeof Sidebar> & {
  showAdmin?: boolean
}

type NavSubItem = {
  title: string
  url: string
}

type NavItem = {
  title: string
  url: string
  icon?: ComponentType<{ className?: string }>
  items?: NavSubItem[]
  permission?: Permission
}

// ─── Dados de Navegação ──────────────────────────────────────────────────────

const navPrincipais: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconDashboard,
    permission: PERMISSIONS.VIEW_PRINCIPAL_MENU
  },
  {
    title: "Estudar Questões",
    url: "/questions",
    icon: IconBook,
    permission: PERMISSIONS.VIEW_PRINCIPAL_MENU
  },
    {
    title: "Planejamento",
    url: "/planejamento",
    icon: IconBook,
    permission: PERMISSIONS.VIEW_PRINCIPAL_MENU
  },{
    title: "Mini Simulados",
    url: "/minisimulados",
    icon: IconBook,
    permission: PERMISSIONS.VIEW_PRINCIPAL_MENU
  },
  
  {
    title: "Caderno do Aluno",
    url: "/caderno",
    icon: IconNotebook,
    permission: PERMISSIONS.VIEW_PRINCIPAL_MENU
  },
  {
    title: "Rankings",
    url: "/rankings",
    icon: IconTrophy,
    permission: PERMISSIONS.VIEW_PRINCIPAL_MENU
  },
  {
    title: "Estatísticas",
    url: "/estatisticas/desempenho",
    icon: IconChartBar,
    permission: PERMISSIONS.VIEW_PRINCIPAL_MENU
  },
  {
    title: "Suporte",
    url: "#",
    icon: IconMessage,
    permission: PERMISSIONS.VIEW_PRINCIPAL_MENU,
    items: [
      { title: "Abrir Ticket", url: "/suporte/novo" },
      { title: "Meus Tickets", url: "/suporte/meus" },
      { title: "FAQ", url: "/suporte/faq" },
    ],
  },
]

const navAdmin: NavItem[] = [
  {
    title: "Gestão de Questões",
    url: "#",
    icon: IconFolder,
    permission: PERMISSIONS.MANAGE_QUESTIONS,
    items: [
      { title: "Lista de Questões", url: "/admin/questoes" },
      { title: "Criar Questão", url: "/admin/questoes/criar" },
      { title: "Revisar", url: "/admin/questoes/revisar" },
      { title: "Publicadas", url: "/admin/questoes/publicadas" },
      { title: "Rejeitadas", url: "/admin/questoes/rejeitadas" },
      { title: "Importar Questões", url: "/admin/questoes/importar" },
    ],
  },
  {
    title: "Report de Questões",
    url: "#",
    icon: IconAlertTriangle,
    permission: PERMISSIONS.REVIEW_QUESTIONS,
    items: [
      { title: "Lista de Reports", url: "/admin/reports" },
      { title: "Revisar Reports", url: "/admin/reports/revisar" },
      { title: "Resolver Reports", url: "/admin/reports/resolver" },
    ],
  },
  {
    title: "Criar Mini Simulados",
    url: "/criar/minisimulados",
    icon: IconBook,
    permission: PERMISSIONS.MANAGE_COURSES
  },
  {
    title: "Disciplinas",
    url: "/admin/disciplinas",
    icon: IconBook,
    permission: PERMISSIONS.MANAGE_SUBJECTS
  },
  {
    title: "Carreiras",
    url: "/admin/carreiras",
    icon: IconBriefcase,
    permission: PERMISSIONS.MANAGE_SUBJECTS
  },
  {
    title: "Níveis de Dificuldade",
    url: "/admin/dificuldades",
    icon: IconSignal4g,
    permission: PERMISSIONS.SYSTEM_CONFIG
  },
  {
    title: "Níveis Escolaridade",
    url: "/admin/niveis-educacionais",
    icon: IconSchool,
    permission: PERMISSIONS.SYSTEM_CONFIG
  },
  {
    title: "Bancas Examinadoras",
    url: "/admin/bancas",
    icon: IconBuildingBank,
    permission: PERMISSIONS.MANAGE_SUBJECTS
  },

  {
    title: "Tipos de Questão",
    url: "/admin/tipos-questao",
    icon: IconBrain,
    permission: PERMISSIONS.MANAGE_SUBJECTS
  },
  {
    title: "Controle de Acesso",
    url: "/admin/acesso",
    icon: IconShieldLock,
    permission: PERMISSIONS.MANAGE_USERS
  },
  {
    title: "Cadernos",
    url: "#",
    icon: IconLibrary,
    permission: PERMISSIONS.MANAGE_COURSES,
    items: [
      { title: "Listar Cadernos", url: "/admin/cadernos" },
      { title: "Criar Caderno", url: "/admin/cadernos/criar" },
      { title: "Compartilhados", url: "/admin/cadernos/compartilhados" },
    ],
  },
  {
    title: "StudyBlocks",
    url: "/admin/study-blocks",
    icon: IconNotebook,
    permission: PERMISSIONS.MANAGE_COURSES
  },
]

// ─── Componente Principal ────────────────────────────────────────────────────

import { useAuthSession } from "@/hooks/use-auth-session"

export function AppSidebar({ showAdmin = true, ...props }: AppSidebarProps) {
  const { user: sessionUser, status, update } = useAuthSession()
  const { variant, collapsible, side } = useLayout()

  const isLoading = status === "loading"
  const resolvedRole = sessionUser?.role ?? 'ALUNO'

  const user = {
    name: sessionUser?.name || "Usuário",
    email: sessionUser?.email || "",
    avatar: sessionUser?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(sessionUser?.name || "U")}&background=0D0D0D&color=fff`,
    role: resolvedRole
  }

  // Filtro de itens permitidos (Principais e Admin)
  const filteredPrincipais = navPrincipais.filter(item => 
    resolvedRole === 'SUPER_ADMIN' || !item.permission || hasPermission(resolvedRole, item.permission)
  )

  const filteredAdmin = navAdmin.filter(item => 
    resolvedRole === 'SUPER_ADMIN' || !item.permission || hasPermission(resolvedRole, item.permission)
  )

  const isAdminSectionVisible = showAdmin && (resolvedRole === 'SUPER_ADMIN' || canViewAdminSection(resolvedRole))

  return (
    <Sidebar
      variant={variant}
      collapsible={collapsible}
      side={side}
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <HugeiconsIcon icon={PoliceBadgeIcon} strokeWidth={2} className="size-5!" />
                <span className="text-base font-semibold">OPSConcurso.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principais</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredPrincipais.map((item) => (
                <NavCollapsibleItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdminSectionVisible && (
          <SidebarGroup className="animate-in fade-in duration-500">
            <SidebarGroupLabel>Administração</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredAdmin.map((item) => (
                  <NavCollapsibleItem key={item.title} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}

function NavCollapsibleItem({ item }: { item: NavItem }) {
  const { isMobile, state } = useSidebar()

  if (!item.items) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip={item.title}>
          <Link href={item.url}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  if (state === "collapsed" && !isMobile) {
    return (
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="min-w-48 rounded-xl ml-2">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 px-2 py-1.5 border-b border-border/5 mb-1">
                {item.title}
              </DropdownMenuLabel>
              {item.items.map((subItem) => (
                <DropdownMenuItem
                  key={subItem.title}
                  className="text-xs font-bold uppercase tracking-wider cursor-pointer py-2 focus:bg-primary/5 focus:text-primary transition-all"
                  asChild
                >
                  <Link href={subItem.url}>
                    {subItem.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem>
      <Collapsible className="group/collapsible">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <Link href={subItem.url}>
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}
