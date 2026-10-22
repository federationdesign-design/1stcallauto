# Needs Steve

Items that need a decision or an asset from Steve. Work carries on around them.

## Open

1. **Cut-off sentence on Mechanical.** The "Mechanical Fault Finding & Repairs" card ends "we can also arrange collection from your home or" with no ending. A placeholder goes in until you supply the ending. (The Diagnostics page has "from your home or workplace.")
2. **Tidy `.env.example` header.** It still starts with the six-line note from `agent/env.example.txt` ("Intended contents of .env.example ... then delete this copy"). Claude cannot edit `.env*` files; please delete those first six lines.
3. **Set env vars in Vercel and `.env.local`.** At minimum `NEXT_PUBLIC_WHATSAPP_NUMBER=447725629835` (the WhatsApp button reads it and is hidden without it), plus `RESEND_API_KEY`, `NOTIFICATION_EMAIL_FROM` and `CONTACT_EMAIL_TO` before the contact form goes live. GA and Search Console values when you have them.

4. **Workshop address.** Only "Chawston, Cambridgeshire" is known. The street address and postcode are placeholders in the Our Location panel and will be needed for the contact page, legal pages and structured data. The map currently searches for just "Chawston".
5. **Please double-check the county.** The copy everywhere says Chawston, Cambridgeshire, but the mockup map and Google place Chawston in Bedfordshire (near Wyboston and Roxton). The site follows the copy as instructed; worth confirming before launch so the address, map and structured data agree.

## Phase 4 decisions (for information, shout if any is wrong)

- **WhatsApp button** is fixed bottom right on every viewport, per the runbook. The desktop mockups draw it top right beside the nav; the nav pill keeps its drawn width, so the space to its right is now empty.
- **Mobile header** follows the About mobile mockup (centred logo, hamburger). The Home mobile mockup shows no header at all, which looked like an omission.
- **Phone strip on mobile:** neither mobile mockup shows it, so it is not in the mobile header. The same strip text and tel link sit at the bottom of the mobile menu instead.
- **Inner-page testimonial bubble** shows from 1024px up only; the About mobile mockup drops it.
- **Footer:** a "Cookie settings" link sits on its own line under the legal links, so visitors can change consent at any time (GDPR). On mobile the footer shows only the logo and legal links, as drawn.
- **Hero fade** fades the photo towards the panel green as the page scrolls (LHM fades to black). No fade with reduced motion.
- **Map placeholder** keeps the drawn map size so nothing shifts when the map loads. The live map is shown in greyscale to match the mockup.
- **Google Maps embed** also loads Google-hosted fonts and scripts inside the iframe once allowed. The cookies policy (Phase 7) will cover this.
- **Font weight 500** added to the LHM set for page titles and the Our Location heading.
- **`/shell-preview`** is a temporary, noindexed page for the Phase 4 checkpoint. It is deleted in Phase 5.

## Phase 3 decisions (for information, shout if any is wrong)

- **Next.js 16.4.2, not LHM's 16.2.4.** 16.2.4 has published critical advisories, including unauthenticated remote code execution in the Image Optimization API (GHSA-2xp9-vwfh-vxw4) and in `next/og` (GHSA-vcvr-r3jv-pc5j). 16.4.2 is the same major version and clears all production advisories (`npm audit --omit=dev` reports 0). React stays at LHM's 19.2.4. **LHM itself is still on 16.2.4 and exposed to these; worth upgrading there too.**
- **No Tailwind.** LHM installs Tailwind v4 but barely uses it; its real method is CSS Modules plus `globals.css` (and a lot of inline styles). This site uses CSS Modules plus global tokens in `app/globals.css`.
- **Contact form drops reCAPTCHA.** LHM's form verifies Google reCAPTCHA v3, which loads a Google script before consent. That breaks the GDPR rules, so the form uses Resend (as LHM) with a honeypot field only. If spam becomes a problem, a consent-free option can be added later.
- **Cookie categories:** Essential, Analytics (GA4) and Maps (Google Maps). LHM's unused "Marketing" category is removed, since the site has no ads or pixels. Banner wording is adapted from LHM's banner to mention Google Maps.
- **Font:** Plus Jakarta Sans, as LHM, self-hosted by `next/font`. It matches the mockup lettering. Italic is added because the mockups use it for testimonials and headings.
- **Lint fixes in the ported cookie code.** Two `react-hooks/set-state-in-effect` errors from LHM's provider and banner were fixed by reading consent through `useSyncExternalStore`. Behaviour is unchanged, and the banner is no longer rendered into the static HTML.
- **Playwright** added as a dev dependency for the screenshot step in the verification gate.

## Resolved (22 October 2026)

- **`.env.example`:** created by Steve and committed.
- **Navigation defaults:** confirmed (Services dropdown, Find Us to `/contact#location`, Get a free quote to `/contact#quote`).
- **Hero testimonial avatar:** use the roundal drawn beside the same testimonial on Home.
- **Redirects:** table in `REDIRECTS.md` approved. WordPress admin and system paths return 410.
- **Old `/#section` anchors:** left to land on Home. No client-side script.
- **Services:** `/services` is built from `serviceing-your-vehicle-desktop.pdf` as it stands.
- **Reference PDFs:** gitignored and untracked. PNGs stay in git.
- **Map:** Google Maps embed that loads only after consent. Before consent: a placeholder panel with the address, a "Load map" button that opens the consent choice, and a "Get directions" link to Google Maps. Google Maps is listed in the cookies policy.
- **Auto Electrical hero:** reuses the About photo.
- **Contact email:** `info@1st-call.uk`.
- **Facebook:** no link.
