#!/usr/bin/env python3
"""Normalize term entries from data/raw into data/normalized and mapping report."""

from __future__ import annotations

import csv
import json
import re
import unicodedata
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "data" / "raw"
NORMALIZED_DIR = ROOT / "data" / "normalized"
REPORT_PATH = ROOT / "reports" / "normalization_map.csv"

# 고정 정책: NFKC + trim + collapse whitespaces
UNICODE_FORM = "NFKC"
WHITESPACE_RE = re.compile(r"\s+")


def normalize_term(value: str) -> str:
    normalized = unicodedata.normalize(UNICODE_FORM, value)
    normalized = normalized.strip()
    normalized = WHITESPACE_RE.sub(" ", normalized)
    return normalized


def normalize_entry(entry: dict[str, Any]) -> dict[str, Any]:
    result = dict(entry)
    raw_term = str(entry.get("term", ""))
    result["term_normalized"] = normalize_term(raw_term)
    return result


def main() -> None:
    NORMALIZED_DIR.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)

    mapping_rows: list[tuple[str, str, str, Any]] = []

    for raw_file in sorted(RAW_DIR.glob("*.json")):
        with raw_file.open("r", encoding="utf-8") as f:
            entries = json.load(f)

        normalized_entries: list[dict[str, Any]] = []
        for entry in entries:
            normalized_entry = normalize_entry(entry)
            normalized_entries.append(normalized_entry)
            mapping_rows.append(
                (
                    str(entry.get("term", "")),
                    normalized_entry["term_normalized"],
                    str(entry.get("source", raw_file.stem)),
                    entry.get("page", ""),
                )
            )

        out_path = NORMALIZED_DIR / raw_file.name
        with out_path.open("w", encoding="utf-8") as f:
            json.dump(normalized_entries, f, ensure_ascii=False, indent=2)
            f.write("\n")

    with REPORT_PATH.open("w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["term_raw", "term_normalized", "source", "page"])
        writer.writerows(mapping_rows)


if __name__ == "__main__":
    main()
