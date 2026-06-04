from __future__ import annotations

import json
import sys
from collections import defaultdict
from pathlib import Path


NOTICE_FILE = Path("scratch/pm-ce-soldado-dev/notice-programs-2021-2025-draft.json")
NOTICE_VS_EXAM_FILE = Path("scratch/pm-ce-soldado-dev/notice-vs-exam-2021-2025-draft.json")
QUESTIONS_FILE = Path("scratch/pm-ce-soldado-dev/question-texts-2021-2025-draft.json")
OUTPUT_FILE = Path("scratch/pm-ce-soldado-dev/diagnostic-exam-50-notice-2025-weighted-draft.json")
TARGET_YEAR = "2025"
TARGET_SIZE = 50


NOTICE_DISCIPLINE_TO_DOMAINS = {
    "Lingua Portuguesa/Interpretacao de Textos": ["Lingua Portuguesa"],
    "Raciocinio Logico": ["Raciocinio Logico"],
    "Atualidades/Historia do Ceara": ["Atualidades/Historia do Ceara"],
    "Nocoes de Administracao Publica/Etica no Servico Publico": ["Administracao Publica/Etica"],
    "Nocoes de Direito Constitucional": ["Nocoes de Direito Constitucional", "Direito Constitucional - Direitos Humanos"],
    "Nocoes de Direitos Humanos": ["Nocoes de Direitos Humanos", "Direito Constitucional - Direitos Humanos"],
    "Nocoes de Direito Penal Militar/Processo Penal Militar": [
        "Nocoes de Direito Penal Militar/Processo Penal Militar",
        "Direito Penal Militar e Processual Militar",
    ],
    "Nocoes de Direito Penal e Processual Penal": ["Nocoes de Direito Penal e Processual Penal", "Direito Penal"],
    "Nocoes de Criminologia": ["Nocoes de Criminologia", "Criminologia"],
    "Seguranca Publica": ["Seguranca Publica"],
}


def allocate_counts(items: list[dict], total: int, count_key: str) -> dict[str, int]:
    total_weight = sum(item[count_key] for item in items)
    allocated = []

    for item in items:
        exact = item[count_key] / total_weight * total
        floor_value = int(exact)
        allocated.append(
            {
                "name": item["name"],
                "count": floor_value,
                "fraction": exact - floor_value,
                "weight": item[count_key],
            }
        )

    remaining = total - sum(item["count"] for item in allocated)
    for item in sorted(allocated, key=lambda row: (-row["fraction"], -row["weight"], row["name"]))[:remaining]:
        item["count"] += 1

    return {item["name"]: item["count"] for item in allocated}


def score_question(question: dict) -> tuple[int, int, int, str]:
    coverage = question.get("noticeCoverageStatus")
    target_year_bonus = 3 if question["year"] == TARGET_YEAR else 0
    coverage_bonus = 5 if coverage == "covered" else 1 if coverage == "needs_review" else 0
    confidence_bonus = 1 if question.get("confidence") == "high" else 0
    return (-coverage_bonus, -target_year_bonus, -confidence_bonus, question["questionId"])


def main() -> int:
    notices = json.loads(NOTICE_FILE.read_text(encoding="utf-8"))
    notice_vs_exam = json.loads(NOTICE_VS_EXAM_FILE.read_text(encoding="utf-8"))
    question_texts = json.loads(QUESTIONS_FILE.read_text(encoding="utf-8"))["questions"]
    question_text_by_id = {item["id"]: item for item in question_texts}

    target_notice = notices[TARGET_YEAR]
    notice_disciplines = target_notice["disciplines"]
    discipline_counts = allocate_counts(notice_disciplines, TARGET_SIZE, "questionCount")

    rows_by_domain = defaultdict(list)
    for row in notice_vs_exam["questions"]:
        rows_by_domain[row["domain"]].append(row)

    selected = []
    blueprint_disciplines = []

    for notice_discipline in notice_disciplines:
        notice_name = notice_discipline["name"]
        target_count = discipline_counts[notice_name]
        domains = NOTICE_DISCIPLINE_TO_DOMAINS.get(notice_name, [])
        candidates = []

        for domain in domains:
            candidates.extend(rows_by_domain.get(domain, []))

        candidates = sorted(candidates, key=score_question)
        chosen = []
        seen_ids = set()
        for candidate in candidates:
            if candidate["questionId"] in seen_ids:
                continue
            chosen.append(candidate)
            seen_ids.add(candidate["questionId"])
            if len(chosen) == target_count:
                break

        selected.extend(chosen)
        blueprint_disciplines.append(
            {
                "noticeDiscipline": notice_name,
                "noticeQuestionCount": notice_discipline["questionCount"],
                "selectedQuestionCount": len(chosen),
                "domains": domains,
            }
        )

    questions = []
    for position, row in enumerate(selected, start=1):
        source = question_text_by_id[row["questionId"]]
        questions.append(
            {
                "position": position,
                "questionId": row["questionId"],
                "year": row["year"],
                "board": source["board"],
                "originalNumber": row["number"],
                "noticeDiscipline": row["noticeDiscipline"],
                "domain": row["domain"],
                "discipline": row["discipline"],
                "subject": row["subject"],
                "topic": row["topic"],
                "noticeCoverageStatus": row["noticeCoverageStatus"],
                "statement": source["statement"],
                "alternatives": source["alternatives"],
                "answer": source["answer"],
            }
        )

    by_year = defaultdict(int)
    by_coverage = defaultdict(int)
    by_subject = defaultdict(int)
    for question in questions:
        by_year[question["year"]] += 1
        by_coverage[question["noticeCoverageStatus"]] += 1
        by_subject[(question["noticeDiscipline"], question["subject"])] += 1

    payload = {
        "meta": {
            "name": "PM CE Soldado - simulado diagnostico 50 questoes ponderado pelo edital 2025",
            "status": "draft",
            "targetNoticeYear": TARGET_YEAR,
            "targetQuestionCount": TARGET_SIZE,
            "actualQuestionCount": len(questions),
            "sourceNoticePrograms": str(NOTICE_FILE).replace("\\", "/"),
            "sourceNoticeVsExam": str(NOTICE_VS_EXAM_FILE).replace("\\", "/"),
            "selectionMode": "notice_2025_first_then_historical_incidence",
            "description": "Distribui questoes pelo peso do edital 2025 e seleciona itens cobertos pelo edital priorizando a prova-alvo e a incidencia historica.",
        },
        "blueprint": {
            "disciplines": blueprint_disciplines,
            "years": [{"year": year, "questionCount": count} for year, count in sorted(by_year.items())],
            "coverage": [{"status": status, "questionCount": count} for status, count in sorted(by_coverage.items())],
            "subjects": [
                {
                    "noticeDiscipline": notice_discipline,
                    "subject": subject,
                    "questionCount": count,
                }
                for (notice_discipline, subject), count in sorted(by_subject.items(), key=lambda item: (-item[1], item[0][0], item[0][1]))
            ],
        },
        "questions": questions,
    }

    OUTPUT_FILE.write_text(json.dumps(payload, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")

    print(f"Questoes selecionadas: {len(questions)}")
    print(f"Arquivo gerado: {OUTPUT_FILE}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
