'use client';

// Opens the cookie preferences panel, as the footer's "Cookie settings"
// link does, styled as a button for the cookies policy.

import { useCookieConsent } from '../cookies/CookieConsentProvider';

export function CookieSettingsButton({ className }: { className?: string }) {
  const { openSettings } = useCookieConsent();
  return (
    <button type="button" onClick={openSettings} className={className}>
      Cookie settings
    </button>
  );
}
