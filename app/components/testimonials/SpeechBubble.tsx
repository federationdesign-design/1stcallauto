// Testimonial speech bubble with its tail and round avatar, as drawn in the
// mockups. The body outline is an SVG traced from the hero bubble on the
// 1920px mockups and stretches to fit the text, so its slightly skewed shape
// scales with the content. The tail is a separate fixed-size triangle so it
// keeps its proportions whatever the bubble height.

import Image from 'next/image';
import type { Testimonial } from '../../data/testimonials';
import styles from './SpeechBubble.module.css';

// Traced at 533 x 453 with 30px rounded corners.
const BODY =
  'M1.6 40.0 Q0 10 30.0 9.4 L478.0 0.6 Q508 0 509.8 29.9 L531.2 390.1 Q533 420 503.1 421.9 L52.9 451.1 Q23 453 21.4 423.0Z';

// The top of the tail tucks up inside the body; the apex is at x 35 of 80.
const TAIL = 'M0 0 L80 0 L35 95Z';

type Props = {
  testimonial: Testimonial;
  tone?: 'green' | 'sage' | 'white';
  className?: string;
};

export function SpeechBubble({ testimonial, tone = 'green', className }: Props) {
  return (
    <figure className={`${styles.bubble} ${styles[tone]} ${className ?? ''}`}>
      <svg className={styles.body} viewBox="0 0 533 453" preserveAspectRatio="none" aria-hidden="true">
        <path d={BODY} />
      </svg>
      <svg className={styles.tail} viewBox="0 0 80 95" aria-hidden="true">
        <path d={TAIL} />
      </svg>
      <blockquote className={styles.quote}>
        <p className={styles.heading}>{testimonial.heading}</p>
        {testimonial.body.map((paragraph) => (
          <p key={paragraph} className={styles.text}>
            {paragraph}
          </p>
        ))}
      </blockquote>
      <Image
        className={styles.avatar}
        src={testimonial.avatar.src}
        alt={testimonial.avatar.alt}
        width={131}
        height={131}
      />
    </figure>
  );
}
