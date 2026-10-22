# CLAUDE.md: house rules for the 1stcallauto repo

These rules apply to every session in this repository. Read this file in full, then read `agent/FIRST_CALL_BUILD_RUNBOOK.md` and work through it in order.

## Project

- Client: 1st Call Auto, vehicle mechanic and auto electrical engineer, Chawston, near St Neots, PE19.
- Job: rebuild the existing WordPress site (https://1st-call.uk) as a Next.js site deployed on Vercel.
- Repo: `federationdesign-design/1stcallauto`, already linked to a Vercel project.
- Base for shared systems: the Lucy Hall Massage repo, local copy at `~/Sites/LHM`. Port from it, never modify it or run git commands in it.
- Assets and mockups: `~/Downloads/1stcall-assets/` (mockup PDFs in its `mockups/` subfolder). Copy from there, never move or delete.

## Stack

- Next.js App Router, React, TypeScript.
- Styling follows LHM's approach. Check LHM before writing the first stylesheet and use the same method.
- If CSS Modules are used: a bare `:global(.foo)` selector with no local class hard-fails the Vercel build and passes the type-check silently. Always compound it as `.localClass:global(.foo)`. Before every commit that touches module CSS, run `grep -rn ":global(\.[a-zA-Z-]*) *{" --include=*.module.css .` and confirm every hit is compounded.
- Relative imports only, unless the `@/` alias is explicitly configured in `tsconfig.json`.

## Mobile is the primary viewport

- Most visitors are on phones. Write mobile styles first, then add desktop with `min-width` media queries.
- A page is not done until it has been checked at 390px wide.
- Type scales with viewport width (liquid layout using `clamp()`), not fixed sizes and not a capped text measure. Set the scale once in global tokens and reuse it.

## Spacing rule

- Vertical space between two stacked elements belongs to ONE of them, never both. Before adding padding or margin, work out the gap that already exists.

## Copy rules

- UK English throughout.
- No em dashes anywhere: not in copy, comments, alt text or commit messages.
- Use the copy from the mockups exactly. Fix obvious typos only (for example `motorist's` should be `motorists`), and list every fix in `agent/COPY_FIXES.md`.
- Never invent copy, prices, phone numbers, addresses, legal entity details or dates. If something is missing, use a clearly named placeholder such as `[[PLACEHOLDER: company legal name]]` and log it in `agent/NEEDS_STEVE.md`.

## Fixed business details

- Phone: 01480 212766, link as `tel:+441480212766`.
- WhatsApp: 07725629835, link as `https://wa.me/447725629835`. Read the number from `NEXT_PUBLIC_WHATSAPP_NUMBER`, never hard-code it in components.
- Location: Chawston, Cambridgeshire, near St Neots and the A1 (Black Cat roundabout), near Wyboston Lakes.

## GDPR and privacy (non-negotiable)

- No analytics, tracking or third-party embed loads before the visitor consents. This includes Google Analytics and any Google Maps iframe.
- WhatsApp is a plain link only. No WhatsApp widget or script.
- No Google Fonts requests from the browser. Use `next/font`, which self-hosts.

## Verification gate (run before every commit)

1. `./node_modules/.bin/tsc --noEmit` must be clean. Use the repo binary, not `npx`.
2. `npm run build` must pass. If it fails only because a font host is unreachable locally, note that and carry on: that alone is not a code failure.
3. The `:global` audit above, if CSS Modules are in use.
4. For visual work: run `npm run dev` and take Playwright screenshots at 390px, 1280px and 2800px wide. Compare against the mockups in `agent/reference/`. Save screenshots to `agent/screenshots/` (gitignored).

## Git discipline

- Work on the branch `build`. NEVER commit directly to `main`.
- Commit at the end of each runbook phase with a real message.
- Always `git add public/` when new images are added, or they 404 on Vercel.
- Run `git show --stat` after each commit. A small message with many deletions is a red flag: stop and report.
- Steve pushes. Never push, force anything, or delete branches.
- If this file already exists when you start, append to it. Never replace it.

## When stuck

- If a check fails, read the failure and fix the cause. Never weaken a check to make it pass.
- Anything that needs Steve goes in `agent/NEEDS_STEVE.md`, then carry on with the next item you can do.
