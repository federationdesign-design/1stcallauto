// Floating WhatsApp button, fixed top right on every viewport.
// A plain link to wa.me: no WhatsApp widget or script. The number comes from
// NEXT_PUBLIC_WHATSAPP_NUMBER, with the business number as the fallback
// (app/lib/site.ts), so the button always renders.

import Image from 'next/image';
import { whatsappHref } from '../../lib/site';
import styles from './WhatsAppButton.module.css';

export function WhatsAppButton() {
  const href = whatsappHref();

  // The aside is only a landmark so the link is not loose content; the
  // link itself is fixed in place. The icon is served as the plain file
  // (unoptimized), not through /_next/image, so it does not depend on
  // Vercel's image optimiser.
  return (
    <aside aria-label="WhatsApp">
      <a href={href} className={styles.button} aria-label="Message us on WhatsApp">
        <Image src="/images/wa_icon.jpg" alt="" width={161} height={161} unoptimized />
      </a>
    </aside>
  );
}
