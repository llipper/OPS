from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from pypdf import PdfReader


NOTICE_FILES = {
    "2021": Path("scratch/pm-ce-soldado-dev/pm_ce_2021_soldado-edital.pdf"),
    "2023": Path("scratch/pm-ce-soldado-dev/pm_ce_2023_soldado_edital_n_1-edital.pdf"),
    "2025": Path("scratch/pm-ce-soldado-dev/pm_ce_2025_soldado_edital_n_1-edital.pdf"),
}

OUTPUT_DIR = Path("scratch/pm-ce-soldado-dev/extracted/notices")
SUMMARY_FILE = OUTPUT_DIR / "notice-extraction-summary.json"


def extract_pdf_text(path: Path) -> tuple[str, int]:
    reader = PdfReader(path)
    pages = []

    for index, page in enumerate(reader.pages, start=1):
        text = page.extract_text() or ""
        pages.append(f"\n\n--- PAGE {index} ---\n\n{text.strip()}")

    return "".join(pages).strip() + "\n", len(reader.pages)


def find_matches(text: str) -> list[dict]:
    patterns = [
        "conteudo programatico",
        "conteúdo programático",
        "conhecimentos",
        "programa",
        "anexo",
        "disciplinas",
    ]
    matches = []

    for pattern in patterns:
        for match in re.finditer(pattern, text, flags=re.IGNORECASE):
            start = max(0, match.start() - 240)
            end = min(len(text), match.end() + 900)
            matches.append(
                {
                    "pattern": pattern,
                    "offset": match.start(),
                    "preview": re.sub(r"\s+", " ", text[start:end]).strip(),
                }
            )

    return matches[:40]


def main() -> int:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    summary = {"items": []}

    for year, source in NOTICE_FILES.items():
        output = OUTPUT_DIR / f"pm-ce-soldado-notice-{year}.txt"
        text, page_count = extract_pdf_text(source)
        output.write_text(text, encoding="utf-8")
        matches = find_matches(text)
        summary["items"].append(
            {
                "year": year,
                "sourcePath": str(source).replace("\\", "/"),
                "outputPath": str(output).replace("\\", "/"),
                "pageCount": page_count,
                "charCount": len(text),
                "matches": matches,
            }
        )

    SUMMARY_FILE.write_text(json.dumps(summary, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")

    print(f"Editais extraidos: {len(NOTICE_FILES)}")
    print(f"Resumo: {SUMMARY_FILE}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
