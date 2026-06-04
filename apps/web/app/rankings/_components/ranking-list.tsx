"use client"

import * as React from "react"
import { RankingItem } from "@/features/rankings/types/ranking.types"
import { Award } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@workspace/ui/components/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"

interface RankingListProps {
  top3: (RankingItem | undefined)[]
  restOfRanking: RankingItem[]
  currentUser?: RankingItem | null
}

// Auxiliar para obter as iniciais do nome
function getInitials(nome: string) {
  return nome
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

// Subcomponente para renderizar um pilar do pódio
interface PodiumPillarProps {
  item?: RankingItem
  posicao: number
  alturaClasse: string
  colorPillar: string
  ringColor: string
  avatarSize: string
  avatarRing: string
  badgeStyle: string
}

function PodiumPillar({
  item,
  posicao,
  alturaClasse,
  colorPillar,
  ringColor,
  avatarSize,
  avatarRing,
  badgeStyle,
}: PodiumPillarProps) {
  const is1st = posicao === 1
  const isVazio = !item

  return (
    <div
      className={`flex flex-col items-center flex-1 min-w-0 transition-transform duration-300 hover:scale-[1.02] ${
        is1st ? "z-10" : "z-0"
      } ${isVazio ? "opacity-40" : ""}`}
    >
      {/* Avatar Flutuante com Moldura Colorida Estilizada */}
      <div className="relative mb-3 flex items-center justify-center p-2 shrink-0">
        <div
          className={`absolute inset-0 rounded-full ${
            isVazio
              ? "ring-2 ring-dashed ring-muted-foreground/30 animate-[spin_40s_linear_infinite]"
              : `ring-4 ring-offset-0 ${ringColor} ${avatarRing}`
          }`}
        />
        
        <Avatar className={`rounded-full ${avatarSize} border-2 border-background shadow-md ${isVazio ? "bg-muted flex items-center justify-center" : ""}`}>
          {!isVazio && (
            <AvatarImage
              src={item.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.nome)}&background=0D0D0D&color=fff`}
              alt={item.nome}
            />
          )}
          <AvatarFallback className="text-xs bg-muted text-muted-foreground/60 font-black">
            {!isVazio ? getInitials(item.nome) : "-"}
          </AvatarFallback>
        </Avatar>

        {!isVazio && item.isCurrentUser && (
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[8px] font-bold px-2 py-0.5 rounded-full border border-primary-foreground/10 uppercase tracking-wider shadow-sm z-25">
            Você
          </span>
        )}
      </div>

      {/* Nome e Info */}
      <div className="text-center mb-4 space-y-0.5 w-full px-1">
        <h3 className={`font-bold text-xs md:text-sm truncate max-w-full ${isVazio ? "text-muted-foreground/70" : "text-foreground"}`}>
          {isVazio ? "Aguardando" : item.nome}
        </h3>
        <p className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${isVazio ? "text-muted-foreground/45" : "text-muted-foreground"}`}>
          {isVazio ? "0 pts" : `${item.pontuacao} pts`}
        </p>
        <p className={`text-[9px] font-semibold hidden md:block ${isVazio ? "text-muted-foreground/30" : "text-muted-foreground/60"}`}>
          {isVazio ? "-% acertos" : `${item.taxaAcerto}% acertos`}
        </p>
      </div>

      {/* Pilar Físico Arredondado */}
      <div
        className={`w-full ${alturaClasse} ${colorPillar} border border-b-0 rounded-t-[32px] flex flex-col items-center pt-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]`}
      >
        <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-xs font-black border shadow-sm ${badgeStyle} ${isVazio ? "opacity-40" : ""}`}>
          {posicao}
        </div>
      </div>
    </div>
  )
}

// Subcomponente para renderizar uma linha dos outros competidores
interface RankingRowProps {
  item: RankingItem
}

function RankingRow({ item }: RankingRowProps) {
  const isCurrentUser = item.isCurrentUser
  return (
    <div
      className={`flex items-center justify-between py-3.5 px-6 transition-all hover:bg-muted/5 ${
        isCurrentUser
          ? "bg-primary/5 border-y border-primary/10 shadow-[inset_0_0_12px_rgba(var(--primary),0.01)]"
          : ""
      }`}
    >
      {/* Esquerda: Avatar e Nome */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <span className="text-xs font-bold text-muted-foreground/60 w-6 text-center">
          {item.posicao}º
        </span>

        <Avatar className="h-8 w-8 rounded-lg border border-border/40">
          <AvatarImage
            src={item.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.nome)}&background=0D0D0D&color=fff`}
            alt={item.nome}
          />
          <AvatarFallback className="text-xs bg-muted text-muted-foreground font-bold">
            {getInitials(item.nome)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col min-w-0 space-y-0.5">
          <span
            className={`text-[13px] font-bold truncate flex items-center gap-1.5 ${
              isCurrentUser ? "text-primary" : "text-foreground/90"
            }`}
          >
            {item.nome}
            {isCurrentUser && (
              <span className="bg-primary/10 text-primary text-[8px] font-bold px-1.5 py-0.5 rounded-md border border-primary/20 uppercase tracking-wider">
                Você
              </span>
            )}
          </span>
          <span className="text-[11px] text-muted-foreground truncate">
            {item.totalQuestoes} questões resolvidas
          </span>
        </div>
      </div>

      {/* Direita: Score e Aproveitamento */}
      <div className="flex items-center gap-6 pl-4">
        <div className="w-16 h-1 bg-muted/65 rounded-full overflow-hidden hidden sm:block">
          <div
            className={`h-full rounded-full ${isCurrentUser ? "bg-primary" : "bg-muted-foreground/50"}`}
            style={{ width: `${item.taxaAcerto}%` }}
          />
        </div>
        
        <div className="flex flex-col items-end shrink-0 min-w-[70px]">
          <span className="text-[13px] font-bold text-foreground">
            {item.pontuacao} pts
          </span>
          <span className="text-[10px] text-muted-foreground font-semibold">
            {item.taxaAcerto}% acerto
          </span>
        </div>
      </div>
    </div>
  )
}

// Subcomponente para o card de classificação flutuante do usuário ativo
interface CurrentUserCardProps {
  currentUser: RankingItem
}

function CurrentUserCard({ currentUser }: CurrentUserCardProps) {
  return (
    <Card className="border-primary/20 bg-primary/5 shadow-sm rounded-[24px] overflow-hidden">
      <CardContent className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Award className="h-5 w-5" />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-[13px] font-bold text-foreground">Sua classificação atual</h4>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Continue respondendo questões para subir degraus no pódio!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-center sm:text-right">
            <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider block">
              Posição
            </span>
            <span className="text-base font-black text-primary">
              {currentUser.posicao}º lugar
            </span>
          </div>
          <div className="text-center sm:text-right">
            <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider block">
              Seu Score
            </span>
            <span className="text-base font-black text-foreground">
              {currentUser.pontuacao} pts
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente Exportado Principal
export function RankingList({ top3, restOfRanking, currentUser }: RankingListProps) {
  // Mapeia o Top 3 para a ordem visual correta: 2º Lugar (Esquerda), 1º Lugar (Centro), 3º Lugar (Direita)
  const podioExibido = [
    {
      item: top3[1], // 2º Lugar
      posicao: 2,
      alturaClasse: "h-20 md:h-28",
      colorPillar: "bg-muted/10 border-border/40",
      ringColor: "ring-rose-500/20 border-rose-500/60 text-rose-400 bg-rose-500/10",
      avatarSize: "h-14 w-14 md:h-16 md:w-16",
      avatarRing: "border-2 border-dashed border-rose-500/60 animate-[spin_25s_linear_infinite]",
      badgeStyle: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    },
    {
      item: top3[0], // 1º Lugar (Campeão)
      posicao: 1,
      alturaClasse: "h-28 md:h-36",
      colorPillar: "bg-muted/20 border-border/50 shadow-[0_4px_20px_rgba(16,185,129,0.04)]",
      ringColor: "ring-emerald-500/25 border-emerald-500 text-emerald-400 bg-emerald-500/10",
      avatarSize: "h-16 w-16 md:h-20 md:w-20",
      avatarRing: "border-2 border-dashed border-emerald-500/80 animate-[spin_20s_linear_infinite]",
      badgeStyle: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    },
    {
      item: top3[2], // 3º Lugar
      posicao: 3,
      alturaClasse: "h-14 md:h-20",
      colorPillar: "bg-muted/10 border-border/40",
      ringColor: "ring-rose-500/20 border-rose-500/60 text-rose-400 bg-rose-500/10",
      avatarSize: "h-14 w-14 md:h-16 md:w-16",
      avatarRing: "border-2 border-dashed border-rose-500/60 animate-[spin_30s_linear_infinite]",
      badgeStyle: "bg-amber-700/10 text-amber-700 border-amber-700/20",
    },
  ]

  return (
    <div className="space-y-8 w-full animate-in fade-in duration-500">
      
      {/* 1. O Pódio de Colunas (Pilares) */}
      <div className="flex flex-col items-center justify-center pt-8 pb-4">
        <div className="flex items-end justify-center gap-4 md:gap-8 w-full max-w-2xl px-4">
          {podioExibido.map((p) => (
            <PodiumPillar key={p.posicao} {...p} />
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-widest mt-4">
          Pódio da Classificação Geral
        </p>
      </div>

      {/* 2. Card "Outros Participantes" */}
      <Card className="border-border/40 bg-card shadow-sm rounded-[24px] overflow-hidden">
        <CardHeader className="pb-3 border-b border-border/10">
          <CardTitle className="text-[13px] font-semibold text-foreground/80 uppercase tracking-wider">
            Outros Participantes
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/10">
            {restOfRanking.length > 0 ? (
              restOfRanking.map((item) => (
                <RankingRow key={item.usuarioId} item={item} />
              ))
            ) : (
              <div className="py-12 text-center text-xs text-muted-foreground">
                Sem outros competidores classificados neste período.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 3. Card Flutuante de Classificação se você estiver fora do Top 3 */}
      {currentUser && currentUser.posicao > 3 && (
        <CurrentUserCard currentUser={currentUser} />
      )}
    </div>
  )
}

export default RankingList
