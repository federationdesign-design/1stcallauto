// Business details used across the site. Fixed details come from CLAUDE.md
// and Steve; anything not yet supplied is a named placeholder (see
// agent/PLACEHOLDERS.md).

export const PHONE_DISPLAY = '01480 212766';
export const PHONE_HREF = 'tel:+441480212766';

export const EMAIL = 'info@1st-call.uk';

// WhatsApp number comes from the environment, never hard-coded in components.
// Returns null when the variable is not set, so callers can hide the link.
export function whatsappHref(): string | null {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  return number ? `https://wa.me/${number}` : null;
}

// Supplied by Steve. Use exactly this address everywhere it appears.
export const ADDRESS = {
  name: 'The Old Foundry',
  street: 'Chawston Lane',
  locality: 'Chawston',
  town: 'Bedford',
  postcode: 'MK44 3BH',
};

export const ADDRESS_LINES = [
  ADDRESS.name,
  ADDRESS.street,
  ADDRESS.locality,
  `${ADDRESS.town} ${ADDRESS.postcode}`,
];

// Google Maps embed for the business listing, supplied by Steve. Only ever
// rendered after the visitor allows Maps cookies (see LocationBand).
export const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2627.3755267218294!2d-0.3131696233387348!3d52.19163987197698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4877c61dedc16ed9%3A0x359dfbc0cb84f7e8!2s1st%20Call!5e0!3m2!1sen!2suk!4v1792668197038!5m2!1sen!2suk';

// Plain link, no Google code on our page. Supplied by Steve.
export const DIRECTIONS_HREF = 'https://maps.app.goo.gl/Xud1uqibFwCTHHbv5';
