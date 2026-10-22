import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://1st-call.uk';

// Every public page. Keep in step with agent/ROUTES.md.
const PATHS = [
  '/',
  '/about-us',
  '/services',
  '/auto-electrical-specialists',
  '/vehicle-mechanical-repairs-servicing',
  '/fault-finding-vehicle-diagnostics',
  '/testimonials',
  '/contact',
  '/privacy-policy',
  '/terms-and-conditions',
  '/cookies-policy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({ url: `${SITE_URL}${path === '/' ? '' : path}` }));
}
