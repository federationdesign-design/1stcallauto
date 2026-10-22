// Next 16 proxy (formerly middleware), for the two old-WordPress cases
// next.config redirects cannot do (agent/REDIRECTS.md):
//   - WordPress admin and system paths return 410 Gone, so crawlers and
//     bots learn they are gone for good.
//   - Old ID links on Home (/?p=1, /?page_id=2, /?cat=, /?author=) get a
//     308 to Home with the query string removed.

import { NextResponse, type NextRequest } from 'next/server';

const WORDPRESS_QUERY_KEYS = ['p', 'page_id', 'cat', 'author'];

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === '/') {
    if (WORDPRESS_QUERY_KEYS.some((key) => searchParams.has(key))) {
      const home = request.nextUrl.clone();
      home.search = '';
      return NextResponse.redirect(home, 308);
    }
    return NextResponse.next();
  }

  return new NextResponse('Gone', {
    status: 410,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
}

// Only these paths reach the proxy; every other request skips it.
export const config = {
  matcher: [
    '/',
    '/wp-admin/:path*',
    '/wp-login.php',
    '/xmlrpc.php',
    '/wp-json/:path*',
    '/wp-content/:path*',
    '/wp-includes/:path*',
  ],
};
