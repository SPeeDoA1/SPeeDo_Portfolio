const STORAGE_PREFIX = 'xp-portfolio';
const STORAGE_VERSION = 1;

interface StorageEnvelope<T> {
  version: number;
  value: T;
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}:${key}`);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as StorageEnvelope<T>;
    return parsed.version === STORAGE_VERSION ? parsed.value : fallback;
  } catch {
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      `${STORAGE_PREFIX}:${key}`,
      JSON.stringify({ version: STORAGE_VERSION, value })
    );
  } catch {
    // private browsing / quota exceeded — fail silently, in-memory state still works
  }
}

export const STORAGE_KEYS = {
  windowPositions: 'window-positions',
  theme: 'theme',
  desktopIconPositions: 'desktop-icon-positions',
} as const;
