#!/usr/bin/env python3
"""Extract index terms from a BOK terms PDF into JSON."""

from __future__ import annotations

import argparse
import importlib.util
import json
import re
import subprocess
import unicodedata
from pathlib import Path
from typing import Iterable


TERM_LINE_RE = re.compile(r"^\s*(\d{1,3})[.)\-\s]+(.+?)\s*$")


def normalize_term(term: str) -> str:
    term = unicodedata.normalize("NFKC", term)
    term = re.sub(r"\s+", " ", term).strip()
    return term


def split_pages(text: str) -> list[str]:
    if "\f" in text:
        return [page.strip() for page in text.split("\f") if page.strip()]
    return [text]


def extract_text_with_pdftotext(pdf_path: Path) -> str:
    cmd = ["pdftotext", "-enc", "UTF-8", str(pdf_path), "-"]
    result = subprocess.run(cmd, check=True, text=True, capture_output=True)
    return result.stdout


def extract_text_with_pypdf(pdf_path: Path) -> str:
    from pypdf import PdfReader

    reader = PdfReader(str(pdf_path))
    parts: list[str] = []
    for page in reader.pages:
        parts.append(page.extract_text() or "")
    return "\f".join(parts)


def extract_pdf_text(pdf_path: Path) -> str:
    pdftotext_exists = subprocess.run(
        ["bash", "-lc", "command -v pdftotext >/dev/null 2>&1"],
        check=False,
    ).returncode == 0

    if pdftotext_exists:
        return extract_text_with_pdftotext(pdf_path)

    pypdf_available = importlib.util.find_spec("pypdf") is not None
    if pypdf_available:
        return extract_text_with_pypdf(pdf_path)

    raise RuntimeError("Neither pdftotext nor pypdf is available.")


def extract_terms(pages: Iterable[str], source: str) -> list[dict]:
    items: list[dict] = []
    seen: set[str] = set()

    for page_idx, page_text in enumerate(pages, start=1):
        for line in page_text.splitlines():
            match = TERM_LINE_RE.match(line)
            if not match:
                continue
            term_raw = match.group(2).strip()
            if not term_raw:
                continue

            term_normalized = normalize_term(term_raw)
            if term_normalized in seen:
                continue
            seen.add(term_normalized)

            items.append(
                {
                    "term": term_raw,
                    "term_normalized": term_normalized,
                    "source": source,
                    "page": page_idx,
                    "description_raw": "",
                }
            )
    return items


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pdf", required=True, type=Path, help="Path to source PDF file")
    parser.add_argument("--source", default="경제금융용어 800선", help="Source label")
    parser.add_argument("--output", required=True, type=Path, help="Output JSON path")
    args = parser.parse_args()

    if not args.pdf.exists():
        raise FileNotFoundError(f"PDF not found: {args.pdf}")

    text = extract_pdf_text(args.pdf)
    pages = split_pages(text)
    terms = extract_terms(pages, args.source)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8") as f:
        json.dump(terms, f, ensure_ascii=False, indent=2)

    print(f"Extracted {len(terms)} terms -> {args.output}")


if __name__ == "__main__":
    main()
