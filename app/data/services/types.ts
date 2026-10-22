// Shape of a service page (Services and the three specialist pages). Each
// page is a hero, a centred intro and three columns of white cards; the
// columns are listed left to right as drawn, and stack in that order on
// mobile.

import type { HeroImage } from '../../components/hero/Hero';

export type ServiceCard = {
  heading: string;
  paragraphs: string[];
  listIntro?: string; // bold line above the list ("Our work includes:")
  list?: string[];
  afterList?: string; // note under the rule below the list
  whatsapp?: boolean; // "Call us on WhatsApp" button at the foot of the card
};

export type ServicePage = {
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  image: HeroImage;
  panel: string; // hero panel paragraph
  intro: { lead: string; body: string };
  columns: [ServiceCard[], ServiceCard[], ServiceCard[]];
};
