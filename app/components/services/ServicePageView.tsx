// Layout shared by Services and the three specialist pages: hero with the
// "Saved me money" bubble, a centred intro over a rule, then three columns
// of white cards (stacked in reading order on mobile: left column, middle,
// then right). On the Services overview each card is a specialist page's
// title and opening line, linking to that page.

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '../hero/Hero';
import { TickList } from '../ui/TickList';
import { SpeechBubble } from '../testimonials/SpeechBubble';
import { TESTIMONIALS } from '../../data/testimonials';
import { whatsappHref } from '../../lib/site';
import type { ServiceCard, ServicePage } from '../../data/services/types';
import styles from './ServicePageView.module.css';

// Both hero links go to the quote form, per Steve.
const HERO_LINKS = [
  { label: 'Get a free estimate', href: '/contact#quote' },
  { label: 'Get quote now', href: '/contact#quote' },
];

export function serviceMetadata(page: ServicePage): Metadata {
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: page.path },
  };
}

export function ServicePageView({ page }: { page: ServicePage }) {
  return (
    <>
      <Hero title={page.title} image={page.image} aside={<SpeechBubble testimonial={TESTIMONIALS[0]} />}>
        <p>{page.panel}</p>
        <TickList tone="onGreen" items={HERO_LINKS} />
      </Hero>

      <div className={styles.intro}>
        <p className={styles.lead}>{page.intro.lead}</p>
        <p>{page.intro.body}</p>
      </div>

      <div className={page.links ? `${styles.columns} ${styles.overview}` : styles.columns}>
        {page.columns?.map((column, index) => (
          <div key={index} className={styles.column}>
            {column.map((card) => (
              <Card key={card.heading} card={card} />
            ))}
          </div>
        ))}
        {page.links?.map((linked) => (
          <section key={linked.path} className={`${styles.card} ${styles.linkCard}`}>
            <h2 className={styles.heading}>
              <Link href={linked.path} className={styles.cardLink}>
                {linked.title}
              </Link>
            </h2>
            <p>{linked.panel}</p>
          </section>
        ))}
      </div>
    </>
  );
}

function Card({ card }: { card: ServiceCard }) {
  const whatsapp = card.whatsapp ? whatsappHref() : null;

  return (
    <section className={styles.card}>
      <h2 className={styles.heading}>{card.heading}</h2>
      {card.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {card.listIntro && <p className={styles.listIntro}>{card.listIntro}</p>}
      {card.list && <TickList items={card.list.map((label) => ({ label }))} className={styles.list} />}
      {card.afterList && <p className={styles.afterList}>{card.afterList}</p>}
      {whatsapp && (
        <a href={whatsapp} className={styles.whatsapp}>
          <Image src="/images/wa_icon.jpg" alt="" width={161} height={161} className={styles.whatsappIcon} />
          Call us on WhatsApp
        </a>
      )}
    </section>
  );
}
