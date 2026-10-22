# Mobile patterns

The rules used on Home and About (Phase 5). Later pages follow them unless their own mockup says otherwise. Mobile is the base style; desktop is added from `min-width: 1024px` (the hero uses the landscape photo from 768px).

## Hero (`app/components/hero/Hero.tsx`)

- Portrait mobile photo (`*_mob.jpg`) with the page title centred over it, then the green text panel full width **below** the photo, never over it.
- Tick lists in the panel are indented from the paragraph and stack in one column (Home's list splits into two columns from 1440px only).
- The desktop aside (testimonial bubble on inner pages, the large logo on Home) is not shown on mobile.
- The photo fades to green as the page scrolls, except with reduced motion.

## Carousels (`app/components/ui/Carousel.tsx`)

- Content that sits side by side or as a long list on desktop becomes a swipe carousel on mobile: one item per view, scroll-snap, a dot per item below (filled = current, 44px tap target per dot).
- Used for the Home intro columns (3 dots) and the About reasons list (8 dots: the mobile mockup draws 12, but there are 8 reasons).
- Every slide is in the HTML, so content does not depend on script. From 1024px the page lays the items out through `trackClassName` and the dots are hidden.

## Testimonial bubbles (`app/components/testimonials/SpeechBubble.tsx`)

- Stack in one column, near full width, each keeping its tail and round avatar under the tail. The tail position is set per bubble with `--tail-x`.
- Colours can differ by viewport (`desktopTone`): the car alarm bubble is green on mobile and white on desktop, as drawn.

## FAQs (`app/components/faq/FaqList.tsx`)

- Single full-width white cards, one per row, question in bold and the answer always visible.
- A centred "Frequently asked questions" heading sits above them on mobile.
- All eight FAQs are shown on mobile. The mobile mockups show only the first four; that looks like the drawing being cut short, not a design choice (logged in NEEDS_STEVE).

## Section headings

- Mobile: upright, black, `--fs-card-title`, centred. Desktop: italic green `--fs-display` where the mockup draws them that way (Home).

## Spacing and type

- Type and spacing come from the clamp() tokens in `app/globals.css`; no fixed sizes in components.
- One owner per vertical gap: a section owns the space above its own content.
- Body copy on cream between thin grey rules (About) uses an inset of about 45px on mobile.

## Service pages (`app/components/services/ServicePageView.tsx`, Phase 6)

- The three-column card grid becomes one column of full-width cards in reading order: the left column's cards, then the middle, then the right.
- Card copy stays centred; ticked lists stay as left-aligned lists inside the card, with the rule and note under them.
- The centred intro sits above a thin grey rule, inset by the page gutter.
- Services overview: the three link cards stack in one column like the other cards; on desktop they sit side by side at equal height.

## Pages with no mockup (Phase 7)

- Testimonials, Contact and the legal pages open with a green title band under the header; on mobile the title sits `--space-l` below the logo row, the same space the band leaves below it. The WhatsApp button is bottom right on mobile, so the band no longer has to clear it.
- Testimonials: one bubble per row, as on Home.
- Contact: the details card, then the form card, full width. Form labels sit above their fields.
- Legal pages: text at the page gutter; cookie tables become one white card per cookie, each value labelled.
