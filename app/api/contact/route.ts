/**
 * POST /api/contact
 *
 * Handles the enquiry and free quote form on /contact. Ported from LHM's
 * contact route, with two changes for this site:
 *   - No reCAPTCHA. It loads a Google script before consent, which the
 *     GDPR rules forbid. Spam protection is the honeypot field only.
 *   - No autoresponder. Without a captcha, sending mail to the address
 *     typed into the form would let bots use it to email anyone.
 *
 * Flow:
 *   1. Parse JSON body
 *   2. Honeypot check: silently return success if the hidden `website`
 *      field is filled (bots fill it; people don't see it)
 *   3. Validate required fields and length caps
 *   4. Send the notification email to the workshop, with Reply-To set to
 *      the sender so a reply goes straight back to them
 *   5. Return { success, error } JSON
 */

import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '../../lib/send-email';
import { EMAIL, PHONE_DISPLAY } from '../../lib/site';

export const runtime = 'nodejs';

// ── REQUEST SHAPE ─────────────────────────────────────────────────────────────

type RequestBody = {
  name?: string;
  email?: string;
  phone?: string;
  vehicle?: string;
  message?: string;
  /** Honeypot: must be empty. Bots will fill it. */
  website?: string;
};

// ── FIELD LENGTH CAPS ─────────────────────────────────────────────────────────
// Server-side guard against abuse. Generous enough that no real visitor
// should hit them.

const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MAX_PHONE = 30;
const MAX_VEHICLE = 200;
const MAX_MESSAGE = 5000;

// ── VALIDATION ────────────────────────────────────────────────────────────────

function validate(body: RequestBody): string | null {
  if (!body.name?.trim()) return 'Please enter your name.';
  if (body.name.length > MAX_NAME) return 'Name is too long.';

  if (!body.email?.trim()) return 'Please enter your email address.';
  if (body.email.length > MAX_EMAIL) return 'Email address is too long.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) return 'Please enter a valid email address.';

  if (body.phone && body.phone.length > MAX_PHONE) return 'Phone number is too long.';
  if (body.vehicle && body.vehicle.length > MAX_VEHICLE) return 'Vehicle details are too long.';

  if (!body.message?.trim()) return 'Please enter a message.';
  if (body.message.length > MAX_MESSAGE) return 'Message is too long. Please keep it under 5000 characters.';

  return null;
}

// ── HTML ESCAPING ─────────────────────────────────────────────────────────────
// User input goes into the notification email body. Escape it so pasted
// markup renders as text rather than running in the email client.

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Header values come from the visitor, so strip line breaks from anything
// used in the subject line.
function oneLine(s: string): string {
  return s.replace(/[\r\n]+/g, ' ');
}

// ── ROUTE HANDLER ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: silently succeed if filled, so bots think they got through.
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ success: false, error: validationError }, { status: 400 });
  }

  const name = body.name!.trim();
  const email = body.email!.trim();
  const phone = body.phone?.trim() || '';
  const vehicle = body.vehicle?.trim() || '';
  const message = body.message!.trim();

  // Comma-separated recipients from env, so they can change without a
  // deploy. Falls back to the published contact address.
  const toEnv = process.env.CONTACT_EMAIL_TO || EMAIL;
  const toList = toEnv.split(',').map((s) => s.trim()).filter(Boolean);

  const submittedAt = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const subject = `[Website enquiry] ${oneLine(name)}`;

  const text = [
    'New enquiry from the website.',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || '(not provided)'}`,
    `Vehicle: ${vehicle || '(not provided)'}`,
    `Submitted: ${submittedAt}`,
    '',
    'Message:',
    message,
    '',
    '---',
    'Reply to this email to respond directly to the sender.',
  ].join('\n');

  const row = (label: string, value: string) =>
    `<tr><td style="padding: 6px 12px 6px 0; font-weight: 600; vertical-align: top; width: 100px;">${label}</td><td style="padding: 6px 0;">${value}</td></tr>`;
  const notProvided = '<em style="color: #888;">not provided</em>';

  const html = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a1a; max-width: 600px;">
  <h2 style="font-size: 18px; font-weight: 600; margin: 0 0 16px;">New enquiry from the website</h2>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
    ${row('Name', escapeHtml(name))}
    ${row('Email', `<a href="mailto:${escapeHtml(email)}" style="color: #1a1a1a;">${escapeHtml(email)}</a>`)}
    ${row('Phone', phone ? escapeHtml(phone) : notProvided)}
    ${row('Vehicle', vehicle ? escapeHtml(vehicle) : notProvided)}
    ${row('Submitted', escapeHtml(submittedAt))}
  </table>
  <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
  <h3 style="font-size: 14px; font-weight: 600; margin: 0 0 10px;">Message</h3>
  <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.5; padding: 14px 16px; background: #f6f6f6; border-radius: 4px;">${escapeHtml(message)}</div>
  <p style="font-size: 12px; color: #888; margin-top: 24px;">Reply to this email to respond directly to the sender.</p>
</div>`.trim();

  const result = await sendEmail({ to: toList, subject, text, html, replyTo: email });

  if (!result.success) {
    console.error('Contact notification email failed:', result.error);
    return NextResponse.json(
      {
        success: false,
        error: `Sorry, your message could not be sent. Please try again, call us on ${PHONE_DISPLAY} or email ${EMAIL}.`,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
