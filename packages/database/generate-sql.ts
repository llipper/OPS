import * as fs from "fs";
import * as path from "path";

interface Alternative {
  id: string;
  letra: string;
  texto: string;
  isCorreta: boolean;
  explicacao: string;
  dica: string;
  referencia: string;
  ordem: number;
}

interface Question {
  id: string;
  code: string;
  subtopicoId: string;
  enunciado: string;
  textoApoio: string;
  resolucao: string;
  dificuldadeId: string; // Fácil, Média, Difícil
  alternativas: Alternative[];
}

const subtopics = {
  policiasCivis: "f5b25802-10f9-4b6b-9ac1-aadfc2bb5062",
  policiaFederal: "b34df4e6-df06-444a-b5e2-2c67db12f6ee",
  policiaRodoviariaFederal: "c7b41b9e-de29-4d8e-be3c-1a89bf26ef6b",
  policiasMilitares: "a4df62e8-c502-4fd3-be72-df7a6b8294ea",
  guardasMunicipais: "e3ab7b2c-6821-4f9e-9d2e-ba6a4c28f6eb",
  policiasPenais: "1a6c4b28-db62-4217-a02b-2f3b92f75a6c",
};

const dificuldades = {
  facil: "edee8263-7a84-4588-876b-e92b8d397332",
  media: "8414056c-5e74-40b9-8c25-5829cce83ab7",
  dificil: "3fbb946c-7e7f-4f97-95e0-19b0fa36a387",
};

// Primeira questão original
const question1: Question = {
  id: "e632d4b9-183e-46cb-b1b7-a36c1cf5df90",
  code: "Q100001",
  subtopicoId: subtopics.policiasCivis,
  dificuldadeId: dificuldades.media,
  enunciado: "A respeito da disciplina constitucional da Segurança Pública, especificamente sobre a organização e competências das Polícias Civis (Art. 144, § 4º da CF/88), assinale a alternativa correta:",
  textoApoio: "A segurança pública, dever do Estado, direito e responsabilidade de todos, é exercida para a preservação da ordem pública e da incolumidade das pessoas e do patrimônio.",
  resolucao: "O gabarito é a Letra C. Segundo o Art. 144, § 4º da CF/88, as polícias civis, dirigidas por delegados de polícia de carreira, incumbem, ressalvada a competência da União, as funções de polícia judiciária e a apuração de infrações penais, exceto as militares.",
  alternativas: [
    {
      id: "a1bcde01-2345-6789-abcd-ef0123456789",
      letra: "A",
      texto: "As polícias civis possuem competência concorrente com a Polícia Federal para a apuração de infrações penais militares.",
      isCorreta: false,
      explicacao: "Incorreta. O texto da CF expressamente excetua as infrações penais militares da atuação das Polícias Civis.",
      dica: "Polícia Civil nunca apura crimes militares.",
      referencia: "Art. 144, § 4º da CF/88",
      ordem: 0
    },
    {
      id: "a1bcde02-2345-6789-abcd-ef0123456789",
      letra: "B",
      texto: "A direção da Polícia Civil cabe, discricionariamente, a qualquer integrante de suas carreiras de nível superior.",
      isCorreta: false,
      explicacao: "Incorreta. A direção das polícias civis é privativa de delegados de polícia de carreira.",
      dica: "Direção = Exclusivo de Delegado de Carreira.",
      referencia: "Art. 144, § 4º da CF/88",
      ordem: 1
    },
    {
      id: "a1bcde03-2345-6789-abcd-ef0123456789",
      letra: "C",
      texto: "Às polícias civis, dirigidas por delegados de polícia de carreira, incumbem as funções de polícia judiciária e a apuração de infrações penais, ressalvada a competência da União e excetuadas as infrações penais militares.",
      isCorreta: true,
      explicacao: "Correta. Alternativa que transcreve perfeitamente a literalidade e o sentido da previsão constitucional sobre a função das polícias civis dos Estados.",
      dica: "Lembre-se da ressalva da União e exceção dos crimes militares!",
      referencia: "Art. 144, § 4º da CF/88",
      ordem: 2
    },
    {
      id: "a1bcde04-2345-6789-abcd-ef0123456789",
      letra: "D",
      texto: "Compete às polícias civis a patrulha ostensiva das rodovias estaduais, visando a preservação da incolumidade patrimonial.",
      isCorreta: false,
      explicacao: "Incorreta. A função de patrulhamento ostensivo rodoviário não é atribuída à Polícia Civil, mas sim aos órgãos de trânsito ou à Polícia Militar/Polícia Rodoviária Federal conforme o âmbito da via.",
      dica: "Polícia Civil é polícia judiciária/investigativa, não ostensiva.",
      referencia: "Art. 144, § 2º e § 5º da CF/88",
      ordem: 3
    }
  ]
};

const generatedQuestions: Question[] = [];

// Gerador sistemático de 40 questões excelentes
const rawQuestionData = [
  // 1-10: POLÍCIA FEDERAL
  {
    subtopico: subtopics.policiaFederal,
    dificuldade: dificuldades.media,
    enunciado: "De acordo com o Artigo 144, § 1º, inciso I da Constituição Federal, assinale a alternativa que descreve corretamente a atribuição prioritária da Polícia Federal no que diz respeito à repressão de crimes interestaduais ou internacionais:",
    resolucao: "Gabarito: Letra A. O dispositivo constitucional prevê que compete à Polícia Federal apurar infrações penais contra a ordem política e social ou em detrimento de bens, serviços e interesses da União, assim como outras infrações cuja prática tenha repercussão interestadual ou internacional e exija repressão uniforme.",
    alts: [
      { letra: "A", texto: "Apurar infrações com repercussão interestadual ou internacional que exijam repressão uniforme, conforme dispuser a lei.", correta: true, exp: "Exatamente a dicção do art. 144, § 1º, I da CF/88.", dica: "Foco na necessidade de repressão uniforme.", ref: "Art. 144, § 1º, I da CF/88" },
      { letra: "B", texto: "Fiscalizar e reprimir exclusivamente crimes de competência da justiça estadual que os governadores solicitarem.", correta: false, exp: "Errado, a competência é federal e de repercussão uniforme.", dica: "Polícia Federal não atua sob solicitação discricionária de governador para crimes ordinários estaduais.", ref: "Art. 144, § 1º, I da CF/88" },
      { letra: "C", texto: "Apurar todo e qualquer crime ocorrido no território nacional que envolva servidores públicos estaduais.", correta: false, exp: "Incorreto. A atuação limita-se a bens, serviços e interesses da União ou repercussão interestadual/internacional.", dica: "Servidores estaduais são investigados por regra pelas polícias civis estaduais.", ref: "Art. 144, § 1º, I da CF/88" },
      { letra: "D", texto: "Patrulhar ostensivamente as divisas entre todos os Estados da Federação e as rodovias secundárias.", correta: false, exp: "Falso. O patrulhamento de rodovias é da PRF, e de divisas terrestres/fronteiras cabe à PF, mas sob o aspecto de polícia de fronteiras (não ostensiva ordinária).", dica: "Patrulhamento ostensivo rodoviário é competência da PRF.", ref: "Art. 144, § 2º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiaFederal,
    dificuldade: dificuldades.media,
    enunciado: "Acerca da exclusividade de certas atribuições da Polícia Federal fixadas no texto constitucional, assinale a opção correta:",
    resolucao: "Gabarito: Letra B. Conforme o Artigo 144, § 1º, inciso IV da CF/88, a Polícia Federal exerce, com exclusividade, as funções de polícia judiciária da União.",
    alts: [
      { letra: "A", texto: "A Polícia Federal detém exclusividade sobre a fiscalização de trânsito em vias terrestres nacionais.", correta: false, exp: "Incorreto. A fiscalização em rodovias federais é da PRF, e nas municipais dos órgãos de trânsito/Guardas.", dica: "Trânsito viário não é exclusividade da PF.", ref: "Art. 144, § 10 da CF/88" },
      { letra: "B", texto: "A Polícia Federal exerce com exclusividade as funções de polícia judiciária da União.", correta: true, exp: "Correto. O § 1º, IV, assegura a exclusividade das funções de polícia judiciária da União à Polícia Federal.", dica: "Polícia judiciária da União = PF com exclusividade.", ref: "Art. 144, § 1º, IV da CF/88" },
      { letra: "C", texto: "A Polícia Federal detém competência absoluta para investigar infrações penais militares federais.", correta: false, exp: "Errado. Crimes penais militares federais são de competência da Polícia Judiciária Militar das Forças Armadas.", dica: "Polícia militar investiga crimes militares.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "D", texto: "Cabe exclusivamente à Polícia Federal o policiamento ostensivo e de preservação da ordem pública nacional.", correta: false, exp: "Incorreto. Policiamento ostensivo cabe às Polícias Militares estaduais.", dica: "Policiamento ostensivo é função típica da PM.", ref: "Art. 144, § 5º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiaFederal,
    dificuldade: dificuldades.media,
    enunciado: "Nos termos do Art. 144, § 1º, inciso III da CF/88, compete à Polícia Federal exercer as funções de polícia marítima, aeroportuária e de fronteiras. Essa atribuição representa uma função de:",
    resolucao: "Gabarito: Letra C. A função de polícia marítima, aeroportuária e de fronteiras é de natureza híbrida, atuando tanto de forma preventiva (polícia administrativa) quanto repressiva, sendo classificada constitucionalmente como atividade de segurança nacional nas fronteiras e pontos de entrada/saída do país.",
    alts: [
      { letra: "A", texto: "Polícia civil estadual subordinada aos governadores dos Estados costeiros.", correta: false, exp: "Errado. A Polícia Federal é órgão permanente da União subordinado ao Executivo Federal.", dica: "PF é mantida pela União.", ref: "Art. 144, § 1º da CF/88" },
      { letra: "B", texto: "Polícia militarizada voltada exclusivamente ao patrulhamento ostensivo das praias nacionais.", correta: false, exp: "Incorreto. A PF tem natureza puramente civil e estruturada em carreira.", dica: "A PF tem natureza estritamente civil.", ref: "Art. 144, § 1º da CF/88" },
      { letra: "C", texto: "Polícia de fronteiras e controle de portos e aeroportos federais.", correta: true, exp: "Correto. Representa a atuação preventiva e repressiva da União no controle de fluxo migratório, aduaneiro e de segurança nos terminais federais.", dica: "Segurança de fronteiras, mares e aeroportos.", ref: "Art. 144, § 1º, III da CF/88" },
      { letra: "D", texto: "Guarda privada das instalações e infraestruturas aeroportuárias privatizadas.", correta: false, exp: "Errado. Trata-se de órgão oficial de segurança pública do Estado, indelegável a particulares.", dica: "Poder de polícia é estatal e indelegável.", ref: "Art. 144, § 1º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiaFederal,
    dificuldade: dificuldades.media,
    enunciado: "Sobre a natureza jurídica da Polícia Federal e sua organização institucional, a Constituição Federal de 1988 estabelece que o órgão é:",
    resolucao: "Gabarito: Letra B. Conforme o Artigo 144, § 1º, a Polícia Federal é instituída por lei como órgão permanente, estruturado em carreira, mantido e organizado pela União.",
    alts: [
      { letra: "A", texto: "Uma corporação militarizada da reserva das Forças Armadas.", correta: false, exp: "Incorreto. As forças auxiliares e reserva do Exército são as Polícias Militares e Corpos de Bombeiros, não a PF.", dica: "Apenas PM e BM são forças auxiliares.", ref: "Art. 144, § 6º da CF/88" },
      { letra: "B", texto: "Órgão permanente, estruturado em carreira, organizado e mantido pela União.", correta: true, exp: "Correto. Essa é a exata definição constitucional da Polícia Federal.", dica: "Permanente, carreira e mantido pela União.", ref: "Art. 144, § 1º da CF/88" },
      { letra: "C", texto: "Órgão temporário sob comando exclusivo do Ministério da Defesa.", correta: false, exp: "Incorreto. É órgão permanente e atualmente integra o Ministério da Justiça e Segurança Pública.", dica: "Segurança pública não é Defesa Nacional (Forças Armadas).", ref: "Art. 144, § 1º da CF/88" },
      { letra: "D", texto: "Uma autarquia pública especial de direito privado com autonomia orçamentária plena.", correta: false, exp: "Incorreto. A PF é órgão da administração pública federal direta.", dica: "Não possui personalidade jurídica própria de autarquia.", ref: "Art. 144, § 1º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiaFederal,
    dificuldade: dificuldades.facil,
    enunciado: "A prevenção e a repressão ao tráfico ilícito de entorpecentes e drogas afins, de acordo com o Art. 144, § 1º, inciso II da CF/88, são atribuições da:",
    resolucao: "Gabarito: Letra C. A Constituição incumbe a Polícia Federal de prevenir e reprimir o tráfico ilícito de entorpecentes e drogas afins, o contrabando e o descaminho, sem prejuízo da ação fazendária e de outros órgãos públicos nas suas respectivas áreas de competência.",
    alts: [
      { letra: "A", texto: "Polícia Militar do Distrito Federal exclusivamente.", correta: false, exp: "Incorreto. Trata-se de competência primária da Polícia Federal.", dica: "Tráfico internacional e interestadual é papel da PF.", ref: "Art. 144, § 1º, II da CF/88" },
      { letra: "B", texto: "Agência Nacional de Vigilância Sanitária com exclusividade penal.", correta: false, exp: "Incorreto. A ANVISA possui poder de polícia sanitária e administrativa, não penal.", dica: "ANVISA não apura infrações penais.", ref: "Art. 144, § 1º, II da CF/88" },
      { letra: "C", texto: "Polícia Federal, sem prejuízo da ação fazendária e de outros órgãos públicos.", correta: true, exp: "Correto. O dispositivo constitucional assegura a competência da PF sem excluir a atuação de outros órgãos (como Receita Federal).", dica: "Atuação sem prejuízo de outros órgãos fazendários.", ref: "Art. 144, § 1º, II da CF/88" },
      { letra: "D", texto: "Polícia Ferroviária Federal nas fronteiras secas do país.", correta: false, exp: "Incorreto. A PFF limita-se ao âmbito das ferrovias federais.", dica: "PFF não investiga tráfico geral.", ref: "Art. 144, § 3º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiaFederal,
    dificuldade: dificuldades.dificil,
    enunciado: "Considerando a jurisprudência do STF sobre a criação de novos órgãos de segurança pública pelos Estados-membros da Federação, assinale a afirmativa correta:",
    resolucao: "Gabarito: Letra D. O rol do Art. 144 da CF/88 é de observância obrigatória e taxativo para os Estados-membros, de modo que as constituições estaduais não podem criar novos órgãos de segurança pública não previstos na Constituição Federal.",
    alts: [
      { letra: "A", texto: "Os Estados têm autonomia ampla para criar qualquer tipo de polícia civil armada sob sua discricionariedade.", correta: false, exp: "Incorreto. O STF já consolidou que o rol do art. 144 é taxativo e limita o poder constituinte derivado decorrente dos Estados.", dica: "Rol do art. 144 é taxativo.", ref: "Art. 144 da CF/88 (Súmulas e Jurisprudência do STF)" },
      { letra: "B", texto: "É perfeitamente constitucional a criação de uma 'Polícia Científica' como órgão autônomo de segurança pública não subordinado à estrutura da Polícia Civil, sem amparo no rol federal.", correta: false, exp: "Incorreto. Órgãos autônomos de segurança pública estaduais devem estrita obediência ao rol taxativo do art. 144.", dica: "A autonomia de órgãos periciais deve respeitar os limites do rol taxativo.", ref: "Art. 144 da CF/88 (Jurisprudência do STF)" },
      { letra: "C", texto: "Apenas o Senado Federal pode autorizar os Estados a criar novas polícias de trânsito estaduais armadas.", correta: false, exp: "Incorreto. A competência para legislar sobre normas gerais de segurança pública é privativa da União.", dica: "Competência legislativa de segurança é da União.", ref: "Art. 22, XXI da CF/88" },
      { letra: "D", texto: "O rol dos órgãos de segurança pública previstos no caput do Art. 144 da CF/88 é taxativo, vinculando o legislador estadual.", correta: true, exp: "Correto. Jurisprudência pacífica do STF estabelece a taxatividade do rol do art. 144 da Constituição Federal para os entes federativos.", dica: "Taxatividade do rol do Art. 144.", ref: "Art. 144 da CF/88 (Jurisprudência do STF)" }
    ]
  },
  {
    subtopico: subtopics.policiaFederal,
    dificuldade: dificuldades.media,
    enunciado: "Assinale a alternativa que indica uma competência constitucional que NÃO é atribuída à Polícia Federal pela Constituição Federal de 1988:",
    resolucao: "Gabarito: Letra C. O patrulhamento ostensivo das rodovias federais é competência expressa da Polícia Rodoviária Federal (Art. 144, § 2º) e não da Polícia Federal.",
    alts: [
      { letra: "A", texto: "Apurar infrações penais contra a ordem política e social ou em detrimento de bens da União.", correta: false, exp: "Esta é uma atribuição constitucional da PF.", dica: "Atribuição explícita do inciso I do § 1º.", ref: "Art. 144, § 1º, I da CF/88" },
      { letra: "B", texto: "Exercer as funções de polícia marítima e de fronteiras.", correta: false, exp: "Atribuição típica da Polícia Federal.", dica: "Atribuição explícita do inciso III do § 1º.", ref: "Art. 144, § 1º, III da CF/88" },
      { letra: "C", texto: "Exercer o patrulhamento ostensivo e preventivo das rodovias federais terrestres.", correta: true, exp: "Correto (como exceção). Essa competência é exclusiva da PRF conforme o § 2º do mesmo artigo.", dica: "Quem faz patrulhamento de rodovia é a PRF.", ref: "Art. 144, § 2º da CF/88" },
      { letra: "D", texto: "Prevenir e reprimir o contrabando e o descaminho.", correta: false, exp: "Atribuição expressa da Polícia Federal.", dica: "Atribuição explícita do inciso II do § 1º.", ref: "Art. 144, § 1º, II da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiaFederal,
    dificuldade: dificuldades.media,
    enunciado: "Diante de um crime de descaminho praticado por quadrilha de atuação interestadual em aeroporto internacional de passageiros, a quem caberá a apuração?",
    resolucao: "Gabarito: Letra B. Compete à Polícia Federal reprimir o contrabando e o descaminho (Art. 144, § 1º, II) e exercer as funções de polícia aeroportuária (Art. 144, § 1º, III), agindo como polícia judiciária da União.",
    alts: [
      { letra: "A", texto: "À Polícia Civil do Estado onde está localizado o aeroporto.", correta: false, exp: "Incorreto. Trata-se de matéria sob jurisdição e atribuição federal e exclusiva da PF.", dica: "Crime federal no aeroporto.", ref: "Art. 144, § 1º da CF/88" },
      { letra: "B", texto: "À Polícia Federal, em razão de sua competência aeroportuária e de repressão ao descaminho.", correta: true, exp: "Correto. Reúne a competência material (descaminho) e a geográfica/institucional (aeroportuária) da PF.", dica: "PF cuida de aeroportos e crimes federais de descaminho.", ref: "Art. 144, § 1º, II e III da CF/88" },
      { letra: "C", texto: "À Guarda Municipal, por tratar-se de patrimônio municipal sob concessão pública.", correta: false, exp: "Incorreto. Guardas municipais não possuem funções de polícia judiciária ou apuração de crimes.", dica: "Guardas não investigam crimes.", ref: "Art. 144, § 8º da CF/88" },
      { letra: "D", texto: "À Polícia Rodoviária Federal pela facilidade de tráfego de acesso terrestre ao terminal.", correta: false, exp: "Incorreto. A PRF atua no patrulhamento das rodovias, não na apuração judiciária desse tipo em aeroportos.", dica: "PRF atua em rodovias.", ref: "Art. 144, § 2º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiaFederal,
    dificuldade: dificuldades.media,
    enunciado: "O tráfico ilícito de entorpecentes e drogas afins exige repressão uniforme no Brasil. Diante disso, a Constituição outorga essa missão repressiva a:",
    resolucao: "Gabarito: Letra C. A responsabilidade primária penal de prevenção e repressão do tráfico é da Polícia Federal (Art. 144, § 1º, II), sem prejuízo de outros órgãos competentes.",
    alts: [
      { letra: "A", texto: "Um conselho nacional militar liderado pelo Exército.", correta: false, exp: "Incorreto. A competência civil e policial é da Polícia Federal.", dica: "Forças armadas não atuam como polícia ordinária.", ref: "Art. 144, § 1º da CF/88" },
      { letra: "B", texto: "Órgãos de vigilância de fronteiras terrestres subordinados à ANVISA.", correta: false, exp: "Incorreto. ANVISA não atua na esfera criminal.", dica: "ANVISA atua na esfera sanitária.", ref: "Art. 144, § 1º da CF/88" },
      { letra: "C", texto: "À Polícia Federal, devendo atuar na repressão de forma ampla.", correta: true, exp: "Correto. O tráfico exige repressão de caráter nacional e internacional, tarefa típica da PF.", dica: "Papel de repressão penal federal.", ref: "Art. 144, § 1º, II da CF/88" },
      { letra: "D", texto: "Todas as forças de trânsito dos municípios brasileiros conjuntamente.", correta: false, exp: "Incorreto. Forças de trânsito municipais não investigam ou reprimem tráfico de drogas.", dica: "Trânsito cuida de vias e sinalização.", ref: "Art. 144, § 10 da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiaFederal,
    dificuldade: dificuldades.dificil,
    enunciado: "Compete à Polícia Federal apurar infrações contra a ordem política e social ou em detrimento de bens, serviços e interesses da União. Exclui-se dessa competência investigativa federal:",
    resolucao: "Gabarito: Letra A. O STF entende que crimes praticados contra sociedades de economia mista (como o Banco do Brasil) não atraem a competência da Justiça Federal ou da Polícia Federal, ao contrário de empresas públicas federais (como a Caixa Econômica Federal).",
    alts: [
      { letra: "A", texto: "Infrações penais em detrimento de Sociedades de Economia Mista federais (ex: Banco do Brasil).", correta: true, exp: "Correto. Súmula 510 do STF e jurisprudência consolidam que bens de sociedade de economia mista não atraem competência federal (esta limita-se à União, autarquias e empresas públicas).", dica: "Sociedade de Economia Mista atrai Justiça Estadual.", ref: "Art. 109, IV da CF/88 e Súmula 510 do STF" },
      { letra: "B", texto: "Infrações penais praticadas em prejuízo de Empresas Públicas federais (ex: Correios).", correta: false, exp: "Incorreto. Bens e interesses de empresas públicas federais atraem sim competência federal e da PF.", dica: "Empresas públicas federais geram competência da PF.", ref: "Art. 109, IV da CF/88" },
      { letra: "C", texto: "Crimes cometidos contra o patrimônio de Autarquias federais (ex: INSS).", correta: false, exp: "Incorreto. Autarquias federais atraem competência federal.", dica: "Autarquias federais são bens da União.", ref: "Art. 109, IV da CF/88" },
      { letra: "D", texto: "Infrações contra a ordem política nacional.", correta: false, exp: "Incorreto. Atribuição clássica e expressa da Polícia Federal.", dica: "Inciso I do § 1º consagra esse dever.", ref: "Art. 144, § 1º, I da CF/88" }
    ]
  },

  // 11-15: POLÍCIA RODOVIÁRIA FEDERAL
  {
    subtopico: subtopics.policiaRodoviariaFederal,
    dificuldade: dificuldades.facil,
    enunciado: "De acordo com o Art. 144, § 2º da Constituição Federal de 1988, a Polícia Rodoviária Federal destina-se, na forma da lei, ao:",
    resolucao: "Gabarito: Letra B. A dicção literal do dispositivo constitucional estabelece que a PRF, órgão permanente, estruturado em carreira e mantido pela União, destina-se, na forma da lei, ao patrulhamento ostensivo das rodovias federais.",
    alts: [
      { letra: "A", texto: "Policiamento judiciário civil de caráter investigativo interestadual.", correta: false, exp: "Incorreto. A PRF exerce polícia ostensiva e administrativa de trânsito, não judiciária.", dica: "PRF não é polícia judiciária.", ref: "Art. 144, § 2º da CF/88" },
      { letra: "B", texto: "Patrulhamento ostensivo das rodovias federais.", correta: true, exp: "Correto. Esta é a atribuição constitucional direta e expressa da PRF.", dica: "Patrulhamento ostensivo + rodovias federais.", ref: "Art. 144, § 2º da CF/88" },
      { letra: "C", texto: "Controle e repressão do tráfego marítimo territorial.", correta: false, exp: "Incorreto. Polícia marítima é da PF.", dica: "Mares são de controle da PF.", ref: "Art. 144, § 1º, III da CF/88" },
      { letra: "D", texto: "Policiamento militarizado do tráfego das avenidas distritais urbanas.", correta: false, exp: "Incorreto. O patrulhamento urbano municipal ou estadual cabe à PM e agentes de trânsito locais.", dica: "Vias urbanas locais não são da PRF.", ref: "Art. 144, § 5º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiaRodoviariaFederal,
    dificuldade: dificuldades.media,
    enunciado: "Sobre a estrutura organizacional e regime de subordinação da Polícia Rodoviária Federal, assinale a opção correta à luz da Constituição Federal:",
    resolucao: "Gabarito: Letra D. A Polícia Rodoviária Federal é um órgão mantido e organizado pela União (Art. 144, § 2º), permanente e estruturado em carreira, compondo a segurança pública federal.",
    alts: [
      { letra: "A", texto: "É um órgão militarizado subordinado ao Ministério da Defesa.", correta: false, exp: "Incorreto. A PRF tem natureza civil e integra o Ministério da Justiça e Segurança Pública.", dica: "Órgão civil e de segurança pública federal.", ref: "Art. 144, § 2º da CF/88" },
      { letra: "B", texto: "Subordina-se diretamente aos governadores dos Estados cruzados por rodovias BR.", correta: false, exp: "Incorreto. Por ser órgão da União, a PRF subordina-se ao Executivo Federal.", dica: "Subordinação federal.", ref: "Art. 144, § 2º da CF/88" },
      { letra: "C", texto: "Pode ser extinta discricionariamente por ato unilateral dos municípios.", correta: false, exp: "Incorreto. Sendo órgão permanente de nível constitucional federal, sua existência é protegida.", dica: "Órgão permanente.", ref: "Art. 144, § 2º da CF/88" },
      { letra: "D", texto: "Trata-se de órgão permanente, estruturado em carreira, organizado e mantido pela União.", correta: true, exp: "Correto. O texto constitucional qualifica a PRF expressamente com esses atributos organizacionais.", dica: "Órgão de carreira mantido pela União.", ref: "Art. 144, § 2º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiaRodoviariaFederal,
    dificuldade: dificuldades.dificil,
    enunciado: "A atividade de segurança viária é descrita no Art. 144, § 10º da CF/88. Em relação a essa atividade e ao papel da Polícia Rodoviária Federal, é correto afirmar que:",
    resolucao: "Gabarito: Letra C. A segurança viária compreende a educação, engenharia e fiscalização de trânsito, que garantem ao cidadão o direito à mobilidade urbana eficiente, sendo exercida no âmbito das rodovias federais pela PRF.",
    alts: [
      { letra: "A", texto: "A segurança viária exclui as rodovias federais, que são de competência exclusiva do Ministério da Infraestrutura.", correta: false, exp: "Incorreto. A segurança viária engloba todas as vias, incluindo as federais sob atribuição da PRF.", dica: "Inclui as vias sob custódia federal.", ref: "Art. 144, § 10 da CF/88" },
      { letra: "B", texto: "A PRF não pode aplicar multas de trânsito por falta de caráter arrecadatório.", correta: false, exp: "Incorreto. A competência para autuar infrações de trânsito é inerente ao poder de polícia de fiscalização viária da PRF.", dica: "Fiscalização envolve aplicação de sanções administrativas.", ref: "Art. 144, § 2º e § 10 da CF/88" },
      { letra: "C", texto: "A segurança viária compreende a fiscalização de trânsito visando a preservação da incolumidade dos usuários das vias.", correta: true, exp: "Correto. O § 10 do art. 144 detalha os fins da segurança viária e o papel da fiscalização e engenharia de tráfego.", dica: "Garantia da segurança e mobilidade eficiente.", ref: "Art. 144, § 10 da CF/88" },
      { letra: "D", texto: "A segurança viária confere à PRF poder de polícia judiciária para julgar crimes de trânsito de forma sumária.", correta: false, exp: "Incorreto. Órgãos policiais fiscalizam e apuram, mas o julgamento de crimes é exclusivo do Poder Judiciário.", dica: "Nenhum órgão policial julga infrações penais.", ref: "Art. 5º, LIII da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiaRodoviariaFederal,
    dificuldade: dificuldades.media,
    enunciado: "Qual das opções abaixo representa um crime cuja investigação inicial no local do fato (rodovia federal BR) costuma contar com a atuação preventiva de isolamento da PRF, embora sua apuração judiciária posterior seja da PF?",
    resolucao: "Gabarito: Letra A. O contrabando ou descaminho de mercadorias em rodovias federais gera a apreensão pela PRF (polícia ostensiva rodoviária), mas a competência investigativa judiciária de lavratura do flagrante e inquérito é exclusiva da Polícia Federal.",
    alts: [
      { letra: "A", texto: "Tráfico interestadual de drogas ou contrabando interceptado em uma BR.", correta: true, exp: "Correto. A PRF atua na abordagem e prisão em flagrante em razão de seu policiamento ostensivo nas rodovias, mas encaminha o flagrante e os bens para a Polícia Federal.", dica: "Intercepção na BR ➔ Encaminhamento à PF.", ref: "Art. 144, § 1º e § 2º da CF/88" },
      { letra: "B", texto: "Crimes puramente militares ocorridos no interior de quartéis do Exército.", correta: false, exp: "Incorreto. A PRF não possui atribuição militar.", dica: "Quartéis militares federais fogem ao patrulhamento da PRF.", ref: "Art. 144, § 2º da CF/88" },
      { letra: "C", texto: "Apreensão de bens por sonegação fiscal de tributos puramente municipais.", correta: false, exp: "Incorreto. Sonegação municipal ordinária é fiscalizada pela fazenda pública municipal.", dica: "Foco no caráter federal ou de fronteiras da BR.", ref: "Art. 144, § 2º da CF/88" },
      { letra: "D", texto: "Crimes de latrocínio ocorridos em ruas internas residenciais particulares.", correta: false, exp: "Incorreto. Crimes urbanos ordinários são apurados pela Polícia Civil e prevenidos pela PM.", dica: "A PRF atua em rodovias federais.", ref: "Art. 144, § 4º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiaRodoviariaFederal,
    dificuldade: dificuldades.facil,
    enunciado: "A Polícia Rodoviária Federal difere das Polícias Militares Estaduais principalmente por ter sua competência limitada territorialmente a:",
    resolucao: "Gabarito: Letra C. A área geográfica de atuação típica da PRF, delimitada pelo Art. 144, § 2º da CF/88, compreende as rodovias federais terrestres (BRs).",
    alts: [
      { letra: "A", texto: "Todo o espaço aéreo e marítimo nacional.", correta: false, exp: "Incorreto. Essa área é fiscalizada pela Força Aérea, Marinha e Polícia Federal.", dica: "A PRF atua sobre rodas e terra.", ref: "Art. 144, § 1º, III da CF/88" },
      { letra: "B", texto: "Territórios indígenas homologados exclusivamente.", correta: false, exp: "Incorreto. A competência da PRF é viária federal.", dica: "Competência viária.", ref: "Art. 144, § 2º da CF/88" },
      { letra: "C", texto: "Rodovias federais terrestres.", correta: true, exp: "Correto. O patrulhamento limita-se constitucionalmente à malha de rodovias de domínio da União.", dica: "Rodovias da União.", ref: "Art. 144, § 2º da CF/88" },
      { letra: "D", texto: "Ferrovias e caminhos de ferro que ligam minas a portos federais.", correta: false, exp: "Incorreto. As ferrovias federais são patrulhadas pela Polícia Ferroviária Federal (PFF).", dica: "Ferrovias competem à PFF.", ref: "Art. 144, § 3º da CF/88" }
    ]
  },

  // 16-25: POLÍCIAS CIVIS
  {
    subtopico: subtopics.policiasCivis,
    dificuldade: dificuldades.media,
    enunciado: "Quem exerce, por previsão expressa do Art. 144, § 4º da CF/88, a chefia e direção superior das Polícias Civis nos Estados e no Distrito Federal?",
    resolucao: "Gabarito: Letra C. O texto constitucional prevê expressamente que as Polícias Civis são 'dirigidas por delegados de polícia de carreira'.",
    alts: [
      { letra: "A", texto: "Qualquer policial civil eleito democraticamente por maioria simples.", correta: false, exp: "Incorreto. A direção superior é privativa do cargo de Delegado de Polícia de carreira.", dica: "Exclusivo de Delegado.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "B", texto: "Oficiais superiores da Polícia Militar por indicação do Governador.", correta: false, exp: "Incorreto. A PM e a PC são instituições autônomas com chefias próprias e carreiras distintas.", dica: "Militar não dirige a Polícia Civil.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "C", texto: "Delegados de polícia de carreira.", correta: true, exp: "Correto. A CF exige que a chefia seja exercida de forma privativa por Delegados de Polícia concursados.", dica: "Cargo privativo de Delegado de Polícia de Carreira.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "D", texto: "O Secretário de Justiça, desde que seja bacharel em qualquer área.", correta: false, exp: "Incorreto. A chefia imediata operacional e técnica é do Delegado de Polícia de carreira.", dica: "A direção da PC é vinculada à carreira técnica policial.", ref: "Art. 144, § 4º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiasCivis,
    dificuldade: dificuldades.media,
    enunciado: "Assinale a alternativa que descreve a competência funcional das Polícias Civis, com base no Art. 144, § 4º da Constituição Federal de 1988:",
    resolucao: "Gabarito: Letra B. Às polícias civis incumbem, ressalvada a competência da União, as funções de polícia judiciária e a apuração de infrações penais, exceto as militares.",
    alts: [
      { letra: "A", texto: "Funções de polícia de segurança ostensiva armada e repressão imediata de motins urbanos.", correta: false, exp: "Incorreto. Essa é função típica da Polícia Militar.", dica: "Polícia ostensiva é PM.", ref: "Art. 144, § 5º da CF/88" },
      { letra: "B", texto: "Funções de polícia judiciária e a apuração de infrações penais, ressalvada a competência da União e exceto as militares.", correta: true, exp: "Correto. Alternativa que transcreve perfeitamente o texto da Constituição Federal.", dica: "Polícia Judiciária estadual + apuração de infrações ordinárias.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "C", texto: "Investigação penal absoluta de todos os crimes militares estaduais e federais.", correta: false, exp: "Incorreto. Crimes militares são expressamente excetuados da competência da PC.", dica: "Crimes militares são investigados por inquérito policial militar.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "D", texto: "Apenas controle burocrático e emissão de cédulas de identidade civil nacional.", correta: false, exp: "Incorreto. A identificação civil é apenas uma de suas funções acessórias, sendo a apuração de crimes a função principal.", dica: "Função principal é investigativa penal.", ref: "Art. 144, § 4º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiasCivis,
    dificuldade: dificuldades.dificil,
    enunciado: "À luz da jurisprudência do STF sobre a autonomia administrativa e financeira das Polícias Civis, assinale a opção correta:",
    resolucao: "Gabarito: Letra C. As Polícias Civis não gozam de autonomia financeira e administrativa plena nos moldes do Poder Judiciário ou Defensoria Pública. Elas são órgãos subordinados diretamente aos Governadores dos Estados e integram a estrutura administrativa do Poder Executivo estadual.",
    alts: [
      { letra: "A", texto: "A Polícia Civil possui autonomia orçamentária idêntica à do Poder Judiciário estadual.", correta: false, exp: "Incorreto. O Judiciário tem autonomia financeira constitucional própria, as polícias são órgãos do Executivo.", dica: "Apenas Judiciário, MP e Defensoria possuem essa autonomia plena.", ref: "Art. 99 e Art. 134, § 2º da CF/88" },
      { letra: "B", texto: "As constituições estaduais podem conceder autonomia orçamentária plena às polícias, dissociando-as do Poder Executivo.", correta: false, exp: "Incorreto. O STF já declarou inconstitucionais dispositivos estaduais que davam autonomia de Poder às polícias civis.", dica: "Polícia Civil é subordinada ao Governador.", ref: "Art. 144, § 6º da CF/88 (Jurisprudência do STF)" },
      { letra: "C", texto: "A Polícia Civil subordina-se ao Governador do Estado, integrando a estrutura do Poder Executivo.", correta: true, exp: "Correto. A subordinação aos Governadores é expressamente fixada no § 6º do art. 144 da CF/88.", dica: "As polícias civis são órgãos do Executivo Estadual.", ref: "Art. 144, § 6º da CF/88" },
      { letra: "D", texto: "A Polícia Civil subordina-se diretamente ao Ministério Público Estadual em matéria administrativa e funcional.", correta: false, exp: "Incorreto. O MP exerce o controle externo da atividade policial, mas não há relação de subordinação hierárquica.", dica: "Controle externo não é subordinação administrativa.", ref: "Art. 129, VII da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiasCivis,
    dificuldade: dificuldades.media,
    enunciado: "Um cidadão comete crime militar estadual (lesão corporal praticada por policial militar em serviço contra outro militar). A quem compete investigar tal infração?",
    resolucao: "Gabarito: Letra B. O Art. 144, § 4º exclui expressamente da Polícia Civil a apuração de infrações penais militares. A apuração de crimes militares estaduais é de competência da própria corporação militar estadual (Polícia Militar) por meio de Inquérito Policial Militar (IPM).",
    alts: [
      { letra: "A", texto: "À Polícia Civil, por tratar-se de crime comum estadual.", correta: false, exp: "Incorreto. O crime praticado por militar em serviço contra outro militar é crime militar nos termos do Código Penal Militar.", dica: "Crime militar foge à competência da PC.", ref: "Art. 144, § 4º da CF/88 e Art. 9º do CPM" },
      { letra: "B", texto: "À Polícia Militar do Estado, mediante Inquérito Policial Militar (IPM).", correta: true, exp: "Correto. A apuração de crimes militares cabe às próprias forças militares (PM/BM).", dica: "Exceção constitucional da competência da PC.", ref: "Art. 144, § 4º e § 5º da CF/88" },
      { letra: "C", texto: "À Polícia Federal, devido ao interesse federativo na integridade física do militar.", correta: false, exp: "Incorreto. Crimes militares estaduais não atraem a competência federal.", dica: "Matéria puramente militar estadual.", ref: "Art. 144, § 1º da CF/88" },
      { letra: "D", texto: "À Guarda Municipal, por haver ocorrido em espaço público municipal.", correta: false, exp: "Incorreto. Guardas não possuem poder investigativo criminal.", dica: "Guardas não investigam crimes penais.", ref: "Art. 144, § 8º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiasCivis,
    dificuldade: dificuldades.facil,
    enunciado: "As Polícias Civis estaduais enquadram-se na segurança pública como órgãos de:",
    resolucao: "Gabarito: Letra C. As Polícias Civis atuam essencialmente de forma repressiva penal e judiciária (investigando infrações penais após a ocorrência do crime e prestando apoio ao Poder Judiciário/Ministério Público).",
    alts: [
      { letra: "A", texto: "Polícia administrativa preventiva ostensiva primária.", correta: false, exp: "Incorreto. Essa é a função precípua da Polícia Militar.", dica: "Polícia preventiva ostensiva = PM.", ref: "Art. 144, § 5º da CF/88" },
      { letra: "B", texto: "Forças militares integradas ao comando conjunto de Defesa Nacional.", correta: false, exp: "Incorreto. A PC possui natureza civil.", dica: "Polícia Civil é estritamente civil.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "C", texto: "Polícia judiciária de natureza civil voltada à apuração de crimes comuns.", correta: true, exp: "Correto. Essa é a essência funcional e organizacional da Polícia Civil conforme a CF/88.", dica: "Investigação criminal e suporte ao Judiciário.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "D", texto: "Corporações destinadas à defesa externa de fronteiras internacionais.", correta: false, exp: "Incorreto. A defesa de fronteiras é papel das Forças Armadas e da PF.", dica: "Fronteiras = Forças Armadas e PF.", ref: "Art. 144, § 1º, III da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiasCivis,
    dificuldade: dificuldades.media,
    enunciado: "Na estrutura federativa brasileira, a competência investigativa das Polícias Civis sofre duas importantes ressalvas na Constituição. São elas:",
    resolucao: "Gabarito: Letra B. O Art. 144, § 4º impõe duas grandes exceções à atuação investigativa das Polícias Civis estaduais: a competência da União (investigada pela PF) e as infrações penais militares (investigadas por IPM nas Forças Armadas ou PM/BM).",
    alts: [
      { letra: "A", texto: "A competência dos Municípios e as infrações civis disciplinares.", correta: false, exp: "Incorreto. Municípios não possuem polícia investigativa de crimes.", dica: "Relação de exceções constitucionais federais e militares.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "B", texto: "A competência da União e as infrações penais militares.", correta: true, exp: "Correto. O texto constitucional exclui crimes de competência federal (União) e crimes militares da alçada das polícias civis.", dica: "Ressalvada a União e excetuadas as infrações penais militares.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "C", texto: "Os crimes contra o meio ambiente e as infrações de trânsito estaduais.", correta: false, exp: "Incorreto. Crimes ambientais comuns estaduais são apurados normalmente pelas Polícias Civis.", dica: "PC apura crimes comuns de qualquer natureza.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "D", texto: "Os atos de improbidade administrativa e as infrações tributárias federais.", correta: false, exp: "Incorreto. Atos de improbidade administrativa são de natureza cível, investigados pelo MP e acompanhados na esfera civil.", dica: "Improbidade é matéria cível, embora possa gerar crime correlato.", ref: "Art. 37, § 4º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiasCivis,
    dificuldade: dificuldades.media,
    enunciado: "À luz da Constituição Federal, o Distrito Federal possui uma particularidade na organização de sua Polícia Civil. Assinale a opção correta:",
    resolucao: "Gabarito: Letra C. Segundo o Art. 21, inciso XIV da CF/88, compete à União organizar e manter a polícia civil, a polícia penal, a polícia militar e o corpo de bombeiros militar do Distrito Federal.",
    alts: [
      { letra: "A", texto: "A Polícia Civil do DF subordina-se diretamente ao Prefeito de Brasília.", correta: false, exp: "Incorreto. Brasília não possui prefeito; o DF é governado pelo Governador do DF.", dica: "Não existe prefeito no DF.", ref: "Art. 32 da CF/88" },
      { letra: "B", texto: "A Polícia Civil do DF é organizada e mantida exclusivamente pelo próprio Distrito Federal com verbas locais.", correta: false, exp: "Incorreto. O custeio e organização cabem constitucionalmente à União.", dica: "A União organiza e mantém as forças de segurança do DF.", ref: "Art. 21, XIV da CF/88" },
      { letra: "C", texto: "A Polícia Civil do Distrito Federal é organizada e mantida pela União.", correta: true, exp: "Correto. A CF prevê expressamente a responsabilidade da União sobre a segurança pública do DF.", dica: "União mantém e organiza a PCDF.", ref: "Art. 21, XIV da CF/88" },
      { letra: "D", texto: "O Distrito Federal não possui Polícia Civil própria, utilizando a Polícia Federal em sua totalidade.", correta: false, exp: "Incorreto. O DF possui sim Polícia Civil própria estruturada.", dica: "Existe a corporação PCDF.", ref: "Art. 144, § 4º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiasCivis,
    dificuldade: dificuldades.dificil,
    enunciado: "O inquérito policial conduzido pela Polícia Civil possui natureza jurídica de:",
    resolucao: "Gabarito: Letra D. O inquérito policial é um procedimento administrativo preparatório, de caráter inquisitivo, que visa à colheita de elementos de informação sobre a autoria e materialidade delitiva para viabilizar a ação penal pelo titular (MP ou ofendido).",
    alts: [
      { letra: "A", texto: "Processo judicial contencioso sob contraditório absoluto na delegacia.", correta: false, exp: "Incorreto. O inquérito é inquisitivo; o contraditório é postergado para a fase judicial.", dica: "Delegacia não tem juízo natural ou processo contraditório.", ref: "Art. 5º, LV da CF/88 (Jurisprudência)" },
      { letter: "B", texto: "Sentença condenatória sumária em primeira instância policial.", correta: false, exp: "Incorreto. A autoridade policial não emite sentenças e não julga.", dica: "Delegado não julga e não condena.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "C", texto: "Ato normativo de caráter vinculante para o Poder Legislativo estadual.", correta: false, exp: "Incorreto. O inquérito é peça puramente informativa criminal.", dica: "Procedimento puramente criminal instrumental.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "D", texto: "Procedimento administrativo de caráter informativo e inquisitivo.", correta: true, exp: "Correto. Caracteriza-se como procedimento pré-processual voltado à coleta de provas e informações mínimas de autoria e materialidade.", dica: "Informativo + Administrativo + Inquisitivo.", ref: "Art. 144, § 4º da CF/88 (Doutrina Processual)" }
    ]
  },
  {
    subtopico: subtopics.policiasCivis,
    dificuldade: dificuldades.media,
    enunciado: "Se um Delegado de Polícia de carreira concluir, no curso de uma investigação, que o fato investigado constitui crime estritamente militar federal, ele deverá:",
    resolucao: "Gabarito: Letra C. Sendo constatada a competência penal militar, foge à alçada das Polícias Civis a apuração. A autoridade policial deve encaminhar os autos ao órgão competente de Justiça Militar/corporação militar encarregada da investigação.",
    alts: [
      { letra: "A", texto: "Prosseguir normalmente, pois o Delegado possui poder absoluto de julgamento cível.", correta: false, exp: "Incorreto. Há expressa exceção constitucional quanto a crimes militares.", dica: "Ressalva constitucional absoluta.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "B", texto: "Aplicar a pena cabível imediatamente para agilizar a punição.", correta: false, exp: "Incorreto. Delegado não aplica pena.", dica: "Pena é de reserva jurisdicional.", ref: "Art. 5º, LIII da CF/88" },
      { letra: "C", texto: "Remeter os autos da investigação à autoridade de Polícia Judiciária Militar competente.", correta: true, exp: "Correto. O declínio de competência é obrigatório pela expressa barreira constitucional de investigação de crimes militares por polícias civis.", dica: "Remessa ao órgão militar.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "D", texto: "Arquivar o processo discricionariamente sem comunicação a nenhum órgão.", correta: false, exp: "Incorreto. O arquivamento de inquérito ou peças de informação penal exige autorização judicial, não cabendo ao delegado arquivar autos.", dica: "Delegado não pode mandar arquivar inquérito.", ref: "Art. 17 do CPP" }
    ]
  },
  {
    subtopico: subtopics.policiasCivis,
    dificuldade: dificuldades.facil,
    enunciado: "O concurso público de provas e títulos para provimento do cargo de Delegado de Polícia Civil exige, via de regra, formação específica em:",
    resolucao: "Gabarito: Letra C. A carreira de Delegado de Polícia é de natureza jurídica, exigindo obrigatoriamente dos candidatos o bacharelado em Direito.",
    alts: [
      { letra: "A", texto: "Administração Pública ou Ciências Políticas unicamente.", correta: false, exp: "Incorreto. A exigência é de bacharelado em Direito.", dica: "Cargo de carreira estritamente jurídica.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "B", texto: "Qualquer curso superior de tecnologia ou licenciatura.", correta: false, exp: "Incorreto. A carreira exige formação técnica jurídica superior bacharel.", dica: "Exige formação técnica jurídica.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "C", texto: "Bacharelado em Direito.", correta: true, exp: "Correto. Por tratar-se de carreira jurídica de direção policial, a formação em Direito é requisito constitucional e legal nacional.", dica: "Formação em Direito.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "D", texto: "Criminologia ou Sociologia exclusivamente.", correta: false, exp: "Incorreto. Embora sejam áreas afins, a exigência formal obrigatória de ingresso é o curso de Direito.", dica: "Bacharel em Ciências Jurídicas.", ref: "Art. 144, § 4º da CF/88" }
    ]
  },

  // 26-30: POLÍCIAS MILITARES E BOMBEIROS
  {
    subtopico: subtopics.policiasMilitares,
    dificuldade: dificuldades.facil,
    enunciado: "De acordo com o Art. 144, § 5º da Constituição Federal, as Polícias Militares cabem cabalmente:",
    resolucao: "Gabarito: Letra A. O texto constitucional determina expressamente que às polícias militares cabem a polícia ostensiva e a preservação da ordem pública.",
    alts: [
      { letra: "A", texto: "A polícia ostensiva e a preservação da ordem pública.", correta: true, exp: "Correto. Transcreve perfeitamente o texto da Constituição Federal sobre a função principal da PM.", dica: "Policiamento visível de rua e preservação da ordem.", ref: "Art. 144, § 5º da CF/88" },
      { letra: "B", texto: "A apuração de crimes federais cometidos contra estatais.", correta: false, exp: "Incorreto. Investigação federal é papel da PF.", dica: "Federal = PF.", ref: "Art. 144, § 1º da CF/88" },
      { letra: "C", texto: "A coordenação exclusiva do sistema carcerário penal federal.", correta: false, exp: "Incorreto. Segurança de estabelecimentos penais é da Polícia Penal.", dica: "Presídios = Polícia Penal.", ref: "Art. 144, § 5º-A da CF/88" },
      { letra: "D", texto: "O policiamento ostensivo das rodovias federais e ferrovias unicamente.", correta: false, exp: "Incorreto. Essa é função da PRF e da PFF.", dica: "Vias federais = PRF / PFF.", ref: "Art. 144, § 2º e § 3º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiasMilitares,
    dificuldade: dificuldades.media,
    enunciado: "A quem cabe, na organização da segurança pública brasileira, a execução de atividades de defesa civil?",
    resolucao: "Gabarito: Letra B. Conforme o Art. 144, § 5º, in fine, da Constituição Federal, aos corpos de bombeiros militares, além das atribuições definidas em lei, incumbe a execução de atividades de defesa civil.",
    alts: [
      { letra: "A", texto: "Às guardas municipais conjuntamente com a polícia rodoviária.", correta: false, exp: "Incorreto. Defesa civil é atribuição explícita do Corpo de Bombeiros Militar.", dica: "Bombeiros militares.", ref: "Art. 144, § 5º da CF/88" },
      { letra: "B", texto: "Aos corpos de bombeiros militares.", correta: true, exp: "Correto. A CF prevê de forma expressa essa atribuição aos Corpos de Bombeiros Militares.", dica: "Incumbe a execução de atividades de defesa civil.", ref: "Art. 144, § 5º da CF/88" },
      { letra: "C", texto: "À Polícia Federal sob comando das forças armadas.", correta: false, exp: "Incorreto. A PF tem atribuição judiciária e de fronteiras.", dica: "PF é civil e judiciária.", ref: "Art. 144, § 1º da CF/88" },
      { letra: "D", texto: "Aos agentes fazendários e fiscais sanitários locais.", correta: false, exp: "Incorreto. Não possuem ligação militar ou de defesa civil ordinária.", dica: "Bombeiros exercem defesa civil.", ref: "Art. 144, § 5º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiasMilitares,
    dificuldade: dificuldades.media,
    enunciado: "As Polícias Militares e os Corpos de Bombeiros Militares são classificados constitucionalmente (Art. 144, § 6º) como:",
    resolucao: "Gabarito: Letra C. Segundo o Art. 144, § 6º da CF/88, as polícias militares e corpos de bombeiros militares, forças auxiliares e reserva do Exército, subordinam-se, juntamente com as polícias civis e as polícias penais estaduais e distrital, aos Governadores dos Estados, do Distrito Federal e dos Territórios.",
    alts: [
      { letra: "A", texto: "Órgãos do Poder Legislativo federal com assento no Congresso.", correta: false, exp: "Incorreto. São órgãos do Poder Executivo estadual.", dica: "Polícias integram o Poder Executivo.", ref: "Art. 144, § 6º da CF/88" },
      { letra: "B", texto: "Subordinados diretos e imediatos do Presidente da República em tempo de paz.", correta: false, exp: "Incorreto. Subordinam-se aos Governadores.", dica: "A chefia militar estadual é do Governador.", ref: "Art. 144, § 6º da CF/88" },
      { letra: "C", texto: "Forças auxiliares e reserva do Exército, subordinadas aos Governadores.", correta: true, exp: "Correto. Essa é a exata qualificação constitucional dessas corporações militares estaduais.", dica: "Forças auxiliares e reserva do Exército.", ref: "Art. 144, § 6º da CF/88" },
      { letra: "D", texto: "Órgãos autônomos federais imunes a controle externo.", correta: false, exp: "Incorreto. São órgãos subordinados estaduais sujeitos a controle externo.", dica: "Sujeitos a controle do MP.", ref: "Art. 129, VII da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiasMilitares,
    dificuldade: dificuldades.media,
    enunciado: "A atividade da Polícia Militar de patrulhamento de ruas de forma identificada e com viaturas caracterizadas visa cumprir qual objetivo constitucional primário?",
    resolucao: "Gabarito: Letra C. A atividade ostensiva caracteriza-se pela identificação visual e imediata presença física, agindo preventivamente para desencorajar o crime e preservar a ordem pública (Art. 144, § 5º).",
    alts: [
      { letra: "A", texto: "Policiamento judiciário pós-delito para identificar a autoria e provas.", correta: false, exp: "Incorreto. A investigação do fato ocorrido compete à Polícia Civil.", dica: "Pós-delito investigativo = PC.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "B", texto: "Controle migratório nas rodovias distritais.", correta: false, exp: "Incorreto. Controle de migração é da PF.", dica: "Migração = PF.", ref: "Art. 144, § 1º, III da CF/88" },
      { letra: "C", texto: "Policiamento ostensivo e preventivo para preservação da ordem pública.", correta: true, exp: "Correto. A ostensividade visa a inibir crimes pelo policiamento visível e garantir a ordem.", dica: "Prevenção criminal por meio da presença visível.", ref: "Art. 144, § 5º da CF/88" },
      { letra: "D", texto: "Aplicação sumária de multas pecuniárias contratuais de trânsito federal.", correta: false, exp: "Incorreto. Sanções contratuais de rodovia federal competem aos órgãos federais da União.", dica: "PM cuida de segurança pública estadual de trânsito ordinário sob convênio.", ref: "Art. 144, § 5º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiasMilitares,
    dificuldade: dificuldades.dificil,
    enunciado: "À luz da Constituição, as Forças Armadas diferem das Polícias Militares Estaduais principalmente sob a óptica de sua destinação. Assinale a alternativa correta:",
    resolucao: "Gabarito: Letra B. As Forças Armadas (Marinha, Exército e Aeronáutica) destinam-se à defesa da Pátria, garantia dos poderes constitucionais e da lei e da ordem (Art. 142), enquanto as Polícias Militares destinam-se à polícia ostensiva e preservação da ordem pública interna estadual (Art. 144, § 5º).",
    alts: [
      { letra: "A", texto: "As Polícias Militares destinam-se à defesa externa contra agressão estrangeira na pátria.", correta: false, exp: "Incorreto. Defesa externa contra soberanias inimigas é das Forças Armadas.", dica: "Defesa externa = Exército/Marinha/Aeronáutica.", ref: "Art. 142 da CF/88" },
      { letra: "B", texto: "As Forças Armadas destinam-se à defesa da Pátria, e as Polícias Militares ao policiamento ostensivo e ordem pública interna.", correta: true, exp: "Correto. A CF divide claramente as funções de soberania externa (Art. 142) e segurança interna comum (Art. 144).", dica: "Defesa da Pátria vs. Segurança Interna do cidadão.", ref: "Art. 142 e Art. 144 da CF/88" },
      { letra: "C", texto: "As PMs subordinam-se diretamente ao Ministério da Defesa em caráter ordinário permanente.", correta: false, exp: "Incorreto. As PMs são subordinadas aos Governadores estaduais.", dica: "Subordinação de segurança pública estadual.", ref: "Art. 144, § 6º da CF/88" },
      { letra: "D", texto: "Não há diferença constitucional, sendo as polícias militares um ramo ordinário da Marinha do Brasil.", correta: false, exp: "Incorreto. São corporações distintas de entes federativos distintos.", dica: "Relação apenas de reserva do Exército.", ref: "Art. 144, § 6º da CF/88" }
    ]
  },

  // 31-35: POLÍCIAS PENAIS
  {
    subtopico: subtopics.policiasPenais,
    dificuldade: dificuldades.facil,
    enunciado: "A Emenda Constitucional nº 104/2019 inseriu um novo órgão policial no rol do Art. 144 da CF/88. Trata-se da:",
    resolucao: "Gabarito: Letra B. A EC 104/2019 criou as Polícias Penais federal, estaduais e distrital, incumbidas da segurança dos estabelecimentos penais.",
    alts: [
      { letra: "A", texto: "Polícia Judiciária de Execuções Penais Civis.", correta: false, exp: "Incorreto. O nome oficial dado pela EC 104 é Polícia Penal.", dica: "Nome oficial consagrado na EC 104/2019.", ref: "Art. 144, § 5º-A da CF/88" },
      { letra: "B", texto: "Polícia Penal.", correta: true, exp: "Correto. O dispositivo do § 5º-A consagra a Polícia Penal na esfera federal, estadual e distrital.", dica: "Polícia Penal.", ref: "Art. 144, § 5º-A da CF/88" },
      { letra: "C", texto: "Guarda Prisional da Reserva Militar do Exército.", correta: false, exp: "Incorreto. É polícia civil de segurança penal de natureza própria.", dica: "Força civil de segurança do sistema penal.", ref: "Art. 144, § 5º-A da CF/88" },
      { letra: "D", texto: "Força Tarefa Prisional de Fronteiras.", correta: false, exp: "Incorreto. Não possui essa nomenclatura constitucional.", dica: "Instituição criada em 2019 para os presídios.", ref: "Art. 144, § 5º-A da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiasPenais,
    dificuldade: dificuldades.media,
    enunciado: "Qual a competência constitucional atribuída às Polícias Penais pela Emenda Constitucional nº 104/2019?",
    resolucao: "Gabarito: Letra B. Conforme o Art. 144, § 5º-A da CF/88, às polícias penais cabe a segurança dos estabelecimentos penais.",
    alts: [
      { letra: "A", texto: "A apuração de crimes praticados por juízes e promotores da vara de execuções.", correta: false, exp: "Incorreto. Crimes de magistrados e promotores possuem ritos judiciais especiais próprios de foro por prerrogativa.", dica: "Função não é de polícia judiciária de magistratura.", ref: "Art. 96 da CF/88" },
      { letra: "B", texto: "A segurança dos estabelecimentos penais.", correta: true, exp: "Correto. O texto da CF incumbe a polícia penal diretamente da custódia e segurança das prisões e penitenciárias.", dica: "Segurança de presídios e complexos penais.", ref: "Art. 144, § 5º-A da CF/88" },
      { letra: "C", texto: "O policiamento ostensivo das vias públicas urbanas que circundam os fóruns.", correta: false, exp: "Incorreto. A via pública urbana ordinária é patrulhada pela PM.", dica: "Foco no sistema carcerário penal.", ref: "Art. 144, § 5º da CF/88" },
      { letra: "D", texto: "A execução imediata de penas de trabalhos forçados.", correta: false, exp: "Incorreto. No Brasil é proibida constitucionalmente a pena de trabalhos forçados.", dica: "Proibição constitucional de penas crueis e de trabalhos forçados.", ref: "Art. 5º, XLVII, 'c' da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiasPenais,
    dificuldade: dificuldades.media,
    enunciado: "A Polícia Penal de um determinado Estado da Federação vincula-se e subordina-se a quem na estrutura do Poder Executivo estadual?",
    resolucao: "Gabarito: Letra C. As polícias penais estaduais subordinam-se aos Governadores dos Estados e do Distrito Federal (Art. 144, § 6º) e são vinculadas ao órgão administrador do sistema penal da respectiva unidade federativa.",
    alts: [
      { letra: "A", texto: "Diretamente ao Comando Geral da Polícia Militar estadual.", correta: false, exp: "Incorreto. Possui estrutura autônoma em relação às PMs.", dica: "Não integra as forças militares estaduais.", ref: "Art. 144, § 6º da CF/88" },
      { letra: "B", texto: "Ao Poder Judiciário estadual através da Vara de Execuções Penais.", correta: false, exp: "Incorreto. A polícia penal é órgão do Poder Executivo.", dica: "Polícia é Executivo, não Judiciário.", ref: "Art. 144, § 6º da CF/88" },
      { letra: "C", texto: "Ao Governador do Estado e vinculada ao órgão administrador do sistema penal da unidade federativa.", correta: true, exp: "Correto. Essa é a exata vinculação e subordinação determinada pela Constituição Federal.", dica: "Subordinação ao Governador + Vínculo ao órgão de administração penal.", ref: "Art. 144, § 5º-A e § 6º da CF/88" },
      { letra: "D", texto: "Ao Ministério Público Federal no exercício de controle financeiro ordinário.", correta: false, exp: "Incorreto. MP exerce controle externo finalístico penal, não subordinação administrativa interna.", dica: "Não há subordinação hierárquica ao MP.", ref: "Art. 129 da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiasPenais,
    dificuldade: dificuldades.dificil,
    enunciado: "A instituição da Polícia Penal pela EC 104/2019 operou uma transformação na natureza do cargo de Agente Penitenciário. Sob a óptica constitucional, é correto afirmar que:",
    resolucao: "Gabarito: Letra C. A transformação transformou os antigos cargos estáveis de Agentes Penitenciários em Policiais Penais de carreira policial, integrando formalmente a segurança pública com garantias e deveres típicos da carreira policial de estado.",
    alts: [
      { letra: "A", texto: "Os cargos foram extintos e os servidores demitidos sem indenização por quebra de estabilidade.", correta: false, exp: "Incorreto. Houve a transposição constitucional dos cargos e preenchimento por concurso e equivalência.", dica: "Proteção aos servidores estáveis preexistentes.", ref: "Art. 144, § 5º-A da CF/88 (EC 104/19)" },
      { letra: "B", texto: "O cargo passou a ser eletivo e temporário a cada quatro anos coincidente com o governador.", correta: false, exp: "Incorreto. O provimento de cargo de carreira policial é estritamente por concurso público.", dica: "Ingresso por concurso de provas ou provas e títulos.", ref: "Art. 37, II da CF/88" },
      { letra: "C", texto: "O preenchimento do quadro de servidores da polícia penal dar-se-á, exclusivamente, por meio de concurso público e por meio da transformação dos cargos isolados ou de carreira dos atuais agentes penitenciários e equivalentes.", correta: true, exp: "Correto. Dispositivo expresso da EC 104/19 de transição e enquadramento de carreiras.", dica: "Transposição de carreira de agentes penitenciários ativos para policiais penais.", ref: "Art. 144, § 5º-A da CF/88" },
      { letra: "D", texto: "Passaram a ter vinculação militar e submissão ao regulamento disciplinar do Exército Brasileiro.", correta: false, exp: "Incorreto. A Polícia Penal possui natureza jurídica estritamente civil.", dica: "Polícia Penal é civil.", ref: "Art. 144, § 5º-A da CF/88" }
    ]
  },
  {
    subtopico: subtopics.policiasPenais,
    dificuldade: dificuldades.facil,
    enunciado: "À luz da Constituição Federal, o preenchimento do quadro de servidores da Polícia Penal Federal é feito por meio de:",
    resolucao: "Gabarito: Letra C. O provimento dos cargos policiais da Polícia Penal Federal ocorre por meio de concurso público de provas ou de provas e títulos.",
    alts: [
      { letra: "A", texto: "Indicação política discricionária do Diretor Geral da PF.", correta: false, exp: "Incorreto. Cargos efetivos exigem concurso público.", dica: "Súmula Vinculante 43 do STF impede provimento derivado discricionário.", ref: "Art. 37, II da CF/88" },
      { letra: "B", texto: "Nomeação militar por bravura no Exército.", correta: false, exp: "Incorreto. A Polícia Penal é órgão civil e independente das Forças Armadas.", dica: "Órgão policial civil federal.", ref: "Art. 144, § 5º-A da CF/88" },
      { letra: "C", texto: "Concurso público de provas ou de provas e títulos.", correta: true, exp: "Correto. O concurso público é a regra constitucional impositiva de ingresso na carreira da Polícia Penal.", dica: "Ingresso por concurso.", ref: "Art. 37, II e Art. 144, § 5º-A da CF/88" },
      { letra: "D", texto: "Terceirização livre de vigilância privada contratada temporariamente.", correta: false, exp: "Incorreto. Atividade policial é função de estado típica, indelegável a particulares ou terceirizados.", dica: "Função típica de Estado e indelegável.", ref: "Art. 144 da CF/88" }
    ]
  },

  // 36-40: GUARDAS MUNICIPAIS E TEMAS GERAIS
  {
    subtopico: subtopics.guardasMunicipais,
    dificuldade: dificuldades.facil,
    enunciado: "O Artigo 144, § 8º da Constituição Federal de 1988 faculta aos Municípios a constituição de guardas municipais destinadas à:",
    resolucao: "Gabarito: Letra C. A Constituição prevê que os Municípios poderão constituir guardas municipais destinadas à proteção de seus bens, serviços e instalações, conforme dispuser a lei.",
    alts: [
      { letra: "A", texto: "Polícia judiciária municipal de apuração de crimes ordinários locais.", correta: false, exp: "Incorreto. Guardas não possuem poder de polícia penal investigativa judiciária.", dica: "Guardas não investigam crimes penais.", ref: "Art. 144, § 8º da CF/88" },
      { letra: "B", texto: "Repressão militar de manifestações cívicas pacíficas locais.", correta: false, exp: "Incorreto. Manifestações pacíficas são garantidas constitucionalmente.", dica: "Dignidade e liberdade de reunião pacífica.", ref: "Art. 5º, XVI da CF/88" },
      { letra: "C", texto: "Proteção de seus bens, serviços e instalações, conforme dispuser a lei.", correta: true, exp: "Correto. Esta é a exata e taxativa atribuição constitucional dada às Guardas Municipais.", dica: "Proteção de bens, serviços e instalações municipais.", ref: "Art. 144, § 8º da CF/88" },
      { letra: "D", texto: "Guarda privada armada pessoal dos prefeitos e vereadores vitaliciamente.", correta: false, exp: "Incorreto. Guardas servem à instituição municipal geral, não a privilégios particulares perpétuos.", dica: "Finalidade pública.", ref: "Art. 144, § 8º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.guardasMunicipais,
    dificuldade: dificuldades.media,
    enunciado: "À luz da jurisprudência recente do STF e do STJ sobre o poder de polícia das Guardas Municipais, assinale a alternativa correta:",
    resolucao: "Gabarito: Letra B. O STF pacificou o entendimento de que as Guardas Municipais integram o Sistema Único de Segurança Pública (SUSP) e possuem poder de polícia de trânsito amplo, podendo inclusive autuar infrações de trânsito nas vias municipais.",
    alts: [
      { letra: "A", texto: "As Guardas Municipais são proibidas de exercer qualquer fiscalização de trânsito.", correta: false, exp: "Incorreto. O STF declarou constitucional a atribuição de fiscalização viária pelas guardas.", dica: "Guardas possuem poder de polícia de trânsito municipal.", ref: "Art. 144, § 8º da CF/88 (Tema 172 da Repercussão Geral do STF)" },
      { letra: "B", texto: "As Guardas Municipais integram o Sistema Único de Segurança Pública e possuem competência para fiscalizar o trânsito municipal.", correta: true, exp: "Correto. Entendimento fixado pelos tribunais superiores (STF e STJ) reconhecendo as Guardas como integrantes operacionais da Segurança Pública nacional.", dica: "Poder de polícia de trânsito + Integração ao SUSP.", ref: "Art. 144, § 8º da CF/88 (Recurso Extraordinário 658.570/STF)" },
      { letra: "C", texto: "As Guardas Municipais possuem poder constitucional para conduzir investigações preliminares de homicídios.", correta: false, exp: "Incorreto. Investigação é reservada à Polícia Civil.", dica: "Investigar homicídios comuns é papel da PC.", ref: "Art. 144, § 4º da CF/88" },
      { letra: "D", texto: "As Guardas Municipais subordinam-se hierarquicamente ao Comando Militar do Exército Brasileiro.", correta: false, exp: "Incorreto. São corporações civis de âmbito municipal subordinadas ao Prefeito.", dica: "Subordinação local ao Prefeito.", ref: "Art. 144, § 8º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.guardasMunicipais,
    dificuldade: dificuldades.dificil,
    enunciado: "Considerando as limitações constitucionais das Guardas Municipais, em caso de flagrante delito de tráfico de drogas em via pública presenciado por um guarda municipal, este deverá:",
    resolucao: "Gabarito: Letra C. Qualquer pessoa do povo pode prender em flagrante (flagrante facultativo), e as autoridades policiais e seus agentes devem prender (flagrante obrigatório). Os Guardas Municipais, integrando o SUSP, atuam legitimamente em situações de flagrante delito prendendo o autor e encaminhando-o imediatamente à autoridade policial competente (Polícia Civil ou Federal).",
    alts: [
      { letra: "A", texto: "Ignorar o fato por falta de jurisdição investigativa de tráfico.", correta: false, exp: "Incorreto. O dever de preservação social e a legitimidade de flagrante autorizam a prisão.", dica: "Prisão em flagrante é ato de autodefesa da sociedade e dever estatal.", ref: "Art. 301 do CPP" },
      { letra: "B", texto: "Iniciar um processo administrativo para julgar o cidadão no próprio local do crime.", correta: false, exp: "Incorreto. Guardas municipais não exercem jurisdição penal condenatória.", dica: "Nenhum policial julga.", ref: "Art. 5º, LIII da CF/88" },
      { letra: "C", texto: "Efetuar a prisão do indivíduo em flagrante delito e conduzi-lo imediatamente à Delegacia de Polícia Civil.", correta: true, exp: "Correto. O flagrante permite a contenção do autor e a condução à delegacia para lavratura dos atos de polícia judiciária pelo Delegado de Polícia.", dica: "Flagrante delito ➔ Contenção e remessa à delegacia.", ref: "Art. 301 do CPP e Jurisprudência do STJ" },
      { letra: "D", texto: "Confiscar a droga e liberá-lo sob fiança paga em espécie ao município.", correta: false, exp: "Incorreto. A fiança penal é fixada e homologada por autoridade policial judiciária (Delegado) ou judicial (Juiz), nunca arrecadada diretamente por agentes de rua.", dica: "A fiança criminal tem rito legal rígido.", ref: "Art. 322 do CPP" }
    ]
  },
  {
    subtopico: subtopics.guardasMunicipais,
    dificuldade: dificuldades.media,
    enunciado: "De acordo com as regras de subordinação federativa dos órgãos de segurança pública e guardas municipais, assinale a opção correta:",
    resolucao: "Gabarito: Letra C. Conforme o Art. 144, § 8º, as Guardas Municipais são instituídas e coordenadas pelos Municípios, subordinando-se diretamente aos chefes do Poder Executivo municipal (Prefeitos).",
    alts: [
      { letra: "A", texto: "As Guardas subordinam-se ao Governador do Estado em caráter absoluto.", correta: false, exp: "Incorreto. As forças de segurança estaduais (PM/PC/PP) são subordinadas ao Governador, mas as guardas pertencem à esfera municipal.", dica: "Guardas são municipais.", ref: "Art. 144, § 8º da CF/88" },
      { letra: "B", texto: "As Guardas Municipais integram a reserva ativa da Força Aérea Brasileira.", correta: false, exp: "Incorreto. Guardas têm natureza exclusivamente civil e municipal.", dica: "Não possuem vínculo militar de forças de reserva das FA.", ref: "Art. 144, § 8º da CF/88" },
      { letra: "C", texto: "As Guardas Municipais subordinam-se diretamente ao Prefeito do respectivo Município.", correta: true, exp: "Correto. Sendo órgãos municipais, a chefia cabe ao prefeito, chefe do Executivo local.", dica: "Subordinação ao chefe do Executivo local.", ref: "Art. 144, § 8º da CF/88" },
      { letra: "D", texto: "As Guardas subordinam-se diretamente ao Tribunal de Justiça local.", correta: false, exp: "Incorreto. Não há subordinação hierárquica a órgãos do Judiciário.", dica: "Integram a administração executiva.", ref: "Art. 2º da CF/88" }
    ]
  },
  {
    subtopico: subtopics.guardasMunicipais,
    dificuldade: dificuldades.media,
    enunciado: "No âmbito da segurança viária disciplinada no Art. 144, § 10º da CF/88, a estruturação das carreiras de trânsito deve ocorrer:",
    resolucao: "Gabarito: Letra C. A Emenda Constitucional nº 82/2014 estabelece que a segurança viária é exercida para a preservação da ordem pública e da incolumidade das pessoas e de seu patrimônio nas vias públicas, devendo ser estruturada em carreira, nos órgãos ou entidades de trânsito dos Estados, do Distrito Federal e dos Municípios.",
    alts: [
      { letra: "A", texto: "Por meio de empresas privadas contratadas sem concurso sob regime CLT.", correta: false, exp: "Incorreto. Trata-se de serviço público típico de estado estruturado em carreira pública.", dica: "Carreira pública.", ref: "Art. 144, § 10 da CF/88" },
      { letra: "B", texto: "Somente na esfera federal sob comando da Polícia Federal.", correta: false, exp: "Incorreto. Abrange os âmbitos estadual, distrital e municipal.", dica: "Descentralização federativa viária.", ref: "Art. 144, § 10 da CF/88" },
      { letra: "C", texto: "Em carreira, nos órgãos ou entidades de trânsito dos Estados, do Distrito Federal e dos Municípios.", correta: true, exp: "Correto. Essa é a exata previsão constitucional de estruturação das carreiras de trânsito no país.", dica: "Carreira nos órgãos de trânsito dos entes federativos.", ref: "Art. 144, § 10, II da CF/88" },
      { letra: "D", texto: "Por militares temporários sem direito a estabilidade no cargo.", correta: false, exp: "Incorreto. Carreiras de trânsito possuem caráter civil e estabilidade na administração pública.", dica: "Regime estatutário de carreira civil.", ref: "Art. 37 da CF/88" }
    ]
  }
];

// Replicar as 40 questões gerando variações para atingir as 40 solicitadas!
// Vamos gerar 40 questões variadas focadas em Art. 144 da CF/88
for (let i = 0; i < 40; i++) {
  const base = rawQuestionData[i % rawQuestionData.length];
  const qNum = i + 2; // Começa na Q100002
  const code = `Q${100000 + qNum}`;
  
  // Criar UUIDs realistas e consistentes
  const qUuid = `e632d4b9-183e-46cb-b1b7-a36c1cf${String(50000 + qNum)}`;
  
  // Clonar alternativas com novos UUIDs
  const alternatives: Alternative[] = base.alts.map((alt, idx) => ({
    id: `a1bcde${String(10 + idx).padStart(2, "0")}-2345-6789-abcd-ef0123${String(300000 + qNum)}`,
    letra: alt.letra || "A",
    texto: alt.texto,
    isCorreta: alt.correta,
    explicacao: alt.exp,
    dica: alt.dica || "",
    referencia: alt.ref || "Art. 144 da CF/88",
    ordem: idx
  }));

  generatedQuestions.push({
    id: qUuid,
    code,
    subtopicoId: base.subtopico,
    dificuldadeId: base.dificuldade,
    enunciado: `[Questão Inédita ${qNum - 1}] ${base.enunciado}`,
    textoApoio: `Texto de Apoio para a Questão ${qNum - 1}: A segurança pública, dever do Estado, direito e responsabilidade de todos, é exercida para a preservação da ordem pública e da incolumidade das pessoas e do patrimônio nas vias e territórios nacionais.`,
    resolucao: base.resolucao,
    alternativas: alternatives
  });
}

// Juntar a primeira e as novas 40
const allQuestions = [question1, ...generatedQuestions];

// Gerar o SQL completo
let sql = `-- =============================================================================
-- SQL DE IMPORTAÇÃO DE QUESTÕES INÉDITAS (DIREITO CONSTITUCIONAL - SEGURANÇA PÚBLICA)
-- Total de Questões: ${allQuestions.length}
-- =============================================================================

`;

for (const q of allQuestions) {
  sql += `-- -----------------------------------------------------------------------------\n`;
  sql += `-- QUESTÃO CODE: ${q.code} (ID: ${q.id})\n`;
  sql += `-- -----------------------------------------------------------------------------\n`;
  sql += `INSERT INTO questoes (\n`;
  sql += `  id, \n`;
  sql += `  code, \n`;
  sql += `  "tipoQuestaoId", \n`;
  sql += `  origem, \n`;
  sql += `  status, \n`;
  sql += `  ano, \n`;
  sql += `  "isUnique", \n`;
  sql += `  access, \n`;
  sql += `  visibility, \n`;
  sql += `  "tipoCobranca",\n`;
  sql += `  "autorId", \n`;
  sql += `  "bancaId", \n`;
  sql += `  "concursoId", \n`;
  sql += `  "cargoId", \n`;
  sql += `  "carreiraId", \n`;
  sql += `  "nivelEducacionalId", \n`;
  sql += `  "dificuldadeId",\n`;
  sql += `  "disciplinaId", \n`;
  sql += `  "assuntoId", \n`;
  sql += `  "topicoId", \n`;
  sql += `  "subtopicoId", \n`;
  sql += `  "textoApoio", \n`;
  sql += `  enunciado, \n`;
  sql += `  resolucao, \n`;
  sql += `  "videoUrl",\n`;
  sql += `  "criadoEm", \n`;
  sql += `  "atualizadoEm"\n`;
  sql += `) VALUES (\n`;
  sql += `  '${q.id}',\n`;
  sql += `  '${q.code}',\n`;
  sql += `  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)\n`;
  sql += `  'INEDITA', -- origem\n`;
  sql += `  'PUBLICADA', -- status\n`;
  sql += `  2026, -- ano\n`;
  sql += `  true, -- isUnique\n`;
  sql += `  'free', -- access\n`;
  sql += `  'publica', -- visibility\n`;
  sql += `  'LEI_SECA', -- tipoCobranca\n`;
  sql += `  (SELECT id FROM usuarios LIMIT 1), -- autorId dinâmico\n`;
  sql += `  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)\n`;
  sql += `  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)\n`;
  sql += `  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)\n`;
  sql += `  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)\n`;
  sql += `  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)\n`;
  sql += `  '${q.dificuldadeId}',\n`;
  sql += `  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Constitucional)\n`;
  sql += `  '84f5cb6f-0784-4d7b-bccb-592f53b061a3', -- assuntoId (Defesa do Estado...)\n`;
  sql += `  'a2c9f22f-e5eb-42fd-81f1-b83835c715b0', -- topicoId (Segurança Pública)\n`;
  sql += `  '${q.subtopicoId}',\n`;
  sql += `  '${q.textoApoio.replace(/'/g, "''")}',\n`;
  sql += `  '${q.enunciado.replace(/'/g, "''")}',\n`;
  sql += `  '${q.resolucao.replace(/'/g, "''")}',\n`;
  sql += `  '',\n`;
  sql += `  NOW(),\n`;
  sql += `  NOW()\n`;
  sql += `);\n\n`;

  sql += `INSERT INTO alternativas (\n`;
  sql += `  id, \n`;
  sql += `  "questaoId", \n`;
  sql += `  letra, \n`;
  sql += `  texto, \n`;
  sql += `  "isCorreta", \n`;
  sql += `  explicacao, \n`;
  sql += `  dica, \n`;
  sql += `  referencia, \n`;
  sql += `  ordem\n`;
  sql += `) VALUES \n`;
  
  const altInserts = q.alternativas.map(alt => {
    return `  ('${alt.id}', '${q.id}', '${alt.letra}', '${alt.texto.replace(/'/g, "''")}', ${alt.isCorreta}, '${alt.explicacao.replace(/'/g, "''")}', '${alt.dica.replace(/'/g, "''")}', '${alt.referencia.replace(/'/g, "''")}', ${alt.ordem})`;
  });
  
  sql += altInserts.join(",\n") + ";\n\n";
}

const outputPath = path.resolve(__dirname, "../../Json QUestoes/constitucional.sql");
fs.writeFileSync(outputPath, sql, "utf-8");
console.log(`=== SQL GERADO COM SUCESSO EM: ${outputPath} ===`);
console.log(`Total de questões escritas no arquivo: ${allQuestions.length}`);
