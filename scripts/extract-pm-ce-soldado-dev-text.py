from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from pypdf import PdfReader


INDEX_FILE = Path("scratch/pm-ce-soldado-dev/pm-ce-soldado-index.json")
OUTPUT_DIR = Path("scratch/pm-ce-soldado-dev/extracted")


def slugify(value: str) -> str:
    normalized = re.sub(r"[^a-zA-Z0-9]+", "-", value.strip().lower())
    return normalized.strip("-")


def count_question_markers(text: str) -> int:
    patterns = [
        r"(?m)^\s*(?:quest[aã]o\s*)?\d{1,3}[\).\-\s]",
        r"(?m)^\s*\d{1,3}\s*-\s",
    ]

    matches: set[str] = set()
    for pattern in patterns:
        for match in re.finditer(pattern, text, flags=re.IGNORECASE):
            matches.add(f"{match.start()}:{match.group(0).strip()}")

    return len(matches)


def extract_pdf_text(path: Path) -> tuple[str, int]:
    reader = PdfReader(path)
    pages: list[str] = []

    for index, page in enumerate(reader.pages, start=1):
        page_text = page.extract_text() or ""
        pages.append(f"\n\n--- PAGE {index} ---\n\n{page_text.strip()}")

    return "".join(pages).strip() + "\n", len(reader.pages)


def main() -> int:
    payload = json.loads(INDEX_FILE.read_text(encoding="utf-8"))
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    summary = {
        "sourceIndex": str(INDEX_FILE).replace("\\", "/"),
        "outputDir": str(OUTPUT_DIR).replace("\\", "/"),
        "items": [],
    }

    for contest in payload["contests"]:
        for file_index, file_item in enumerate(contest["files"], start=1):
            source_path = Path(file_item["path"])
            output_name = (
                f"{contest['year']}-{contest['board'].lower()}-"
                f"{slugify(contest['role'])}-{file_item['type']}-{file_index}.txt"
            )
            output_path = OUTPUT_DIR / output_name

            try:
                text, page_count = extract_pdf_text(source_path)
                output_path.write_text(text, encoding="utf-8")

                summary["items"].append(
                    {
                        "contestId": contest["id"],
                        "year": contest["year"],
                        "board": contest["board"],
                        "role": contest["role"],
                        "fileType": file_item["type"],
                        "sourcePath": str(source_path).replace("\\", "/"),
                        "outputPath": str(output_path).replace("\\", "/"),
                        "pageCount": page_count,
                        "charCount": len(text),
                        "questionMarkerCount": count_question_markers(text),
                        "status": "extracted",
                    }
                )
            except Exception as error:
                summary["items"].append(
                    {
                        "contestId": contest["id"],
                        "year": contest["year"],
                        "board": contest["board"],
                        "role": contest["role"],
                        "fileType": file_item["type"],
                        "sourcePath": str(source_path).replace("\\", "/"),
                        "outputPath": str(output_path).replace("\\", "/"),
                        "pageCount": 0,
                        "charCount": 0,
                        "questionMarkerCount": 0,
                        "status": "failed",
                        "error": str(error),
                    }
                )

    summary_path = OUTPUT_DIR / "extraction-summary.json"
    summary_path.write_text(json.dumps(summary, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")

    extracted = sum(1 for item in summary["items"] if item["status"] == "extracted")
    failed = sum(1 for item in summary["items"] if item["status"] == "failed")
    print(f"Arquivos extraidos: {extracted}")
    print(f"Falhas: {failed}")
    print(f"Resumo: {summary_path}")

    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
