// Consent model + storage helpers for the cookie banner.
//
// The consent record itself is a "strictly necessary" preference, so storing
// it does not require consent. We keep it in localStorage for simplicity since
// all script gating happens client side.

export type ConsentCategories = {
  necessary: true; // always granted, cannot be switched off
  analytics: boolean; // GA4
  maps: boolean; // Google Maps embed in the Our Location band
};

// null means the visitor has not made a choice yet (show the banner).
export type ConsentState = ConsentCategories | null;

const STORAGE_KEY = 'firstcall-cookie-consent';

// Bump this number if the cookie policy materially changes. Everyone will be
// re-prompted because their stored version will no longer match.
const CONSENT_VERSION = 1;

// In-memory copy of the choice and its subscribers. See the external store
// section below.
let current: ConsentState | undefined; // undefined until first client read
const listeners = new Set<() => void>();

type StoredConsent = {
  version: number;
  categories: ConsentCategories;
  timestamp: string;
};

export function readConsent(): ConsentState {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== CONSENT_VERSION) return null; // policy changed, re-ask
    return parsed.categories;
  } catch {
    return null;
  }
}

export function writeConsent(categories: ConsentCategories): void {
  if (typeof window === 'undefined') return;
  const record: StoredConsent = {
    version: CONSENT_VERSION,
    categories,
    timestamp: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // storage unavailable (private mode quota etc.) - fail silently
  }
  // Update the in-memory copy even if storage failed, so the choice still
  // applies for this visit.
  current = categories;
  listeners.forEach((listener) => listener());
}

// ── External store for useSyncExternalStore ──────────────────────
// The provider reads consent through useSyncExternalStore rather than
// setting state in an effect. On the server, and during hydration, the
// snapshot is `undefined` ("not known yet"), so the banner is never rendered
// into the static HTML and returning visitors see no flash of it.

export function subscribeConsent(listener: () => void): () => void {
  // Another tab changing consent updates this one too.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    current = readConsent();
    listener();
  };
  listeners.add(listener);
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

export function getConsentSnapshot(): ConsentState | undefined {
  if (current === undefined) current = readConsent();
  return current;
}

export function getConsentServerSnapshot(): ConsentState | undefined {
  return undefined;
}

export const GRANT_ALL: ConsentCategories = {
  necessary: true,
  analytics: true,
  maps: true,
};

export const DENY_ALL: ConsentCategories = {
  necessary: true,
  analytics: false,
  maps: false,
};

// When a visitor withdraws analytics consent we proactively clear the GA
// cookies that may already be set, rather than waiting for them to expire.
export function clearAnalyticsCookies(): void {
  if (typeof document === 'undefined') return;
  const host = window.location.hostname;
  // GA cookies are typically _ga, _ga_XXXX, _gid, _gat. Match the family.
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const name = cookie.split('=')[0]?.trim();
    if (!name) continue;
    if (name === '_ga' || name.startsWith('_ga_') || name === '_gid' || name.startsWith('_gat')) {
      // Expire on the current host and on the registrable domain.
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${host}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${host}`;
    }
  }
}
