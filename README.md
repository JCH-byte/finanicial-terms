# finanicial-terms

## 파일 역할 정의
- `index.html`: **유일한 런타임 엔트리 파일**입니다. 공통 `head/meta/importmap/style` 및 앱 로딩 설정은 이 파일에서만 관리합니다.
- `financial_terms_700.html`: **배포 호환용 생성 산출물**입니다. 수동 수정 금지이며 스크립트로만 갱신합니다.

## 수정 대상 파일 vs 생성 파일 규칙
### 직접 수정 가능한 파일
- `index.html`
- `src/` 하위 소스 코드
- `data/` 하위 데이터(JSON 등)
- `README.md`
- `scripts/generate_distribution_html.sh`

### 직접 수정 금지(생성 파일)
- `financial_terms_700.html`

## 생성 파일 갱신 방법
`financial_terms_700.html`이 필요할 때 아래 명령으로만 갱신합니다.

```bash
./scripts/generate_distribution_html.sh
```

생성 파일을 직접 편집하지 말고, 정책 변경이 필요하면 스크립트(`scripts/generate_distribution_html.sh`)를 수정한 뒤 다시 생성하세요.
