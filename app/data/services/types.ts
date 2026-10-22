// Shape of a service page (Services and the three specialist pages). Each
// page is a hero, a centred intro, then either three columns of white cards
// (the specialist pages; columns listed left to right as drawn, stacking in
// that order on mobile) or, on the Services overview, one card per
// specialist page linking to it.

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
  columns?: [ServiceCard[], ServiceCard[], ServiceCard[]];
  links?: ServicePage[]; // overview cards: each page's title and hero panel
};
