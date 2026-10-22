import type { NextConfig } from 'next';

// Redirects from agent/REDIRECTS.md are added in Phase 9. The 410 responses
// for WordPress system paths go in proxy.ts (Next 16's name for middleware).
const nextConfig: NextConfig = {};

export default nextConfig;
