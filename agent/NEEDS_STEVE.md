# Needs Steve

Items that need a decision or an asset from Steve. Work carries on around them.

## Open

1. **Tidy `.env.example` header.** It still starts with the six-line note from `agent/env.example.txt` ("Intended contents of .env.example ... then delete this copy"). Claude cannot edit `.env*` files; please delete those first six lines.
2. **Set env vars in Vercel and `.env.local`.** At minimum `NEXT_PUBLIC_WHATSAPP_NUMBER=447725629835` (the WhatsApp button reads it and is hidden without it), plus `RESEND_API_KEY`, `NOTIFICATION_EMAIL_FROM` and `CONTACT_EMAIL_TO` before the contact form goes live. GA and Search Console values when you have them.
3. **"Cambridgeshire" in the copy (client to confirm).** Steve has supplied the address as The Old Foundry, Chawston Lane, Chawston, Bedford MK44 3BH, which is Bedfordshire. The page copy still says Cambridgeshire, left as written for now:
   - Home hero panel: "near St Neots in Chawston, Cambridgeshire near Wyboston Lakes Golf Course"
   - About body copy: "Based in Chawston, Cambridgeshire, close to St Neots and the Black Cat roundabout on the A1"
   - Service pages: "Based in Chawston, Cambridgeshire" and "throughout Cambridgeshire and Bedfordshire".
   The address, map and (Phase 9) structured data use the supplied address.
4. **More testimonials.** The Testimonials page shows the three from Home plus three placeholder bubbles (testimonials 4 to 6). Send the heading, text and, if wanted, a round photo for each, or say how many slots to keep.
5. **Legal details.** The privacy, terms and cookies pages need:
   - the business's legal name, and whether it is a limited company (number and registered office) or a sole trader;
   - the "Last updated" date (normally the launch date);
   - how long enquiries and job records are kept;
   - the workshop's own terms, if the client wants them on the site (estimates, payment, parts and labour guarantees, uncollected vehicles). The current Terms cover use of the website only;
   - the Google Analytics retention period (set in Phase 8).
   The legal text is a plain-English draft, not legal advice; worth a read by the client.

## Phase 7 decisions (for information, shout if any is wrong)

- **No mockups** for Testimonials, Contact or the legal pages. Each opens with a plain green title band under the header (no photo), then cards on cream like the service pages.
- **Testimonials:** two columns of bubbles on desktop, one on mobile, tones cycling green, sage, white. Heading "What Clients say:" as on Home.
- **Contact:** details card (phone, email, address with "Get directions", "Call us on WhatsApp") and the "Get a free quote" form (`#quote`). "Find Us" lands on the Our Location band below, which already has `#location`.
- **Form fields:** name, email, phone, vehicle (make, model and registration) and message. Name, email and message are required. No checkboxes, so nothing is pre-ticked. Beside the Send button: "We only use your details to reply to your enquiry. See our Privacy Policy."
- **Form wording I had to write** (labels, "Send", the thank-you line "Thank you, your message has been sent. We will be in touch." and error messages). Interface text only; change any of it freely.
- **No autoresponder email.** LHM emails the sender a copy. Without reCAPTCHA, that would let bots use the form to send mail to any address, so only the workshop is emailed (Reply-To is the sender). Delivery goes to `CONTACT_EMAIL_TO`, or `info@1st-call.uk` if that is not set. Tested: honeypot and validation; no live email was sent.
- **Cookies policy** lists exactly what the site stores: the consent choice (local storage, not a cookie), GA4's `_ga` and `_ga_<id>` (only with consent), and Google's own cookies such as NID once the map is allowed. It has a "Cookie settings" button.
- **Privacy policy** names Vercel (hosting), Resend (form delivery), Google (Analytics and Maps, with consent) and WhatsApp (if the visitor chooses it) as the services that handle data.

## Phase 6 follow-up decisions (for information, shout if any is wrong)

- **Services overview cards** use each page's title as the heading and its hero panel paragraph (the line under the page title) as the text. The heading is the link and the whole card is clickable. No "Read more" style button, since that would be new copy.
- **The Mechanical card repeats the Services intro.** Mechanical's opening line ("Keeping your vehicle reliable isn't just about fixing problems...") is also the bold first paragraph of the Services intro, so it appears twice on Services. Likewise the Services hero panel is the Auto Electrical opening line. Both are as drawn; the client may want a fresh line for one of each.
- **Services meta description** now describes the overview (auto electrics, mechanical repairs, servicing and diagnostics, Chawston, 25 years) instead of the mechanical page.

## Phase 6 decisions (for information, shout if any is wrong)

- **Hero images:** Services and Mechanical use the Mechanical photo (as drawn); Auto Electrical reuses the About photo, per Steve.
- **"Get a free estimate" and "Get quote now"** in the service heroes both go to the quote form (`/contact#quote`), per Steve.
- **"Call us on WhatsApp"** in the last card of each page is a plain wa.me link, hidden if `NEXT_PUBLIC_WHATSAPP_NUMBER` is not set.
- **Paragraph spacing in cards** is the same everywhere. The mockups vary (some line breaks have a blank line, some don't); every new line in the mockup is a new paragraph.

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

- **Cut-off sentences:** "...from your home or workplace." and "...mechanical work and MOT process in one place."
- **Services:** now a short overview (hero, intro, three cards linking to Auto Electrical, Mechanical and Diagnostics). The duplicated Mechanical cards are removed.
- **"Air con service" link to Services:** approved.

- **Workshop address:** The Old Foundry, Chawston Lane, Chawston, Bedford MK44 3BH, used everywhere it appears. Map embed and directions link supplied.
- **WhatsApp button:** top right on all screen sizes.
- **Map placeholder:** shorter panel, expanding when the map loads. Live map greyscale, full width.
- **Phone in the mobile menu and Cookie settings link:** approved.
- **`.env.example`:** created by Steve and committed.
- **Navigation defaults:** confirmed (Services dropdown, Find Us to `/contact#location`, Get a free quote to `/contact#quote`).
- **Hero testimonial avatar:** use the roundal drawn beside the same testimonial on Home.
- **Redirects:** table in `REDIRECTS.md` approved. WordPress admin and system paths return 410.
- **Old `/#section` anchors:** left to land on Home. No client-side script.
- **Reference PDFs:** gitignored and untracked. PNGs stay in git.
- **Map:** Google Maps embed that loads only after consent. Before consent: a placeholder panel with the address, a "Load map" button that opens the consent choice, and a "Get directions" link to Google Maps. Google Maps is listed in the cookies policy.
- **Auto Electrical hero:** reuses the About photo.
- **Contact email:** `info@1st-call.uk`.
- **Facebook:** no link.
