# finanicial-terms

## 데이터 구조

- `data/raw/`: 700선, 800선 원본 추출 JSON
- `data/normalized/`: 정규화 산출 JSON
- `data/term_entry.schema.json`: 용어 엔트리 JSON 스키마
- `reports/normalization_map.csv`: 정규화 전후 매핑 로그

## 정규화

정규화 스크립트:

```bash
python3 scripts/normalize_terms.py
```

정책 상세는 `docs/normalization_policy.md`를 참고하세요.

## 비교 기준

용어 비교/중복 판정은 **반드시 `term_normalized` 기준**으로 수행합니다.
