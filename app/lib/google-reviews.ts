// Google reviews for the Testimonials page, ported from LHM's
// app/api/google-reviews route. Two changes for this site:
//   - It runs inside the server component instead of an API route the
//     browser calls, so the visitor's browser never contacts Google.
//   - It uses Places API (New). New Google Cloud projects cannot enable the
//     legacy Place Details endpoint LHM uses.
// Results are cached for 6 hours, as on LHM. Any failure (no key, no
// Place ID, a Google error) returns null and the page shows only the
// testimonials from the mockups, with a server-side warning giving the
// status and Google's message (never the key; see maskKey).
//
// Reviewer photos are never used: they are served from Google's servers.
// The page shows initials instead.

import 'server-only';

export const REVIEWS_REVALIDATE = 21600; // 6 hours, in seconds

export type GoogleReview = {
  authorName: string;
  authorUrl: string; // the reviewer's Google Maps profile
  rating: number;
  text: string;
  relativeTime: string; // "2 months ago"
};

export type GoogleReviews = {
  reviews: GoogleReview[];
  rating: number | null;
  totalReviews: number | null;
  placeUrl: string; // the business on Google Maps
};

type PlacesReview = {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  relativePublishTimeDescription?: string;
  authorAttribution?: { displayName?: string; uri?: string };
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

// Google's error messages can echo the values sent: a key pasted into
// GOOGLE_PLACE_ID came back in full. Mask the key and anything key-shaped.
function maskKey(text: string, apiKey: string): string {
  return text.split(apiKey).join('[key]').replace(/AIza[0-9A-Za-z_-]{20,}/g, '[key]');
}

export async function getGoogleReviews(): Promise<GoogleReviews | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) {
    console.warn('Google reviews: GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID is not set');
    return null;
  }

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
      },
      next: { revalidate: REVIEWS_REVALIDATE },
    });
    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
      const message = maskKey(body?.error?.message ?? res.statusText, apiKey);
      console.warn(`Google reviews: Places API returned ${res.status}: ${message}`);
      return null;
    }
    const data = (await res.json()) as PlacesResponse;

    const reviews = (data.reviews ?? [])
      .map((review) => ({
        authorName: review.authorAttribution?.displayName?.trim() || 'Google user',
        authorUrl: review.authorAttribution?.uri ?? '',
        rating: review.rating ?? 0,
        // The original wording, not Google's translation, where both exist.
        text: (review.originalText?.text ?? review.text?.text ?? '').trim(),
        relativeTime: review.relativePublishTimeDescription ?? '',
      }))
      .filter((review) => review.text && review.rating > 0); // star-only reviews have nothing to quote

    return {
      reviews,
      rating: data.rating ?? null,
      totalReviews: data.userRatingCount ?? null,
      placeUrl: data.googleMapsUri ?? `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(placeId)}`,
    };
  } catch (err) {
    console.warn('Google reviews: fetch failed:', maskKey(err instanceof Error ? err.message : String(err), apiKey));
    return null;
  }
}
