from __future__ import annotations

import json
import sys
from collections import defaultdict
from pathlib import Path


SOURCES = [
    Path("scratch/pm-ce-soldado-dev/constitutional-human-rights-classification-draft.json"),
    Path("scratch/pm-ce-soldado-dev/penal-criminology-security-classification-draft.json"),
    Path("scratch/pm-ce-soldado-dev/general-knowledge-classification-draft.json"),
]

OUTPUT_FILE = Path("scratch/pm-ce-soldado-dev/pm-ce-soldado-unified-incidence-2021-2025-draft.json")


def load_rows() -> list[dict]:
    rows: list[dict] = []

    for source in SOURCES:
        payload = json.loads(source.read_text(encoding="utf-8"))
        for item in payload["classifications"]:
            rows.append(
                {
                    "questionId": item["questionId"],
                    "year": item["year"],
                    "number": item["number"],
                    "discipline": item["discipline"],
                    "domain": item.get("domain") or item["discipline"],
                    "subject": item["subject"],
                    "topic": item["topic"],
                    "confidence": item.get("confidence", "medium"),
                    "source": str(source).replace("\\", "/"),
                }
            )

    return sorted(rows, key=lambda item: (item["year"], item["number"], item["questionId"]))


def yearly_counts(items: list[dict], years: list[str]) -> dict[str, int]:
    return {year: sum(1 for item in items if item["year"] == year) for year in years}


def pct(value: int, total: int) -> float:
    return round(value / total, 4) if total else 0


def build_group(items_by_key: dict, years: list[str], total_questions: int, keys: list[str]) -> list[dict]:
    result = []

    for group_key, items in items_by_key.items():
        if not isinstance(group_key, tuple):
            group_key = (group_key,)

        year_set = sorted({item["year"] for item in items})
        row = {
            keys[index]: group_key[index]
            for index in range(len(keys))
        }
        row.update(
            {
                "questionCount": len(items),
                "overallWeight": pct(len(items), total_questions),
                "appearsInYears": year_set,
                "appearanceRate": round(len(year_set) / len(years), 4),
                "years": yearly_counts(items, years),
                "questionIds": [item["questionId"] for item in items],
                "confidence": "high" if all(item["confidence"] == "high" for item in items) else "mixed",
            }
        )
        result.append(row)

    return sorted(result, key=lambda item: (-item["questionCount"], *(item[key] for key in keys)))


def main() -> int:
    rows = load_rows()
    years = sorted({item["year"] for item in rows})
    total_questions = len(rows)

    by_domain = defaultdict(list)
    by_subject = defaultdict(list)
    by_topic = defaultdict(list)

    for row in rows:
        by_domain[row["domain"]].append(row)
        by_subject[(row["domain"], row["subject"])].append(row)
        by_topic[(row["domain"], row["subject"], row["topic"])].append(row)

    output = {
        "meta": {
            "name": "PM CE Soldado - matriz unificada de incidencia 2021-2025",
            "status": "draft",
            "years": years,
            "questionCount": total_questions,
            "sourceFiles": [str(source).replace("\\", "/") for source in SOURCES],
            "description": "Consolida as classificacoes de 2021 e 2025 por dominio/disciplina, assunto e topico para testar o motor de planejamento.",
        },
        "questions": rows,
        "domains": build_group(by_domain, years, total_questions, ["domain"]),
        "subjects": build_group(by_subject, years, total_questions, ["domain", "subject"]),
        "topics": build_group(by_topic, years, total_questions, ["domain", "subject", "topic"]),
    }

    OUTPUT_FILE.write_text(json.dumps(output, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")

    print(f"Questoes consolidadas: {total_questions}")
    print(f"Dominios: {len(output['domains'])}")
    print(f"Assuntos: {len(output['subjects'])}")
    print(f"Topicos: {len(output['topics'])}")
    print(f"Arquivo gerado: {OUTPUT_FILE}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
