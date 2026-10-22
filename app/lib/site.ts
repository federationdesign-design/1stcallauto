// Business details used across the site. Fixed details come from CLAUDE.md;
// anything not yet supplied is a named placeholder (see agent/PLACEHOLDERS.md).

export const PHONE_DISPLAY = '01480 212766';
export const PHONE_HREF = 'tel:+441480212766';

export const EMAIL = 'info@1st-call.uk';

// WhatsApp number comes from the environment, never hard-coded in components.
// Returns null when the variable is not set, so callers can hide the link.
export function whatsappHref(): string | null {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  return number ? `https://wa.me/${number}` : null;
}

export const ADDRESS_LINES = [
  '[[PLACEHOLDER: workshop street address]]',
  'Chawston, Cambridgeshire',
  '[[PLACEHOLDER: workshop postcode]]',
];

// What Google Maps searches for, in the embed and the directions link.
// Narrow this to the full address once it is supplied.
export const MAP_QUERY = 'Chawston';

export const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
export const DIRECTIONS_HREF = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`;
