# 1st Call Auto: build runbook

Place this file at `agent/FIRST_CALL_BUILD_RUNBOOK.md`. Work through the phases in order. Commit at the end of each phase on the `build` branch. Stop at each marked CHECKPOINT and report to Steve before moving on.

## Inputs

- Assets folder: `~/Downloads/1stcall-assets` (images, vectors, logo and the mockup PDFs).
- Mockups: desktop for Home, About Us, Auto Electrical Specialists, Vehicle Mechanical Repairs and Servicing, Fault Finding and Vehicle Diagnostics. Mobile for Home and About Us only.
- Base repo for shared systems: `federationdesign-design/LHM`.
- Live site to replace: https://1st-call.uk (sitemap index at `/wp-sitemap.xml`).

## Phase 0: set up

1. Create and switch to the `build` branch.
2. Create `agent/`, `agent/reference/` and `agent/screenshots/`. Add `agent/screenshots/` to `.gitignore`.
3. Copy every PDF from `~/Downloads/1stcall-assets/mockups/` into `agent/reference/`. Each PDF is one page. Convert each to PNG so it can be viewed, using `sips -s format png <file>.pdf --out <file>.png`.
4. Name the PNGs with underscores by page and viewport, for example `home_desktop.png`, `home_mobile.png`, `about_desktop.png`, `about_mobile.png`, `services_desktop.png`, `auto_electrical_desktop.png`, `mechanical_desktop.png`, `diagnostics_desktop.png`. Work out which page each PDF is from its title band. List the final mapping in `agent/REFERENCE_INDEX.md`.
5. Copy all other images, vectors and the logo from `~/Downloads/1stcall-assets/` into `public/images/`, renaming with lowercase and underscores. Copy, never move, so the originals stay in Downloads. List anything the mockups use that is missing from the folder in `agent/NEEDS_STEVE.md`.
6. LHM is at `~/Sites/LHM`. Read from it only. Never edit, commit or run git commands there.
7. Create `agent/NEEDS_STEVE.md`, `agent/COPY_FIXES.md` and `agent/PLACEHOLDERS.md`.

## Phase 1: redirect inventory (do this before building pages)

1. Fetch every sub-sitemap from `https://1st-call.uk/wp-sitemap.xml` using your web fetch tool. Known so far:
   - `https://1st-call.uk/uncategorized/hello-world/` (default WordPress post)
   - `https://1st-call.uk/category/uncategorized/`
   - Still to fetch: `wp-sitemap-posts-page-1.xml` and `wp-sitemap-users-1.xml`.
2. Write `agent/REDIRECTS.md`: a table of every old URL, its new URL, and the reason. Default WordPress junk (hello-world, uncategorised category, author archives) redirects to `/`.
3. Where an old page slug fits a new page, reuse that slug in the route map below rather than creating a redirect.
4. Also cover common WordPress paths: `/wp-admin`, `/wp-login.php`, `/feed/`, `/?p=` style links. Send these to `/` or a 410.
5. Do NOT implement the redirects yet. CHECKPOINT: Steve approves the table first.

## Phase 2: route map

Default slugs below. Replace with the matching old WordPress slug where Phase 1 found one.

| Page | Route | Design source |
|---|---|---|
| Home | `/` | home desktop and mobile |
| About Us | `/about-us` | about desktop and mobile |
| Services | `/services` | services desktop only |
| Auto Electrical Specialists | `/auto-electrical-specialists` | desktop only |
| Vehicle Mechanical Repairs and Servicing | `/vehicle-mechanical-repairs-servicing` | desktop only |
| Fault Finding and Vehicle Diagnostics | `/fault-finding-vehicle-diagnostics` | desktop only |
| Testimonials | `/testimonials` | no design: build from existing components |
| Contact | `/contact` | no design: build from existing components |
| Privacy Policy | `/privacy-policy` | from LHM |
| Terms and Conditions | `/terms-and-conditions` | from LHM |
| Cookies Policy | `/cookies-policy` | from LHM |

Navigation decisions (defaults, log in `agent/NEEDS_STEVE.md` for confirmation):
- "Services" links to `/services`, with the three specialist pages available beneath it (dropdown on desktop, expandable list in the mobile menu).
- "Find Us" links to the location section on `/contact`.
- "Get a free quote" in the footer links to the form on `/contact`.

## Phase 3: foundations from LHM

1. Scaffold Next.js to match LHM's versions and styling method.
2. Port LHM's font set-up exactly (via `next/font`).
3. Port LHM's hero behaviour: the hero image fades out as the page scrolls. Respect `prefers-reduced-motion` (no fade, image stays static).
4. Port LHM's cookie consent system in full.
5. Strip everything LHM-specific: SimplyBook, Google Reviews API, splash page, corporate pages, any `.bak` files, any LHM copy, colours or images.
6. Set colour tokens by sampling the mockups (dark green, cream, sage green testimonial card, white cards, light rule lines). Record the hex values in a comment at the top of the global tokens file.
7. Create `.env.example` listing:
   - `NEXT_PUBLIC_SITE_URL=https://1st-call.uk`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER=447725629835`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID=` (Steve supplies)
   - `NEXT_PUBLIC_GSC_VERIFICATION=` (Search Console meta tag value, Steve supplies)
   - Any contact form variables carried over from LHM's enquiry form.
8. Commit.

## Phase 4: global shell

Build once, used on every page:
- Top strip: "Vehicle mechanic & auto electrical engineer in PE19 Tel: 01480 212766" with the number as a tel link.
- Header: logo, pill navigation on desktop, hamburger on mobile.
- Floating WhatsApp button, fixed bottom right on all viewports, linking to `wa.me`. Accessible label "Message us on WhatsApp".
- Hero: full-bleed image, green text panel, page title, optional "Saved me money" testimonial bubble with avatar (as drawn on inner pages).
- "Our Location" band with map (see GDPR section).
- Footer: links, logo, legal links.

CHECKPOINT: screenshots at 390px and 1280px of the shell on a blank page.

## Phase 5: Home and About Us

1. Build Home and About Us to match both their desktop and mobile mockups.
2. Mobile patterns to note, as these become the rules for later pages:
   - Hero text panel sits below the image, not over it.
   - The three intro columns on Home become a swipe carousel with dots.
   - Testimonial bubbles stack in one column, keeping the speech-bubble tails and avatars.
   - The "So many reasons" list on About becomes a carousel with dots.
   - FAQs stack as single full-width cards.
3. Write the mobile patterns you have used into `agent/MOBILE_PATTERNS.md`. This is the rulebook for Phase 6.
4. Commit. CHECKPOINT: screenshots at 390px, 1280px and 2800px.

## Phase 6: Services and the three specialist pages

1. Build desktop exactly from the mockups: Services, Auto Electrical, Mechanical, Diagnostics.
2. Build mobile by applying `agent/MOBILE_PATTERNS.md`: the three-column card grid becomes a single stacked column in reading order (left column, then middle, then right). Ticked lists stay as lists.
3. Watch for copy faults. Earlier drafts had sentences cut off mid-card (for example a card ending "arrange collection from your home or"). If any text in the PDFs ends mid-sentence, do not invent the missing words: use a placeholder and log it.
4. Commit. CHECKPOINT: screenshots at 390px and 1280px of all four pages.

## Phase 7: Testimonials, Contact and legal pages

1. Testimonials: all three testimonials as speech-bubble cards, reusing the Home components. Placeholder slots for more, logged in `agent/NEEDS_STEVE.md`.
2. Contact: phone, WhatsApp button, enquiry and free quote form, address placeholder, location section. Reuse LHM's form delivery method. Add a honeypot field, a link to the privacy policy beside the submit button, and no pre-ticked boxes.
3. Legal pages: port LHM's privacy, terms and cookies pages, then rewrite them for 1st Call. Remove all SimplyBook, Google Reviews and massage references. The cookies policy must list exactly the cookies this site sets (consent cookie and GA4 only, plus maps if consented). Placeholder every company detail not supplied (legal name, address, company number, contact email) and log them.
4. Commit.

## Phase 8: GDPR, analytics and Search Console

1. GA4 loads only after analytics consent, using Google Consent Mode defaults of denied.
2. Search Console verification via the `verification` field in the root `metadata`, from `NEXT_PUBLIC_GSC_VERIFICATION`.
3. Map: no Google Maps iframe before consent. Default to a static map image with a "Get directions" link to Google Maps. Log in `agent/NEEDS_STEVE.md` if no static map image exists in the assets.
4. No Google Ads, no remarketing, no Facebook pixel.
5. Commit.

## Phase 9: SEO and launch prep

1. Per-page `<title>` and meta description, unique on every page. Draft them, list them in `agent/NEEDS_STEVE.md` for approval.
2. `app/sitemap.ts` and `app/robots.ts`.
3. LocalBusiness (AutoRepair) structured data on Home using only supplied details.
4. Implement the approved redirects from `agent/REDIRECTS.md` as permanent (308) redirects in `next.config`.
5. Accessibility pass: alt text on every image, one `h1` per page, visible focus states, carousels operable by keyboard and not auto-advancing.
6. Final screenshots of every page at 390px, 1280px and 2800px.
7. Commit. CHECKPOINT: report done, list everything still open in `agent/NEEDS_STEVE.md`.

## Out of scope

- DNS changes and domain cutover (Steve handles).
- Electric vehicle services, booking systems, reviews feeds, ads accounts.
