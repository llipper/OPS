from __future__ import annotations

import json
import sys
from collections import defaultdict
from pathlib import Path


CLASSIFICATION_FILE = Path("scratch/pm-ce-soldado-dev/constitutional-human-rights-classification-draft.json")
OUTPUT_FILE = Path("scratch/pm-ce-soldado-dev/constitutional-human-rights-incidence-draft.json")


def main() -> int:
    payload = json.loads(CLASSIFICATION_FILE.read_text(encoding="utf-8"))
    rows = payload["classifications"]
    years = sorted({row["year"] for row in rows})

    by_subject: dict[str, list[dict]] = defaultdict(list)
    by_topic: dict[tuple[str, str], list[dict]] = defaultdict(list)

    for row in rows:
        by_subject[row["subject"]].append(row)
        by_topic[(row["subject"], row["topic"])].append(row)

    subjects = []
    for subject, items in sorted(by_subject.items()):
        subject_years = sorted({item["year"] for item in items})
        subjects.append(
            {
                "subject": subject,
                "questionCount": len(items),
                "appearsInYears": subject_years,
                "appearanceRate": round(len(subject_years) / len(years), 4),
                "years": {
                    year: sum(1 for item in items if item["year"] == year)
                    for year in years
                },
            }
        )

    topics = []
    for (subject, topic), items in sorted(by_topic.items()):
        topic_years = sorted({item["year"] for item in items})
        topics.append(
            {
                "subject": subject,
                "topic": topic,
                "questionCount": len(items),
                "appearsInYears": topic_years,
                "appearanceRate": round(len(topic_years) / len(years), 4),
                "years": {
                    year: sum(1 for item in items if item["year"] == year)
                    for year in years
                },
                "questionIds": [item["questionId"] for item in items],
            }
        )

    output = {
        "meta": {
            "name": "PM CE Soldado - incidencia de Direito Constitucional e Direitos Humanos",
            "sourceClassification": str(CLASSIFICATION_FILE).replace("\\", "/"),
            "status": "draft",
            "years": years,
            "questionCount": len(rows),
            "description": "Resumo inicial de incidencia por assunto e topico para testar o motor de planejamento.",
        },
        "subjects": sorted(subjects, key=lambda item: (-item["questionCount"], item["subject"])),
        "topics": sorted(topics, key=lambda item: (-item["questionCount"], item["subject"], item["topic"])),
    }

    OUTPUT_FILE.write_text(json.dumps(output, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")

    print(f"Classificacoes: {len(rows)}")
    print(f"Assuntos: {len(subjects)}")
    print(f"Topicos: {len(topics)}")
    print(f"Arquivo gerado: {OUTPUT_FILE}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
