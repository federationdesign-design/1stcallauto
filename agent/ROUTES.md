# Route map

Phase 1 found no old WordPress page slugs that match a new page (the old site was a single page with in-page anchors), so every route keeps the runbook default.

| Page | Route | Design source |
|---|---|---|
| Home | `/` | `home_desktop.png`, `home_mobile.png` |
| About Us | `/about-us` | `about_desktop.png`, `about_mobile.png` |
| Services | `/services` | `servicing_desktop.png` ("Serviceing your vehicle" PDF), built as it stands per Steve |
| Auto Electrical Specialists | `/auto-electrical-specialists` | `auto_electrical_desktop.png` (hero reuses the About photo) |
| Vehicle Mechanical Repairs and Servicing | `/vehicle-mechanical-repairs-servicing` | `mechanical_desktop.png` |
| Fault Finding and Vehicle Diagnostics | `/fault-finding-vehicle-diagnostics` | `diagnostics_desktop.png` |
| Testimonials | `/testimonials` | no design: built from Home components |
| Contact | `/contact` | no design: built from existing components |
| Privacy Policy | `/privacy-policy` | ported from LHM |
| Terms and Conditions | `/terms-and-conditions` | ported from LHM |
| Cookies Policy | `/cookies-policy` | ported from LHM |

Mobile layouts for every page except Home and About follow `agent/MOBILE_PATTERNS.md` (written in Phase 5).

## Navigation

Header (from the mockups): Home, About Us, Services, Testimonials, Find Us, Contact.
Footer (from the mockups): Home, About Us, Services, Testimonials, Find Us, Get a free quote, Contact, then Terms & Conditions, Cookies Policy, Privacy Policy.

| Item | Target |
|---|---|
| Services | `/services`, with the three specialist pages beneath it: a dropdown on desktop, an expandable list in the mobile menu |
| Find Us | `/contact#location` |
| Get a free quote (footer) | `/contact#quote` |

These three are runbook defaults, logged in `NEEDS_STEVE.md` for confirmation.
