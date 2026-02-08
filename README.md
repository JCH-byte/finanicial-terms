# finanicial-terms

경제금융용어 앱 데이터(700선 → 800선) 업데이트를 위한 추출/정규화/비교 스크립트를 포함합니다.

## 디렉터리 구조

- `data/raw/`: 원본 추출 파일(JSON/PDF)
- `data/normalized/`: 정규화된 용어 JSON
- `data/review/`: 수동 검수 CSV
- `data/final/`: 최종 확정 JSON
- `reports/`: 자동 비교/매핑 리포트
- `scripts/`: 파이프라인 스크립트

## 용어 JSON 스키마

각 용어 엔트리는 아래 필드를 사용합니다.

- 필수: `term`, `term_normalized`, `source`, `page`, `description_raw`
- 선택: `aliases`, `category`, `note`

> 비교(diff)는 반드시 `term_normalized` 기준으로 진행합니다.

## 1) PDF 인덱스 추출

`data/raw/financial terms_800_index.pdf`(또는 실제 파일명)에 대해 실행:

```bash
python scripts/extract_pdf_index.py \
  --pdf "data/raw/financial terms_800_index.pdf" \
  --source "경제금융용어 800선" \
  --output data/raw/terms_800_extracted.json
```

- `pdftotext`가 있으면 우선 사용하고, 없으면 `pypdf`를 사용합니다.

## 2) 정규화 + 매핑 리포트

```bash
python scripts/normalize_terms.py \
  --input data/raw/terms_800_extracted.json \
  --output data/normalized/terms_800_normalized.json \
  --map-output reports/normalization_map.csv
```

- 정규화 규칙:
  - 유니코드 `NFKC`
  - 연속 공백을 1칸으로 축소
  - 앞뒤 공백 제거

## 3) 700선 대비 800선 자동 비교

700선도 동일 방식으로 정규화한 `data/normalized/terms_700_normalized.json`이 있다고 가정:

```bash
python scripts/diff_terms.py \
  --base data/normalized/terms_700_normalized.json \
  --target data/normalized/terms_800_normalized.json
```

출력:
- `reports/new_terms_auto.csv`
- `reports/removed_terms_auto.csv`
- `data/review/new_terms_review.csv` (초기 status=`needs_review`)

## 4) 검수 반영 후 최종 확정본 생성

`data/review/new_terms_review.csv`의 `status`를 `confirmed_new` 또는 `rejected`로 모두 채운 뒤:

```bash
python scripts/build_confirmed_terms.py \
  --review data/review/new_terms_review.csv \
  --output data/final/new_terms_confirmed.json \
  --dataset-version bok-terms-800-v1
```

최종 JSON에는 아래 메타데이터가 포함됩니다.

- `dataset_version`
- `source_document`
- `generated_at`
- `term_count`
- `terms`
