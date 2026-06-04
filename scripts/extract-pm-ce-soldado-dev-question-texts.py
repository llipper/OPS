from __future__ import annotations

import json
import re
import sys
from pathlib import Path


CATALOG_FILE = Path("scratch/pm-ce-soldado-dev/question-catalog-draft.json")
OUTPUT_FILE = Path("scratch/pm-ce-soldado-dev/question-texts-2021-2025-draft.json")
EXTRACTED_DIR = Path("scratch/pm-ce-soldado-dev/extracted")


TEXT_FILES = {
    "2021": EXTRACTED_DIR / "2021-fgv-soldado-exam-1.txt",
    "2025": EXTRACTED_DIR / "2025-cev-uece-soldado-do-qppm-exam-1.txt",
}


HEADER_PATTERNS = [
    r"^--- PAGE \d+ ---$",
    r"^pcimarkpci\b",
    r"^www\.pciconcursos\.com\.br$",
    r"^Concurso Público PMCE 2021\s+FGV Conhecimento$",
    r"^Soldado da PM-CE.*Página \d+",
    r"^GOVERNO DO ESTADO DO CEARÁ",
    r"^CONCURSO PÚBLICO PARA O CARGO DE SOLDADO",
    r"^PROVA OBJETIVA REALIZADA",
    r"^O número do gabarito deste caderno",
]


def normalize_space(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def is_header(line: str) -> bool:
    value = line.strip()
    if not value:
        return False

    return any(re.search(pattern, value, flags=re.IGNORECASE) for pattern in HEADER_PATTERNS)


def clean_lines(text: str) -> list[str]:
    lines: list[str] = []

    for raw_line in text.splitlines():
        line = raw_line.strip()
        if is_header(line):
            continue
        lines.append(line)

    return lines


def split_fgv_2021(lines: list[str]) -> dict[int, list[str]]:
    markers: list[tuple[int, int]] = []

    for index, line in enumerate(lines):
        if not re.fullmatch(r"\d{1,2}", line):
            continue

        number = int(line)
        if 1 <= number <= 80:
            markers.append((index, number))

    sequential: list[tuple[int, int]] = []
    expected = 1
    for index, number in markers:
        if number == expected:
            sequential.append((index, number))
            expected += 1
        if expected > 80:
            break

    blocks: dict[int, list[str]] = {}
    for offset, (start_index, number) in enumerate(sequential):
        end_index = sequential[offset + 1][0] if offset + 1 < len(sequential) else len(lines)
        blocks[number] = lines[start_index + 1 : end_index]

    return blocks


def split_cev_2025(lines: list[str]) -> dict[int, list[str]]:
    start_at = 0
    for index, line in enumerate(lines):
        if line.strip().upper() == "LÍNGUA PORTUGUESA":
            start_at = index
            break

    markers: list[tuple[int, int, str]] = []

    for index, line in enumerate(lines[start_at:], start=start_at):
        match = re.match(r"^0?(\d{1,3})\.\s+(.*)$", line)
        if not match:
            continue

        number = int(match.group(1))
        if 1 <= number <= 100:
            markers.append((index, number, match.group(2).strip()))

    sequential: list[tuple[int, int, str]] = []
    expected = 1
    for index, number, suffix in markers:
        if number == expected:
            sequential.append((index, number, suffix))
            expected += 1
        if expected > 100:
            break

    blocks: dict[int, list[str]] = {}
    for offset, (start_index, number, suffix) in enumerate(sequential):
        end_index = sequential[offset + 1][0] if offset + 1 < len(sequential) else len(lines)
        block = lines[start_index + 1 : end_index]
        if suffix:
            block = [suffix, *block]
        blocks[number] = block

    return blocks


def parse_block(lines: list[str]) -> tuple[str, dict[str, str]]:
    stem_lines: list[str] = []
    alternatives: dict[str, list[str]] = {}
    current_option: str | None = None

    for line in lines:
        if not line:
            continue

        match = re.match(r"^\(?([A-E])\)\s*(.*)$", line)
        if match:
            current_option = match.group(1)
            alternatives[current_option] = [match.group(2).strip()]
            continue

        if current_option:
            alternatives[current_option].append(line)
        else:
            stem_lines.append(line)

    statement = normalize_space(" ".join(stem_lines))
    parsed_alternatives = {
        key: normalize_space(" ".join(value))
        for key, value in alternatives.items()
        if normalize_space(" ".join(value))
    }

    return statement, parsed_alternatives


def load_catalog_items() -> dict[tuple[str, int], dict]:
    catalog = json.loads(CATALOG_FILE.read_text(encoding="utf-8"))
    return {
        (item["year"], item["number"]): item
        for item in catalog["questions"]
        if item["year"] in TEXT_FILES
    }


def extract_year(year: str, catalog_by_key: dict[tuple[str, int], dict]) -> list[dict]:
    text = TEXT_FILES[year].read_text(encoding="utf-8")
    lines = clean_lines(text)
    blocks = split_fgv_2021(lines) if year == "2021" else split_cev_2025(lines)
    questions: list[dict] = []

    for number in sorted(blocks):
        catalog_item = catalog_by_key.get((year, number))
        statement, alternatives = parse_block(blocks[number])
        expected_alternatives = {"A", "B", "C", "D", "E"}
        missing = sorted(expected_alternatives - set(alternatives))

        questions.append(
            {
                "id": catalog_item["id"] if catalog_item else f"pm-ce-soldado-{year}-q{number:03d}",
                "contestId": catalog_item["contestId"] if catalog_item else f"pm-ce-soldado-{year}",
                "year": year,
                "board": catalog_item["board"] if catalog_item else None,
                "number": number,
                "discipline": catalog_item["discipline"] if catalog_item else None,
                "answer": catalog_item["answer"] if catalog_item else None,
                "statement": statement,
                "alternatives": alternatives,
                "subject": catalog_item["subject"] if catalog_item else None,
                "topic": catalog_item["topic"] if catalog_item else None,
                "status": "extracted" if not missing and statement else "needs_review",
                "reviewFlags": {
                    "missingAlternatives": missing,
                    "emptyStatement": not bool(statement),
                },
            }
        )

    return questions


def main() -> int:
    catalog_by_key = load_catalog_items()
    questions = []

    for year in ["2021", "2025"]:
        questions.extend(extract_year(year, catalog_by_key))

    payload = {
        "meta": {
            "name": "PM CE Soldado - enunciados extraidos 2021 e 2025",
            "sourceCatalog": str(CATALOG_FILE).replace("\\", "/"),
            "sourceTextFiles": {key: str(value).replace("\\", "/") for key, value in TEXT_FILES.items()},
            "status": "draft",
            "description": "Primeira extracao estruturada de enunciados e alternativas para provas objetivas FGV 2021 e CEV-UECE 2025.",
        },
        "questions": questions,
    }

    OUTPUT_FILE.write_text(json.dumps(payload, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")

    extracted = sum(1 for item in questions if item["status"] == "extracted")
    needs_review = sum(1 for item in questions if item["status"] == "needs_review")
    print(f"Questoes extraidas: {len(questions)}")
    print(f"OK: {extracted}")
    print(f"Revisao: {needs_review}")
    print(f"Arquivo gerado: {OUTPUT_FILE}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
