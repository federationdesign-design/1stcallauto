import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CookieConsentProvider } from './components/cookies/CookieConsentProvider';
import { CookieBanner } from './components/cookies/CookieBanner';
import { Analytics } from './components/cookies/Analytics';

// Same family and weights as LHM. Italic is added because the mockups set
// testimonials and section headings in italic. next/font self-hosts the
// files, so the browser never requests Google Fonts.
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-jakarta',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://1st-call.uk';

export const metadata: Metadata = {
  title: {
    default: '1st Call Auto',
    template: '%s | 1st Call Auto',
  },
  description: 'Vehicle mechanic & auto electrical engineer in PE19',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: '1st Call Auto',
    locale: 'en_GB',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={jakarta.variable}>
      <body className={jakarta.className}>
        <CookieConsentProvider>
          {children}
          <Analytics />
          <CookieBanner />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
