'use client';

// Site header. Sits over the top of the page hero.
// Mobile: centred logo and a menu button that opens a full-screen menu, with
// Services as an expandable list. The button stays on top of the open menu
// and turns from three bars into crossed spanners (MenuIcon), so the same
// button opens and closes it. Desktop (1024px and up): the top strip with
// the phone number, the logo and the pill navigation. Services links
// straight to /services there, with no dropdown (Steve); "Services" stays
// highlighted on the three specialist pages.

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
  const menuRef = useRef<HTMLDivElement>(null);

  function closeMenu() {
    setMenuOpen(false);
    setServicesOpen(false);
  }

  // While the mobile menu is open: lock page scroll, close on Escape, and
  // keep Tab cycling between the menu button and the menu, since the page
  // underneath is covered. Focus stays on the menu button, which closes it.
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setServicesOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !menuButtonRef.current || !menuRef.current) return;
      const focusable = [
        menuButtonRef.current,
        ...menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ].filter((el) => el.offsetParent !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = active !== null && focusable.includes(active);
      if (event.shiftKey && (active === first || !inside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !inside)) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
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
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isInSection(item, pathname) ? styles.current : undefined}
                  aria-current={isCurrent(item.href, pathname) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
        >
          <MenuIcon />
        </button>
      </div>

      <div id="mobile-menu" ref={menuRef} className={styles.mobileMenu} hidden={!menuOpen}>
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

// Three bars that become crossed spanners when the menu opens. Drawn here
// from simple shapes on a 44px grid: each outer bar is a shaft with an
// open jaw (a C-shaped head) at one end and a ring at the other, which grow
// in as the bar turns 45 degrees about the centre. The two spanners face
// opposite ways, so both jaws end up at the top of the X. The shapes are
// driven by the button's aria-expanded in Header.module.css.
function MenuIcon() {
  return (
    <svg className={styles.menuIcon} viewBox="0 0 44 44" aria-hidden="true">
      <g className={styles.spannerTop}>
        <rect className={styles.shaft} x="4" y="7" width="36" height="6" rx="3" />
        <path className={styles.jaw} d="M3.11 6.55A4.5 4.5 0 1 1 3.11 13.45" />
        <circle className={styles.ring} cx="38" cy="10" r="3.5" />
      </g>
      <rect className={styles.middleBar} x="4" y="19" width="36" height="6" rx="3" />
      <g className={styles.spannerBottom}>
        <rect className={styles.shaft} x="4" y="31" width="36" height="6" rx="3" />
        <path className={styles.jaw} d="M40.89 37.45A4.5 4.5 0 1 1 40.89 30.55" />
        <circle className={styles.ring} cx="6" cy="34" r="3.5" />
      </g>
    </svg>
  );
}
