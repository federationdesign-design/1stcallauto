// Contact. No mockup: built from the site's existing parts. Contact
// details on the left (phone, WhatsApp, email, address), the enquiry and
// free quote form on the right (#quote); stacked in that order on mobile.
// The Our Location band below (#location) comes from the layout.

import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '../components/page-header/PageHeader';
import { ADDRESS_LINES, DIRECTIONS_HREF, EMAIL, PHONE_DISPLAY, PHONE_HREF, whatsappHref } from '../lib/site';
import { ContactForm } from './ContactForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact 1st Call Auto in Chawston, near St Neots: call 01480 212766, message us on WhatsApp or send an enquiry for a free quote.',
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  const whatsapp = whatsappHref();

  return (
    <>
      <PageHeader title="Contact" />

      <div className={styles.layout}>
        <section className={`${styles.card} ${styles.details}`} aria-labelledby="details-heading">
          <h2 id="details-heading" className={styles.heading}>
            Contact details
          </h2>

          <dl className={styles.list}>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={PHONE_HREF} className={styles.big}>
                  {PHONE_DISPLAY}
                </a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>
                <address className={styles.address}>
                  {ADDRESS_LINES.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
                <a href={DIRECTIONS_HREF} target="_blank" rel="noopener noreferrer">
                  Get directions
                  <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
                </a>
              </dd>
            </div>
          </dl>

          {whatsapp && (
            <a href={whatsapp} className={styles.whatsapp}>
              <Image src="/images/wa_icon.jpg" alt="" width={161} height={161} className={styles.whatsappIcon} unoptimized />
              Call us on WhatsApp
            </a>
          )}
        </section>

        <section id="quote" className={styles.card} aria-labelledby="quote-heading">
          <h2 id="quote-heading" className={styles.heading}>
            Get a free quote
          </h2>
          <ContactForm />
        </section>
      </div>
    </>
  );
}
