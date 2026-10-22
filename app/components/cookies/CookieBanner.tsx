'use client';

// The consent UI. Renders two things:
//  1. The first-visit banner (Accept all / Reject all, equal weight, + Manage).
//  2. The preferences panel, reopened any time via the footer "Cookie settings"
//     link (see CookieSettingsLink below) or the map's "Load map" button.

import { useState } from 'react';
import Link from 'next/link';
import { useCookieConsent } from './CookieConsentProvider';
import type { ConsentCategories } from './consent';
import styles from './CookieBanner.module.css';

export function CookieBanner() {
  const { bannerOpen, settingsOpen } = useCookieConsent();

  const visible = bannerOpen || settingsOpen;
  if (!visible) return null;

  // The panel unmounts whenever it is hidden, so each time it opens its
  // local state starts fresh, seeded from the current consent. The key also
  // re-seeds it if the footer link is used while the first-visit banner is up.
  return <ConsentPanel key={settingsOpen ? 'settings' : 'banner'} />;
}

function ConsentPanel() {
  const { settingsOpen, acceptAll, rejectAll, savePreferences, consent, closeSettings } =
    useCookieConsent();

  const [showPrefs, setShowPrefs] = useState(false);

  // Local toggle state for the preferences panel, seeded from current consent.
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [maps, setMaps] = useState(consent?.maps ?? false);

  const inPrefsMode = showPrefs || settingsOpen;

  function handleSave() {
    const categories: ConsentCategories = { necessary: true, analytics, maps };
    savePreferences(categories);
  }

  function handleClose() {
    // Only allow closing the panel when it was opened from the footer
    // (i.e. a choice already exists). The first-visit banner stays until
    // the visitor actively chooses.
    if (settingsOpen) closeSettings();
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Cookie preferences">
      <div className={styles.panel}>
        {settingsOpen && (
          <button className={styles.close} onClick={handleClose} aria-label="Close cookie settings">
            &times;
          </button>
        )}

        <div className={styles.body}>
          <h2 className={styles.heading}>Cookies on this site</h2>
          <p className={styles.text}>
            We use essential cookies to make the site work. With your permission we also use
            analytics cookies to understand how the site is used so we can improve it, and load
            Google Maps to show where we are. You can accept, reject, or choose for yourself. You
            can change your mind any time from the footer.{' '}
            <Link href="/cookies-policy" className={styles.link}>
              Read our cookies policy
            </Link>
            .
          </p>

          {inPrefsMode && (
            <div className={styles.prefs}>
              <div className={styles.prefRow}>
                <div className={styles.prefInfo}>
                  <span className={styles.prefName}>Essential</span>
                  <span className={styles.prefDesc}>
                    Required for the site to function. Always on.
                  </span>
                </div>
                <span className={styles.alwaysOn}>Always on</span>
              </div>

              <div className={styles.prefRow}>
                <div className={styles.prefInfo}>
                  <span className={styles.prefName}>Analytics</span>
                  <span className={styles.prefDesc}>
                    Google Analytics, to measure visits and improve the site.
                  </span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    aria-label="Allow analytics cookies"
                  />
                  <span className={styles.slider} />
                </label>
              </div>

              <div className={styles.prefRow}>
                <div className={styles.prefInfo}>
                  <span className={styles.prefName}>Maps</span>
                  <span className={styles.prefDesc}>
                    Google Maps, to show our location. Google may set its own cookies.
                  </span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={maps}
                    onChange={(e) => setMaps(e.target.checked)}
                    aria-label="Allow Google Maps"
                  />
                  <span className={styles.slider} />
                </label>
              </div>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          {!inPrefsMode && (
            <button className={styles.manage} onClick={() => setShowPrefs(true)}>
              Manage preferences
            </button>
          )}

          {inPrefsMode ? (
            <button className={styles.primary} onClick={handleSave}>
              Save preferences
            </button>
          ) : (
            <>
              <button className={styles.secondary} onClick={rejectAll}>
                Reject all
              </button>
              <button className={styles.primary} onClick={acceptAll}>
                Accept all
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Drop this into the footer wherever you want the "Cookie settings" control.
// It reopens the preferences panel. It looks like plain text; the caller
// styles it to match the links around it.
export function CookieSettingsLink({ className }: { className?: string }) {
  const { openSettings } = useCookieConsent();
  return (
    <button
      type="button"
      onClick={openSettings}
      className={className}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        margin: 0,
        font: 'inherit',
        color: 'inherit',
        cursor: 'pointer',
      }}
    >
      Cookie settings
    </button>
  );
}
