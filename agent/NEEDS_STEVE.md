# Needs Steve

Items that need a decision or an asset from Steve. Work carries on around them.

## Open

1. **Two cut-off sentences on Services and Mechanical.** Both pages share these cards, and both sentences stop mid-sentence in the mockups. Each has a placeholder until you supply the ending:
   - "Mechanical Fault Finding & Repairs": "If your vehicle cannot be driven safely or is a complete non-starter, we can also arrange collection from your home or". (The Auto Electrical and Diagnostics pages end the same idea with "from your home or workplace.")
   - "Preparing for MOT": "This means you can deal with the mechanical work and MOT process", with no ending.
2. **Tidy `.env.example` header.** It still starts with the six-line note from `agent/env.example.txt` ("Intended contents of .env.example ... then delete this copy"). Claude cannot edit `.env*` files; please delete those first six lines.
3. **Set env vars in Vercel and `.env.local`.** At minimum `NEXT_PUBLIC_WHATSAPP_NUMBER=447725629835` (the WhatsApp button reads it and is hidden without it), plus `RESEND_API_KEY`, `NOTIFICATION_EMAIL_FROM` and `CONTACT_EMAIL_TO` before the contact form goes live. GA and Search Console values when you have them.
4. **"Cambridgeshire" in the copy (client to confirm).** Steve has supplied the address as The Old Foundry, Chawston Lane, Chawston, Bedford MK44 3BH, which is Bedfordshire. The page copy still says Cambridgeshire, left as written for now:
   - Home hero panel: "near St Neots in Chawston, Cambridgeshire near Wyboston Lakes Golf Course"
   - About body copy: "Based in Chawston, Cambridgeshire, close to St Neots and the Black Cat roundabout on the A1"
   The address, map and (Phase 9) structured data use the supplied address.

## Phase 6 decisions (for information, shout if any is wrong)

- **"Air con service" on the Home hero links to Services** ("Servicing your vehicle"). No page covers air conditioning on its own; About mentions "air-conditioning servicing and re-gassing".
- **Services is built from its mockup as it stands.** It shares every card with the Mechanical page, and its hero panel is the electrical paragraph ("Modern vehicles rely heavily on their electrical systems...") that also opens Auto Electrical. Worth a look from the client: Services and Mechanical are near duplicates, which search engines can treat as thin content.
- **Hero images:** Services and Mechanical use the Mechanical photo (as drawn); Auto Electrical reuses the About photo, per Steve.
- **"Get a free estimate" and "Get quote now"** in the service heroes both go to the quote form (`/contact#quote`), per Steve.
- **"Call us on WhatsApp"** in the last card of each page is a plain wa.me link, hidden if `NEXT_PUBLIC_WHATSAPP_NUMBER` is not set.
- **Paragraph spacing in cards** is the same everywhere. The mockups vary (some line breaks have a blank line, some don't); every new line in the mockup is a new paragraph.
- **Cambridgeshire** also appears in the service page copy ("throughout Cambridgeshire and Bedfordshire", "Based in Chawston, Cambridgeshire"). Left as written; see item 4.

## Phase 5 decisions (for information, shout if any is wrong)

- **Home title on mobile.** The mobile Home mockup shows the photo with no title; the page title "We can work on all motor vehicles" is shown over it anyway, as on the other pages, because it is the page's main heading.
- **All eight FAQs on mobile.** Both mobile mockups show only the first four. The site shows all eight on every viewport.
- **About reasons carousel** has 8 dots, one per reason (the mockup draws 12).
- **About FAQ heading** is hidden on desktop (not drawn) but kept for screen readers.
- **Home hero tick list** is two columns from 1440px; below that the panel is too narrow, so it is one column.
- **No links in the hero tick lists** ("Get a free estimate" etc.), as drawn. They could link to the contact form or service pages if wanted.
- **WhatsApp button** is fixed top right: beside the nav on desktop as drawn, and just below the hamburger on mobile (the hamburger owns the corner there).
- **Map placeholder** is now only as tall as the address and buttons; the band grows to the drawn map size once the map loads.

## Phase 4 decisions (for information, shout if any is wrong)

- **Mobile header** follows the About mobile mockup (centred logo, hamburger). The Home mobile mockup shows no header at all, which looked like an omission.
- **Phone strip on mobile:** neither mobile mockup shows it, so it is not in the mobile header. The same strip text and tel link sit at the bottom of the mobile menu instead.
- **Inner-page testimonial bubble** shows from 1024px up only; the About mobile mockup drops it.
- **Footer:** a "Cookie settings" link sits on its own line under the legal links, so visitors can change consent at any time (GDPR). On mobile the footer shows only the logo and legal links, as drawn.
- **Hero fade** fades the photo towards the panel green as the page scrolls (LHM fades to black). No fade with reduced motion.
- **Live map** is shown in greyscale, full width, to match the mockup.
- **Google Maps embed** also loads Google-hosted fonts and scripts inside the iframe once allowed. The cookies policy (Phase 7) will cover this.
- **Font weight 500** added to the LHM set for page titles and the Our Location heading.

## Phase 3 decisions (for information, shout if any is wrong)

- **Next.js 16.4.2, not LHM's 16.2.4.** 16.2.4 has published critical advisories, including unauthenticated remote code execution in the Image Optimization API (GHSA-2xp9-vwfh-vxw4) and in `next/og` (GHSA-vcvr-r3jv-pc5j). 16.4.2 is the same major version and clears all production advisories (`npm audit --omit=dev` reports 0). React stays at LHM's 19.2.4. **LHM itself is still on 16.2.4 and exposed to these; worth upgrading there too.**
- **No Tailwind.** LHM installs Tailwind v4 but barely uses it; its real method is CSS Modules plus `globals.css` (and a lot of inline styles). This site uses CSS Modules plus global tokens in `app/globals.css`.
- **Contact form drops reCAPTCHA.** LHM's form verifies Google reCAPTCHA v3, which loads a Google script before consent. That breaks the GDPR rules, so the form uses Resend (as LHM) with a honeypot field only. If spam becomes a problem, a consent-free option can be added later.
- **Cookie categories:** Essential, Analytics (GA4) and Maps (Google Maps). LHM's unused "Marketing" category is removed, since the site has no ads or pixels. Banner wording is adapted from LHM's banner to mention Google Maps.
- **Font:** Plus Jakarta Sans, as LHM, self-hosted by `next/font`. It matches the mockup lettering. Italic is added because the mockups use it for testimonials and headings.
- **Lint fixes in the ported cookie code.** Two `react-hooks/set-state-in-effect` errors from LHM's provider and banner were fixed by reading consent through `useSyncExternalStore`. Behaviour is unchanged, and the banner is no longer rendered into the static HTML.
- **Playwright** added as a dev dependency for the screenshot step in the verification gate.

## Resolved (22 October 2026)

- **Workshop address:** The Old Foundry, Chawston Lane, Chawston, Bedford MK44 3BH, used everywhere it appears. Map embed and directions link supplied.
- **WhatsApp button:** top right on all screen sizes.
- **Map placeholder:** shorter panel, expanding when the map loads. Live map greyscale, full width.
- **Phone in the mobile menu and Cookie settings link:** approved.
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
