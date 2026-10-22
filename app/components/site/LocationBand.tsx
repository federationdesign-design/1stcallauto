'use client';

// "Our Location" band, shown above the footer on every page.
// The Google Maps embed loads only after the visitor allows Maps cookies.
// Until then a shorter placeholder panel shows the address, a "Load map"
// button that opens the cookie choice, and a plain "Get directions" link to
// Google Maps. The band expands to the drawn map size once the map loads.

import { useCookieConsent } from '../cookies/CookieConsentProvider';
import { ADDRESS_LINES, DIRECTIONS_HREF, MAP_EMBED_SRC } from '../../lib/site';
import styles from './LocationBand.module.css';

export function LocationBand() {
  const { consent, openSettings } = useCookieConsent();

  return (
    <section id="location" className={styles.band} aria-labelledby="location-heading">
      <h2 id="location-heading" className={styles.heading}>
        Our Location
      </h2>

      <div className={consent?.maps ? styles.map : styles.mapPending}>
        {consent?.maps ? (
          <iframe
            className={styles.frame}
            src={MAP_EMBED_SRC}
            title="Map showing 1st Call Auto at The Old Foundry, Chawston"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className={styles.placeholder}>
            <address className={styles.address}>
              {ADDRESS_LINES.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className={styles.actions}>
              <button type="button" className={styles.primary} onClick={openSettings}>
                Load map
              </button>
              <a href={DIRECTIONS_HREF} className={styles.secondary} target="_blank" rel="noopener noreferrer">
                Get directions
                <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
