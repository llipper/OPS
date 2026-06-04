from __future__ import annotations

import json
import re
import sys
from pathlib import Path


MATRIX_FILE = Path("scratch/pm-ce-soldado-dev/pm-ce-soldado-discipline-incidence-draft.json")
ANSWER_KEYS_FILE = Path("scratch/pm-ce-soldado-dev/normalized-answer-keys.json")
OUTPUT_FILE = Path("scratch/pm-ce-soldado-dev/question-catalog-draft.json")


def parse_range(value: str) -> range:
    match = re.match(r"^(\d+)-(\d+)$", value)
    if not match:
        raise ValueError(f"Invalid question range: {value}")

    start = int(match.group(1))
    end = int(match.group(2))
    return range(start, end + 1)


def get_answer_map(answer_key_item: dict) -> dict[int, str]:
    keys = answer_key_item.get("keys", {})

    if "default" in keys:
        selected = keys["default"]
    elif "GABARITO 1" in keys:
        selected = keys["GABARITO 1"]
    elif "Tipo 1" in keys:
        selected = keys["Tipo 1"]
    else:
        selected = next(iter(keys.values()), [])

    return {item["number"]: item["answer"] for item in selected}


def main() -> int:
    matrix = json.loads(MATRIX_FILE.read_text(encoding="utf-8"))
    answer_keys = json.loads(ANSWER_KEYS_FILE.read_text(encoding="utf-8"))
    answer_by_contest = {item["contestId"]: item for item in answer_keys["items"]}

    questions = []

    for contest in matrix["contests"]:
        contest_id = contest["contestId"]
        answer_item = answer_by_contest.get(contest_id)
        answer_map = get_answer_map(answer_item) if answer_item else {}

        for discipline in contest["disciplines"]:
            question_range = discipline.get("questionRange")
            if not question_range:
                continue

            for number in parse_range(question_range):
                questions.append(
                    {
                        "id": f"{contest_id}-q{number:03d}",
                        "contestId": contest_id,
                        "year": contest["year"],
                        "board": contest["board"],
                        "number": number,
                        "discipline": discipline["name"],
                        "answer": answer_map.get(number),
                        "sourceConfidence": {
                            "discipline": discipline.get("confidence", "low"),
                            "answerKey": answer_item.get("confidence", "low") if answer_item else "missing",
                        },
                        "statement": None,
                        "subject": None,
                        "topic": None,
                        "status": "metadata_only",
                    }
                )

    payload = {
        "meta": {
            "name": "PM CE Soldado - catalogo inicial de questoes",
            "sourceMatrix": str(MATRIX_FILE).replace("\\", "/"),
            "sourceAnswerKeys": str(ANSWER_KEYS_FILE).replace("\\", "/"),
            "status": "draft",
            "description": "Catalogo com metadados, disciplina e gabarito. Enunciados, assuntos e topicos serao preenchidos na proxima etapa.",
        },
        "questions": questions,
    }

    OUTPUT_FILE.write_text(json.dumps(payload, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")

    print(f"Questoes no catalogo: {len(questions)}")
    print(f"Arquivo gerado: {OUTPUT_FILE}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
