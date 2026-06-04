import fs from "node:fs"
import path from "node:path"

const rootDir = process.cwd()
const outputPath = path.join(rootDir, "TAXONOMIA.ORGANIZADA.json")
const summaryPath = path.join(rootDir, "TAXONOMIA.ORGANIZADA.summary.json")
const originalSourcePath = path.join(rootDir, "TAXONAMIA.SQL")
const sourcePath = fs.existsSync(originalSourcePath)
  ? originalSourcePath
  : outputPath

const preferredOrder = [
  "Língua Portuguesa",
  "Redação Oficial",
  "Matemática",
  "Raciocínio Lógico",
  "Informática",
  "Atualidades",
  "História do Ceará",
  "Geografia do Ceará",
  "Direito Constitucional",
  "Direitos Humanos",
  "Direito Administrativo",
  "Administração Pública",
  "Administração Financeira e Orçamentária",
  "Contabilidade Pública",
  "Ética no Serviço Público",
  "Direito Penal",
  "Processo Penal",
  "Direito Penal Militar",
  "Processo Penal Militar",
  "Direito Civil",
  "Direito Processual Civil",
  "Direito Eleitoral",
  "Direito Ambiental",
  "Direito Tributário",
  "Direito Previdenciário",
  "Legislação Penal Especial",
  "Legislação Institucional",
  "Legislação Estadual",
  "Legislação Municipal",
  "Legislação da Polícia Civil",
  "Legislação da Polícia Penal",
  "Legislação da Polícia Federal",
  "Legislação da Polícia Rodoviária Federal",
  "Segurança Pública",
  "Criminologia",
  "Medicina Legal",
  "Legislação de Trânsito",
  "Arquivologia",
  "Estatística",
]

const additions = {
  "Redação Oficial": {
    "Comunicação Oficial": {
      "Características da Redação Oficial": [
        "Clareza",
        "Precisão",
        "Objetividade",
        "Concisão",
        "Coesão",
        "Coerência",
        "Impessoalidade",
        "Formalidade",
        "Padronização",
      ],
      "Pronomes de Tratamento": [
        "Emprego correto",
        "Concordância",
        "Vocativos",
        "Endereçamento",
      ],
      "Documentos Oficiais": [
        "Ofício",
        "Memorando",
        "Ata",
        "Relatório",
        "Requerimento",
        "Despacho",
        "Portaria",
        "Ordem de serviço",
      ],
    },
  },
  "Língua Portuguesa": {
    Sintaxe: {
      Concordância: [
        "Concordância verbal",
        "Concordância nominal",
        "Casos especiais de concordância",
        "Concordância com sujeito composto",
        "Concordância com expressões partitivas",
      ],
      Regência: [
        "Regência verbal",
        "Regência nominal",
        "Transitividade verbal",
        "Complemento nominal",
        "Objeto direto",
        "Objeto indireto",
      ],
      Crase: [
        "Uso obrigatório da crase",
        "Uso proibido da crase",
        "Uso facultativo da crase",
        "Locuções femininas",
        "Crase antes de pronomes",
      ],
      "Colocação Pronominal": [
        "Próclise",
        "Mesóclise",
        "Ênclise",
        "Fatores de atração",
        "Colocação em locuções verbais",
      ],
      Pontuação: [
        "Vírgula",
        "Ponto e vírgula",
        "Dois-pontos",
        "Travessão",
        "Parênteses",
        "Aspas",
      ],
    },
    "Reescrita e Equivalência": {
      "Reescrita de Frases": [
        "Manutenção de sentido",
        "Correção gramatical",
        "Substituição de termos",
        "Transformação de períodos",
        "Paráfrase",
      ],
      "Equivalência de Estruturas": [
        "Voz ativa e voz passiva",
        "Discurso direto e indireto",
        "Orações desenvolvidas e reduzidas",
        "Conectores equivalentes",
        "Relações lógico-semânticas",
      ],
    },
  },
  Informática: {
    "Sistemas Operacionais": {
      Windows: [
        "Área de trabalho",
        "Gerenciador de arquivos",
        "Painel de controle",
        "Configurações",
        "Atalhos",
      ],
      Linux: [
        "Comandos básicos",
        "Sistema de arquivos",
        "Permissões",
        "Processos",
        "Distribuições",
      ],
      "Dispositivos Móveis": [
        "Android",
        "iOS",
        "Aplicativos",
        "Sincronização",
        "Segurança em dispositivos móveis",
      ],
    },
    "Pacote Office e LibreOffice": {
      "Editor de Texto": [
        "Microsoft Word",
        "LibreOffice Writer",
        "Formatação",
        "Tabelas",
        "Mala direta",
        "Revisão",
      ],
      Planilhas: [
        "Microsoft Excel",
        "LibreOffice Calc",
        "Fórmulas",
        "Funções",
        "Gráficos",
        "Tabelas dinâmicas",
      ],
      Apresentações: [
        "Microsoft PowerPoint",
        "LibreOffice Impress",
        "Slides",
        "Transições",
        "Animações",
      ],
    },
    "Internet e Navegadores": {
      Internet: [
        "World Wide Web",
        "URL",
        "DNS",
        "HTTP",
        "HTTPS",
        "Cookies",
        "Cache",
      ],
      Navegadores: [
        "Google Chrome",
        "Mozilla Firefox",
        "Microsoft Edge",
        "Favoritos",
        "Histórico",
        "Extensões",
      ],
      "Correio Eletrônico": [
        "E-mail",
        "Anexos",
        "Cc e Cco",
        "Spam",
        "Phishing",
        "Assinatura eletrônica",
      ],
    },
    "Redes de Computadores": {
      "Conceitos de Redes": [
        "LAN",
        "WAN",
        "MAN",
        "Topologias",
        "Protocolos",
        "Endereço IP",
      ],
      "Equipamentos de Rede": [
        "Roteador",
        "Switch",
        "Modem",
        "Access point",
        "Firewall",
      ],
      "Redes Sem Fio": ["Wi-Fi", "Bluetooth", "Criptografia de rede", "SSID"],
    },
    "Banco de Dados": {
      "Conceitos Básicos": [
        "Dado",
        "Informação",
        "Tabela",
        "Registro",
        "Campo",
        "Chave primária",
        "Chave estrangeira",
      ],
      SQL: ["SELECT", "INSERT", "UPDATE", "DELETE", "JOIN", "Filtros"],
      Modelagem: [
        "Modelo conceitual",
        "Modelo lógico",
        "Relacionamentos",
        "Normalização",
      ],
    },
    "Segurança da Informação": {
      Princípios: [
        "Confidencialidade",
        "Integridade",
        "Disponibilidade",
        "Autenticidade",
        "Não repúdio",
      ],
      "Ameaças Digitais": [
        "Malware",
        "Vírus",
        "Ransomware",
        "Phishing",
        "Engenharia social",
        "Ataque de força bruta",
      ],
      Proteção: [
        "Antivírus",
        "Backup",
        "Senhas fortes",
        "Autenticação multifator",
        "Criptografia",
        "Atualizações de segurança",
      ],
    },
    "IA e Transformação Digital": {
      "Inteligência Artificial": [
        "Conceitos básicos de IA",
        "Aprendizado de máquina",
        "IA generativa",
        "Automação",
        "Ética em IA",
      ],
      "Transformação Digital": [
        "Digitalização de processos",
        "Serviços digitais",
        "Governo digital",
        "Assinatura digital",
        "Processo eletrônico",
      ],
    },
  },
  Matemática: {
    Aritmética: {
      "Operações Fundamentais": [
        "Adição",
        "Subtração",
        "Multiplicação",
        "Divisão",
        "Potenciação",
        "Radiciação",
      ],
      "Razão e Proporção": [
        "Razão",
        "Proporção",
        "Regra de três simples",
        "Regra de três composta",
        "Porcentagem",
      ],
      "Múltiplos e Divisores": [
        "Divisibilidade",
        "MMC",
        "MDC",
        "Números primos",
      ],
    },
    Álgebra: {
      Equações: [
        "Equação do primeiro grau",
        "Equação do segundo grau",
        "Sistemas lineares",
      ],
      Funções: ["Função afim", "Função quadrática", "Gráficos"],
    },
    Geometria: {
      "Geometria Plana": [
        "Ângulos",
        "Triângulos",
        "Quadriláteros",
        "Circunferência",
        "Áreas",
        "Perímetros",
      ],
      "Geometria Espacial": [
        "Prismas",
        "Cilindros",
        "Cones",
        "Esferas",
        "Volumes",
      ],
    },
  },
  Atualidades: {
    "Brasil Contemporâneo": {
      "Política e Sociedade": [
        "Cidadania",
        "Democracia",
        "Políticas públicas",
        "Desigualdade social",
        "Violência urbana",
      ],
      Economia: [
        "Inflação",
        "Emprego e renda",
        "Desenvolvimento regional",
        "Setor público",
      ],
    },
    "Mundo Contemporâneo": {
      "Relações Internacionais": [
        "Globalização",
        "Conflitos internacionais",
        "Organismos internacionais",
        "Direitos humanos no cenário internacional",
      ],
      "Meio Ambiente": [
        "Mudanças climáticas",
        "Sustentabilidade",
        "Crise hídrica",
        "Desastres ambientais",
      ],
    },
  },
  "História do Ceará": {
    "Formação Histórica": {
      Colonização: [
        "Ocupação do território",
        "Capitanias",
        "Economia colonial",
        "Populações indígenas",
      ],
      "Império e República": [
        "Abolicionismo no Ceará",
        "Movimentos políticos",
        "Coronelismo",
        "Modernização urbana",
      ],
    },
    "Cultura Cearense": {
      "Identidade Cultural": [
        "Literatura de cordel",
        "Artesanato",
        "Religiosidade popular",
        "Festas populares",
      ],
      "Personalidades Históricas": [
        "Dragão do Mar",
        "Padre Cícero",
        "Rachel de Queiroz",
      ],
    },
  },
  "Geografia do Ceará": {
    "Aspectos Físicos": {
      "Clima e Relevo": ["Semiárido", "Sertões", "Serras úmidas", "Litoral"],
      Hidrografia: [
        "Bacias hidrográficas",
        "Açudes",
        "Transposição",
        "Recursos hídricos",
      ],
    },
    "Aspectos Humanos e Econômicos": {
      População: [
        "Distribuição populacional",
        "Urbanização",
        "Migração",
        "Região Metropolitana de Fortaleza",
      ],
      Economia: ["Indústria", "Turismo", "Agropecuária", "Comércio e serviços"],
    },
  },
  "Direito Constitucional": {
    "Defesa do Estado e das Instituições Democráticas": {
      "Segurança Pública": [
        "Órgãos de segurança pública",
        "Polícias militares",
        "Corpos de bombeiros militares",
        "Polícias civis",
        "Polícia penal",
        "Guardas municipais",
      ],
      "Forças Armadas": [
        "Marinha",
        "Exército",
        "Aeronáutica",
        "Hierarquia e disciplina",
        "Garantia da lei e da ordem",
      ],
    },
    "Controle de Constitucionalidade": {
      "Controle Difuso": [
        "Caso concreto",
        "Reserva de plenário",
        "Efeitos da decisão",
      ],
      "Controle Concentrado": ["ADI", "ADC", "ADO", "ADPF", "Legitimados"],
    },
  },
  "Direitos Humanos": {
    "Sistema Internacional de Proteção": {
      "Sistema Global": [
        "Declaração Universal dos Direitos Humanos",
        "Pactos internacionais",
        "ONU",
        "Tratados internacionais",
      ],
      "Sistema Interamericano": [
        "Convenção Americana de Direitos Humanos",
        "Comissão Interamericana de Direitos Humanos",
        "Corte Interamericana de Direitos Humanos",
      ],
    },
    "Grupos Vulneráveis": {
      "Proteção Especial": [
        "Crianças e adolescentes",
        "Mulheres",
        "Pessoas idosas",
        "Pessoas com deficiência",
        "População LGBTQIA+",
        "População em situação de rua",
        "Povos indígenas",
        "Comunidades quilombolas",
      ],
      "Igualdade Racial": [
        "Racismo",
        "Racismo institucional",
        "Discriminação racial",
        "Ações afirmativas",
      ],
    },
    "Uso da Força e Atividade Policial": {
      "Parâmetros de Atuação": [
        "Legalidade",
        "Necessidade",
        "Proporcionalidade",
        "Prestação de contas",
        "Proteção da vida",
      ],
    },
  },
  "Direito Administrativo": {
    "Licitações e Contratos": {
      Licitações: [
        "Princípios da licitação",
        "Modalidades",
        "Pregão",
        "Concorrência",
        "Dispensa",
        "Inexigibilidade",
        "Critérios de julgamento",
        "Fases da licitação",
      ],
      "Contratos Administrativos": [
        "Cláusulas exorbitantes",
        "Alteração contratual",
        "Fiscalização",
        "Execução",
        "Inexecução",
        "Sanções",
        "Extinção do contrato",
      ],
      "Lei 14.133/2021": [
        "Agentes de contratação",
        "Plano de contratações anual",
        "Portal Nacional de Contratações Públicas",
        "Matriz de riscos",
        "Contratação direta",
      ],
    },
    "Processo Administrativo": {
      "Lei 9.784/1999": [
        "Princípios do processo administrativo",
        "Direitos dos administrados",
        "Deveres dos administrados",
        "Competência",
        "Impedimento",
        "Suspeição",
      ],
      "Atos Processuais": [
        "Instauração",
        "Instrução",
        "Decisão",
        "Recurso administrativo",
        "Revisão",
        "Anulação",
      ],
    },
    "Responsabilidade Civil do Estado": {
      "Responsabilidade Extracontratual": [
        "Teoria do risco administrativo",
        "Responsabilidade objetiva",
        "Responsabilidade subjetiva",
        "Dano",
        "Nexo causal",
        "Excludentes de responsabilidade",
      ],
      "Responsabilidade por Omissão": [
        "Omissão específica",
        "Omissão genérica",
        "Culpa do serviço",
        "Dever de indenizar",
      ],
    },
    "Improbidade Administrativa": {
      "Lei de Improbidade Administrativa": [
        "Sujeitos ativo e passivo",
        "Dolo",
        "Enriquecimento ilícito",
        "Dano ao erário",
        "Violação a princípios",
        "Sanções",
        "Acordo de não persecução cível",
      ],
    },
    "Agentes Públicos": {
      "Regime Jurídico": [
        "Cargo público",
        "Emprego público",
        "Função pública",
        "Provimento",
        "Vacância",
        "Remuneração",
        "Acumulação de cargos",
      ],
      "Responsabilidade do Agente Público": [
        "Responsabilidade civil",
        "Responsabilidade penal",
        "Responsabilidade administrativa",
        "Processo administrativo disciplinar",
        "Sindicância",
      ],
    },
  },
  "Administração Pública": {
    "Organização Administrativa": {
      "Administração Direta e Indireta": [
        "Órgãos públicos",
        "Autarquias",
        "Fundações públicas",
        "Empresas públicas",
        "Sociedades de economia mista",
      ],
      "Modelos de Gestão": [
        "Gestão burocrática",
        "Gestão gerencial",
        "Governança pública",
        "Gestão por resultados",
      ],
    },
    "Gestão de Pessoas": {
      "Comportamento Organizacional": [
        "Motivação",
        "Liderança",
        "Comunicação",
        "Trabalho em equipe",
        "Clima organizacional",
      ],
    },
    "Planejamento e Controle": {
      "Planejamento Estratégico": [
        "Missão",
        "Visão",
        "Valores",
        "Objetivos",
        "Indicadores",
      ],
      "Controle Administrativo": [
        "Controle interno",
        "Controle externo",
        "Transparência",
        "Accountability",
      ],
    },
  },
  "Ética no Serviço Público": {
    "Fundamentos de Ética": {
      "Ética e Moral": [
        "Conceitos",
        "Valores",
        "Princípios",
        "Conduta profissional",
      ],
      "Ética na Administração Pública": [
        "Probidade",
        "Decoro",
        "Urbanidade",
        "Eficiência",
        "Interesse público",
      ],
    },
    "Integridade Pública": {
      "Prevenção a Desvios": [
        "Conflito de interesses",
        "Nepotismo",
        "Assédio moral",
        "Assédio sexual",
        "Canal de denúncia",
      ],
    },
  },
  "Direito Penal Militar": {
    "Parte Geral": {
      "Aplicação da Lei Penal Militar": [
        "Crime militar",
        "Tempo do crime",
        "Lugar do crime",
        "Territorialidade",
        "Extraterritorialidade",
      ],
      "Teoria do Crime Militar": [
        "Tipicidade",
        "Ilicitude",
        "Culpabilidade",
        "Dolo",
        "Culpa",
        "Erro",
      ],
      Penas: [
        "Pena de morte",
        "Reclusão",
        "Detenção",
        "Impedimento",
        "Suspensão do exercício do posto",
        "Reforma",
      ],
    },
    "Parte Especial": {
      "Crimes contra a Autoridade ou Disciplina Militar": [
        "Motim",
        "Revolta",
        "Aliciação para motim",
        "Violência contra superior",
        "Desrespeito a superior",
        "Recusa de obediência",
      ],
      "Crimes contra o Serviço Militar e o Dever Militar": [
        "Deserção",
        "Abandono de posto",
        "Descumprimento de missão",
        "Dormir em serviço",
      ],
      "Crimes contra a Administração Militar": [
        "Peculato",
        "Concussão",
        "Corrupção passiva",
        "Prevaricação",
        "Violação de sigilo funcional",
      ],
    },
  },
  "Processo Penal Militar": {
    "Inquérito Policial Militar": {
      IPM: [
        "Finalidade",
        "Instauração",
        "Encarregado",
        "Prazos",
        "Relatório",
        "Arquivamento",
      ],
      "Polícia Judiciária Militar": [
        "Autoridades",
        "Competência",
        "Atribuições",
      ],
    },
    "Ação Penal Militar": {
      Processo: [
        "Denúncia",
        "Recebimento",
        "Citação",
        "Interrogatório",
        "Instrução",
        "Sentença",
      ],
      Competência: [
        "Justiça Militar da União",
        "Justiça Militar Estadual",
        "Conselho de Justiça",
        "Juiz de Direito do Juízo Militar",
      ],
    },
    "Prisões e Medidas Cautelares": {
      "Restrição de Liberdade": [
        "Prisão em flagrante",
        "Prisão preventiva",
        "Menagem",
        "Liberdade provisória",
      ],
    },
  },
  "Legislação Institucional": {
    "Estatuto dos Militares Estaduais": {
      "Regime Jurídico": [
        "Ingresso",
        "Hierarquia",
        "Disciplina",
        "Direitos",
        "Deveres",
        "Prerrogativas",
      ],
      "Responsabilidade Disciplinar": [
        "Transgressões disciplinares",
        "Sanções disciplinares",
        "Processo administrativo disciplinar",
        "Sindicância",
      ],
    },
    "Organização da Polícia Militar": {
      "Estrutura Institucional": [
        "Comando",
        "Unidades operacionais",
        "Unidades administrativas",
        "Policiamento ostensivo",
        "Preservação da ordem pública",
      ],
    },
  },
  "Segurança Pública": {
    "Sistema de Segurança Pública": {
      SUSP: [
        "Princípios",
        "Diretrizes",
        "Integração operacional",
        "Dados e informações",
      ],
      Policiamento: [
        "Policiamento ostensivo",
        "Policiamento preventivo",
        "Policiamento comunitário",
        "Patrulhamento",
        "Abordagem policial",
      ],
    },
    "Uso Diferenciado da Força": {
      "Técnica e Legalidade": [
        "Níveis de força",
        "Verbalização",
        "Controle físico",
        "Instrumentos de menor potencial ofensivo",
        "Arma de fogo",
      ],
    },
    "Inteligência e Informação": {
      "Atividade de Inteligência": [
        "Produção de conhecimento",
        "Contrainteligência",
        "Fontes de informação",
        "Análise criminal",
      ],
    },
    "Sistema Prisional": {
      "Administração Prisional": [
        "Estabelecimentos penais",
        "Custódia",
        "Classificação de presos",
        "Disciplina prisional",
        "Assistência ao preso",
      ],
      "Execução Penal": [
        "Regimes de cumprimento de pena",
        "Progressão de regime",
        "Regressão de regime",
        "Faltas disciplinares",
        "Remição",
      ],
      "Polícia Penal": [
        "Segurança interna",
        "Escolta",
        "Muralha",
        "Revista",
        "Monitoração eletrônica",
      ],
    },
    "Inteligência Policial": {
      "Produção de Conhecimento": [
        "Dado",
        "Informe",
        "Informação",
        "Conhecimento",
        "Ciclo de inteligência",
        "Relatório de inteligência",
      ],
      Contrainteligência: [
        "Proteção de dados sensíveis",
        "Segurança orgânica",
        "Vazamento de informação",
        "Ameaças internas",
      ],
      "Análise Criminal": [
        "Mapeamento criminal",
        "Padrões criminais",
        "Georreferenciamento",
        "Indicadores criminais",
      ],
    },
    "Preservação de Local de Crime": {
      "Primeiro Interventor": [
        "Isolamento do local",
        "Preservação de vestígios",
        "Registro inicial",
        "Controle de acesso",
        "Comunicação à perícia",
      ],
      Vestígios: [
        "Identificação",
        "Proteção",
        "Coleta",
        "Acondicionamento",
        "Documentação",
      ],
    },
    "Cadeia de Custódia": {
      "Etapas da Cadeia de Custódia": [
        "Reconhecimento",
        "Isolamento",
        "Fixação",
        "Coleta",
        "Acondicionamento",
        "Transporte",
        "Recebimento",
        "Processamento",
        "Armazenamento",
        "Descarte",
      ],
      Rastreabilidade: [
        "Lacres",
        "Registro de custódia",
        "Integridade da prova",
        "Responsáveis pela custódia",
      ],
    },
    "Polícia Comunitária": {
      "Filosofia de Polícia Comunitária": [
        "Proximidade",
        "Prevenção",
        "Parceria com a comunidade",
        "Resolução de problemas",
        "Confiança institucional",
      ],
      "Estratégias Comunitárias": [
        "Conselhos comunitários",
        "Patrulhamento orientado",
        "Mediação de conflitos",
        "Diagnóstico local",
      ],
    },
    "Gestão Integrada de Segurança Pública": {
      "Integração Operacional": [
        "Atuação integrada",
        "Compartilhamento de informações",
        "Centros integrados de comando",
        "Operações conjuntas",
      ],
      "Políticas de Segurança": [
        "Planejamento estratégico",
        "Metas e indicadores",
        "Prevenção social da violência",
        "Avaliação de resultados",
      ],
    },
  },
  "Legislação Penal Especial": {
    "Violência Doméstica e Familiar": {
      "Lei Maria da Penha": [
        "Formas de violência",
        "Medidas protetivas",
        "Atendimento pela autoridade policial",
        "Competência",
      ],
    },
    "Criança e Adolescente": {
      "Estatuto da Criança e do Adolescente": [
        "Direitos fundamentais",
        "Ato infracional",
        "Medidas socioeducativas",
        "Crimes e infrações administrativas",
      ],
    },
    Drogas: {
      "Lei de Drogas": [
        "Porte para consumo",
        "Tráfico",
        "Associação para o tráfico",
        "Procedimento penal",
      ],
    },
    "Abuso de Autoridade": {
      "Lei de Abuso de Autoridade": [
        "Sujeitos do crime",
        "Finalidade específica",
        "Crimes em espécie",
        "Efeitos da condenação",
      ],
    },
    "Crimes Hediondos": {
      "Lei dos Crimes Hediondos": [
        "Rol legal",
        "Equiparados",
        "Progressão de regime",
        "Fiança e graça",
      ],
    },
  },
  Arquivologia: {
    "Gestão de Documentos": {
      "Conceitos Arquivísticos": [
        "Arquivo",
        "Documento",
        "Informação",
        "Suporte documental",
        "Fundo documental",
        "Princípio da proveniência",
        "Princípio da organicidade",
      ],
      "Ciclo de Vida dos Documentos": [
        "Arquivo corrente",
        "Arquivo intermediário",
        "Arquivo permanente",
        "Teoria das três idades",
      ],
      "Classificação e Ordenação": [
        "Plano de classificação",
        "Código de classificação",
        "Métodos de arquivamento",
        "Ordenação alfabética",
        "Ordenação numérica",
        "Ordenação cronológica",
      ],
    },
    "Avaliação e Preservação": {
      "Tabela de Temporalidade": [
        "Prazo de guarda",
        "Destinação final",
        "Eliminação documental",
        "Recolhimento",
      ],
      "Conservação de Documentos": [
        "Preservação",
        "Restauração",
        "Acondicionamento",
        "Digitalização",
        "Microfilmagem",
      ],
      Protocolo: [
        "Recebimento",
        "Registro",
        "Autuação",
        "Tramitação",
        "Expedição",
      ],
    },
  },
  Estatística: {
    "Estatística Descritiva": {
      "Medidas de Posição": [
        "Média aritmética",
        "Média ponderada",
        "Mediana",
        "Moda",
        "Quartis",
        "Percentis",
      ],
      "Medidas de Dispersão": [
        "Amplitude",
        "Variância",
        "Desvio padrão",
        "Coeficiente de variação",
      ],
      "Representação de Dados": [
        "Tabelas",
        "Gráficos",
        "Distribuição de frequências",
        "Histograma",
      ],
    },
    Probabilidade: {
      "Conceitos Básicos": [
        "Experimento aleatório",
        "Espaço amostral",
        "Evento",
        "Probabilidade condicional",
        "Eventos independentes",
      ],
      Distribuições: [
        "Distribuição binomial",
        "Distribuição normal",
        "Distribuição de Poisson",
      ],
    },
  },
  "Contabilidade Pública": {
    "Fundamentos de Contabilidade Pública": {
      "Patrimônio Público": [
        "Ativo",
        "Passivo",
        "Patrimônio líquido",
        "Variações patrimoniais",
      ],
      "Regimes Contábeis": [
        "Regime orçamentário",
        "Regime patrimonial",
        "Receita pública",
        "Despesa pública",
      ],
      "Plano de Contas Aplicado ao Setor Público": [
        "Natureza da informação contábil",
        "Contas patrimoniais",
        "Contas orçamentárias",
        "Contas de controle",
      ],
    },
    "Demonstrações Contábeis": {
      "Demonstrações Aplicadas ao Setor Público": [
        "Balanço orçamentário",
        "Balanço financeiro",
        "Balanço patrimonial",
        "Demonstração das variações patrimoniais",
        "Demonstração dos fluxos de caixa",
      ],
    },
  },
  "Administração Financeira e Orçamentária": {
    "Orçamento Público": {
      "Instrumentos de Planejamento": [
        "Plano Plurianual",
        "Lei de Diretrizes Orçamentárias",
        "Lei Orçamentária Anual",
        "Créditos adicionais",
      ],
      "Princípios Orçamentários": [
        "Legalidade",
        "Anualidade",
        "Universalidade",
        "Unidade",
        "Exclusividade",
        "Publicidade",
        "Equilíbrio",
      ],
      "Ciclo Orçamentário": [
        "Elaboração",
        "Discussão",
        "Aprovação",
        "Execução",
        "Controle",
        "Avaliação",
      ],
    },
    "Receita e Despesa Pública": {
      "Receita Pública": [
        "Receitas correntes",
        "Receitas de capital",
        "Estágios da receita",
        "Classificação da receita",
      ],
      "Despesa Pública": [
        "Despesas correntes",
        "Despesas de capital",
        "Empenho",
        "Liquidação",
        "Pagamento",
        "Restos a pagar",
      ],
    },
    "Responsabilidade Fiscal": {
      "Lei de Responsabilidade Fiscal": [
        "Metas fiscais",
        "Riscos fiscais",
        "Limites de despesa com pessoal",
        "Dívida pública",
        "Transparência fiscal",
      ],
    },
  },
  "Direito Civil": {
    "Parte Geral": {
      "Pessoas Naturais": [
        "Personalidade",
        "Capacidade",
        "Incapacidade",
        "Domicílio",
        "Direitos da personalidade",
      ],
      "Pessoas Jurídicas": [
        "Conceito",
        "Classificação",
        "Associações",
        "Fundações",
        "Responsabilidade",
      ],
      Bens: [
        "Bens móveis",
        "Bens imóveis",
        "Bens fungíveis",
        "Bens consumíveis",
        "Bens públicos",
      ],
      "Fatos Jurídicos": [
        "Negócio jurídico",
        "Ato jurídico lícito",
        "Ato ilícito",
        "Prescrição",
        "Decadência",
      ],
    },
    "Obrigações e Responsabilidade Civil": {
      Obrigações: [
        "Obrigação de dar",
        "Obrigação de fazer",
        "Obrigação de não fazer",
        "Adimplemento",
        "Inadimplemento",
      ],
      "Responsabilidade Civil": [
        "Conduta",
        "Dano",
        "Nexo causal",
        "Responsabilidade objetiva",
        "Responsabilidade subjetiva",
      ],
    },
  },
  "Direito Processual Civil": {
    "Teoria Geral do Processo": {
      "Jurisdição e Ação": [
        "Jurisdição",
        "Competência",
        "Ação",
        "Condições da ação",
        "Pressupostos processuais",
      ],
      "Princípios Processuais": [
        "Contraditório",
        "Ampla defesa",
        "Devido processo legal",
        "Juiz natural",
        "Duração razoável do processo",
      ],
    },
    "Procedimento Comum": {
      "Atos Processuais": [
        "Petição inicial",
        "Citação",
        "Contestação",
        "Provas",
        "Sentença",
      ],
      Recursos: [
        "Apelação",
        "Agravo de instrumento",
        "Embargos de declaração",
        "Recurso especial",
        "Recurso extraordinário",
      ],
    },
  },
  "Direito Eleitoral": {
    "Organização da Justiça Eleitoral": {
      "Órgãos da Justiça Eleitoral": [
        "Tribunal Superior Eleitoral",
        "Tribunais Regionais Eleitorais",
        "Juízes eleitorais",
        "Juntas eleitorais",
      ],
      "Competência Eleitoral": [
        "Competência administrativa",
        "Competência jurisdicional",
        "Poder de polícia",
      ],
    },
    "Eleições e Partidos": {
      "Direitos Políticos": [
        "Alistamento eleitoral",
        "Elegibilidade",
        "Inelegibilidade",
        "Filiação partidária",
      ],
      "Processo Eleitoral": [
        "Convenções partidárias",
        "Registro de candidatura",
        "Propaganda eleitoral",
        "Votação",
        "Apuração",
        "Diplomação",
      ],
      "Crimes Eleitorais": [
        "Corrupção eleitoral",
        "Boca de urna",
        "Falsidade eleitoral",
        "Coação eleitoral",
      ],
    },
  },
  "Direito Ambiental": {
    "Princípios e Política Ambiental": {
      "Princípios Ambientais": [
        "Prevenção",
        "Precaução",
        "Poluidor-pagador",
        "Usuário-pagador",
        "Desenvolvimento sustentável",
      ],
      "Política Nacional do Meio Ambiente": [
        "Objetivos",
        "Instrumentos",
        "SISNAMA",
        "Licenciamento ambiental",
        "Estudo de impacto ambiental",
      ],
    },
    "Responsabilidade Ambiental": {
      "Responsabilidade por Dano Ambiental": [
        "Responsabilidade civil",
        "Responsabilidade administrativa",
        "Responsabilidade penal",
        "Reparação integral",
      ],
      "Crimes Ambientais": [
        "Crimes contra a fauna",
        "Crimes contra a flora",
        "Poluição",
        "Infrações administrativas ambientais",
      ],
    },
  },
  "Direito Tributário": {
    "Sistema Tributário Nacional": {
      Tributo: [
        "Conceito",
        "Impostos",
        "Taxas",
        "Contribuição de melhoria",
        "Empréstimos compulsórios",
        "Contribuições especiais",
      ],
      "Competência Tributária": [
        "Competência da União",
        "Competência dos Estados",
        "Competência dos Municípios",
        "Competência do Distrito Federal",
        "Limitações ao poder de tributar",
      ],
      "Obrigação Tributária": [
        "Fato gerador",
        "Sujeito ativo",
        "Sujeito passivo",
        "Responsabilidade tributária",
        "Crédito tributário",
      ],
    },
    "Administração Tributária": {
      "Crédito Tributário": [
        "Lançamento",
        "Suspensão",
        "Extinção",
        "Exclusão",
        "Garantias e privilégios",
      ],
    },
  },
  "Direito Previdenciário": {
    "Seguridade Social": {
      "Princípios da Seguridade Social": [
        "Universalidade",
        "Uniformidade",
        "Seletividade",
        "Irredutibilidade",
        "Equidade no custeio",
        "Diversidade da base de financiamento",
      ],
      "Regime Geral de Previdência Social": [
        "Segurados obrigatórios",
        "Segurados facultativos",
        "Dependentes",
        "Filiação",
        "Inscrição",
        "Carência",
      ],
    },
    "Benefícios Previdenciários": {
      "Benefícios do RGPS": [
        "Aposentadoria programada",
        "Aposentadoria por incapacidade permanente",
        "Auxílio por incapacidade temporária",
        "Salário-maternidade",
        "Pensão por morte",
        "Auxílio-reclusão",
      ],
      Custeio: [
        "Contribuição do segurado",
        "Contribuição da empresa",
        "Salário de contribuição",
        "Arrecadação",
      ],
    },
  },
  "Legislação Estadual": {
    "Normas Estaduais": {
      "Constituição Estadual": [
        "Organização do Estado",
        "Administração pública estadual",
        "Segurança pública estadual",
        "Servidores públicos estaduais",
      ],
      "Regime Jurídico Estadual": [
        "Provimento",
        "Direitos",
        "Deveres",
        "Responsabilidades",
        "Processo administrativo disciplinar",
      ],
      "Legislação Específica por UF": [
        "Estatuto dos servidores",
        "Lei orgânica da carreira",
        "Código de ética",
        "Regulamento disciplinar",
      ],
    },
  },
  "Legislação Municipal": {
    "Normas Municipais": {
      "Lei Orgânica Municipal": [
        "Organização do Município",
        "Competências municipais",
        "Administração pública municipal",
        "Segurança urbana municipal",
      ],
      "Guarda Municipal": [
        "Estatuto Geral das Guardas Municipais",
        "Competências",
        "Poder de polícia administrativa",
        "Patrulhamento preventivo",
        "Uso progressivo da força",
      ],
      "Regime Jurídico Municipal": [
        "Ingresso",
        "Estágio probatório",
        "Direitos",
        "Deveres",
        "Processo disciplinar",
      ],
    },
  },
  "Legislação da Polícia Civil": {
    "Organização da Polícia Civil": {
      "Estrutura e Competências": [
        "Função de polícia judiciária",
        "Apuração de infrações penais",
        "Delegacia de polícia",
        "Delegado de polícia",
        "Agentes e escrivães",
      ],
      "Inquérito Policial": [
        "Instauração",
        "Indiciamento",
        "Diligências",
        "Relatório",
        "Arquivamento",
      ],
      "Estatuto da Polícia Civil": [
        "Ingresso",
        "Carreira",
        "Direitos",
        "Deveres",
        "Regime disciplinar",
      ],
    },
  },
  "Legislação da Polícia Penal": {
    "Execução Penal e Polícia Penal": {
      "Lei de Execução Penal": [
        "Finalidade da execução penal",
        "Assistência ao preso",
        "Órgãos da execução penal",
        "Estabelecimentos penais",
        "Faltas disciplinares",
      ],
      "Polícia Penal": [
        "Competências",
        "Custódia de presos",
        "Segurança prisional",
        "Escolta",
        "Monitoração eletrônica",
      ],
      "Sistema Penitenciário": [
        "Regimes de cumprimento de pena",
        "Progressão de regime",
        "Regressão de regime",
        "Remição",
        "Livramento condicional",
      ],
    },
  },
  "Legislação da Polícia Federal": {
    "Organização da Polícia Federal": {
      "Competências Constitucionais": [
        "Polícia judiciária da União",
        "Infrações contra bens da União",
        "Tráfico ilícito de entorpecentes",
        "Contrabando e descaminho",
        "Polícia marítima",
        "Polícia aeroportuária",
        "Polícia de fronteiras",
      ],
      "Investigação Federal": [
        "Inquérito policial federal",
        "Cooperação internacional",
        "Crimes cibernéticos",
        "Lavagem de dinheiro",
        "Organizações criminosas",
      ],
    },
  },
  "Legislação da Polícia Rodoviária Federal": {
    "Organização da PRF": {
      "Competências da PRF": [
        "Patrulhamento ostensivo das rodovias federais",
        "Fiscalização de trânsito",
        "Atendimento a acidentes",
        "Combate a crimes nas rodovias federais",
        "Educação para o trânsito",
      ],
      "Trânsito Rodoviário": [
        "Sistema Nacional de Trânsito",
        "Normas gerais de circulação",
        "Fiscalização",
        "Autuação",
        "Medidas administrativas",
      ],
    },
  },
}

function repairSource(content) {
  let repaired = content.replace(
    /,\s*\{\s*"Língua Portuguesa"/u,
    ',\n  "Língua Portuguesa"'
  )

  let depth = 0
  let inString = false
  let escaping = false

  for (let i = 0; i < repaired.length; i += 1) {
    const char = repaired[i]

    if (inString) {
      if (escaping) {
        escaping = false
      } else if (char === "\\") {
        escaping = true
      } else if (char === '"') {
        inString = false
      }
      continue
    }

    if (char === '"') inString = true
    if (char === "{") depth += 1
    if (char === "}") {
      depth -= 1
      if (depth < 0) return repaired.slice(0, i).trimEnd()
    }
  }

  return repaired
}

function unique(values) {
  return [...new Set(values.filter(Boolean))]
}

function mergeTaxonomy(base, extra) {
  for (const [discipline, subjects] of Object.entries(extra)) {
    base[discipline] ??= {}

    for (const [subject, topics] of Object.entries(subjects)) {
      base[discipline][subject] ??= {}

      for (const [topic, subtopics] of Object.entries(topics)) {
        base[discipline][subject][topic] = unique([
          ...(base[discipline][subject][topic] ?? []),
          ...subtopics,
        ])
      }
    }
  }

  return base
}

function sortObject(input, order = []) {
  const entries = Object.entries(input)
  const ordered = entries.sort(([left], [right]) => {
    const leftIndex = order.indexOf(left)
    const rightIndex = order.indexOf(right)

    if (leftIndex !== -1 || rightIndex !== -1) {
      if (leftIndex === -1) return 1
      if (rightIndex === -1) return -1
      return leftIndex - rightIndex
    }

    return left.localeCompare(right, "pt-BR")
  })

  return Object.fromEntries(
    ordered.map(([key, value]) => {
      if (Array.isArray(value))
        return [key, unique(value).sort((a, b) => a.localeCompare(b, "pt-BR"))]
      if (value && typeof value === "object") return [key, sortObject(value)]
      return [key, value]
    })
  )
}

function summarize(taxonomy) {
  const byDiscipline = []
  let subjectCount = 0
  let topicCount = 0
  let subtopicCount = 0

  for (const [discipline, subjects] of Object.entries(taxonomy)) {
    const row = {
      disciplina: discipline,
      assuntos: 0,
      topicos: 0,
      subtopicos: 0,
    }

    for (const topics of Object.values(subjects)) {
      subjectCount += 1
      row.assuntos += 1

      for (const subtopics of Object.values(topics)) {
        topicCount += 1
        row.topicos += 1
        subtopicCount += subtopics.length
        row.subtopicos += subtopics.length
      }
    }

    byDiscipline.push(row)
  }

  return {
    fonte: sourcePath,
    arquivoGerado: outputPath,
    disciplinas: Object.keys(taxonomy).length,
    assuntos: subjectCount,
    topicos: topicCount,
    subtopicos: subtopicCount,
    porDisciplina: byDiscipline,
  }
}

const original = fs.readFileSync(sourcePath, "utf8")
const repaired = repairSource(original)
const baseTaxonomy = JSON.parse(repaired)
const taxonomy = sortObject(
  mergeTaxonomy(baseTaxonomy, additions),
  preferredOrder
)
const summary = summarize(taxonomy)

fs.writeFileSync(outputPath, `${JSON.stringify(taxonomy, null, 2)}\n`, "utf8")
fs.writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8")

console.log(JSON.stringify(summary, null, 2))
