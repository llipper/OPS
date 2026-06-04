import { Video, BookOpen, Lightbulb, Target, Globe, MessageSquare, GraduationCap } from "lucide-react"

export const MATERIAL_FIELDS = [
    { key: "videoUrl", icon: Video, color: "text-red-500", label: "Link da Videoaula", placeholder: "https://youtube.com/..." },
    { key: "objetivo", icon: Target, color: "text-blue-500", label: "Objetivo de Aprendizagem", placeholder: "O que o aluno deve dominar aqui?" },
    { key: "referencia", icon: BookOpen, color: "text-primary", label: "Base Legal / Bibliografia", placeholder: "Ex: Art. 37, CF/88 ou Doutrina..." },
    { key: "dica", icon: Lightbulb, color: "text-amber-500", label: "Dica / Macete (Tip)", placeholder: "O segredo para matar essa questão rápido..." },
]

export const PUBLICATION_SETTINGS = [
    {
        icon: Globe,
        color: "text-emerald-500",
        label: "Visibilidade Pública",
        description: "Disponível no Banco Geral",
        defaultChecked: true,
    },
    {
        icon: MessageSquare,
        color: "text-primary",
        label: "Permitir Comentários",
        description: "Interação entre alunos",
        defaultChecked: true,
    },
    {
        icon: GraduationCap,
        color: "text-purple-500",
        label: "Modo Revisão",
        description: "Habilitar chat com professor",
        defaultChecked: false,
    },
]
