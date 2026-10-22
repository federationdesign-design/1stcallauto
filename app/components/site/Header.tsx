'use client';

// Site header. Sits over the top of the page hero.
// Mobile: centred logo and a hamburger that opens a full-screen menu, with
// Services as an expandable list. Desktop (1024px and up): the top strip with
// the phone number, the logo and the pill navigation with a Services dropdown.

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HEADER_NAV, isCurrent, isInSection } from '../../data/navigation';
import { PHONE_DISPLAY, PHONE_HREF } from '../../lib/site';
import styles from './Header.module.css';

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setMenuOpen(false);
    setServicesOpen(false);
  }

  // While the mobile menu is open: lock page scroll, move focus into the
  // menu, close on Escape, and hand focus back to the hamburger afterwards.
  useEffect(() => {
    if (!menuOpen) return;
    const menuButton = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      menuButton?.focus();
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <p className={styles.strip}>
        Vehicle mechanic &amp; auto electrical engineer in PE19 Tel:{' '}
        <a href={PHONE_HREF} className={styles.stripPhone}>
          {PHONE_DISPLAY}
        </a>
      </p>

      <div className={styles.bar}>
        <Link href="/" className={styles.logo} aria-label="1st Call Auto home">
          <Image src="/images/header_logo_white.svg" alt="" width={1043} height={413} unoptimized />
        </Link>

        <nav aria-label="Main" className={styles.desktopNav}>
          <ul className={styles.pill}>
            {HEADER_NAV.map((item) => (
              <li key={item.href} className={item.children ? styles.hasDropdown : undefined}>
                <Link
                  href={item.href}
                  className={isInSection(item, pathname) ? styles.current : undefined}
                  aria-current={isCurrent(item.href, pathname) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className={styles.dropdown}>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={isCurrent(child.href, pathname) ? styles.current : undefined}
                          aria-current={isCurrent(child.href, pathname) ? 'page' : undefined}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <span className="visually-hidden">Open menu</span>
          <span className={styles.burger} aria-hidden="true" />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={styles.mobileMenu}
        hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <button ref={closeButtonRef} type="button" className={styles.closeButton} onClick={closeMenu}>
          <span className="visually-hidden">Close menu</span>
          <span aria-hidden="true">&times;</span>
        </button>

        <nav aria-label="Main">
          <ul className={styles.mobileList}>
            {HEADER_NAV.map((item) => (
              <li key={item.href}>
                <div className={styles.mobileRow}>
                  <Link
                    href={item.href}
                    className={isInSection(item, pathname) ? styles.current : undefined}
                    aria-current={isCurrent(item.href, pathname) ? 'page' : undefined}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      className={styles.expand}
                      aria-expanded={servicesOpen}
                      aria-controls="mobile-services"
                      onClick={() => setServicesOpen((open) => !open)}
                    >
                      <span className="visually-hidden">
                        {servicesOpen ? 'Hide' : 'Show'} {item.label} pages
                      </span>
                      <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 9l7 7 7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                {item.children && (
                  <ul id="mobile-services" className={styles.mobileSubList} hidden={!servicesOpen}>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={isCurrent(child.href, pathname) ? styles.current : undefined}
                          aria-current={isCurrent(child.href, pathname) ? 'page' : undefined}
                          onClick={closeMenu}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <p className={styles.mobileStrip}>
          Vehicle mechanic &amp; auto electrical engineer in PE19 Tel:{' '}
          <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
        </p>
      </div>
    </header>
  );
}
