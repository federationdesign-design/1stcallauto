// Testimonials. No mockup: built from the Home testimonial bubbles. The
// three testimonials from the mockups come first, then live Google
// reviews, fetched on the server and cached for 6 hours (see
// app/lib/google-reviews.ts). If the reviews cannot be fetched, the page
// shows the three testimonials only. Tones cycle green, sage, white as on
// Home.

import type { Metadata } from 'next';
import { PageHeader } from '../components/page-header/PageHeader';
import { SpeechBubble } from '../components/testimonials/SpeechBubble';
import { TESTIMONIALS, type Testimonial } from '../data/testimonials';
import { getGoogleReviews, type GoogleReview } from '../lib/google-reviews';
import styles from './page.module.css';

// Must be a literal for Next to read it; matches REVIEWS_REVALIDATE.
export const revalidate = 21600;

export const metadata: Metadata = {
  title: 'Testimonials',
  description:
    'What clients say about 1st Call Auto, vehicle mechanic and auto electrical engineer in Chawston, near St Neots.',
  alternates: { canonical: '/testimonials' },
};

const TONES = ['green', 'sage', 'white'] as const;

function initials(name: string): string {
  const words = name.split(/\s+/).filter(Boolean);
  const letters = words.length > 1 ? [words[0][0], words[words.length - 1][0]] : [words[0]?.[0] ?? '?'];
  return letters.join('').toUpperCase();
}

function fromGoogle(review: GoogleReview, index: number): Testimonial {
  return {
    id: `google-${index}`,
    body: review.text.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean),
    initials: initials(review.authorName),
    rating: review.rating,
    source: {
      author: review.authorName,
      authorUrl: review.authorUrl || undefined,
      detail: `Google review${review.relativeTime ? `, ${review.relativeTime}` : ''}`,
    },
  };
}

export default async function Testimonials() {
  const google = await getGoogleReviews();
  const reviews = google?.reviews.map(fromGoogle) ?? [];

  return (
    <>
      <PageHeader title="Testimonials" />

      <section className={styles.section} aria-labelledby="clients-heading">
        <h2 id="clients-heading" className={styles.heading}>
          What Clients say:
        </h2>
        <div className={styles.grid}>
          {[...TESTIMONIALS, ...reviews].map((testimonial, index) => (
            <SpeechBubble
              key={testimonial.id}
              testimonial={testimonial}
              tone={TONES[index % TONES.length]}
              headingLevel="h3"
              className={styles.bubble}
            />
          ))}
        </div>

        {google && reviews.length > 0 && (
          <p className={styles.attribution}>
            {google.rating !== null && google.totalReviews !== null && (
              <>
                Rated {google.rating.toFixed(1)} out of 5 from {google.totalReviews} reviews.{' '}
              </>
            )}
            Reviews from Google Maps.{' '}
            <a href={google.placeUrl} target="_blank" rel="noopener noreferrer">
              See all reviews on Google
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </p>
        )}
      </section>
    </>
  );
}
