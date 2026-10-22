'use client';

// Loads GA4 only after the visitor has granted analytics consent.
// Because the script is not rendered at all until consent is true, no GA
// cookies are set before the visitor opts in. Google Consent Mode is set
// up before the config call: every type defaults to denied, then
// analytics_storage alone is granted. The site has no ads, so the ad types
// stay denied and Google signals and ad personalisation are switched off.
//
// When consent is withdrawn the provider clears GA cookies (see
// clearAnalyticsCookies), and this component turns consent back to denied
// and disables GA, since a loaded script cannot be unloaded.

import { useEffect } from 'react';
import Script from 'next/script';
import { useCookieConsent } from './CookieConsentProvider';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type GtagWindow = {
  gtag?: (...args: unknown[]) => void;
  [key: string]: unknown;
};

export function Analytics() {
  const { consent } = useCookieConsent();
  const granted = !!consent?.analytics;

  // Withdrawn, or granted again in the same visit (next/script does not
  // re-run the init script, so switch GA back on here).
  useEffect(() => {
    if (!GA_ID) return;
    const w = window as unknown as GtagWindow;
    if (!w.gtag) return; // not loaded yet: the init script handles it
    w.gtag('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' });
    w[`ga-disable-${GA_ID}`] = !granted;
  }, [granted]);

  if (!GA_ID) return null; // no measurement id configured
  if (!granted) return null; // not consented (or not chosen yet)

  return (
    <>
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          window['ga-disable-${GA_ID}'] = false;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'denied',
            personalization_storage: 'denied',
            security_storage: 'granted'
          });
          gtag('consent', 'update', { analytics_storage: 'granted' });
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    </>
  );
}
