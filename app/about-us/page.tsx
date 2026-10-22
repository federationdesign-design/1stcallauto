// About Us. Copy is exactly as in the About mockups, apart from the typo
// fixes listed in agent/COPY_FIXES.md.
// Source order follows the mobile layout (reasons, body copy, FAQs); the
// desktop grid puts the body copy above the reasons, with the FAQs beside.

import type { Metadata } from 'next';
import { Hero } from '../components/hero/Hero';
import { TickList, TickIcon } from '../components/ui/TickList';
import { Carousel } from '../components/ui/Carousel';
import { SpeechBubble } from '../components/testimonials/SpeechBubble';
import { FaqList } from '../components/faq/FaqList';
import { TESTIMONIALS } from '../data/testimonials';
import { FAQS } from '../data/faqs';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Based in Chawston, close to St Neots and the Black Cat roundabout on the A1, we provide professional vehicle mechanical and auto electrical services for private motorists and local businesses.',
  alternates: { canonical: '/about-us' },
};

const REASONS = [
  'Over 25 years’ experience in vehicle repair and maintenance',
  'A strong local reputation built over many years',
  'Honest, straightforward advice you can trust',
  'Competitive pricing with no unnecessary work',
  'Experienced in both mechanical and auto electrical repairs',
  'Reliable fault finding and diagnostics',
  'Friendly, personal service from an established local business',
  'Cars and light commercial vehicles welcome',
];

export default function AboutUs() {
  return (
    <>
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

      <div className={styles.body}>
        <section className={styles.reasons} aria-labelledby="reasons-heading">
          <h2 id="reasons-heading" className={styles.reasonsHeading}>
            So many reasons why motorists continue to choose us:
          </h2>
          <Carousel
            label="Reasons to choose us"
            trackClassName={styles.reasonsTrack}
            slideClassName={styles.reason}
          >
            {REASONS.map((reason) => (
              <div key={reason} className={styles.reasonInner}>
                <TickIcon className={styles.reasonIcon} />
                <p>{reason}</p>
              </div>
            ))}
          </Carousel>
        </section>

        <div className={styles.text}>
          <p className={styles.lead}>
            Based in Chawston, Cambridgeshire, close to St Neots and the Black Cat roundabout on the A1, we provide
            professional vehicle mechanical and auto electrical services for private motorists and local businesses
            throughout the surrounding area.
          </p>
          <p>
            Auto electrics are a particular speciality, covering everything from standard vehicle electrical
            systems and fault finding to the installation of additional equipment and modifications. We also
            provide air-conditioning servicing and re-gassing, engine diagnostics, restoration work and general
            vehicle maintenance.
          </p>
          <p>
            If your vehicle won’t start or cannot be driven to us, we can also arrange collection, making it easier
            to get your vehicle inspected and repaired.
          </p>
          <p>
            Whether you rely on your car every day or need to keep a work van on the road, our aim is simple:
            provide dependable, straightforward service and quality workmanship you can trust.
          </p>
        </div>

        <section className={styles.faqs} aria-labelledby="faq-heading">
          <h2 id="faq-heading" className={styles.faqHeading}>
            Frequently asked questions
          </h2>
          <FaqList faqs={FAQS} />
        </section>
      </div>
    </>
  );
}
