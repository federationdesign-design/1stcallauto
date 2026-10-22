# Needs Steve

Items that need a decision or an asset from Steve. Work carries on around them.

## Open

1. **Cut-off sentence on Mechanical.** The "Mechanical Fault Finding & Repairs" card ends "we can also arrange collection from your home or" with no ending. A placeholder goes in until you supply the ending. (The Diagnostics page has "from your home or workplace.")
2. **Hero testimonial avatar.** The "Saved me money" bubble on inner pages has a small round avatar. I will match the roundal drawn beside the same testimonial on Home; shout if that is wrong.
3. **Navigation defaults (confirm).** Details in `ROUTES.md`.
   - "Services" goes to `/services`, with the three specialist pages beneath it (desktop dropdown, expandable list in the mobile menu).
   - "Find Us" goes to the location section on `/contact`.
   - "Get a free quote" in the footer goes to the form on `/contact`.

4. **Create `.env.example` (one command).** Claude Code's permission settings deny writing `.env*` files, so the intended contents are in `agent/env.example.txt`. Run: `cp agent/env.example.txt .env.example && git rm agent/env.example.txt`. `.gitignore` already lets `.env.example` through.
5. **Set env vars in Vercel and `.env.local`.** At minimum `NEXT_PUBLIC_WHATSAPP_NUMBER=447725629835` (the WhatsApp button reads it and is hidden without it), plus `RESEND_API_KEY`, `NOTIFICATION_EMAIL_FROM` and `CONTACT_EMAIL_TO` before the contact form goes live. GA and Search Console values when you have them.

## Phase 3 decisions (for information, shout if any is wrong)

- **Next.js 16.4.2, not LHM's 16.2.4.** 16.2.4 has published critical advisories, including unauthenticated remote code execution in the Image Optimization API (GHSA-2xp9-vwfh-vxw4) and in `next/og` (GHSA-vcvr-r3jv-pc5j). 16.4.2 is the same major version and clears all production advisories (`npm audit --omit=dev` reports 0). React stays at LHM's 19.2.4. **LHM itself is still on 16.2.4 and exposed to these; worth upgrading there too.**
- **No Tailwind.** LHM installs Tailwind v4 but barely uses it; its real method is CSS Modules plus `globals.css` (and a lot of inline styles). This site uses CSS Modules plus global tokens in `app/globals.css`.
- **Contact form drops reCAPTCHA.** LHM's form verifies Google reCAPTCHA v3, which loads a Google script before consent. That breaks the GDPR rules, so the form uses Resend (as LHM) with a honeypot field only. If spam becomes a problem, a consent-free option can be added later.
- **Cookie categories:** Essential, Analytics (GA4) and Maps (Google Maps). LHM's unused "Marketing" category is removed, since the site has no ads or pixels. Banner wording is adapted from LHM's banner to mention Google Maps.
- **Font:** Plus Jakarta Sans, as LHM, self-hosted by `next/font`. It matches the mockup lettering. Italic is added because the mockups use it for testimonials and headings.
- **Lint fixes in the ported cookie code.** Two `react-hooks/set-state-in-effect` errors from LHM's provider and banner were fixed by reading consent through `useSyncExternalStore`. Behaviour is unchanged, and the banner is no longer rendered into the static HTML.
- **Playwright** added as a dev dependency for the screenshot step in the verification gate.

## Resolved (22 October 2026)

- **Redirects:** table in `REDIRECTS.md` approved. WordPress admin and system paths return 410.
- **Old `/#section` anchors:** left to land on Home. No client-side script.
- **Services:** `/services` is built from `serviceing-your-vehicle-desktop.pdf` as it stands.
- **Reference PDFs:** gitignored and untracked. PNGs stay in git.
- **Map:** Google Maps embed that loads only after consent. Before consent: a placeholder panel with the address, a "Load map" button that opens the consent choice, and a "Get directions" link to Google Maps. Google Maps is listed in the cookies policy.
- **Auto Electrical hero:** reuses the About photo.
- **Contact email:** `info@1st-call.uk`.
- **Facebook:** no link.
