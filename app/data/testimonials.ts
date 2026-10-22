// Client testimonials, copied exactly from the Home mockup. These are quotes,
// so their wording (including "for over month") is left as the client wrote it.

export type Testimonial = {
  id: string;
  heading: string;
  body: string[]; // one entry per paragraph
  avatar?: { src: string; alt: string }; // round photo under the tail
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'saved-me-money',
    heading: 'Saved me money',
    body: [
      'Fantastic service, resulting in an outstanding job! Shaun is excellent value for money. Will always take the car to him.',
    ],
    avatar: { src: '/images/male_driver_roundal.png', alt: 'Smiling older man at the wheel of his car' },
  },
  {
    id: 'water-corrosion',
    heading: 'Water corrosion broke my indicators',
    body: [
      'Shaun saved the day for me when my indicators blew the fuse and refused to work!! Water had got in the casing and caused corrosion.',
      'Shaun squeezed my car in to sort out the problem so I could get back on the road. I will definitely be using him again :-)',
    ],
    avatar: { src: '/images/headlight_roundal.png', alt: 'Close-up of a car headlight' },
  },
  {
    id: 'car-alarm',
    heading: 'My car alarm was going off sporadically for over month.',
    body: [
      'Having tried a number of companies with no success I was lucky enough to come across First call Auto-electrical. Shaun methodically conducted a root cause analysis whilst I waited. He kept me informed throughout the process and quickly found and rectified the fault. I have no hesitation in offering him my highest recommendation. His service was quick efficient and value for money. Shaun is a true professional.',
    ],
    avatar: { src: '/images/female_client_roundal.png', alt: 'Woman with her hands over her ears' },
  },
];

// Empty slots on the Testimonials page for more reviews from the client
// (see agent/NEEDS_STEVE.md). Remove a slot when its testimonial arrives.
export const TESTIMONIAL_SLOTS: Testimonial[] = [4, 5, 6].map((n) => ({
  id: `placeholder-${n}`,
  heading: `[[PLACEHOLDER: testimonial ${n} heading]]`,
  body: [`[[PLACEHOLDER: testimonial ${n} text]]`],
}));
