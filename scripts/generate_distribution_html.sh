#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_FILE="${ROOT_DIR}/financial_terms_700.html"

cat > "${TARGET_FILE}" <<'HTML'
<!DOCTYPE html>
<!-- AUTO-GENERATED FILE: Do not edit manually. -->
<!-- Regenerate with: ./scripts/generate_distribution_html.sh -->
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>경제금융용어 700</title>
    <meta http-equiv="refresh" content="0; url=./index.html">
    <link rel="canonical" href="./index.html">
    <script>
        window.location.replace('./index.html');
    </script>
</head>
<body>
    <p>이 페이지는 <a href="./index.html">index.html</a>로 이동했습니다.</p>
</body>
</html>
HTML

echo "Generated ${TARGET_FILE}"
