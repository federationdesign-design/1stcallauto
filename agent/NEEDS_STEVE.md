# Needs Steve

Items that need a decision or an asset from Steve. Work carries on around them.

## Open

1. **Set env vars in Vercel and `.env.local`.** At minimum `NEXT_PUBLIC_WHATSAPP_NUMBER=447725629835` (it overrides the WhatsApp number; without it the site falls back to 447725629835, so the button always shows), plus `RESEND_API_KEY`, `NOTIFICATION_EMAIL_FROM` and `CONTACT_EMAIL_TO` before the contact form goes live. Plus `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel (the Google Places values are done).
2. **"Cambridgeshire" in the copy (client to confirm).** Steve has supplied the address as The Old Foundry, Chawston Lane, Chawston, Bedford MK44 3BH, which is Bedfordshire. The page copy still says Cambridgeshire, left as written for now:
   - Home hero panel: "near St Neots in Chawston, Cambridgeshire near Wyboston Lakes Golf Course"
   - About body copy: "Based in Chawston, Cambridgeshire, close to St Neots and the Black Cat roundabout on the A1"
   - Service pages: "Based in Chawston, Cambridgeshire" and "throughout Cambridgeshire and Bedfordshire".
   The address, map and (Phase 9) structured data use the supplied address.
3. **Legal details (waiting on the client).** The privacy, terms and cookies pages need:
   - the business's legal name, and whether it is a limited company (number and registered office) or a sole trader;
   - the "Last updated" date (normally the launch date);
   - how long enquiries and job records are kept;
   - the workshop's own terms, if the client wants them on the site (estimates, payment, parts and labour guarantees, uncollected vehicles). The current Terms cover use of the website only.
   The legal text is a plain-English draft, not legal advice; worth a read by the client.
4. **"PE19" in the header strip (client to confirm).** The mockups' strip says "Vehicle mechanic & auto electrical engineer in PE19", and that is also the site's default description. PE19 is the St Neots postcode area; the supplied address is MK44 3BH. Left as drawn, like the Cambridgeshire mentions (item 2). The structured data uses the supplied address only.
5. **Opening hours (optional).** Not supplied, so they are not on the site or in the structured data. Google uses them if present; send them if the client wants them shown.

## Page titles and descriptions (approved 22 October 2026)

With Steve's Services description applied.

| Page | Title | Description |
|---|---|---|
| Home | Vehicle Mechanic & Auto Electrics near St Neots \| 1st Call Auto | Vehicle mechanic and auto electrical specialists in Chawston, near St Neots and the A1. Servicing, repairs, auto electrics and diagnostics for cars and vans. |
| About Us | About Us \| 1st Call Auto | More than 25 years in the motor trade. Vehicle mechanical and auto electrical services in Chawston, near St Neots and the A1, for motorists and local businesses. |
| Services | Vehicle Servicing & Repairs near St Neots \| 1st Call Auto | Need your car or van servicing? Come to our workshop in Chawston, near St Neots, we have over 25 years' experience in the motor trade. |
| Auto Electrical | Auto Electrical Specialists near St Neots \| 1st Call Auto | Auto electrical diagnostics, repairs, installations and modifications across St Neots and the surrounding area, with more than 25 years' experience. |
| Mechanical | Vehicle Mechanical Repairs & Servicing near St Neots \| 1st Call Auto | Mechanical repairs and servicing for cars and light commercial vehicles from our workshop in Chawston, near St Neots, with over 25 years' experience. |
| Diagnostics | Fault Finding & Vehicle Diagnostics near St Neots \| 1st Call Auto | Professional fault finding and vehicle diagnostics for cars and light commercial vehicles from our workshop in Chawston, near St Neots. |
| Testimonials | Testimonials \| 1st Call Auto | What clients say about 1st Call Auto, vehicle mechanic and auto electrical engineer in Chawston, near St Neots. |
| Contact | Contact \| 1st Call Auto | Contact 1st Call Auto in Chawston, near St Neots: call 01480 212766, message us on WhatsApp or send an enquiry for a free quote. |
| Privacy Policy | Privacy Policy \| 1st Call Auto | How 1st Call Auto collects, uses and protects your personal data under UK GDPR. |
| Terms | Terms & Conditions \| 1st Call Auto | Terms and conditions for using the 1st Call Auto website. |
| Cookies Policy | Cookies Policy \| 1st Call Auto | The cookies the 1st Call Auto website uses and how to change your choice. |

## Phase 9 decisions (for information, shout if any is wrong)

- **Structured data:** an AutoRepair (LocalBusiness) block on Home with the name "1st Call Auto", phone, email, the supplied address, the logo, the Home photo and the Google Maps link. No coordinates, hours, prices or star rating: none were supplied, and Google does not allow ratings taken from Google reviews.
- **Redirects:** implemented as approved (see `REDIRECTS.md`). Tested against a production build: every old WordPress URL ends on Home with 308s, the WordPress system paths return 410, and real pages and unknown URLs (404) are unaffected.
- **Sitemap and robots:** `/sitemap.xml` lists all 11 pages; `/robots.txt` allows everything except `/api/` and points to the sitemap. Both use `NEXT_PUBLIC_SITE_URL`, falling back to `https://1st-call.uk`.
- **Accessibility:** axe (WCAG 2.1 AA plus best practice) reports no issues on any page at 390px or 1280px. Fixes made: the floating WhatsApp button now sits in a labelled landmark, Home no longer has two regions with the same name, and the swipe tracks can be reached by keyboard while they scroll. The carousel dots also respond to the left and right arrow keys. Carousels never move on their own. Every image has alt text (decorative ones are empty), every page has exactly one `h1`, and every focused control shows an outline.
- **Bug found and fixed:** on desktop, Home's three intro columns could render as one very wide row, depending on the order the stylesheets loaded. The page rules now always win.

## Phase 8 decisions (for information, shout if any is wrong)

- **Google reviews** are fetched by the Testimonials page on the server and cached for 6 hours, so visitors' browsers never contact Google and no consent is needed. They follow the three testimonials from the mockups. Each shows its stars, the text, the reviewer's name (linked to their Google profile, as Google requires) and "Google review, 2 months ago"; the round under the tail shows their initials, never their Google photo. Under the bubbles: "Rated 4.8 out of 5 from 27 reviews. Reviews from Google Maps. See all reviews on Google". Reviews with stars but no text are left out. If anything fails, the page shows the three testimonials only, with no error.
- **Places API (New), not LHM's legacy endpoint.** New Google Cloud projects cannot enable the legacy Place Details API LHM uses. Google returns at most 5 reviews, chosen by Google.
- **Consent Mode:** GA4 loads only after analytics consent. Before its config call every consent type defaults to denied, then only `analytics_storage` is granted. Ad storage, ad personalisation and Google signals stay off. Withdrawing consent sets it back to denied, disables GA for the visit and clears the `_ga` cookies. Tested in a browser with a dummy GA ID: no external requests before consent, the right order in `dataLayer`, and clean withdrawal.
- **Search Console:** verified by DNS, so no meta tag; `NEXT_PUBLIC_GSC_VERIFICATION` is unused.
- **No Google Ads, remarketing or Facebook pixel** anywhere in the code.

## Phase 7 decisions (for information, shout if any is wrong)

- **No mockups** for Testimonials, Contact or the legal pages. Each opens with a plain green title band under the header (no photo), then cards on cream like the service pages.
- **Testimonials:** two columns of bubbles on desktop, one on mobile, tones cycling green, sage, white. Heading "What Clients say:" as on Home. (The placeholder slots were replaced by Google reviews in Phase 8.)
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
- **"Call us on WhatsApp"** in the last card of each page is a plain wa.me link, using `NEXT_PUBLIC_WHATSAPP_NUMBER` or the fallback 447725629835.
- **Paragraph spacing in cards** is the same everywhere. The mockups vary (some line breaks have a blank line, some don't); every new line in the mockup is a new paragraph.

## Phase 5 decisions (for information, shout if any is wrong)

- **Home title on mobile.** The mobile Home mockup shows the photo with no title; the page title "We can work on all motor vehicles" is shown over it anyway, as on the other pages, because it is the page's main heading.
- **All eight FAQs on mobile.** Both mobile mockups show only the first four. The site shows all eight on every viewport.
- **About reasons carousel** has 8 dots, one per reason (the mockup draws 12).
- **About FAQ heading** is hidden on desktop (not drawn) but kept for screen readers.
- **Home hero tick list** is two columns from 1440px; below that the panel is too narrow, so it is one column.
- **No links in the hero tick lists** ("Get a free estimate" etc.), as drawn. They could link to the contact form or service pages if wanted.
- **WhatsApp button** is fixed top right: beside the nav on desktop as drawn. On mobile it is fixed bottom right as in the mobile mockup (Steve, 22 October 2026), and sits just above the cookie banner while that is open.
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

- **`.env.example` header:** leftover note removed by Steve (committed).
- **Page titles and descriptions:** approved, with Steve's Services description.

- **Testimonial slots:** replaced by live Google reviews.
- **Google Place ID:** added to `.env.local` and Vercel; the env example file lists both Google lines (committed).
- **GA4:** data retention 14 months (now in the privacy policy), Google signals off.
- **Static map image:** none; keep the approved map panel.
- **Form wording:** approved as written.
- **Search Console:** verified by DNS; no verification meta tag.

- **Cut-off sentences:** "...from your home or workplace." and "...mechanical work and MOT process in one place."
- **Services:** now a short overview (hero, intro, three cards linking to Auto Electrical, Mechanical and Diagnostics). The duplicated Mechanical cards are removed.
- **"Air con service" link to Services:** approved.

- **Workshop address:** The Old Foundry, Chawston Lane, Chawston, Bedford MK44 3BH, used everywhere it appears. Map embed and directions link supplied.
- **WhatsApp button:** top right on desktop; bottom right on mobile (below 1024px).
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
