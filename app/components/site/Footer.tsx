'use client';

// Site footer. Desktop: page links, logo, legal links. Mobile (as drawn):
// logo and legal links only. "Cookie settings" sits with the legal links so
// visitors can change their consent at any time.

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FOOTER_NAV, LEGAL_NAV, isCurrent } from '../../data/navigation';
import { CookieSettingsLink } from '../cookies/CookieBanner';
import styles from './Footer.module.css';

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className={styles.footer}>
      <nav aria-label="Footer" className={styles.pages}>
        <ul className={styles.list}>
          {FOOTER_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={isCurrent(item.href, pathname) ? styles.current : undefined}
                aria-current={isCurrent(item.href, pathname) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Link href="/" className={styles.logo} aria-label="1st Call Auto home">
        <Image src="/images/header_logo_white.svg" alt="" width={1043} height={413} unoptimized />
      </Link>

      <div className={styles.legalGroup}>
        <nav aria-label="Legal">
          <ul className={styles.list}>
            {LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href, pathname) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <CookieSettingsLink className={styles.cookieSettings} />
      </div>
    </footer>
  );
}
