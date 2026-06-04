from __future__ import annotations

import json
import sys
from collections import defaultdict
from pathlib import Path


MATRIX_FILE = Path("scratch/pm-ce-soldado-dev/pm-ce-soldado-unified-incidence-2021-2025-draft.json")
QUESTIONS_FILE = Path("scratch/pm-ce-soldado-dev/question-texts-2021-2025-draft.json")
OUTPUT_FILE = Path("scratch/pm-ce-soldado-dev/diagnostic-exam-50-draft.json")
TARGET_SIZE = 50


def allocate_counts(groups: list[dict], total: int) -> dict[str, int]:
    raw = []

    for group in groups:
        exact = group["questionCount"] / sum(item["questionCount"] for item in groups) * total
        floor_value = int(exact)
        raw.append(
            {
                "domain": group["domain"],
                "exact": exact,
                "count": floor_value,
                "fraction": exact - floor_value,
                "available": group["questionCount"],
            }
        )

    remaining = total - sum(item["count"] for item in raw)
    for item in sorted(raw, key=lambda value: (-value["fraction"], -value["available"], value["domain"]))[:remaining]:
        item["count"] += 1

    return {item["domain"]: item["count"] for item in raw}


def select_questions(questions: list[dict], counts: dict[str, int]) -> list[dict]:
    by_domain: dict[str, list[dict]] = defaultdict(list)
    selected: list[dict] = []

    for question in questions:
        by_domain[question["domain"]].append(question)

    for domain, target in sorted(counts.items()):
        candidates = sorted(
            by_domain[domain],
            key=lambda item: (
                item["subject"],
                item["topic"],
                item["year"],
                item["number"],
            ),
        )

        # Alterna anos quando possivel para nao concentrar a amostra em uma prova so.
        ordered = []
        by_year = defaultdict(list)
        for candidate in candidates:
            by_year[candidate["year"]].append(candidate)

        years = sorted(by_year)
        while len(ordered) < len(candidates):
            progressed = False
            for year in years:
                if by_year[year]:
                    ordered.append(by_year[year].pop(0))
                    progressed = True
            if not progressed:
                break

        selected.extend(ordered[:target])

    return sorted(selected, key=lambda item: (item["domain"], item["subject"], item["topic"], item["year"], item["number"]))


def main() -> int:
    matrix = json.loads(MATRIX_FILE.read_text(encoding="utf-8"))
    question_texts = json.loads(QUESTIONS_FILE.read_text(encoding="utf-8"))["questions"]
    question_text_by_id = {item["id"]: item for item in question_texts}

    counts = allocate_counts(matrix["domains"], TARGET_SIZE)
    selected_matrix_questions = select_questions(matrix["questions"], counts)

    questions = []
    for position, matrix_question in enumerate(selected_matrix_questions, start=1):
        text_question = question_text_by_id[matrix_question["questionId"]]
        questions.append(
            {
                "position": position,
                "questionId": matrix_question["questionId"],
                "year": matrix_question["year"],
                "board": text_question["board"],
                "originalNumber": matrix_question["number"],
                "domain": matrix_question["domain"],
                "discipline": matrix_question["discipline"],
                "subject": matrix_question["subject"],
                "topic": matrix_question["topic"],
                "statement": text_question["statement"],
                "alternatives": text_question["alternatives"],
                "answer": text_question["answer"],
            }
        )

    by_domain = defaultdict(int)
    by_subject = defaultdict(int)
    for question in questions:
        by_domain[question["domain"]] += 1
        by_subject[(question["domain"], question["subject"])] += 1

    payload = {
        "meta": {
            "name": "PM CE Soldado - simulado diagnostico 50 questoes",
            "status": "draft",
            "sourceMatrix": str(MATRIX_FILE).replace("\\", "/"),
            "sourceQuestions": str(QUESTIONS_FILE).replace("\\", "/"),
            "targetQuestionCount": TARGET_SIZE,
            "actualQuestionCount": len(questions),
            "selectionMode": "deterministic_weighted_by_domain",
            "description": "Simulado de teste distribuido proporcionalmente aos pesos historicos de 2021 e 2025.",
        },
        "blueprint": {
            "domains": [
                {
                    "domain": domain,
                    "questionCount": count,
                    "weight": round(count / len(questions), 4) if questions else 0,
                }
                for domain, count in sorted(by_domain.items(), key=lambda item: (-item[1], item[0]))
            ],
            "subjects": [
                {
                    "domain": domain,
                    "subject": subject,
                    "questionCount": count,
                }
                for (domain, subject), count in sorted(by_subject.items(), key=lambda item: (-item[1], item[0][0], item[0][1]))
            ],
        },
        "questions": questions,
    }

    OUTPUT_FILE.write_text(json.dumps(payload, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")

    print(f"Questoes selecionadas: {len(questions)}")
    print(f"Dominios no simulado: {len(by_domain)}")
    print(f"Arquivo gerado: {OUTPUT_FILE}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
