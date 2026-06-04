from __future__ import annotations

import json
import sys
from collections import defaultdict
from pathlib import Path


QUESTIONS_FILE = Path("scratch/pm-ce-soldado-dev/question-texts-2021-2025-draft.json")
CLASSIFICATION_FILE = Path("scratch/pm-ce-soldado-dev/general-knowledge-classification-draft.json")
INCIDENCE_FILE = Path("scratch/pm-ce-soldado-dev/general-knowledge-incidence-draft.json")


MAPPINGS: dict[str, tuple[str, str, str]] = {
    "pm-ce-soldado-2021-q001": ("Lingua Portuguesa", "Interpretacao de Texto", "Estrutura e paralelismo textual"),
    "pm-ce-soldado-2021-q002": ("Lingua Portuguesa", "Interpretacao de Texto", "Sentido figurado"),
    "pm-ce-soldado-2021-q003": ("Lingua Portuguesa", "Semantica", "Sinonimia e substituicao de termos"),
    "pm-ce-soldado-2021-q004": ("Lingua Portuguesa", "Figuras de Linguagem", "Metafora"),
    "pm-ce-soldado-2021-q005": ("Lingua Portuguesa", "Interpretacao de Texto", "Humor e duplo sentido"),
    "pm-ce-soldado-2021-q006": ("Lingua Portuguesa", "Interpretacao de Texto", "Mensagem central"),
    "pm-ce-soldado-2021-q007": ("Lingua Portuguesa", "Interpretacao de Texto", "Inferencia e quebra de expectativa"),
    "pm-ce-soldado-2021-q008": ("Lingua Portuguesa", "Figuras de Linguagem", "Comparacao"),
    "pm-ce-soldado-2021-q009": ("Lingua Portuguesa", "Interpretacao de Texto", "Licao ou ideia central"),
    "pm-ce-soldado-2021-q010": ("Lingua Portuguesa", "Argumentacao", "Tipos de argumento"),
    "pm-ce-soldado-2021-q011": ("Raciocinio Logico", "Matematica Basica", "Sequencias e progressoes"),
    "pm-ce-soldado-2021-q012": ("Raciocinio Logico", "Analise Combinatoria", "Formacao de pares"),
    "pm-ce-soldado-2021-q013": ("Raciocinio Logico", "Matematica Basica", "Tabelas e sistemas de soma"),
    "pm-ce-soldado-2021-q014": ("Raciocinio Logico", "Probabilidade", "Transferencia entre urnas"),
    "pm-ce-soldado-2021-q015": ("Raciocinio Logico", "Matematica Basica", "Media e equalizacao de valores"),
    "pm-ce-soldado-2021-q016": ("Raciocinio Logico", "Aritmetica", "MMC e divisibilidade"),
    "pm-ce-soldado-2021-q017": ("Raciocinio Logico", "Matematica Basica", "Operacoes com tempo"),
    "pm-ce-soldado-2021-q018": ("Raciocinio Logico", "Conjuntos", "Intersecao minima"),
    "pm-ce-soldado-2021-q019": ("Raciocinio Logico", "Geometria", "Variacao de area"),
    "pm-ce-soldado-2021-q020": ("Raciocinio Logico", "Geometria", "Volume da esfera"),
    "pm-ce-soldado-2021-q021": ("Atualidades/Historia do Ceara", "Atualidades Internacionais", "Tribunal Penal Internacional"),
    "pm-ce-soldado-2021-q022": ("Atualidades/Historia do Ceara", "Meio Ambiente e Clima", "COP26 e mudancas climaticas"),
    "pm-ce-soldado-2021-q023": ("Atualidades/Historia do Ceara", "Seguranca Publica e Sociedade", "Mulheres na Policia Militar"),
    "pm-ce-soldado-2021-q024": ("Atualidades/Historia do Ceara", "Economia", "Commodities e cadeia de producao"),
    "pm-ce-soldado-2021-q025": ("Atualidades/Historia do Ceara", "Geopolitica", "Missil hipersonico chines"),
    "pm-ce-soldado-2021-q026": ("Atualidades/Historia do Ceara", "Historia do Ceara", "Colonizacao tardia do Ceara"),
    "pm-ce-soldado-2021-q027": ("Atualidades/Historia do Ceara", "Historia do Ceara", "Confederacao do Equador"),
    "pm-ce-soldado-2021-q028": ("Atualidades/Historia do Ceara", "Historia Regional", "SUDENE"),
    "pm-ce-soldado-2021-q029": ("Atualidades/Historia do Ceara", "Direitos Humanos e Memoria", "Anistia e reparacao no Ceara"),
    "pm-ce-soldado-2021-q030": ("Atualidades/Historia do Ceara", "Historia do Ceara", "Governos militares e coronelismo"),
    "pm-ce-soldado-2021-q031": ("Administracao Publica/Etica", "Etica no Servico Publico", "Principios da funcao publica"),
    "pm-ce-soldado-2021-q032": ("Administracao Publica/Etica", "Etica no Servico Publico", "Conduta etica do servidor"),
    "pm-ce-soldado-2021-q033": ("Administracao Publica/Etica", "Gestao de Pessoas", "Motivacao nas organizacoes"),
    "pm-ce-soldado-2021-q034": ("Administracao Publica/Etica", "Administracao Geral", "Cultura organizacional"),
    "pm-ce-soldado-2021-q035": ("Administracao Publica/Etica", "Organizacao Administrativa", "Administracao direta e indireta"),
    "pm-ce-soldado-2021-q036": ("Administracao Publica/Etica", "Organizacao Administrativa", "Entidades da administracao indireta"),
    "pm-ce-soldado-2021-q037": ("Administracao Publica/Etica", "Gestao de Pessoas", "Teorias motivacionais"),
    "pm-ce-soldado-2021-q038": ("Administracao Publica/Etica", "Administracao Publica", "Agencias reguladoras"),
    "pm-ce-soldado-2021-q039": ("Administracao Publica/Etica", "Administracao Geral", "Funcoes administrativas"),
    "pm-ce-soldado-2021-q040": ("Administracao Publica/Etica", "Administracao Geral", "Niveis organizacionais"),
    "pm-ce-soldado-2025-q001": ("Lingua Portuguesa", "Interpretacao de Texto", "Tema central"),
    "pm-ce-soldado-2025-q002": ("Lingua Portuguesa", "Interpretacao de Texto", "Inferencia textual"),
    "pm-ce-soldado-2025-q003": ("Lingua Portuguesa", "Interpretacao de Texto", "Argumentacao textual"),
    "pm-ce-soldado-2025-q004": ("Lingua Portuguesa", "Interpretacao de Texto", "Eixo estruturante do texto"),
    "pm-ce-soldado-2025-q005": ("Lingua Portuguesa", "Semantica", "Sinonimia contextual"),
    "pm-ce-soldado-2025-q006": ("Lingua Portuguesa", "Morfossintaxe", "Funcao sintatica"),
    "pm-ce-soldado-2025-q007": ("Lingua Portuguesa", "Morfologia Verbal", "Tempos verbais"),
    "pm-ce-soldado-2025-q008": ("Lingua Portuguesa", "Vozes do Discurso", "Discurso direto e indireto"),
    "pm-ce-soldado-2025-q009": ("Lingua Portuguesa", "Coesao Textual", "Pronomes e referentes"),
    "pm-ce-soldado-2025-q010": ("Lingua Portuguesa", "Morfossintaxe", "Classificacao sintatica"),
    "pm-ce-soldado-2025-q011": ("Lingua Portuguesa", "Norma Culta", "Regencia e concordancia"),
    "pm-ce-soldado-2025-q012": ("Lingua Portuguesa", "Morfologia Verbal", "Emprego verbal"),
    "pm-ce-soldado-2025-q013": ("Raciocinio Logico", "Logica Proposicional", "Proposicoes e conectivos"),
    "pm-ce-soldado-2025-q014": ("Raciocinio Logico", "Logica Proposicional", "Negacao de proposicao composta"),
    "pm-ce-soldado-2025-q015": ("Raciocinio Logico", "Logica Proposicional", "Implicacoes encadeadas"),
    "pm-ce-soldado-2025-q016": ("Raciocinio Logico", "Sequencias Logicas", "Sequencia numerica"),
    "pm-ce-soldado-2025-q017": ("Raciocinio Logico", "Analise Combinatoria", "Combinacao e classificacao"),
    "pm-ce-soldado-2025-q018": ("Raciocinio Logico", "Aritmetica", "Divisibilidade"),
    "pm-ce-soldado-2025-q019": ("Raciocinio Logico", "Logica de Posicionamento", "Ordenacao espacial"),
    "pm-ce-soldado-2025-q020": ("Raciocinio Logico", "Sistemas Lineares", "Compras e precos"),
    "pm-ce-soldado-2025-q021": ("Raciocinio Logico", "Matematica Basica", "Porcentagem e diferenca"),
    "pm-ce-soldado-2025-q022": ("Raciocinio Logico", "Calendario", "Contagem de dias uteis"),
    "pm-ce-soldado-2025-q023": ("Atualidades/Historia do Ceara", "Meio Ambiente e Clima", "Mudancas climaticas"),
    "pm-ce-soldado-2025-q024": ("Atualidades/Historia do Ceara", "Relacoes Internacionais", "Cooperacao Sul-Sul"),
    "pm-ce-soldado-2025-q025": ("Atualidades/Historia do Ceara", "Ciencia e Tecnologia", "Fusao nuclear e sol artificial"),
    "pm-ce-soldado-2025-q026": ("Atualidades/Historia do Ceara", "Economia Internacional", "Guerra tarifaria e NDB"),
    "pm-ce-soldado-2025-q027": ("Atualidades/Historia do Ceara", "Historia do Ceara", "Guerra dos Barbaros"),
    "pm-ce-soldado-2025-q028": ("Atualidades/Historia do Ceara", "Economia", "Commodities e economia brasileira"),
    "pm-ce-soldado-2025-q029": ("Atualidades/Historia do Ceara", "Historia do Ceara", "Republica Velha e Sedicao de Juazeiro"),
    "pm-ce-soldado-2025-q030": ("Atualidades/Historia do Ceara", "Historia do Ceara", "Novo coronelismo no Ceara"),
    "pm-ce-soldado-2025-q031": ("Atualidades/Historia do Ceara", "Historia Regional", "SUDENE"),
    "pm-ce-soldado-2025-q032": ("Atualidades/Historia do Ceara", "Historia do Ceara", "Confederacao do Equador no Ceara"),
    "pm-ce-soldado-2025-q033": ("Administracao Publica/Etica", "Administracao Geral", "Departamentalizacao"),
    "pm-ce-soldado-2025-q034": ("Administracao Publica/Etica", "Administracao Geral", "Planejamento"),
    "pm-ce-soldado-2025-q035": ("Administracao Publica/Etica", "Organizacao Administrativa", "Agencias reguladoras"),
    "pm-ce-soldado-2025-q036": ("Administracao Publica/Etica", "Organizacao Administrativa", "Natureza juridica da Policia Militar"),
    "pm-ce-soldado-2025-q037": ("Administracao Publica/Etica", "Gestao Publica", "Gestao de projetos e acoes"),
    "pm-ce-soldado-2025-q038": ("Administracao Publica/Etica", "Gestao Publica", "Plano de direcionamento organizacional"),
    "pm-ce-soldado-2025-q039": ("Administracao Publica/Etica", "Principios da Administracao Publica", "Impessoalidade"),
    "pm-ce-soldado-2025-q040": ("Administracao Publica/Etica", "Servicos Publicos", "Concessao de servico publico"),
}


def yearly_counts(items: list[dict], years: list[str]) -> dict[str, int]:
    return {year: sum(1 for item in items if item["year"] == year) for year in years}


def main() -> int:
    questions = json.loads(QUESTIONS_FILE.read_text(encoding="utf-8"))["questions"]
    by_id = {item["id"]: item for item in questions}
    classifications = []

    for question_id, (domain, subject, topic) in MAPPINGS.items():
        question = by_id[question_id]
        classifications.append(
            {
                "questionId": question_id,
                "year": question["year"],
                "number": question["number"],
                "discipline": question["discipline"],
                "domain": domain,
                "subject": subject,
                "topic": topic,
                "confidence": "high",
            }
        )

    classification_payload = {
        "meta": {
            "name": "PM CE Soldado - classificacao inicial de conhecimentos gerais",
            "sourceQuestions": str(QUESTIONS_FILE).replace("\\", "/"),
            "status": "draft",
            "scope": "Classificacao de Portugues, Raciocinio Logico, Atualidades/Historia do Ceara e Administracao Publica/Etica.",
        },
        "classifications": classifications,
    }
    CLASSIFICATION_FILE.write_text(json.dumps(classification_payload, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")

    years = sorted({item["year"] for item in classifications})
    by_domain = defaultdict(list)
    by_subject = defaultdict(list)
    by_topic = defaultdict(list)

    for item in classifications:
        by_domain[item["domain"]].append(item)
        by_subject[(item["domain"], item["subject"])].append(item)
        by_topic[(item["domain"], item["subject"], item["topic"])].append(item)

    incidence_payload = {
        "meta": {
            "name": "PM CE Soldado - incidencia de conhecimentos gerais",
            "sourceClassification": str(CLASSIFICATION_FILE).replace("\\", "/"),
            "status": "draft",
            "years": years,
            "questionCount": len(classifications),
        },
        "domains": sorted(
            [
                {
                    "domain": domain,
                    "questionCount": len(items),
                    "appearsInYears": sorted({item["year"] for item in items}),
                    "years": yearly_counts(items, years),
                }
                for domain, items in by_domain.items()
            ],
            key=lambda item: (-item["questionCount"], item["domain"]),
        ),
        "subjects": sorted(
            [
                {
                    "domain": domain,
                    "subject": subject,
                    "questionCount": len(items),
                    "appearsInYears": sorted({item["year"] for item in items}),
                    "appearanceRate": round(len({item["year"] for item in items}) / len(years), 4),
                    "years": yearly_counts(items, years),
                }
                for (domain, subject), items in by_subject.items()
            ],
            key=lambda item: (-item["questionCount"], item["domain"], item["subject"]),
        ),
        "topics": sorted(
            [
                {
                    "domain": domain,
                    "subject": subject,
                    "topic": topic,
                    "questionCount": len(items),
                    "appearsInYears": sorted({item["year"] for item in items}),
                    "appearanceRate": round(len({item["year"] for item in items}) / len(years), 4),
                    "years": yearly_counts(items, years),
                    "questionIds": [item["questionId"] for item in items],
                }
                for (domain, subject, topic), items in by_topic.items()
            ],
            key=lambda item: (-item["questionCount"], item["domain"], item["subject"], item["topic"]),
        ),
    }
    INCIDENCE_FILE.write_text(json.dumps(incidence_payload, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")

    print(f"Classificacoes: {len(classifications)}")
    print(f"Dominios: {len(incidence_payload['domains'])}")
    print(f"Assuntos: {len(incidence_payload['subjects'])}")
    print(f"Topicos: {len(incidence_payload['topics'])}")
    print(f"Classificacao: {CLASSIFICATION_FILE}")
    print(f"Incidencia: {INCIDENCE_FILE}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
