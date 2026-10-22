'use client';

// Page hero: full-bleed photo with the page title, the green text panel and
// an optional aside (the testimonial bubble on inner pages, the large logo
// on Home).
// Mobile: photo with the title over it, then the panel below; no aside.
// Desktop (1024px and up): the panel and aside overlap the photo, as drawn.
// The "home" variant has the taller Home photo, the title bottom right and
// the aside set to the panel's lower edge.
// The photo fades out as the page scrolls (see useHeroFade), which also
// publishes the fade as --hero-fade for the aside.

import { useRef, type ReactNode } from 'react';
import { getImageProps } from 'next/image';
import { useHeroFade } from './useHeroFade';
import styles from './Hero.module.css';

export type HeroImage = {
  desktop: { src: string; width: number; height: number };
  mobile: { src: string; width: number; height: number };
  alt: string;
};

type Props = {
  image: HeroImage;
  title: ReactNode;
  children: ReactNode; // green panel content
  aside?: ReactNode; // desktop only
  variant?: 'inner' | 'home';
};

export function Hero({ image, title, children, aside, variant = 'inner' }: Props) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  useHeroFade(mediaRef, fadeRef, sectionRef);

  const common = { alt: image.alt, sizes: '100vw', fetchPriority: 'high' as const };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, ...image.desktop });
  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({ ...common, ...image.mobile });

  return (
    <section ref={sectionRef} className={`${styles.hero} ${variant === 'home' ? styles.home : ''}`}>
      <div ref={mediaRef} className={styles.media}>
        <picture>
          <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
          <img {...imgProps} srcSet={mobileSrcSet} className={styles.image} alt={image.alt} />
        </picture>
        <div ref={fadeRef} className={styles.fade} aria-hidden="true" />
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.panel}>{children}</div>

      {aside && <div className={styles.aside}>{aside}</div>}
    </section>
  );
}
