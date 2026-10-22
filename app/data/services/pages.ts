// The four service pages, copy exactly as in their desktop mockups apart
// from the fixes in agent/COPY_FIXES.md. Services ("Servicing your
// vehicle") keeps the hero and intro from its mockup; per Steve, its
// duplicated Mechanical cards are replaced by one card per specialist page,
// using that page's title and opening line. It comes last because it
// refers to the other three.

import type { ServicePage } from './types';
import { MECHANICAL_COLUMNS } from './mechanical-cards';

const MECHANICAL_IMAGE = {
  desktop: { src: '/images/vehicle_mechanical_repairs_img.jpg', width: 1920, height: 1279 },
  mobile: { src: '/images/vehicle_mechanical_repairs_img_mob.jpg', width: 430, height: 556 },
  alt: 'Car raised on a workshop lift with a wheel removed, showing the brake disc and caliper',
};

const ELECTRICAL_PANEL =
  'Modern vehicles rely heavily on their electrical systems, and when something goes wrong, finding the actual cause of the problem can be more difficult than replacing the faulty part.';

export const MECHANICAL: ServicePage = {
  path: '/vehicle-mechanical-repairs-servicing',
  title: 'Vehicle Mechanical Repairs & Servicing',
  metaTitle: 'Vehicle Mechanical Repairs & Servicing',
  metaDescription:
    'Mechanical repairs and servicing for cars and light commercial vehicles from our workshop in Chawston, near St Neots, with more than 25 years’ experience in the motor trade.',
  image: MECHANICAL_IMAGE,
  panel:
    'Keeping your vehicle reliable isn’t just about fixing problems when something goes wrong. Regular servicing, maintenance and timely repairs can help prevent more serious issues and keep your car or van performing as it should.',
  intro: {
    lead: 'At 1st Call, we provide a wide range of mechanical repair and servicing work from our workshop in Chawston, near St Neots. With more than 25 years’ experience in the motor trade, we work with private motorists, tradespeople and small businesses throughout Cambridgeshire and Bedfordshire.',
    body: 'Whether your vehicle has developed a fault, needs routine maintenance or simply doesn’t feel right when you drive it, we can inspect the vehicle, identify the problem and advise you on the work required.',
  },
  columns: MECHANICAL_COLUMNS,
};

export const AUTO_ELECTRICAL: ServicePage = {
  path: '/auto-electrical-specialists',
  title: 'Auto Electrical Specialists',
  metaTitle: 'Auto Electrical Specialists',
  metaDescription:
    'Auto electrical diagnostics, repairs, installations and modifications for customers across St Neots and the surrounding area, with more than 25 years’ experience.',
  // Reuses the About photo, per Steve.
  image: {
    desktop: { src: '/images/about_img.jpg', width: 1920, height: 1205 },
    mobile: { src: '/images/about_img_mob.jpg', width: 430, height: 553 },
    alt: 'Gloved hand removing a fuse from a car fuse box',
  },
  panel: ELECTRICAL_PANEL,
  intro: {
    lead: 'At 1st Call, auto electrics is one of our specialist areas. With more than 25 years’ experience in the motor trade, we provide professional auto electrical diagnostics, repairs, installations and modifications for customers across St Neots, Cambridgeshire and Bedfordshire.',
    body: 'Whether you have a vehicle that won’t start, a warning light that keeps appearing, an intermittent electrical problem or equipment that has stopped working altogether, we have the experience and diagnostic equipment to investigate the fault and get to the root of the problem.',
  },
  columns: [
    [
      {
        heading: 'Vehicle Electrical Fault Finding',
        paragraphs: [
          'Electrical faults can be frustrating, particularly when the problem comes and goes or there is no obvious reason for something to have stopped working.',
          'Our diagnostic and fault-finding service can investigate problems with vehicle wiring, batteries, alternators, sensors, lighting, charging systems, electronic control units and other electrical components.',
          'Rather than simply replacing parts and hoping the problem disappears, we aim to identify the underlying cause of the fault and recommend the appropriate repair.',
          'If your vehicle won’t start and cannot be driven to our workshop, we can also arrange collection from your home or workplace.',
        ],
      },
      {
        heading: 'Classic & Vintage Vehicle Auto Electrics',
        paragraphs: [
          'Our experience isn’t limited to modern vehicles. We can also undertake electrical work on classic and vintage cars, where repairing or recreating wiring requires a different approach.',
          'Where appropriate, we use modern PVC-insulated automotive cable while retaining the appearance and character of the original installation. Wiring can be braided or bound to complement the vehicle, and we use original manufacturer’s colour coding wherever possible.',
          'We also make every effort to source original-style terminals, fittings and wiring accessories. Where components are no longer manufactured, we can identify suitable modern alternatives while remaining sympathetic to the original vehicle.',
          'This makes us a good choice for restoration projects, electrical upgrades and resolving long-standing faults on older vehicles.',
        ],
      },
    ],
    [
      {
        heading: 'Auto Electrical Repairs',
        paragraphs: [
          'From relatively straightforward wiring problems to more complicated electrical faults, we undertake a wide range of auto electrical repairs.',
        ],
        listIntro: 'Our work includes:',
        list: [
          'Electrical fault finding and diagnostics',
          'Battery and charging system faults',
          'Alternator and starter motor problems',
          'Wiring repairs and replacement',
          'Lighting and electrical component faults',
          'Sensors and electronic control systems',
          'Dashboard and warning light investigation',
          'Intermittent electrical problems',
          'Electrical modifications and upgrades',
          'Installation of additional vehicle equipment',
        ],
        afterList:
          'If you don’t know what’s causing the problem, don’t worry. Tell us what the vehicle is doing and we’ll take it from there.',
      },
      {
        heading: 'Experienced Auto Electricians Near St Neots',
        paragraphs: [
          'Based in Chawston, Cambridgeshire, close to St Neots and the A1, we work with private motorists, tradespeople and small businesses throughout Cambridgeshire and Bedfordshire.',
          'With more than 25 years of experience, we have built our reputation on knowledgeable fault finding, quality workmanship and straightforward advice.',
          'From tracing an awkward electrical fault to installing new equipment or working on the electrical system of a classic vehicle, we have the tools and experience to help.',
        ],
      },
    ],
    [
      {
        heading: 'Electrical Installations & Vehicle Upgrades',
        paragraphs: [
          'Auto electrics aren’t only about repairing faults. We can also supply and install a wide variety of additional electrical equipment and vehicle upgrades.',
          'Depending on your vehicle and requirements, installations can include:',
        ],
        list: [
          'Immobilisers and proximity alarms',
          'Vehicle tracking systems',
          'Bluetooth solutions',
          'Remote central locking kits',
          'Car audio equipment',
          'Satellite navigation systems',
          'Front and rear parking sensors',
          'Front and rear dash cameras',
          'External vehicle cameras',
          'LED lighting upgrades',
          'Multimedia systems',
          'CCTV and Wi-Fi equipment',
        ],
        afterList:
          'If you have something particular in mind, speak to us about your vehicle and what you would like to achieve. We can advise on the most suitable approach and provide an estimate for the work.',
      },
      {
        heading: 'Need Help With a Vehicle Electrical Problem?',
        paragraphs: [
          'If you have an electrical fault, a non-starting vehicle or an upgrade you would like installed, get in touch. Tell us what vehicle you have and what you’ve noticed, and we’ll advise you on the next step and provide an estimate for the work.',
        ],
        whatsapp: true,
      },
    ],
  ],
};

export const DIAGNOSTICS: ServicePage = {
  path: '/fault-finding-vehicle-diagnostics',
  title: 'Fault Finding & Vehicle Diagnostics',
  metaTitle: 'Fault Finding & Vehicle Diagnostics',
  metaDescription:
    'Professional fault finding and vehicle diagnostics for cars and light commercial vehicles from our workshop in Chawston, near St Neots.',
  image: {
    desktop: { src: '/images/fault_finding_diagnostics_img.jpg', width: 1920, height: 1279 },
    mobile: { src: '/images/fault_finding_diagnostics_img_mob.jpg', width: 430, height: 553 },
    alt: 'Gloved mechanic testing a car battery with a multimeter under the bonnet',
  },
  panel:
    'When something doesn’t feel right with your vehicle, the hardest part is often working out exactly what is causing the problem.',
  intro: {
    lead: 'At 1st Call, we provide professional fault finding and vehicle diagnostics for cars and light commercial vehicles from our workshop in Chawston, near St Neots. With more than 25 years’ experience in the motor trade, we combine practical mechanical knowledge with modern diagnostic equipment to identify faults accurately and recommend the right repair.',
    body: 'Whether your vehicle has a warning light on the dashboard, is difficult to start, has lost power, is running unevenly or has developed an intermittent fault, we can investigate the problem and help get to the root cause.',
  },
  columns: [
    [
      {
        heading: 'Engine Management Lights & Warning Lights',
        paragraphs: [
          'If your Engine Management Light (EML) or another warning light appears on the dashboard, it is important not to ignore it. A warning light can indicate anything from a relatively minor sensor issue to a fault that could affect vehicle performance, emissions or reliability.',
          'We can carry out a diagnostic check to read stored fault information from the vehicle and use this as the starting point for further investigation.',
          'A fault code does not always tell you exactly which part needs replacing. It identifies where the vehicle has detected a problem, which is why experience and proper fault finding are so important.',
        ],
      },
      {
        heading: 'More Than Just Reading Fault Codes',
        paragraphs: [
          'Modern diagnostic equipment is an extremely useful tool, but effective diagnosis involves more than simply connecting a computer to the vehicle.',
          'A fault code may be caused by a failed component, damaged wiring, a poor electrical connection, a sensor giving incorrect readings or another underlying mechanical problem.',
          'Our approach is to use diagnostic information alongside physical testing and inspection to determine what is actually causing the issue.',
          'This helps avoid unnecessary replacement of parts and gives you a clearer understanding of what work your vehicle really needs.',
        ],
      },
      {
        heading: 'Experienced Vehicle Diagnostics Near St Neots',
        paragraphs: [
          'Based in Chawston, Cambridgeshire, close to St Neots and the A1, we provide diagnostic and fault-finding services for customers throughout Cambridgeshire and Bedfordshire.',
          'With more than 25 years in the motor trade, we have developed the practical experience needed to investigate difficult faults and understand how the mechanical and electrical systems of a vehicle work together.',
          'Our aim is straightforward: identify the real problem, explain what we have found and recommend the most appropriate repair.',
        ],
      },
    ],
    [
      {
        heading: 'Common Problems We Can Investigate',
        paragraphs: ['We can diagnose a wide range of vehicle faults, including:'],
        listIntro: 'Our work includes:',
        list: [
          'Engine management warning lights',
          'Vehicles that are difficult or slow to start',
          'Complete non-starting vehicles',
          'Loss of engine power',
          'Poor or uneven running',
          'Intermittent faults',
          'Battery and charging problems',
          'Starter motor and alternator faults',
          'Sensor faults',
          'Electrical and wiring problems',
          'Unusual engine behaviour',
          'Increased fuel consumption',
          'Dashboard warning messages',
          'Lighting and electrical system faults',
          'Problems that keep returning',
        ],
        afterList:
          'Even if you cannot describe the fault technically, that is not a problem. Tell us what you have noticed, when it happens and how the vehicle behaves, and we can begin the investigation from there.',
      },
      {
        heading: 'Diagnosing Intermittent Vehicle Faults',
        paragraphs: [
          'Some of the most frustrating vehicle problems are those that do not happen all the time.',
          'You may have a warning light that appears and disappears, a vehicle that only struggles to start occasionally or an electrical component that works one day and fails the next.',
          'Intermittent faults can require more detailed investigation because the problem may not be present when the vehicle first arrives at the workshop.',
          'With extensive experience in both mechanical and auto electrical fault finding, we can investigate these types of problems and look for the underlying cause rather than simply treating the immediate symptom.',
        ],
      },
    ],
    [
      {
        heading: 'Mechanical & Electrical Diagnostics',
        paragraphs: [
          'One of the advantages of bringing your vehicle to 1st Call is that our experience covers both mechanical repairs and auto electrics.',
          'Many faults do not fall neatly into one category. A problem that initially appears electrical may ultimately be caused by a mechanical component, while a mechanical symptom may be the result of an electrical or sensor fault.',
          'Being able to investigate both sides of the vehicle allows us to take a broader view of the problem and helps reduce the guesswork involved in diagnosis.',
        ],
      },
      {
        heading: 'Non-Starting Vehicles',
        paragraphs: [
          'If your car or van will not start, there can be many possible causes.',
          'The problem could relate to the battery, starter motor, alternator, ignition system, wiring, sensors, fuel delivery or another mechanical or electrical component.',
          'Rather than assuming the obvious part is responsible, we can carry out the necessary checks to determine why the vehicle is not starting.',
          'If the vehicle cannot be driven to our workshop, we can also arrange collection from your home or workplace.',
        ],
      },
      {
        heading: 'Have You Got a Warning Light or Vehicle Fault?',
        paragraphs: [
          'If your vehicle has developed a warning light, starting problem, electrical fault or unexplained change in performance, get in touch.',
          'Tell us what vehicle you have and what symptoms you have noticed, and we can advise you on the next step and arrange a diagnostic inspection.',
        ],
        whatsapp: true,
      },
    ],
  ],
};

export const SERVICING: ServicePage = {
  path: '/services',
  title: 'Servicing your vehicle',
  metaTitle: 'Servicing your vehicle',
  metaDescription:
    'Auto electrical work, mechanical repairs, servicing and vehicle diagnostics from our workshop in Chawston, near St Neots, with more than 25 years’ experience in the motor trade.',
  image: MECHANICAL_IMAGE,
  panel: ELECTRICAL_PANEL,
  intro: {
    lead: 'Keeping your vehicle reliable isn’t just about fixing problems when something goes wrong. Regular servicing, maintenance and timely repairs can help prevent more serious issues and keep your car or van performing as it should.',
    body: 'At 1st Call, we provide a wide range of mechanical repair and servicing work from our workshop in Chawston, near St Neots. With more than 25 years’ experience in the motor trade, we work with private motorists, tradespeople and small businesses throughout Cambridgeshire and Bedfordshire. Whether your vehicle has developed a fault, needs routine maintenance or simply doesn’t feel right when you drive it, we can inspect the vehicle, identify the problem and advise you on the work required.',
  },
  links: [AUTO_ELECTRICAL, MECHANICAL, DIAGNOSTICS],
};
