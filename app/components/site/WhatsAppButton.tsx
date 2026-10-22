// Floating WhatsApp button, fixed top right on every viewport.
// A plain link to wa.me: no WhatsApp widget or script. The number comes from
// NEXT_PUBLIC_WHATSAPP_NUMBER; without it the button is not rendered.

import Image from 'next/image';
import { whatsappHref } from '../../lib/site';
import styles from './WhatsAppButton.module.css';

export function WhatsAppButton() {
  const href = whatsappHref();
  if (!href) return null;

  return (
    <a href={href} className={styles.button} aria-label="Message us on WhatsApp">
      <Image src="/images/wa_icon.jpg" alt="" width={161} height={161} sizes="(min-width: 1024px) 160px, 72px" />
    </a>
  );
}
