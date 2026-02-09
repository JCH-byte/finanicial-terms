const TERMS_DATA_FILE = 'financial_terms_700.json';

function buildCandidateUrls() {
    const fromLocation = new URL(`./data/${TERMS_DATA_FILE}`, window.location.href).href;
    const fromModule = new URL(`../../data/${TERMS_DATA_FILE}`, import.meta.url).href;
    const relative = `data/${TERMS_DATA_FILE}`;

    return [...new Set([fromLocation, fromModule, relative])];
}

export async function loadTerms() {
    const candidateUrls = buildCandidateUrls();
    let lastStatus = 'unknown';

    for (const url of candidateUrls) {
        const response = await fetch(url);
        if (!response.ok) {
            lastStatus = response.status;
            continue;
        }

        const terms = await response.json();
        if (!Array.isArray(terms)) {
            throw new Error('용어 데이터 형식이 올바르지 않습니다.');
        }

        return terms;
    }

    throw new Error(`용어 데이터를 불러오지 못했습니다. (status: ${lastStatus})`);
}
