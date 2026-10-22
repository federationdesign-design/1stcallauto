'use client';

// Mobile swipe carousel with dots (Home intro columns, About reasons list).
// Below 1024px the slides sit in a horizontal scroll-snap track, one per
// view, with a dot per slide; tapping a dot scrolls to that slide and the
// dots follow swipes. From 1024px the track is an ordinary block that the
// page lays out via `trackClassName`, and the dots are hidden.
// No script is needed to read the content: every slide is in the HTML.

import { Children, useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './Carousel.module.css';

type Props = {
  label: string; // names the carousel for screen readers
  children: ReactNode; // one child per slide
  className?: string;
  trackClassName?: string; // desktop layout of the slides
  slideClassName?: string;
};

export function Carousel({ label, children, className, trackClassName, slideClassName }: Props) {
  const slides = Children.toArray(children);
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  // The slide nearest the track's left edge is the active one.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const width = track.clientWidth;
        if (width > 0) setActive(Math.round(track.scrollLeft / width));
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
    };
  }, []);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: index * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div className={`${styles.carousel} ${className ?? ''}`} role="region" aria-roledescription="carousel" aria-label={label}>
      <ul ref={trackRef} className={`${styles.track} ${trackClassName ?? ''}`}>
        {slides.map((slide, index) => (
          <li
            key={index}
            className={`${styles.slide} ${slideClassName ?? ''}`}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
          >
            {slide}
          </li>
        ))}
      </ul>
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={styles.dot}
            aria-label={`Show slide ${index + 1} of ${slides.length}`}
            aria-current={index === active ? 'true' : undefined}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
