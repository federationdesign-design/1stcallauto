// Frequently asked questions, copied exactly from the Home and About
// mockups. Both pages show all eight in this order. On Home's two-column
// desktop layout the first four fill the left column and the rest the right,
// as drawn.

export type Faq = {
  question: string;
  answer: string;
};

export const FAQS: Faq[] = [
  {
    question: 'My car is not starting, can you collect it from my home?',
    answer:
      'Yes. If your vehicle is a non-starter or you’re unable to safely drive it to us, we can arrange collection from your home or workplace. We can then diagnose the problem and advise you on the repairs needed to get you back on the road.',
  },
  {
    question: 'Not sure what’s wrong. Can you diagnose the problem?',
    answer:
      'Absolutely. You don’t need to know what the fault is before contacting us. Whether the vehicle won’t start, has a warning light on the dashboard, is making an unusual noise or simply isn’t running properly, we can investigate the problem and identify the likely cause. As vehicle mechanics and auto electrical specialists, we can diagnose both mechanical and electrical faults.',
  },
  {
    question: 'Do you repair vans and commercial vehicles?',
    answer:
      'Yes. We regularly work on vans and light commercial vehicles as well as private cars. We understand that for small businesses and tradespeople, a van being off the road can mean lost working time, so we’ll always aim to diagnose the problem and get the vehicle back in service as efficiently as possible.',
  },
  {
    question: 'Can you diagnose electrical faults/dashboard warning lights?',
    answer:
      'Yes. We specialise in auto electrical diagnostics as well as general mechanical repairs. If you have warning lights, intermittent electrical problems, battery issues, starting faults or something simply isn’t working as it should, we can investigate the cause and recommend the appropriate repair.',
  },
  {
    question: 'Can you arrange an MOT for my vehicle?',
    answer:
      'Yes. Although we don’t carry out MOT tests ourselves, we work with a trusted local MOT testing station and can arrange the MOT on your behalf. If any repair work is required beforehand, or the vehicle fails the MOT, we can also help get the necessary work completed.',
  },
  {
    question: 'Can you repair accident or crash damage?',
    answer:
      'We can inspect accident-damaged vehicles and carry out many of the mechanical and electrical repairs that may be required following a collision. This can include damaged components, electrical faults and problems affecting how the vehicle runs or drives. We do not undertake specialist bodywork or paint repairs, but we can advise you if additional work from a body repair specialist is required.',
  },
  {
    question: 'Do you work on electric vehicles?',
    answer:
      'At present, we do not undertake repair or maintenance work on fully electric vehicles. We work primarily on petrol and diesel cars and light commercial vehicles. If you’re unsure whether we can work on your particular vehicle, give us a call and we’ll be happy to advise.',
  },
  {
    question: 'Can you repair my vehicle before its MOT?',
    answer:
      'Yes. If you know your vehicle needs work before its MOT, we can inspect it and carry out any necessary repairs beforehand. We can also arrange the MOT through our partner testing station, making the whole process easier to manage.',
  },
];
