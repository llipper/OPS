from __future__ import annotations

import json
import sys
from collections import defaultdict
from pathlib import Path


UNIFIED_INCIDENCE_FILE = Path("scratch/pm-ce-soldado-dev/pm-ce-soldado-unified-incidence-2021-2025-draft.json")
NOTICE_PROGRAMS_FILE = Path("scratch/pm-ce-soldado-dev/notice-programs-2021-2025-draft.json")
OUTPUT_FILE = Path("scratch/pm-ce-soldado-dev/notice-vs-exam-2021-2025-draft.json")


NOTICE_PROGRAMS = {
    "2021": {
        "sourcePath": "scratch/pm-ce-soldado-dev/pm_ce_2021_soldado-edital.pdf",
        "noticeLabel": "Edital PMCE Soldado 2021",
        "disciplines": [
            {"name": "Lingua Portuguesa/Interpretacao de Textos", "questionCount": 10, "topics": ["Leitura, compreensao e interpretacao de textos", "Estruturacao do texto e dos paragrafos", "Articulacao textual", "Significacao contextual", "Equivalencia e transformacao de estruturas", "Sintaxe", "Tempos e modos verbais", "Pontuacao", "Formacao de palavras", "Classes de palavras", "Flexao nominal e verbal", "Pronomes", "Concordancia", "Regencia", "Ortografia", "Acentuacao"]},
            {"name": "Raciocinio Logico-Matematico", "questionCount": 10, "topics": ["Estruturas logicas", "Deducao de informacoes", "Logica de situacoes", "Raciocinio verbal", "Raciocinio matematico", "Raciocinio sequencial", "Orientacao espacial e temporal", "Formacao de conceitos", "Operacoes com conjuntos", "Problemas aritmeticos", "Problemas geometricos", "Problemas matriciais"]},
            {"name": "Atualidades/Historia do Ceara", "questionCount": 10, "topics": ["Meio ambiente e sociedade", "Descobertas e inovacoes cientificas", "Politica internacional e brasileira", "Cultura internacional e brasileira", "Economia internacional contemporanea", "Panorama da economia brasileira", "Periodo colonial no Ceara", "Periodo imperial no Ceara", "Confederacao do Equador", "Economia do algodao", "Escravidao negra no Ceara", "Republica Velha", "Coronelismo e clientelismo", "Movimentos sociais religiosos e banditismo", "Estado Novo", "Redemocratizacao", "DNOCS e SUDENE", "Governos militares e novo coronelismo", "Governos das mudancas"]},
            {"name": "Nocoes de Administracao Publica/Etica no Servico Publico", "questionCount": 10, "topics": ["Organizacoes formais modernas", "Estrutura organizacional", "Departamentalizacao", "Processo organizacional", "Planejamento", "Direcao", "Comunicacao", "Controle e avaliacao", "Organizacao administrativa", "Administracao direta e indireta", "Agencias executivas e reguladoras", "Gestao de processos", "Gestao de contratos", "Planejamento estrategico", "Servicos publicos", "Delegacao de servicos", "Convenios e consorcios", "Relacoes humanas no trabalho", "Etica e cidadania"]},
            {"name": "Direito Constitucional/Direitos Humanos", "questionCount": 12, "topics": ["Direitos e garantias fundamentais", "Direitos sociais", "Direitos politicos", "Organizacao do Estado", "Poder Legislativo", "Poder Executivo", "Poder Judiciario", "CNJ", "Funcoes essenciais a justica", "Ministerio Publico", "Advocacia", "Defensorias Publicas", "Conceito e fundamentacao dos Direitos Humanos", "Responsabilidade do Estado", "Direitos Humanos na CRFB/88", "Politica Nacional de Direitos Humanos", "Violencias de genero", "Violencia domestica", "Lei Maria da Penha", "Estatuto da Igualdade Racial", "Estatuto da Pessoa com Deficiencia", "Vitimas de violencia de Estado", "Homofobia", "Orientacao sexual e identidade de genero", "Crime de racismo", "Tortura", "Lei de abuso de autoridade"]},
            {"name": "Direito Penal Militar/Processo Penal Militar", "questionCount": 10, "topics": ["Aplicacao da lei penal militar", "Crime", "Imputabilidade penal", "Concurso de agentes", "Penas", "Suspensao condicional da pena", "Livramento condicional", "Penas acessorias", "Efeitos da condenacao", "Medidas de seguranca", "Acao penal", "Extincao da punibilidade", "Crimes militares em tempo de paz", "Crimes propriamente militares e impropriamente militares", "Crimes contra a pessoa", "Crimes contra o patrimonio", "Crimes contra a administracao militar", "Crimes em tempo de guerra"]},
            {"name": "Direito Penal/Processual Penal", "questionCount": 6, "topics": ["Aplicacao da lei processual", "Inquerito policial", "Acao penal", "Prisao e liberdade provisoria", "Prisao temporaria", "Crimes de responsabilidade dos funcionarios publicos", "Habeas corpus", "Crimes hediondos", "Estatuto do Desarmamento", "Lei de Drogas", "Lei de Abuso de Autoridade"]},
            {"name": "Criminologia", "questionCount": 6, "topics": ["Crime como fato social", "Instituicoes sociais relacionadas ao crime", "Extensao da criminalidade", "Crime como fenomeno de massa", "Narcotrafico", "Terrorismo", "Crime organizado", "Homicidio", "Tipos criminosos", "Criminoso nato", "Criminoso ocasional", "Criminoso habitual ou profissional", "Criminoso passional", "Criminoso alienado", "Delinquencia juvenil", "Mulher criminosa", "Atividades repressivas, preventivas e educacionais"]},
            {"name": "Seguranca Publica", "questionCount": 6, "topics": ["Direitos Humanos", "Desarmamento", "Combate aos preconceitos", "Redes sociais e comunitarias", "Instituicoes de seguranca publica e sistema prisional", "Crime organizado", "Corrupcao policial", "Acesso a Justica", "Espacos publicos", "Participacao da sociedade civil", "PRONASCI"]},
        ],
    },
    "2025": {
        "sourcePath": "scratch/pm-ce-soldado-dev/pm_ce_2025_soldado_edital_n_1-edital.pdf",
        "noticeLabel": "Edital PMCE Soldado 2025",
        "disciplines": [
            {"name": "Lingua Portuguesa/Interpretacao de Textos", "questionCount": 12, "topics": ["Leitura, compreensao e interpretacao de textos", "Estruturacao do texto e dos paragrafos", "Articulacao textual", "Significacao contextual", "Equivalencia e transformacao de estruturas", "Sintaxe", "Tempos e modos verbais", "Pontuacao", "Formacao de palavras", "Classes de palavras", "Flexao nominal e verbal", "Pronomes", "Concordancia", "Regencia", "Ortografia", "Acentuacao"]},
            {"name": "Raciocinio Logico", "questionCount": 10, "topics": ["Estruturas logicas", "Deducao de informacoes", "Logica de situacoes", "Raciocinio verbal", "Raciocinio matematico", "Raciocinio sequencial", "Orientacao espacial e temporal", "Formacao de conceitos", "Operacoes com conjuntos", "Problemas aritmeticos", "Problemas geometricos", "Problemas matriciais"]},
            {"name": "Atualidades/Historia do Ceara", "questionCount": 10, "topics": ["Meio ambiente e sociedade", "Descobertas e inovacoes cientificas", "Politica internacional e brasileira", "Cultura internacional e brasileira", "Economia internacional contemporanea", "Panorama da economia brasileira", "Periodo colonial no Ceara", "Periodo imperial no Ceara", "Confederacao do Equador", "Economia do algodao", "Escravidao negra no Ceara", "Republica Velha", "Coronelismo e clientelismo", "Movimentos sociais religiosos e banditismo", "Estado Novo", "Redemocratizacao", "DNOCS e SUDENE", "Governos militares e novo coronelismo", "Governos das mudancas"]},
            {"name": "Nocoes de Administracao Publica/Etica no Servico Publico", "questionCount": 8, "topics": ["Organizacoes formais modernas", "Estrutura organizacional", "Departamentalizacao", "Processo organizacional", "Planejamento", "Direcao", "Comunicacao", "Controle e avaliacao", "Organizacao administrativa", "Administracao direta e indireta", "Agencias executivas e reguladoras", "Gestao de processos", "Gestao de contratos", "Planejamento estrategico", "Principios da Administracao Publica", "Servicos publicos", "Delegacao de servicos", "Convenios e consorcios", "Relacoes humanas no trabalho", "Etica e cidadania", "Lei de Improbidade Administrativa"]},
            {"name": "Nocoes de Direito Constitucional", "questionCount": 12, "topics": ["Direitos e garantias fundamentais", "Direitos sociais", "Direitos politicos", "Organizacao do Estado", "Poder Legislativo", "Poder Executivo", "Poder Judiciario", "CNJ", "Funcoes essenciais a justica", "Ministerio Publico", "Advocacia", "Defensorias Publicas", "Forcas Armadas", "Seguranca Publica"]},
            {"name": "Nocoes de Direitos Humanos", "questionCount": 10, "topics": ["Conceito e fundamentacao dos Direitos Humanos", "Responsabilidade do Estado", "Direitos Humanos na CRFB/88", "Politica Nacional de Direitos Humanos", "Violencias de genero", "Violencia domestica", "Lei Maria da Penha", "Racismo", "Racismo institucional", "Estatuto da Igualdade Racial", "Estatuto da Pessoa com Deficiencia", "Direito das pessoas moradoras de favelas", "Vitimas de violencia de Estado", "Diversidade sexual", "Pessoas LGBTQIA+", "Homofobia", "Orientacao sexual e identidade de genero", "Crime de racismo", "Tortura", "Garantias judiciais e direitos pre-processuais", "Direito a nao ser torturado", "Populacao em situacao de rua", "Politicas Publicas", "Recolhimento compulsorio"]},
            {"name": "Nocoes de Direito Penal Militar/Processo Penal Militar", "questionCount": 12, "topics": ["Aplicacao da lei penal militar", "Crime", "Imputabilidade penal", "Concurso de agentes", "Penas", "Suspensao condicional da pena", "Livramento condicional", "Penas acessorias", "Efeitos da condenacao", "Medidas de seguranca", "Acao penal", "Extincao da punibilidade", "Crimes militares em tempo de paz", "Crimes propriamente militares e impropriamente militares", "Crimes contra a pessoa", "Crimes contra o patrimonio", "Crimes contra a administracao militar", "Crimes em tempo de guerra"]},
            {"name": "Nocoes de Direito Penal e Processual Penal", "questionCount": 12, "topics": ["Aplicacao da lei processual", "Disposicoes preliminares do CPP", "Inquerito policial", "Acao penal", "Prisao e liberdade provisoria", "Prisao temporaria", "Crimes de responsabilidade dos funcionarios publicos", "Habeas corpus", "Disposicoes constitucionais aplicaveis ao Processo Penal"]},
            {"name": "Nocoes de Criminologia", "questionCount": 8, "topics": ["Crime como fato social", "Instituicoes sociais relacionadas ao crime", "Extensao da criminalidade", "Crime como fenomeno de massa", "Narcotrafico", "Terrorismo", "Crime organizado", "Homicidio", "Tipos criminosos", "Criminoso nato", "Criminoso ocasional", "Criminoso habitual ou profissional", "Criminoso passional", "Criminoso alienado", "Delinquencia juvenil", "Mulher criminosa", "Atividades repressivas, preventivas e educacionais"]},
            {"name": "Seguranca Publica", "questionCount": 6, "topics": ["Direitos Humanos", "Desarmamento", "Combate aos preconceitos", "Redes sociais e comunitarias", "Instituicoes de seguranca publica e sistema prisional", "Crime organizado", "Corrupcao policial", "Acesso a Justica", "Espacos publicos", "Participacao da sociedade civil", "PRONASCI"]},
        ],
    },
}


DOMAIN_TO_NOTICE = {
    "Lingua Portuguesa": "Lingua Portuguesa/Interpretacao de Textos",
    "Raciocinio Logico": "Raciocinio Logico",
    "Atualidades/Historia do Ceara": "Atualidades/Historia do Ceara",
    "Administracao Publica/Etica": "Nocoes de Administracao Publica/Etica no Servico Publico",
    "Direito Constitucional - Direitos Humanos": "Direito Constitucional/Direitos Humanos",
    "Nocoes de Direito Constitucional": "Nocoes de Direito Constitucional",
    "Nocoes de Direitos Humanos": "Nocoes de Direitos Humanos",
    "Direito Penal Militar e Processual Militar": "Direito Penal Militar/Processo Penal Militar",
    "Nocoes de Direito Penal Militar/Processo Penal Militar": "Nocoes de Direito Penal Militar/Processo Penal Militar",
    "Direito Penal": "Direito Penal/Processual Penal",
    "Nocoes de Direito Penal e Processual Penal": "Nocoes de Direito Penal e Processual Penal",
    "Criminologia": "Criminologia",
    "Nocoes de Criminologia": "Nocoes de Criminologia",
    "Seguranca Publica": "Seguranca Publica",
}


KEYWORDS = {
    "Interpretacao de Texto": ["interpretacao", "compreensao", "texto", "leitura"],
    "Historia do Ceara": ["ceara", "confederacao", "sudene", "coronelismo", "colonial"],
    "Administracao Geral": ["organizacional", "planejamento", "direcao", "controle", "departamentalizacao"],
    "Organizacao Administrativa": ["administracao direta", "indireta", "agencias"],
    "Crimes Militares em Especie": ["crimes militares", "crimes contra", "tempo de guerra"],
    "Crime Organizado": ["crime organizado"],
    "Prisoes e Medidas Cautelares": ["prisao", "liberdade provisoria"],
    "Direitos Politicos": ["direitos politicos"],
    "Direitos e Garantias Fundamentais": ["direitos e garantias fundamentais", "direitos individuais"],
    "Protecao a Mulher": ["violencia domestica", "maria da penha", "violencias de genero"],
    "Igualdade e Nao Discriminacao": ["racismo", "igualdade racial", "homofobia", "discriminacao", "preconceitos"],
    "Argumentacao": ["interpretacao", "texto", "compreensao"],
    "Figuras de Linguagem": ["significacao contextual", "interpretacao", "texto"],
    "Semantica": ["significacao contextual", "palavras e expressoes"],
    "Morfologia Verbal": ["tempos e modos verbais", "flexao nominal e verbal"],
    "Morfossintaxe": ["sintaxe", "classes de palavras"],
    "Norma Culta": ["concordancia", "regencia", "ortografia", "acentuacao"],
    "Coesao Textual": ["articulacao", "pronomes", "expressoes referenciais", "nexos"],
    "Vozes do Discurso": ["equivalencia", "transformacao de estruturas"],
    "Matematica Basica": ["raciocinio matematico", "problemas aritmeticos", "raciocinio sequencial", "orientacao temporal"],
    "Analise Combinatoria": ["raciocinio matematico", "problemas aritmeticos", "deducao de novas informacoes"],
    "Aritmetica": ["problemas aritmeticos", "raciocinio matematico"],
    "Conjuntos": ["operacoes com conjuntos"],
    "Geometria": ["problemas geometricos"],
    "Probabilidade": ["raciocinio matematico", "deducao de novas informacoes"],
    "Logica Proposicional": ["estrutura logica", "estruturas logicas", "deducao de novas informacoes", "logica de uma situacao"],
    "Logica de Posicionamento": ["orientacao espacial", "estrutura logica"],
    "Sequencias Logicas": ["raciocinio sequencial"],
    "Sistemas Lineares": ["raciocinio matematico", "problemas aritmeticos"],
    "Calendario": ["orientacao temporal", "temporal"],
    "Atualidades Internacionais": ["politica internacional", "mundo contemporaneo"],
    "Geopolitica": ["politica internacional", "mundo contemporaneo"],
    "Relacoes Internacionais": ["politica internacional", "mundo contemporaneo"],
    "Ciencia e Tecnologia": ["descobertas e inovacoes cientificas"],
    "Meio Ambiente e Clima": ["meio ambiente e sociedade", "problemas", "politicas publicas"],
    "Economia": ["economia internacional", "panorama da economia brasileira"],
    "Economia Internacional": ["economia internacional"],
    "Seguranca Publica e Sociedade": ["politica brasileira", "cultura brasileira", "seguranca publica"],
    "Direitos Humanos e Memoria": ["politica brasileira", "cultura brasileira", "direitos humanos"],
    "Historia Regional": ["sudene", "dnocs", "industria da seca"],
    "Etica no Servico Publico": ["etica e cidadania"],
    "Gestao de Pessoas": ["relacoes humanas no trabalho"],
    "Administracao Publica": ["organizacao administrativa", "administracao direta e indireta"],
    "Gestao Publica": ["gestao de processos", "planejamento estrategico", "processo organizacional"],
    "Servicos Publicos": ["servicos publicos", "delegacao de servicos"],
    "Principios da Administracao Publica": ["principios da administracao publica"],
    "Processo Legislativo": ["poder legislativo"],
    "Poder Judiciario": ["poder judiciario", "cnj"],
    "Poder Executivo": ["poder executivo", "ministros de estado"],
    "Defesa do Estado e das Instituicoes Democraticas": ["forcas armadas", "seguranca publica"],
    "Abuso de Autoridade": ["lei de abuso de autoridade", "abuso de autoridade"],
    "Teoria Geral dos Direitos Humanos": ["conceito e fundamentacao", "direitos humanos"],
    "Identidade de Genero": ["identidade de genero", "pessoas lgbtqia"],
    "Pessoa com Deficiencia": ["estatuto da pessoa com deficiencia"],
    "Politica Nacional de Direitos Humanos": ["politica nacional de direitos humanos"],
    "Tortura": ["tortura", "direito a nao ser torturado"],
    "Legislacao Penal Especial": ["estatuto do desarmamento", "lei de drogas", "abuso de autoridade", "crimes hediondos"],
    "Principios Penais": ["direito processual penal", "disposicoes constitucionais"],
    "Principios Processuais Penais": ["disposicoes constitucionais"],
    "Acoes Constitucionais Penais": ["habeas corpus"],
    "Investigacao Criminal": ["inquerito policial"],
    "Aplicacao da Lei Processual Penal": ["aplicacao da lei processual"],
    "Teoria do Crime Militar": ["crime", "imputabilidade penal", "concurso de agentes"],
    "Penas no Direito Penal Militar": ["penas", "livramento condicional", "penas acessorias"],
    "Aplicacao da Lei Penal Militar": ["aplicacao da lei penal militar"],
    "Medidas de Seguranca": ["medidas de seguranca"],
    "Execucao Penal": ["sistemas penitenciarios", "instituicoes sociais relacionadas"],
    "Teoria Geral da Pena": ["atividades repressivas", "preventivas", "educacionais"],
    "Escolas Criminologicas": ["tipos criminosos", "criminoso nato", "criminologia"],
    "Teorias Criminologicas": ["crime como fato social", "instituicoes sociais relacionadas"],
    "Sociologia Criminal": ["crime como fato social"],
    "Controle Social": ["instituicoes sociais relacionadas"],
    "Prevencao Criminal": ["atividades repressivas", "preventivas", "educacionais"],
    "Direito Penal - Parte Especial": ["homicidio"],
    "Estatuto do Desarmamento": ["desarmamento", "estatuto do desarmamento"],
    "Sistema Constitucional de Seguranca Publica": ["instituicoes de seguranca publica", "seguranca publica", "policia ostensiva", "preservacao da ordem publica"],
    "Participacao Social": ["participacao da sociedade civil"],
    "Policiamento Comunitario": ["redes sociais e comunitarias"],
    "Policiamento e Direitos Humanos": ["direitos humanos", "combate aos preconceitos"],
    "Politicas Publicas de Seguranca": ["pronasci", "programa nacional de seguranca publica"],
    "Sistema de Justica Criminal": ["sistema prisional", "acesso a justica"],
    "Acesso a Justica": ["acesso a justica"],
}


REVIEW_ONLY_SUBJECTS = {
    "Direito Penal - Parte Especial",
    "Execucao Penal",
    "Teoria Geral da Pena",
    "Sistema de Justica Criminal",
    "Sistema Constitucional de Seguranca Publica",
}


def normalize(value: str) -> str:
    replacements = str.maketrans("áàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ", "aaaaeeioooucAAAAEEIOOOUC")
    return value.translate(replacements).lower()


def notice_topic_match(subject: str, topic: str, notice_topics: list[str]) -> bool:
    haystack = " | ".join(normalize(item) for item in notice_topics)
    terms = [normalize(subject), normalize(topic)]
    terms.extend(normalize(item) for item in KEYWORDS.get(subject, []))
    return any(term and term in haystack for term in terms)


def classify_notice_coverage(subject: str, topic: str, notice_topics: list[str]) -> str:
    if notice_topic_match(subject, topic, notice_topics):
        return "covered"

    if subject in REVIEW_ONLY_SUBJECTS:
        return "needs_review"

    return "not_covered"


def find_notice_discipline(notice_by_year_and_name: dict, year: str, notice_name: str | None) -> dict | None:
    if not notice_name:
        return None

    direct = notice_by_year_and_name.get((year, notice_name))
    if direct:
        return direct

    normalized_notice_name = normalize(notice_name)
    for (candidate_year, candidate_name), discipline in notice_by_year_and_name.items():
        if candidate_year != year:
            continue

        normalized_candidate = normalize(candidate_name)
        if normalized_notice_name in normalized_candidate or normalized_candidate in normalized_notice_name:
            return discipline

    return None


def main() -> int:
    incidence = json.loads(UNIFIED_INCIDENCE_FILE.read_text(encoding="utf-8"))
    NOTICE_PROGRAMS_FILE.write_text(json.dumps(NOTICE_PROGRAMS, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")

    notice_by_year_and_name = {
        (year, discipline["name"]): discipline
        for year, program in NOTICE_PROGRAMS.items()
        for discipline in program["disciplines"]
    }

    question_rows = []
    for question in incidence["questions"]:
        year = question["year"]
        notice_name = DOMAIN_TO_NOTICE.get(question["domain"])
        notice_discipline = find_notice_discipline(notice_by_year_and_name, year, notice_name)
        coverage_status = (
            classify_notice_coverage(question["subject"], question["topic"], notice_discipline["topics"])
            if notice_discipline
            else "needs_review"
        )
        question_rows.append(
            {
                **question,
                "noticeDiscipline": notice_name,
                "inNotice": coverage_status == "covered",
                "noticeCoverageStatus": coverage_status,
                "noticeQuestionCount": notice_discipline["questionCount"] if notice_discipline else None,
            }
        )

    by_year = defaultdict(list)
    by_notice_gap = defaultdict(list)
    for row in question_rows:
        by_year[row["year"]].append(row)
        if row["noticeCoverageStatus"] != "covered":
            by_notice_gap[(row["year"], row["domain"], row["subject"])].append(row)

    summary = []
    for year, rows in sorted(by_year.items()):
        summary.append(
            {
                "year": year,
                "questionCount": len(rows),
                "coveredCount": sum(1 for row in rows if row["noticeCoverageStatus"] == "covered"),
                "notCoveredCount": sum(1 for row in rows if row["noticeCoverageStatus"] == "not_covered"),
                "needsReviewCount": sum(1 for row in rows if row["noticeCoverageStatus"] == "needs_review"),
                "coverageRate": round(sum(1 for row in rows if row["noticeCoverageStatus"] == "covered") / len(rows), 4),
            }
        )

    output = {
        "meta": {
            "name": "PM CE Soldado - cruzamento edital vs prova 2021-2025",
            "status": "draft",
            "sourceIncidence": str(UNIFIED_INCIDENCE_FILE).replace("\\", "/"),
            "sourceNoticePrograms": str(NOTICE_PROGRAMS_FILE).replace("\\", "/"),
            "description": "Primeiro cruzamento entre conteudo programatico dos editais e topicos efetivamente cobrados nas provas.",
        },
        "summary": summary,
        "noticeChanges": [
            "2025 separa Direito Constitucional e Direitos Humanos em disciplinas distintas; 2021 agrupava os dois no mesmo bloco.",
            "2025 aumenta Penal/Processual Penal de 6 para 12 questoes e remove do edital desse bloco a lista explicita de leis especiais cobrada em 2021.",
            "2025 aumenta Penal Militar/Processo Penal Militar de 10 para 12 questoes.",
            "2025 reduz Administracao Publica/Etica de 10 para 8 questoes e inclui expressamente Principios da Administracao Publica e Lei de Improbidade Administrativa.",
            "2025 amplia Direitos Humanos com racismo institucional, pessoas moradoras de favelas, pessoas LGBTQIA+, garantias judiciais, populacao em situacao de rua, politicas publicas e recolhimento compulsorio.",
            "2025 inclui em Constitucional os topicos Das Forcas Armadas e Da Seguranca Publica.",
        ],
        "questions": question_rows,
        "needsReviewGroups": [
            {
                "year": year,
                "domain": domain,
                "subject": subject,
                "coverageStatus": rows[0]["noticeCoverageStatus"],
                "questionCount": len(rows),
                "questionIds": [row["questionId"] for row in rows],
            }
            for (year, domain, subject), rows in sorted(by_notice_gap.items())
        ],
    }

    OUTPUT_FILE.write_text(json.dumps(output, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")

    print(f"Programas estruturados: {NOTICE_PROGRAMS_FILE}")
    print(f"Cruzamento gerado: {OUTPUT_FILE}")
    for item in summary:
        print(
            f"{item['year']}: {item['coveredCount']}/{item['questionCount']} covered, "
            f"{item['notCoveredCount']} not_covered, {item['needsReviewCount']} needs_review"
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())
