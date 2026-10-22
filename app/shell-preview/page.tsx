// TEMPORARY: Phase 4 checkpoint page showing the global shell with an inner
// page hero (the About Us hero, copy as in the About mockups). Delete in
// Phase 5 once /about-us exists.

import type { Metadata } from 'next';
import { Hero } from '../components/hero/Hero';
import { TickList } from '../components/ui/TickList';
import { SpeechBubble } from '../components/testimonials/SpeechBubble';
import { TESTIMONIALS } from '../data/testimonials';

export const metadata: Metadata = {
  title: 'Shell preview',
  robots: { index: false, follow: false },
};

export default function ShellPreview() {
  return (
    <Hero
      title="About Us"
      image={{
        desktop: { src: '/images/about_img.jpg', width: 1920, height: 1205 },
        mobile: { src: '/images/about_img_mob.jpg', width: 430, height: 553 },
        alt: 'Gloved hand removing a fuse from a car fuse box',
      }}
      aside={<SpeechBubble testimonial={TESTIMONIALS[0]} />}
    >
      <p>
        With more than 25 years’ experience in the motor trade, we have built an excellent reputation for
        reliable workmanship, honest advice and competitive prices. From routine servicing and mechanical
        repairs to more complex electrical faults, diagnostics and vehicle modifications, we have the knowledge
        and experience to get to the bottom of the problem.
      </p>
      <TickList tone="onGreen" items={[{ label: 'Get a free estimate' }]} />
    </Hero>
  );
}
