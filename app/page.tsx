// Home. Copy is exactly as in the Home mockups, apart from the typo fixes
// listed in agent/COPY_FIXES.md.

import type { Metadata } from 'next';
import Image from 'next/image';
import { Hero } from './components/hero/Hero';
import { TickList } from './components/ui/TickList';
import { Carousel } from './components/ui/Carousel';
import { SpeechBubble } from './components/testimonials/SpeechBubble';
import { FaqList } from './components/faq/FaqList';
import { TESTIMONIALS } from './data/testimonials';
import { FAQS } from './data/faqs';
import { LocalBusinessJsonLd } from './components/seo/LocalBusinessJsonLd';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Vehicle Mechanic & Auto Electrics near St Neots | 1st Call Auto' },
  description:
    'Vehicle mechanic and auto electrical specialists in Chawston, near St Neots and the A1. Servicing, repairs, auto electrics and diagnostics for cars and vans.',
  alternates: { canonical: '/' },
};

const INTRO_COLUMNS = [
  {
    heading: 'Auto-electrics',
    text: 'We are specialists in auto electrics if it’s the standard system that needs to be worked on or if you need us to put in a new extra or modification.',
  },
  {
    heading: 'Mechanical',
    text: 'All mechanical and servicing work undertaken in our workshop including restoration and modifications.',
  },
  {
    heading: 'Fault Finding & Diagnostics',
    text: 'Is your Engine Management Light (EML) on? An engine diagnostics check can identify any problem before more serious damage occurs.',
  },
];

const [savedMeMoney, waterCorrosion, carAlarm] = TESTIMONIALS;

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Hero
        variant="home"
        title={
          <>
            We can work on all <span className={styles.underline}>motor</span> vehicles
          </>
        }
        image={{
          desktop: { src: '/images/homepage_img.jpg', width: 1920, height: 1279 },
          mobile: { src: '/images/homepage_img_mob.jpg', width: 430, height: 551 },
          alt: 'Mechanic in blue overalls lying on a creeper under the front of a car',
        }}
        aside={
          <Image
            className={styles.heroLogo}
            src="/images/logo_full_colour.svg"
            alt=""
            width={1120}
            height={610}
            unoptimized
          />
        }
      >
        <p>
          We are a vehicle mechanic &amp; auto electrical near St Neots in Chawston, Cambridgeshire near Wyboston
          Lakes Golf Course
        </p>
        <p>We have an excellent reputation throughout the area for quality workmanship at competitive prices.</p>
        <TickList
          tone="onGreen"
          splitOnDesktop
          items={[
            { label: 'Auto Electrical issues', href: '/auto-electrical-specialists' },
            { label: 'Mechanical problems', href: '/vehicle-mechanical-repairs-servicing' },
            { label: 'Get a free estimate', href: '/contact#quote' },
            { label: 'Air con service', href: '/services' },
            { label: 'Diagnostics', href: '/fault-finding-vehicle-diagnostics' },
          ]}
        />
      </Hero>

      <div className={styles.intro}>
        <Carousel label="What we do" trackClassName={styles.introTrack} slideClassName={styles.introColumn}>
          {INTRO_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h2 className={styles.introHeading}>{column.heading}</h2>
              <p className={styles.introText}>{column.text}</p>
            </div>
          ))}
        </Carousel>
      </div>

      <section className={styles.testimonials} aria-labelledby="clients-heading">
        <h2 id="clients-heading" className={styles.sectionHeading}>
          What Clients say:
        </h2>
        <SpeechBubble testimonial={savedMeMoney} tone="green" className={styles.savedMeMoney} />
        <SpeechBubble testimonial={waterCorrosion} tone="sage" className={styles.waterCorrosion} />
        <SpeechBubble testimonial={carAlarm} tone="green" desktopTone="white" className={styles.carAlarm} />
      </section>

      <section className={styles.faqs} aria-labelledby="faq-heading">
        <h2 id="faq-heading" className={`${styles.sectionHeading} ${styles.faqHeading}`}>
          Frequently asked questions
        </h2>
        <FaqList faqs={FAQS} columns={2} />
      </section>
    </>
  );
}
