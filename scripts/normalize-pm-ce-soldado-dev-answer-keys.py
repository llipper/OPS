from __future__ import annotations

import json
import re
import sys
from pathlib import Path


ANALYSIS_FILE = Path("scratch/pm-ce-soldado-dev/pm-ce-soldado-analysis-draft.json")
EXTRACTED_DIR = Path("scratch/pm-ce-soldado-dev/extracted")
OUTPUT_FILE = Path("scratch/pm-ce-soldado-dev/normalized-answer-keys.json")


def read_text(path: str) -> str:
    return Path(path).read_text(encoding="utf-8")


def letters_from_lines(text: str, allowed: str, limit: int | None = None) -> list[str]:
    answers: list[str] = []
    allowed_set = set(allowed)

    for line in text.splitlines():
        compact = re.sub(r"[^A-Z*]", "", line.upper())
        if not compact:
            continue

        if set(compact).issubset(allowed_set):
            answers.extend(list(compact))

        if limit and len(answers) >= limit:
            return answers[:limit]

    return answers


def parse_numbered_blocks(text: str, section_pattern: str, allowed: str) -> dict[str, list[str]]:
    matches = list(re.finditer(section_pattern, text, flags=re.IGNORECASE))
    parsed: dict[str, list[str]] = {}

    for index, match in enumerate(matches):
        label = re.sub(r"\s+", " ", match.group(0).strip())
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        block = text[start:end]
        answers: list[str] = []
        lines = [line.strip() for line in block.splitlines() if line.strip()]

        for line_index, line in enumerate(lines):
            numbers = re.findall(r"\b\d{1,3}\b", line)
            if len(numbers) < 5:
                continue

            for candidate in lines[line_index + 1 : line_index + 4]:
                letters = re.findall(f"[{allowed}]", candidate.upper())
                compact_candidate = re.sub(f"[^{allowed}]", "", candidate.upper())
                if len(letters) >= min(5, len(numbers)) and compact_candidate:
                    answers.extend(letters[: len(numbers)])
                    break

        parsed[label] = answers

    return parsed


def make_items(answers: list[str]) -> list[dict[str, int | str]]:
    return [{"number": index, "answer": answer} for index, answer in enumerate(answers, start=1)]


def find_file(contest: dict, file_type: str) -> dict | None:
    for file_item in contest.get("files", []):
        if file_item["type"] == file_type:
            return file_item
    return None


def extracted_path_for(contest: dict, file_type: str) -> Path | None:
    year = contest["year"]
    candidates = sorted(EXTRACTED_DIR.glob(f"{year}-*-{file_type}-*.txt"))
    return candidates[0] if candidates else None


def normalize_contest(contest: dict, analysis_by_id: dict) -> dict:
    contest_id = contest["id"]
    analysis = analysis_by_id.get(contest_id, {})
    expected_count = analysis.get("questionCount")
    answer_key_path = extracted_path_for(contest, "answer_key")
    exam_path = extracted_path_for(contest, "exam")
    result = {
        "contestId": contest_id,
        "year": contest["year"],
        "board": contest["board"],
        "expectedQuestionCount": expected_count,
        "sourcePath": str(answer_key_path or exam_path).replace("\\", "/") if (answer_key_path or exam_path) else None,
        "status": "pending",
        "confidence": "low",
        "keys": {},
        "notes": [],
    }

    if contest["year"] == "2006" and exam_path:
        text = read_text(str(exam_path))
        tail = "\n".join(text.splitlines()[-20:])
        answers = letters_from_lines(tail, "ABCD", 60)
        result["keys"]["default"] = make_items(answers)
        result["status"] = "normalized" if len(answers) == 60 else "needs_review"
        result["confidence"] = "medium" if len(answers) == 60 else "low"
        result["notes"].append("Gabarito extraido do final do caderno, nao de arquivo separado.")
        return result

    if not answer_key_path:
        result["status"] = "missing_answer_key"
        return result

    text = read_text(str(answer_key_path))

    if contest["year"] in {"2008", "2012"}:
        answers = letters_from_lines(text, "CE", int(expected_count or 120))
        result["keys"]["default"] = make_items(answers)
        result["status"] = "normalized" if len(answers) == expected_count else "needs_review"
        result["confidence"] = "medium" if len(answers) == expected_count else "low"
        return result

    if contest["year"] == "2014":
        answers = letters_from_lines(text.split("SOLDADO", 1)[-1], "CE*", int(expected_count or 120))
        result["keys"]["default"] = make_items(answers)
        result["status"] = "normalized" if len(answers) == expected_count else "needs_review"
        result["confidence"] = "low"
        result["notes"].append("Extracao do gabarito FUNCAB esta visualmente compactada e precisa conferencia.")
        return result

    if contest["year"] in {"2021", "2025"}:
        sections = parse_numbered_blocks(text, r"(?:GABARITO\s+\d+|Tipo\s+\d+)", "ABCDE")
        for label, answers in sections.items():
            result["keys"][label] = make_items(answers)

        counts = [len(value) for value in sections.values()]
        expected = expected_count or analysis.get("answerKeyQuestionCount")
        result["status"] = "normalized" if counts and all(count == expected for count in counts) else "needs_review"
        result["confidence"] = "high" if result["status"] == "normalized" else "medium"

        return result

    return result


def main() -> int:
    index = json.loads(Path("scratch/pm-ce-soldado-dev/pm-ce-soldado-index.json").read_text(encoding="utf-8"))
    analysis = json.loads(ANALYSIS_FILE.read_text(encoding="utf-8"))
    analysis_by_id = {item["contestId"]: item for item in analysis["contests"]}

    output = {
        "sourceIndex": "scratch/pm-ce-soldado-dev/pm-ce-soldado-index.json",
        "sourceAnalysis": str(ANALYSIS_FILE).replace("\\", "/"),
        "items": [normalize_contest(contest, analysis_by_id) for contest in index["contests"]],
    }

    OUTPUT_FILE.write_text(json.dumps(output, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")

    normalized = sum(1 for item in output["items"] if item["status"] == "normalized")
    needs_review = sum(1 for item in output["items"] if item["status"] == "needs_review")
    print(f"Gabaritos normalizados: {normalized}")
    print(f"Precisam revisao: {needs_review}")
    print(f"Arquivo gerado: {OUTPUT_FILE}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
