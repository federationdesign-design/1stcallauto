// Full-page screenshots for the verification gate.
//
//   node agent/tools/screenshot.mjs <base-url> <path>[,<path>...] [widths] [--consent=none|deny|all]
//
// Example:
//   node agent/tools/screenshot.mjs http://localhost:3100 /,/about-us 390,1280,2800
//
// Saves agent/screenshots/<page>_<width>.png (gitignored). By default a
// "reject all" consent choice is stored first so the cookie banner does not
// cover the page; pass --consent=none to see the banner.

import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const [base, pathArg = '/', widthArg = '390,1280,2800', ...flags] = process.argv.slice(2);
if (!base) {
  console.error('Usage: node agent/tools/screenshot.mjs <base-url> <paths> [widths] [--consent=none|deny|all]');
  process.exit(1);
}

const consentFlag = flags.find((f) => f.startsWith('--consent='))?.split('=')[1] ?? 'deny';
const paths = pathArg.split(',');
const widths = widthArg.split(',').map(Number);
const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'screenshots');
mkdirSync(outDir, { recursive: true });

const consent = {
  deny: { necessary: true, analytics: false, maps: false },
  all: { necessary: true, analytics: true, maps: true },
}[consentFlag];

const browser = await chromium.launch();
for (const width of widths) {
  // Below 600px: a phone (iPhone 14 height, touch, overlay scrollbars so no
  // scrollbar strip eats into the width). Above: a 16:9 desktop window.
  const phone = width < 600;
  const height = phone ? 844 : Math.round((width * 9) / 16);
  const context = await browser.newContext({
    viewport: { width, height },
    ...(phone && { isMobile: true, hasTouch: true, deviceScaleFactor: 2 }),
  });
  if (consent) {
    await context.addInitScript((categories) => {
      localStorage.setItem(
        'firstcall-cookie-consent',
        JSON.stringify({ version: 1, categories, timestamp: new Date().toISOString() })
      );
    }, consent);
  }
  const page = await context.newPage();
  for (const path of paths) {
    await page.goto(new URL(path, base).toString(), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const name = (path === '/' ? 'home' : path.replace(/^\/|\/$/g, '').replace(/[/#]/g, '_')) + `_${width}.png`;
    await page.screenshot({ path: join(outDir, name), fullPage: true });
    console.log('saved', name);
  }
  await context.close();
}
await browser.close();
