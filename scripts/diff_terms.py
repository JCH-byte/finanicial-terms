#!/usr/bin/env python3
"""Compare two normalized term lists and generate review artifacts."""

from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path


def load_terms(path: Path) -> dict[str, dict]:
    with path.open(encoding="utf-8") as f:
        items = json.load(f)
    return {item["term_normalized"]: item for item in items if item.get("term_normalized")}


def write_csv(path: Path, rows: list[dict], fields: list[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base", required=True, type=Path, help="Base normalized JSON (700)")
    parser.add_argument("--target", required=True, type=Path, help="Target normalized JSON (800)")
    parser.add_argument("--report-dir", default=Path("reports"), type=Path)
    parser.add_argument("--review-file", default=Path("data/review/new_terms_review.csv"), type=Path)
    args = parser.parse_args()

    base_terms = load_terms(args.base)
    target_terms = load_terms(args.target)

    new_keys = sorted(set(target_terms) - set(base_terms))
    removed_keys = sorted(set(base_terms) - set(target_terms))

    new_rows = [
        {
            "term": target_terms[key].get("term", ""),
            "term_normalized": key,
            "status": "auto_new",
            "source": target_terms[key].get("source", ""),
            "page": target_terms[key].get("page", ""),
        }
        for key in new_keys
    ]
    removed_rows = [
        {
            "term": base_terms[key].get("term", ""),
            "term_normalized": key,
            "status": "auto_removed",
            "source": base_terms[key].get("source", ""),
            "page": base_terms[key].get("page", ""),
        }
        for key in removed_keys
    ]

    write_csv(
        args.report_dir / "new_terms_auto.csv",
        new_rows,
        ["term", "term_normalized", "status", "source", "page"],
    )
    write_csv(
        args.report_dir / "removed_terms_auto.csv",
        removed_rows,
        ["term", "term_normalized", "status", "source", "page"],
    )

    review_rows = [
        {
            "term": row["term"],
            "term_normalized": row["term_normalized"],
            "status": "needs_review",
            "review_note": "",
        }
        for row in new_rows
    ]
    write_csv(args.review_file, review_rows, ["term", "term_normalized", "status", "review_note"])

    print(f"new_terms_auto.csv: {len(new_rows)}")
    print(f"removed_terms_auto.csv: {len(removed_rows)}")
    print(f"review file: {args.review_file}")


if __name__ == "__main__":
    main()
