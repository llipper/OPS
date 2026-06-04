import Link from "next/link"

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">Versão 2026-05-18</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Política de Privacidade
          </h1>
        </div>

        <p className="text-muted-foreground">
          Esta política descreve como a Concurso Master trata dados pessoais na
          plataforma de estudos, simulados, questões, pagamentos e relatórios de
          desempenho.
        </p>

        <Section title="Dados tratados">
          Tratamos dados cadastrais, dados de autenticação, dados de uso da
          plataforma, respostas a questões, diagnósticos, planos de estudo,
          dados financeiros necessários para pedidos e pagamentos, registros de
          suporte, logs técnicos e arquivos enviados pelo usuário.
        </Section>

        <Section title="Finalidades">
          Os dados são usados para criar e proteger contas, entregar conteúdo
          educacional, gerar simulados e planejamentos, processar pagamentos,
          prestar suporte, cumprir obrigações legais, prevenir fraudes e
          melhorar a experiência da plataforma.
        </Section>

        <Section title="Decisões automatizadas">
          O planejamento pode usar respostas, desempenho por tópico e incidência
          histórica de provas para recomendar aulas, revisões e questões. O
          usuário pode solicitar revisão dessa recomendação na área de
          privacidade.
        </Section>

        <Section title="Cookies">
          Cookies necessários podem ser usados para autenticação, segurança,
          prevenção de fraude e funcionamento básico da plataforma. Cookies
          analíticos e de marketing são opcionais, ficam bloqueados por padrão e
          só serão ativados após consentimento específico do usuário.
        </Section>

        <Section title="Compartilhamento">
          Dados podem ser compartilhados com provedores necessários à operação,
          como autenticação, banco de dados, armazenamento, pagamentos, e-mail,
          hospedagem e analytics, sempre conforme finalidade legítima e
          segurança adequada.
        </Section>

        <Section title="Direitos do titular">
          O usuário pode solicitar acesso, correção, portabilidade, exclusão,
          anonimização, revogação de consentimento e revisão de decisão
          automatizada em <Link href="/privacidade">/privacidade</Link>.
        </Section>

        <Section title="Retenção">
          Dados são mantidos pelo tempo necessário à prestação do serviço,
          cumprimento de obrigação legal, segurança, auditoria e exercício
          regular de direitos. Dados podem ser anonimizados quando a exclusão
          integral prejudicar obrigações legais ou antifraude.
        </Section>

        <Section title="Encarregado">
          Defina aqui o canal oficial do encarregado/DPO antes da produção:
          privacidade@seudominio.com.
        </Section>
      </div>
    </main>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="leading-7 text-muted-foreground">{children}</p>
    </section>
  )
}
