import {
  prisma,
  TipoConsentimentoPrivacidade,
  TipoSolicitacaoPrivacidade,
} from "@workspace/database"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Textarea } from "@workspace/ui/components/textarea"
import { Badge } from "@workspace/ui/components/badge"
import {
  acceptRequiredPrivacyDocuments,
  requestPrivacyRight,
  revokeMarketingConsent,
} from "@/actions/privacy-actions"
import { getSecurityContext } from "@/lib/auth/get-security-context"
import { CookiePreferencesReset } from "@/components/privacy/cookie-preferences-reset"

export default async function PrivacyPage() {
  const context = await getSecurityContext()
  const [consents, requests] = await Promise.all([
    prisma.consentimentoPrivacidade.findMany({
      where: { usuarioId: context.userId },
      orderBy: { criadoEm: "desc" },
      take: 20,
    }),
    prisma.solicitacaoPrivacidade.findMany({
      where: { usuarioId: context.userId },
      orderBy: { criadoEm: "desc" },
      take: 20,
    }),
  ])

  const hasPrivacyPolicy = consents.some(
    (item) =>
      item.tipo === TipoConsentimentoPrivacidade.POLITICA_PRIVACIDADE &&
      item.aceito &&
      !item.revogadoEm
  )
  const hasTerms = consents.some(
    (item) =>
      item.tipo === TipoConsentimentoPrivacidade.TERMOS_USO &&
      item.aceito &&
      !item.revogadoEm
  )

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">
          Privacidade e meus dados
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Consulte consentimentos, solicite seus direitos de titular e acompanhe
          pedidos relacionados à LGPD.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Documentos obrigatórios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <StatusRow label="Termos de Uso" ok={hasTerms} />
            <StatusRow label="Política de Privacidade" ok={hasPrivacyPolicy} />
            <form action={acceptRequiredPrivacyDocuments}>
              <Button type="submit" className="rounded-xl">
                Registrar aceite
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consentimentos opcionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Marketing e cookies analíticos são opcionais, bloqueados por
              padrão e revogáveis. Cookies necessários continuam ativos para
              autenticação, segurança e funcionamento da plataforma.
            </p>
            <CookiePreferencesReset />
            <form action={revokeMarketingConsent}>
              <Button type="submit" variant="outline" className="rounded-xl">
                Revogar marketing
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Solicitar direito do titular</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={requestPrivacyRight} className="grid gap-4">
            <select
              name="tipo"
              className="h-10 rounded-xl border border-input bg-background px-3 text-sm"
              defaultValue={TipoSolicitacaoPrivacidade.ACESSO_DADOS}
            >
              {Object.values(TipoSolicitacaoPrivacidade).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <Textarea
              name="descricao"
              placeholder="Descreva sua solicitação, se necessário."
            />
            <Button type="submit" className="w-fit rounded-xl">
              Enviar solicitação
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Solicitações recentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {requests.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhuma solicitação registrada.
            </p>
          ) : (
            requests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between rounded-xl border p-3"
              >
                <div>
                  <p className="text-sm font-medium">{request.tipo}</p>
                  <p className="text-xs text-muted-foreground">
                    {request.criadoEm.toLocaleString("pt-BR")}
                  </p>
                </div>
                <Badge variant="outline" className="rounded-xl">
                  {request.status}
                </Badge>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </main>
  )
}

function StatusRow({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-3">
      <span className="text-sm font-medium">{label}</span>
      <Badge variant={ok ? "default" : "secondary"} className="rounded-xl">
        {ok ? "Aceito" : "Pendente"}
      </Badge>
    </div>
  )
}
