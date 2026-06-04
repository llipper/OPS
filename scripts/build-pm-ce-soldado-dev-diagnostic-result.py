from __future__ import annotations

import json
import sys
from collections import defaultdict
from pathlib import Path


EXAM_FILE = Path("scratch/pm-ce-soldado-dev/diagnostic-exam-50-notice-2025-weighted-draft.json")
RESPONSES_FILE = Path("scratch/pm-ce-soldado-dev/diagnostic-exam-50-sample-responses.json")
OUTPUT_FILE = Path("scratch/pm-ce-soldado-dev/diagnostic-result-50-draft.json")


PERFORMANCE_PATTERN = {
    "Lingua Portuguesa/Interpretacao de Textos": 0.84,
    "Raciocinio Logico": 0.42,
    "Atualidades/Historia do Ceara": 0.62,
    "Nocoes de Administracao Publica/Etica no Servico Publico": 0.72,
    "Nocoes de Direito Constitucional": 0.50,
    "Nocoes de Direitos Humanos": 0.44,
    "Nocoes de Direito Penal Militar/Processo Penal Militar": 0.34,
    "Nocoes de Direito Penal e Processual Penal": 0.58,
    "Nocoes de Criminologia": 0.25,
    "Seguranca Publica": 0.67,
}


ALTERNATIVES = ["A", "B", "C", "D", "E"]


def wrong_answer(answer: str) -> str:
    for alternative in ALTERNATIVES:
        if alternative != answer:
            return alternative
    return "A"


def ensure_sample_responses(exam: dict) -> list[dict]:
    if RESPONSES_FILE.exists():
        return json.loads(RESPONSES_FILE.read_text(encoding="utf-8"))["responses"]

    by_discipline = defaultdict(list)
    for question in exam["questions"]:
        by_discipline[question["noticeDiscipline"]].append(question)

    responses = []
    for discipline, questions in by_discipline.items():
        target_rate = PERFORMANCE_PATTERN.get(discipline, 0.6)
        correct_target = round(len(questions) * target_rate)

        for index, question in enumerate(questions):
            is_correct = index < correct_target
            selected = question["answer"] if is_correct else wrong_answer(question["answer"])
            responses.append(
                {
                    "questionId": question["questionId"],
                    "selectedAnswer": selected,
                }
            )

    payload = {
        "meta": {
            "name": "PM CE Soldado - respostas ficticias para simulado diagnostico",
            "sourceExam": str(EXAM_FILE).replace("\\", "/"),
            "status": "sample",
        },
        "responses": sorted(responses, key=lambda item: item["questionId"]),
    }
    RESPONSES_FILE.write_text(json.dumps(payload, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")
    return payload["responses"]


def classify(score: float, weight: float) -> str:
    if score >= 0.85:
        return "otimo"
    if score >= 0.7:
        return "bom"
    if score >= 0.55:
        return "medio"
    if score >= 0.4:
        return "critico" if weight >= 0.1 else "fraco"
    return "critico"


def priority(status: str, weight: float) -> str:
    if status == "critico" and weight >= 0.08:
        return "maxima"
    if status in {"critico", "fraco"}:
        return "alta"
    if status == "medio" and weight >= 0.08:
        return "media"
    if status == "medio":
        return "baixa"
    return "manutencao"


def aggregate(items: list[dict], total_questions: int, key_fields: list[str]) -> list[dict]:
    groups = defaultdict(list)

    for item in items:
        key = tuple(item[field] for field in key_fields)
        groups[key].append(item)

    rows = []
    for key, group_items in groups.items():
        total = len(group_items)
        correct = sum(1 for item in group_items if item["isCorrect"])
        score = correct / total if total else 0
        weight = total / total_questions if total_questions else 0
        status = classify(score, weight)
        row = {
            key_fields[index]: key[index]
            for index in range(len(key_fields))
        }
        row.update(
            {
                "questionCount": total,
                "correctCount": correct,
                "score": round(score, 4),
                "weight": round(weight, 4),
                "status": status,
                "priority": priority(status, weight),
                "questionIds": [item["questionId"] for item in group_items],
            }
        )
        rows.append(row)

    return sorted(rows, key=lambda item: (item["priority"], item["score"], -item["weight"]))


def main() -> int:
    exam = json.loads(EXAM_FILE.read_text(encoding="utf-8"))
    responses = ensure_sample_responses(exam)
    response_by_question = {item["questionId"]: item for item in responses}

    answered = []
    for question in exam["questions"]:
        response = response_by_question.get(question["questionId"])
        selected = response["selectedAnswer"] if response else None
        answered.append(
            {
                **question,
                "selectedAnswer": selected,
                "isCorrect": selected == question["answer"],
            }
        )

    total = len(answered)
    correct = sum(1 for item in answered if item["isCorrect"])
    overall_score = correct / total if total else 0

    by_discipline = aggregate(answered, total, ["noticeDiscipline"])
    by_subject = aggregate(answered, total, ["noticeDiscipline", "subject"])
    by_topic = aggregate(answered, total, ["noticeDiscipline", "subject", "topic"])

    recommendations = [
        item
        for item in by_subject
        if item["priority"] in {"maxima", "alta"}
    ][:10]

    payload = {
        "meta": {
            "name": "PM CE Soldado - resultado diagnostico 50 questoes",
            "status": "draft",
            "sourceExam": str(EXAM_FILE).replace("\\", "/"),
            "sourceResponses": str(RESPONSES_FILE).replace("\\", "/"),
            "description": "Diagnostico por disciplina, assunto e topico cruzando desempenho com peso do simulado baseado no edital 2025.",
        },
        "overall": {
            "questionCount": total,
            "correctCount": correct,
            "score": round(overall_score, 4),
            "status": classify(overall_score, 1),
        },
        "diagnostics": {
            "disciplines": by_discipline,
            "subjects": by_subject,
            "topics": by_topic,
        },
        "recommendations": recommendations,
        "answers": answered,
    }

    OUTPUT_FILE.write_text(json.dumps(payload, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")

    print(f"Acertos: {correct}/{total}")
    print(f"Score: {overall_score:.2%}")
    print(f"Arquivo gerado: {OUTPUT_FILE}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
