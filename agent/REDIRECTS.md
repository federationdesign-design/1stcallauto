# Redirects (draft for approval)

Status: **awaiting Steve's approval. Not implemented.** Implementation happens in Phase 9 as permanent (308) redirects in `next.config`, plus middleware for any 410s.

## What the old site contains

Source: `https://1st-call.uk/wp-sitemap.xml`, fetched 22 October 2026. The index lists four sub-sitemaps:

| Sub-sitemap | URLs listed |
|---|---|
| `wp-sitemap-posts-post-1.xml` | `/uncategorized/hello-world/` |
| `wp-sitemap-posts-page-1.xml` | `/` (last modified 12 October 2016) |
| `wp-sitemap-taxonomies-category-1.xml` | `/category/uncategorized/` |
| `wp-sitemap-users-1.xml` | `/author/admin/` |

The old site is a **single page**. Its menu uses in-page anchors on `/`: `#about-us`, `#services`, `#testimonials`, `#find-us`, `#free-quote` (and `#home` for "back to top"). No old page slug matches a new page, so the Phase 2 route map keeps its default slugs.

Live status codes checked with `curl` on the same day:

| Path | Status today |
|---|---|
| `/` | 200 |
| `/uncategorized/hello-world/` | 200 |
| `/category/uncategorized/` | 200 |
| `/author/admin/` | 200 |
| `/?p=1` | 301 to `/uncategorized/hello-world/` |
| `/?page_id=2` | 301 to `/` |
| `/feed/`, `/comments/feed/` | 200 |
| `/wp-admin/` | 302 to `/wp-login.php` |
| `/wp-login.php` | 200 |
| `/xmlrpc.php` | 405 |
| `/wp-json/`, `/wp-content/` | 200 |
| `/sample-page/`, `/about-us/`, `/services/`, `/contact/` | 404 |

## Proposed redirect table

| Old URL | New URL | Code | Reason |
|---|---|---|---|
| `/` | `/` | none | Same URL. Home stays at the root. |
| `/uncategorized/hello-world/` | `/` | 308 | Default WordPress post, no content. |
| `/uncategorized/hello-world/feed/` | `/` | 308 | Feed of the default post. |
| `/uncategorized/:path*` | `/` | 308 | Catch-all for anything else under the old post prefix. |
| `/category/uncategorized/` | `/` | 308 | Default WordPress category archive. |
| `/category/:path*` | `/` | 308 | Any other category archive or its feed. |
| `/author/admin/` | `/` | 308 | Author archive. Also exposes the WordPress username, so it should not survive. |
| `/author/:path*` | `/` | 308 | Any other author archive or feed. |
| `/feed/`, `/feed/:path*` | `/` | 308 | Site RSS feed. The new site has no blog. |
| `/comments/feed/` | `/` | 308 | Comments feed. |
| `/?p=:id` (any `p` query) | `/` | 308 | Old post ID links. Matched with a `has` query condition. |
| `/?page_id=:id` (any `page_id` query) | `/` | 308 | Old page ID links. |
| `/?cat=:id`, `/?author=:id` | `/` | 308 | Old archive ID links. `?author=` is also a common username probe. |
| `/sample-page/` | `/` | 308 | Default WordPress page. Already 404 today, but bots still request it. |
| `/wp-admin/:path*` | none | 410 | Admin area is gone. A 410 tells crawlers and bots it is permanent. |
| `/wp-login.php` | none | 410 | As above. |
| `/xmlrpc.php` | none | 410 | As above. Already blocked today. |
| `/wp-json/:path*` | none | 410 | WordPress REST API. |
| `/wp-content/:path*`, `/wp-includes/:path*` | none | 410 | Old theme, plugin and upload files. Nothing on the new site depends on them. |

Recommendation: 308 to `/` for anything a person might once have followed (posts, archives, feeds, ID links), and 410 for WordPress machinery that only bots request. Next.js `redirects()` cannot return a 410, so those would go in a small `middleware.ts`. If you prefer to keep it simpler, all of them can be 308s to `/` instead.

## Old in-page anchors (cannot be redirected by the server)

Browsers never send the `#fragment` to the server, so `next.config` cannot redirect `https://1st-call.uk/#services`. Old bookmarks and links to these anchors will land on the new Home page. Two options:

- **(a) Do nothing.** They land on Home, which is a sensible page.
- **(b) Small client-side mapper on Home** (recommended, a few lines, no tracking): if Home loads with a legacy hash, replace the URL with the new page.

| Old anchor | New destination under option (b) |
|---|---|
| `/#about-us` | `/about-us` |
| `/#services` | `/services` |
| `/#testimonials` | `/testimonials` |
| `/#find-us` | `/contact#location` |
| `/#free-quote` | `/contact#quote` |
| `/#home` | `/` (no change) |

## Questions for Steve

1. Approve the table above?
2. 410s for the WordPress machinery, or 308s to `/` for everything?
3. Old anchors: option (a) or (b)?
