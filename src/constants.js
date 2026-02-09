// 탭 ID는 라우팅/내비게이션에서 재사용되므로 문자열 리터럴 대신 상수로 중앙 관리합니다.
export const TAB_IDS = {
    DICTIONARY: 'dict',
    FLASHCARD: 'flashcard',
    QUIZ: 'quiz',
    NOTE: 'note',
};

// 스토리지 키 네이밍 정책
// - Prefix: APP_STORAGE_PREFIX로 앱 소유 키를 분리합니다.
// - Version: STORAGE_SCHEMA_VERSION을 키에 포함해 스키마 변경 시 점진 마이그레이션을 쉽게 합니다.
// - Rule: `${APP_STORAGE_PREFIX}:${STORAGE_SCHEMA_VERSION}:${domain}` 형식만 사용합니다.
export const APP_STORAGE_PREFIX = 'fin-term';
export const STORAGE_SCHEMA_VERSION = 'v1';

export const STORAGE_KEYS = {
    BOOKMARKS: `${APP_STORAGE_PREFIX}:${STORAGE_SCHEMA_VERSION}:bookmarks`,
    FLASHCARD_INDEX: `${APP_STORAGE_PREFIX}:${STORAGE_SCHEMA_VERSION}:flashcard_idx`,
};
