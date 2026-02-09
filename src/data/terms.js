const TERMS_DATA_FILES = ['financial_terms_800.json', 'financial_terms_700.json'];

function resolveDataUrl(fileName) {
    return new URL(`../../data/${fileName}`, import.meta.url).href;
}

export async function loadTerms() {
    let lastStatus = null;

    for (const fileName of TERMS_DATA_FILES) {
        const dataUrl = resolveDataUrl(fileName);
        const response = await fetch(dataUrl);

        if (!response.ok) {
            lastStatus = `${fileName}: ${response.status}`;
            continue;
        }

        const terms = await response.json();
        if (!Array.isArray(terms)) {
            throw new Error(`${fileName} 데이터 형식이 올바르지 않습니다.`);
        }

        return terms;
    }

    throw new Error(`용어 데이터를 불러오지 못했습니다. (${lastStatus ?? 'status: unknown'})`);
}
