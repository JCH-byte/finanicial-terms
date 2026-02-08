#!/usr/bin/env python3
"""Normalize extracted terms and write mapping CSV."""

from __future__ import annotations

import argparse
import csv
import json
import re
import unicodedata
from pathlib import Path


def normalize_term(term: str) -> str:
    normalized = unicodedata.normalize("NFKC", term)
    normalized = re.sub(r"\s+", " ", normalized).strip()
    return normalized


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, type=Path, help="Input JSON path")
    parser.add_argument("--output", required=True, type=Path, help="Normalized JSON path")
    parser.add_argument(
        "--map-output",
        default=Path("reports/normalization_map.csv"),
        type=Path,
        help="CSV output path for raw->normalized mapping",
    )
    args = parser.parse_args()

    with args.input.open(encoding="utf-8") as f:
        items = json.load(f)

    output_items = []
    rows: list[tuple[str, str]] = []
    for item in items:
        term_raw = item.get("term", "")
        term_normalized = normalize_term(term_raw)
        item["term_normalized"] = term_normalized
        output_items.append(item)
        rows.append((term_raw, term_normalized))

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8") as f:
        json.dump(output_items, f, ensure_ascii=False, indent=2)

    args.map_output.parent.mkdir(parents=True, exist_ok=True)
    with args.map_output.open("w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["term_raw", "term_normalized"])
        writer.writerows(rows)

    print(f"Normalized {len(output_items)} terms -> {args.output}")
    print(f"Wrote mapping CSV -> {args.map_output}")


if __name__ == "__main__":
    main()
