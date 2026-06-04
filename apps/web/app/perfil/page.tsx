import { ProfileForm } from "./_components/profile-form"
import { auth } from "@workspace/auth"
import { prisma } from "@workspace/database"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "US"
  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

export default async function PerfilPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  const [usuario, carreiras] = await Promise.all([
    prisma.usuario.findUnique({
      where: { id: session.user.id },
      include: {
        perfil: {
          include: {
            carreira: true,
          },
        },
      },
    }),
    prisma.carreira.findMany({
      where: { ativo: true },
      orderBy: { nome: "asc" },
    }),
  ])

  if (!usuario) {
    redirect("/login")
  }

  const nomeCompleto = usuario.nome || ""
  const avatarUrl = usuario.avatarUrl || ""

  return (
    <ProfileForm
      profile={{
        email: usuario.email,
        nome: nomeCompleto,
        avatarUrl,
        iniciais: getInitials(nomeCompleto),
        nomeExibicao: usuario.perfil?.nomeExibicao || "",
        bio: usuario.perfil?.bio || "",
        instagram: usuario.perfil?.instagram || "",
        tiktok: usuario.perfil?.tiktok || "",
        facebook: usuario.perfil?.facebook || "",
        linkedin: usuario.perfil?.linkedin || "",
        visibilidade: (usuario.perfil?.visibilidade as "PRIVADO" | "BASICO_PUBLICO" | "COMPLETO_PUBLICO") || "PRIVADO",
        carreira: usuario.perfil?.carreira?.nome || "Não definida",
        carreiraIconUrl: usuario.perfil?.carreira?.iconUrl || "",
        carreiraId: usuario.perfil?.carreiraId || "",
        carreiras: carreiras.map((carreira) => ({
          id: carreira.id,
          nome: carreira.nome,
          iconUrl: carreira.iconUrl || "",
        })),
      }}
    />
  )
}
