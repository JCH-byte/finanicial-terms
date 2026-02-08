#!/usr/bin/env python3
"""Build final confirmed-new-terms JSON from reviewed CSV."""

from __future__ import annotations

import argparse
import csv
import json
from datetime import datetime, timezone
from pathlib import Path


VALID_STATUSES = {"confirmed_new", "rejected"}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--review", required=True, type=Path, help="Reviewed CSV file")
    parser.add_argument("--output", required=True, type=Path, help="Final confirmed JSON output")
    parser.add_argument("--dataset-version", default="bok-terms-800-v1")
    args = parser.parse_args()

    with args.review.open(encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))

    unresolved = [row for row in rows if row.get("status") not in VALID_STATUSES]
    if unresolved:
        raise ValueError(
            f"{len(unresolved)} rows have unresolved status. Use only {sorted(VALID_STATUSES)}."
        )

    confirmed = [
        {
            "term": row.get("term", ""),
            "term_normalized": row.get("term_normalized", ""),
            "source": "경제금융용어 800선",
            "description_raw": "",
        }
        for row in rows
        if row.get("status") == "confirmed_new"
    ]

    payload = {
        "dataset_version": args.dataset_version,
        "source_document": "경제금융용어 800선",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "term_count": len(confirmed),
        "terms": confirmed,
    }

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    print(f"Confirmed terms: {len(confirmed)} -> {args.output}")


if __name__ == "__main__":
    main()
