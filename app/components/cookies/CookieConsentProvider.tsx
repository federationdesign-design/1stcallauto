'use client';

// Provides consent state to the whole app and controls when the banner shows.
// Wrap the app body in <CookieConsentProvider> in app/layout.tsx.

import { createContext, useContext, useState, useCallback, useSyncExternalStore } from 'react';
import {
  type ConsentCategories,
  type ConsentState,
  writeConsent,
  clearAnalyticsCookies,
  subscribeConsent,
  getConsentSnapshot,
  getConsentServerSnapshot,
  GRANT_ALL,
  DENY_ALL,
} from './consent';

type ConsentContextValue = {
  consent: ConsentState; // null until the visitor chooses
  bannerOpen: boolean; // first-visit banner
  settingsOpen: boolean; // reopened via footer link or the map's "Load map"
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (categories: ConsentCategories) => void;
  openSettings: () => void;
  closeSettings: () => void;
};

const CookieConsentContext = createContext<ConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  // undefined on the server and during hydration, then the stored choice
  // (or null if there is none). Reading it this way avoids a hydration
  // mismatch without setting state in an effect.
  const stored = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getConsentServerSnapshot);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const apply = useCallback((categories: ConsentCategories) => {
    writeConsent(categories);
    if (!categories.analytics) clearAnalyticsCookies();
  }, []);

  const acceptAll = useCallback(() => {
    apply(GRANT_ALL);
    setSettingsOpen(false);
  }, [apply]);

  const rejectAll = useCallback(() => {
    apply(DENY_ALL);
    setSettingsOpen(false);
  }, [apply]);

  const savePreferences = useCallback(
    (categories: ConsentCategories) => {
      apply(categories);
      setSettingsOpen(false);
    },
    [apply]
  );

  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  // The first-visit banner shows once the client has read storage and found
  // no stored choice.
  const bannerOpen = stored === null;

  return (
    <CookieConsentContext.Provider
      value={{
        consent: stored ?? null,
        bannerOpen,
        settingsOpen,
        acceptAll,
        rejectAll,
        savePreferences,
        openSettings,
        closeSettings,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): ConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error('useCookieConsent must be used inside CookieConsentProvider');
  }
  return ctx;
}
