// One-off lookup of the Google Place ID for the workshop, for the
// GOOGLE_PLACE_ID env var. Run with the key from .env.local:
//
//   node --env-file=.env.local agent/tools/find-place-id.mjs
//
// Prints each match's Place ID, name and address. Never prints the key.

const QUERY = '1st Call, The Old Foundry, Chawston Lane, Chawston, Bedford MK44 3BH';

const key = process.env.GOOGLE_PLACES_API_KEY;
if (!key) {
  console.error('GOOGLE_PLACES_API_KEY is not set. Run with --env-file=.env.local');
  process.exit(1);
}

const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': key,
    'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress',
  },
  body: JSON.stringify({ textQuery: QUERY, regionCode: 'GB' }),
});
const data = await res.json();

if (!res.ok) {
  console.error(`Places API error ${res.status}: ${data.error?.message ?? 'unknown'}`);
  process.exit(1);
}
if (!data.places?.length) {
  console.log('No matches.');
  process.exit(0);
}
for (const place of data.places) {
  console.log(`${place.id}  ${place.displayName?.text ?? ''}  (${place.formattedAddress ?? ''})`);
}
