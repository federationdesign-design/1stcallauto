'use client';

// Hero scroll fade, ported from LHM (PrivateHomeClient, TeamClient,
// LocationClient). An overlay sits over the hero image and its opacity runs
// from 0 to 1 as the page scrolls: it starts once the visitor has scrolled
// 10% of the hero's height and is fully opaque by 65%.
//
// Added for 1st Call: visitors who ask for reduced motion get no fade. The
// overlay stays at 0 and the image stays static. The preference is watched
// live, so changing it in the OS takes effect without a reload.

import { useEffect, type RefObject } from 'react';

const START = 0.1; // fraction of hero height scrolled before the fade begins
const RANGE = 0.55; // fraction of hero height over which it reaches full opacity

export function useHeroFade(
  heroRef: RefObject<HTMLElement | null>,
  overlayRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleScroll = () => {
      const hero = heroRef.current, overlay = overlayRef.current;
      if (!hero || !overlay) return;
      const h = hero.offsetHeight, s = window.scrollY, start = h * START, range = h * RANGE;
      overlay.style.opacity = s <= start ? '0' : String(Math.min((s - start) / range, 1));
    };

    const attach = () => {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    };

    const detach = () => {
      window.removeEventListener('scroll', handleScroll);
      if (overlayRef.current) overlayRef.current.style.opacity = '0';
    };

    const sync = () => (reduceMotion.matches ? detach() : attach());

    sync();
    reduceMotion.addEventListener('change', sync);
    return () => {
      reduceMotion.removeEventListener('change', sync);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [heroRef, overlayRef]);
}
