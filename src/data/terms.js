const TERMS_DATA_PATH = new URL('../../data/financial_terms_700.json', import.meta.url).href;

export async function loadTerms() {
    const response = await fetch(TERMS_DATA_PATH);
    if (!response.ok) {
        throw new Error(`용어 데이터를 불러오지 못했습니다. (status: ${response.status})`);
    }

    const terms = await response.json();
    if (!Array.isArray(terms)) {
        throw new Error('용어 데이터 형식이 올바르지 않습니다.');
    }

    return terms;
}
