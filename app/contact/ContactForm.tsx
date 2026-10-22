'use client';

// Enquiry and free quote form. Posts JSON to /api/contact, which emails
// the workshop through Resend (LHM's delivery method). Spam protection is
// a honeypot field only (no reCAPTCHA, see the route). There are no
// checkboxes, so nothing is pre-ticked; the privacy policy link sits
// beside the submit button.

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    setStatus({ kind: 'sending' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setStatus({ kind: 'error', message: data.error || 'Something went wrong. Please try again.' });
        return;
      }
      form.reset();
      setStatus({ kind: 'sent' });
    } catch {
      setStatus({ kind: 'error', message: 'Network error. Please check your connection and try again.' });
    }
  }

  if (status.kind === 'sent') {
    return (
      <p className={styles.sent} role="status">
        Thank you, your message has been sent. We will be in touch.
      </p>
    );
  }

  const sending = status.kind === 'sending';

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Honeypot: off screen and out of the tab order. People never see
          it; bots that fill every field do, and the API drops those. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">Website (leave blank)</label>
        <input type="text" id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-name">Name *</label>
        <input id="contact-name" name="name" type="text" autoComplete="name" required maxLength={100} />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-email">Email *</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={200} />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-phone">Phone</label>
        <input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-vehicle">Vehicle make, model and registration</label>
        <input id="contact-vehicle" name="vehicle" type="text" maxLength={200} />
      </div>

      <div className={`${styles.field} ${styles.wide}`}>
        <label htmlFor="contact-message">Message *</label>
        <textarea id="contact-message" name="message" rows={6} required maxLength={5000} />
      </div>

      <div className={`${styles.submitRow} ${styles.wide}`}>
        <button type="submit" className={styles.submit} disabled={sending}>
          {sending ? 'Sending…' : 'Send'}
        </button>
        <p className={styles.privacy}>
          We only use your details to reply to your enquiry. See our{' '}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </div>

      <p className={`${styles.error} ${styles.wide}`} role="alert">
        {status.kind === 'error' ? status.message : ''}
      </p>
    </form>
  );
}
