export default function TermosDeUsoPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">Versão 2026-05-18</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Termos de Uso
          </h1>
        </div>

        <Section title="Uso da plataforma">
          A plataforma oferece questões, simulados, relatórios, rankings,
          planejamentos de estudo e ferramentas educacionais para concursos
          públicos. O usuário deve utilizar o serviço de forma lícita e
          compatível com sua finalidade educacional.
        </Section>

        <Section title="Conta e segurança">
          O usuário é responsável por proteger suas credenciais, manter seus
          dados atualizados e comunicar qualquer uso indevido de sua conta.
        </Section>

        <Section title="Conteúdo educacional">
          Questões, comentários, aulas, relatórios e recomendações possuem
          finalidade pedagógica. O planejamento automatizado não garante
          aprovação em concurso e deve ser usado como apoio ao estudo.
        </Section>

        <Section title="Pagamentos e assinaturas">
          Planos, preços, renovação, cancelamento e reembolso devem seguir as
          regras exibidas no momento da contratação e os meios de pagamento
          disponíveis.
        </Section>

        <Section title="Privacidade">
          O tratamento de dados pessoais segue a Política de Privacidade da
          plataforma e a legislação aplicável, incluindo a LGPD.
        </Section>

        <Section title="Contato">
          Defina aqui o canal oficial de suporte e privacidade antes da
          produção: suporte@seudominio.com.
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
