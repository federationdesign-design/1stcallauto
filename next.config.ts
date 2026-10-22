import type { NextConfig } from 'next';

// Permanent (308) redirects for the old WordPress site, from the approved
// table in agent/REDIRECTS.md. The old site was a single page, so every
// old URL a person might have followed goes to Home. Handled elsewhere in
// proxy.ts: old ?p= / ?page_id= / ?cat= / ?author= links on Home (a
// redirect here would carry the query string along and loop), and the
// 410s for WordPress system paths.
const TO_HOME = [
  '/uncategorized',
  '/uncategorized/:path*',
  '/category',
  '/category/:path*',
  '/author',
  '/author/:path*',
  '/feed',
  '/feed/:path*',
  '/comments/feed',
  '/comments/feed/:path*',
  '/sample-page',
];

const nextConfig: NextConfig = {
  async redirects() {
    return TO_HOME.map((source) => ({ source, destination: '/', permanent: true }));
  },
};

export default nextConfig;
