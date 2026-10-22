'use client';

// Loads GA4 only after the visitor has granted analytics consent.
// Because the script is not rendered at all until consent is true, no GA
// cookies are set before the visitor opts in. When consent is withdrawn the
// provider clears existing GA cookies (see clearAnalyticsCookies).

import Script from 'next/script';
import { useCookieConsent } from './CookieConsentProvider';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function Analytics() {
  const { consent } = useCookieConsent();

  if (!GA_ID) return null; // no measurement id configured
  if (!consent?.analytics) return null; // not consented (or not chosen yet)

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
