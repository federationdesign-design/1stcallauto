// Testimonials. No mockup: built from the Home testimonial bubbles, with
// empty slots for more reviews from the client (agent/NEEDS_STEVE.md).
// Tones cycle green, sage, white as on Home.

import type { Metadata } from 'next';
import { PageHeader } from '../components/page-header/PageHeader';
import { SpeechBubble } from '../components/testimonials/SpeechBubble';
import { TESTIMONIALS, TESTIMONIAL_SLOTS } from '../data/testimonials';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Testimonials',
  description:
    'What clients say about 1st Call Auto, vehicle mechanic and auto electrical engineer in Chawston, near St Neots.',
  alternates: { canonical: '/testimonials' },
};

const TONES = ['green', 'sage', 'white'] as const;

export default function Testimonials() {
  return (
    <>
      <PageHeader title="Testimonials" />

      <section className={styles.section} aria-labelledby="clients-heading">
        <h2 id="clients-heading" className={styles.heading}>
          What Clients say:
        </h2>
        <div className={styles.grid}>
          {[...TESTIMONIALS, ...TESTIMONIAL_SLOTS].map((testimonial, index) => (
            <SpeechBubble
              key={testimonial.id}
              testimonial={testimonial}
              tone={TONES[index % TONES.length]}
              headingLevel="h3"
              className={styles.bubble}
            />
          ))}
        </div>
      </section>
    </>
  );
}
