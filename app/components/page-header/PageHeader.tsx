// Plain page header for pages with no hero photo in the mockups
// (Testimonials, Contact and the legal pages): a green band that sits
// under the site header, with the page title centred in white.

import type { ReactNode } from 'react';
import styles from './PageHeader.module.css';

type Props = {
  title: string;
  children?: ReactNode; // optional line under the title
};

export function PageHeader({ title, children }: Props) {
  return (
    <div className={styles.band}>
      <h1 className={styles.title}>{title}</h1>
      {children && <div className={styles.extra}>{children}</div>}
    </div>
  );
}
