import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CookieConsentProvider } from './components/cookies/CookieConsentProvider';
import { CookieBanner } from './components/cookies/CookieBanner';
import { Analytics } from './components/cookies/Analytics';
import { Header } from './components/site/Header';
import { LocationBand } from './components/site/LocationBand';
import { Footer } from './components/site/Footer';
import { WhatsAppButton } from './components/site/WhatsAppButton';

// Same family as LHM, with LHM's weights plus 500 (used by the mockups for
// page titles and the Our Location heading) and italic (testimonials and
// section headings). next/font self-hosts the files, so the browser never
// requests Google Fonts.
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
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
          <Header />
          <main>{children}</main>
          <LocationBand />
          <Footer />
          <WhatsAppButton />
          <Analytics />
          <CookieBanner />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
