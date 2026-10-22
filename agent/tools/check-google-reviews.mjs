// Checks the Google reviews request the Testimonials page makes: the same
// Places API (New) Place Details call, URL, headers and field mask as
// app/lib/google-reviews.ts. Prints the HTTP status, Google's error message
// and the review count. Never prints the key: Google's error messages can
// echo the values sent (a key pasted into GOOGLE_PLACE_ID came back in full),
// so anything key-shaped is masked. Run from the repo root:
//
//   node --env-file=.env.local agent/tools/check-google-reviews.mjs

const key = process.env.GOOGLE_PLACES_API_KEY;
const placeId = process.env.GOOGLE_PLACE_ID;

console.log('GOOGLE_PLACES_API_KEY set:', Boolean(key));
console.log('GOOGLE_PLACE_ID set:', Boolean(placeId));
if (!key || !placeId) process.exit(1);
console.log('GOOGLE_PLACE_ID is the API key by mistake:', placeId === key);
console.log('GOOGLE_PLACE_ID looks like a Place ID (ChIJ...):', placeId.startsWith('ChIJ'));

const mask = (text) =>
  String(text).split(key).join('[key]').replace(/AIza[0-9A-Za-z_-]{20,}/g, '[key]');

const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
  headers: {
    'X-Goog-Api-Key': key,
    'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
  },
});
const body = await res.json().catch(() => ({}));

console.log('HTTP status:', res.status);
if (!res.ok) {
  console.log('Error:', mask(`${body.error?.status ?? ''} ${body.error?.message ?? '(no message)'}`));
  process.exit(1);
}

const reviews = body.reviews ?? [];
const withText = reviews.filter((r) => (r.originalText?.text ?? r.text?.text ?? '').trim() && (r.rating ?? 0) > 0);
console.log('Rating:', body.rating ?? '(none)', 'from', body.userRatingCount ?? '(none)', 'ratings');
console.log('Reviews returned:', reviews.length, '| with text and a rating:', withText.length);
