from __future__ import annotations

import json
import sys
from collections import defaultdict
from pathlib import Path


CLASSIFICATION_FILE = Path("scratch/pm-ce-soldado-dev/penal-criminology-security-classification-draft.json")
OUTPUT_FILE = Path("scratch/pm-ce-soldado-dev/penal-criminology-security-incidence-draft.json")


def main() -> int:
    payload = json.loads(CLASSIFICATION_FILE.read_text(encoding="utf-8"))
    rows = payload["classifications"]
    years = sorted({row["year"] for row in rows})

    by_subject = defaultdict(list)
    by_topic = defaultdict(list)
    by_discipline = defaultdict(list)

    for row in rows:
        by_subject[row["subject"]].append(row)
        by_topic[(row["subject"], row["topic"])].append(row)
        by_discipline[row["discipline"]].append(row)

    def yearly_counts(items: list[dict]) -> dict[str, int]:
        return {year: sum(1 for item in items if item["year"] == year) for year in years}

    disciplines = [
        {
            "discipline": discipline,
            "questionCount": len(items),
            "appearsInYears": sorted({item["year"] for item in items}),
            "years": yearly_counts(items),
        }
        for discipline, items in sorted(by_discipline.items())
    ]

    subjects = [
        {
            "subject": subject,
            "questionCount": len(items),
            "appearsInYears": sorted({item["year"] for item in items}),
            "appearanceRate": round(len({item["year"] for item in items}) / len(years), 4),
            "years": yearly_counts(items),
        }
        for subject, items in sorted(by_subject.items())
    ]

    topics = [
        {
            "subject": subject,
            "topic": topic,
            "questionCount": len(items),
            "appearsInYears": sorted({item["year"] for item in items}),
            "appearanceRate": round(len({item["year"] for item in items}) / len(years), 4),
            "years": yearly_counts(items),
            "questionIds": [item["questionId"] for item in items],
        }
        for (subject, topic), items in sorted(by_topic.items())
    ]

    output = {
        "meta": {
            "name": "PM CE Soldado - incidencia de Penal, Penal Militar, Criminologia e Seguranca Publica",
            "sourceClassification": str(CLASSIFICATION_FILE).replace("\\", "/"),
            "status": "draft",
            "years": years,
            "questionCount": len(rows),
            "description": "Resumo inicial de incidencia por disciplina, assunto e topico para testar o motor de planejamento.",
        },
        "disciplines": sorted(disciplines, key=lambda item: (-item["questionCount"], item["discipline"])),
        "subjects": sorted(subjects, key=lambda item: (-item["questionCount"], item["subject"])),
        "topics": sorted(topics, key=lambda item: (-item["questionCount"], item["subject"], item["topic"])),
    }

    OUTPUT_FILE.write_text(json.dumps(output, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")

    print(f"Classificacoes: {len(rows)}")
    print(f"Disciplinas: {len(disciplines)}")
    print(f"Assuntos: {len(subjects)}")
    print(f"Topicos: {len(topics)}")
    print(f"Arquivo gerado: {OUTPUT_FILE}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
