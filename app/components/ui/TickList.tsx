// List with round tick icons, as used in the hero panels ("Get a free
// estimate") and the service cards. Items can be plain text or links.

import type { CSSProperties } from 'react';
import Link from 'next/link';
import styles from './TickList.module.css';

export type TickItem = { label: string; href?: string };

type Props = {
  items: TickItem[];
  tone?: 'onGreen' | 'onLight'; // white ticks on the green panel, green ticks on cream or white
  splitOnDesktop?: boolean; // two columns from 1440px, filled top to bottom (Home hero)
  className?: string;
};

export function TickList({ items, tone = 'onLight', splitOnDesktop = false, className }: Props) {
  const classes = [styles.list, styles[tone], splitOnDesktop && styles.split, className];
  const rows = Math.ceil(items.length / 2);

  return (
    <ul
      className={classes.filter(Boolean).join(' ')}
      style={splitOnDesktop ? ({ '--rows': rows } as CSSProperties) : undefined}
    >
      {items.map((item) => (
        <li key={item.label} className={styles.item}>
          <TickIcon />
          {item.href ? (
            <Link href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ) : (
            item.label
          )}
        </li>
      ))}
    </ul>
  );
}

export function TickIcon({ className }: { className?: string }) {
  return (
    <svg className={`${styles.icon} ${className ?? ''}`} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" className={styles.circle} />
      <path d="M6.5 12.5l3.5 3.5 7.5-8" className={styles.check} />
    </svg>
  );
}
