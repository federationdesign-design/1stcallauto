// LocalBusiness (AutoRepair) structured data for Home, using only details
// Steve has supplied: name as on the site, phone, email, the workshop
// address and the Google Maps link. No opening hours, coordinates, prices
// or ratings, since none were supplied (Google also does not allow review
// ratings taken from Google itself).

import { ADDRESS, DIRECTIONS_HREF, EMAIL, PHONE_HREF } from '../../lib/site';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://1st-call.uk';

const DATA = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  '@id': `${SITE_URL}/#business`,
  name: '1st Call Auto',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/logo_full_colour.svg`,
  image: `${SITE_URL}/images/homepage_img.jpg`,
  telephone: PHONE_HREF.replace('tel:', ''),
  email: EMAIL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${ADDRESS.name}, ${ADDRESS.street}, ${ADDRESS.locality}`,
    addressLocality: ADDRESS.town,
    postalCode: ADDRESS.postcode,
    addressCountry: 'GB',
  },
  hasMap: DIRECTIONS_HREF,
};

export function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify of our own constants; "<" is escaped so the
      // content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(DATA).replace(/</g, '\\u003c') }}
    />
  );
}
