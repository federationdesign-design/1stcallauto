// Privacy, terms and cookies pages. Ported from LHM's app/data/legal.ts and
// rewritten for 1st Call: no booking platform, reviews widget, health data
// or ad pixels. Every company detail Steve has not supplied is a named
// placeholder (agent/PLACEHOLDERS.md).
//
// Content format (as LHM): blocks separated by a blank line; a block whose
// lines start with "•" is a bullet list.

import { ADDRESS_LINES, EMAIL, PHONE_DISPLAY } from '../lib/site';

export type CookieRow = {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
};

export type LegalSection = {
  heading: string;
  content: string;
  cookies?: CookieRow[]; // table under the content (cookies policy)
  cookieSettings?: boolean; // "Cookie settings" button under the content
};

export type LegalPage = {
  path: string;
  title: string;
  lastUpdated: string;
  metaDescription: string;
  sections: LegalSection[];
};

const LEGAL_NAME = '[[PLACEHOLDER: legal name of the business]]';
const ADDRESS = ADDRESS_LINES.join(', ');
const LAST_UPDATED = '[[PLACEHOLDER: policy date]]';

export const PRIVACY: LegalPage = {
  path: '/privacy-policy',
  title: 'Privacy Policy',
  lastUpdated: LAST_UPDATED,
  metaDescription: 'How 1st Call Auto collects, uses and protects your personal data under UK GDPR.',
  sections: [
    {
      heading: 'Who we are',
      content: `1st Call Auto is the trading name of ${LEGAL_NAME} [[PLACEHOLDER: company number and registered office, or "a sole trader"]]. We are the data controller for the personal information described in this policy. Our workshop is at ${ADDRESS}. You can contact us about your data at ${EMAIL} or on ${PHONE_DISPLAY}.\n\nThis policy explains what personal data we collect, why we collect it, how we use it, and your rights under UK GDPR and the Data Protection Act 2018.`,
    },
    {
      heading: 'What data we collect',
      content: `We may collect and process the following personal data:\n\n• Your name, email address, phone number, vehicle details and message when you send an enquiry or quote request through our website\n• Details you give us by phone, email or WhatsApp, and records of work we carry out on your vehicle\n• If you allow analytics cookies, information about how you use our website, collected by Google Analytics (see our Cookies Policy)\n• Technical information such as your IP address, which our hosting provider records in server logs to keep the website secure and working`,
    },
    {
      heading: 'Why we use your data and our legal basis',
      content: `• To reply to your enquiry and give you a quote: taking steps at your request before entering into a contract\n• To carry out work on your vehicle, invoice you and keep records of the work: performance of a contract and our legal obligations, including tax records\n• To keep our website secure and working: our legitimate interests\n• To understand how our website is used, if you allow analytics cookies: your consent, which you can withdraw at any time\n\nWe do not use your data for marketing, and we do not carry out automated decision-making or profiling.`,
    },
    {
      heading: 'Who we share data with',
      content: `We share your data only where needed to run our website and business:\n\n• Vercel, which hosts our website\n• Resend, which delivers the messages sent through our contact form to our inbox\n• Google, for Google Analytics if you allow analytics cookies, and Google Maps if you choose to load the map\n• WhatsApp (Meta), if you choose to contact us on WhatsApp\n\nSome of these providers may process data outside the UK. Where they do, they rely on safeguards recognised under UK law. We do not sell your personal data to anyone.`,
    },
    {
      heading: 'How long we keep your data',
      content: `• Enquiries that do not lead to any work: [[PLACEHOLDER: how long enquiries are kept]]\n• Customer and job records, including invoices: [[PLACEHOLDER: how long job records are kept]]\n• Website analytics data, if you allowed analytics cookies: [[PLACEHOLDER: Google Analytics data retention period]]`,
    },
    {
      heading: 'Your rights',
      content: `Under UK GDPR you have the following rights:\n\n• Right of access: you can ask for a copy of the personal data we hold about you\n• Right to rectification: you can ask us to correct inaccurate data\n• Right to erasure: you can ask us to delete your data in certain circumstances\n• Right to restrict processing: you can ask us to limit how we use your data\n• Right to data portability: you can ask for your data in a structured, machine-readable format\n• Right to object: you can object to processing based on our legitimate interests\n• Right to withdraw consent: where we rely on your consent, you can withdraw it at any time\n\nTo use any of these rights, contact us at ${EMAIL}. We will respond within one month. If you are unhappy with how we handle your data, you can complain to the Information Commissioner's Office (ICO) at ico.org.uk.`,
    },
    {
      heading: 'Cookies',
      content: `Our website uses cookies only with your permission, apart from storing your cookie choice. See our Cookies Policy for the full list and how to change your choice.`,
    },
    {
      heading: 'Changes to this policy',
      content: `We may update this policy from time to time. The current version will always be on this page, with the date it was last updated.`,
    },
  ],
};

export const TERMS: LegalPage = {
  path: '/terms-and-conditions',
  title: 'Terms & Conditions',
  lastUpdated: LAST_UPDATED,
  metaDescription: 'Terms and conditions for using the 1st Call Auto website.',
  sections: [
    {
      heading: 'About these terms',
      content: `These terms apply to your use of this website, which is run by ${LEGAL_NAME}, trading as 1st Call Auto, ${ADDRESS} (${EMAIL}). By using the website you agree to these terms.`,
    },
    {
      heading: 'Information on this website',
      content: `We aim to keep the information on this website accurate and up to date, but it is for general information only. It is not advice about your particular vehicle, and we cannot promise that it is complete or free from errors.`,
    },
    {
      heading: 'Enquiries and quotes',
      content: `Sending an enquiry or quote request through this website does not create a contract. Any estimate we give is based on the information you provide and may change once we have inspected the vehicle. We will agree the work with you before we carry it out.`,
    },
    {
      heading: 'Work on your vehicle',
      content: `[[PLACEHOLDER: workshop terms from the client, for example estimates, payment, parts and labour guarantees, and vehicles left at the workshop]]`,
    },
    {
      heading: 'Links to other websites',
      content: `This website links to other websites, such as Google Maps and WhatsApp. We are not responsible for their content or how they handle your data.`,
    },
    {
      heading: 'Liability',
      content: `Nothing in these terms limits our liability where it would be unlawful to do so, including for death or personal injury caused by our negligence, or for fraud. Otherwise, we are not liable for any loss arising from your use of this website or reliance on its content.`,
    },
    {
      heading: 'Governing law',
      content: `These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.`,
    },
  ],
};

export const COOKIES: LegalPage = {
  path: '/cookies-policy',
  title: 'Cookies Policy',
  lastUpdated: LAST_UPDATED,
  metaDescription: 'The cookies the 1st Call Auto website uses and how to change your choice.',
  sections: [
    {
      heading: 'What are cookies',
      content: `Cookies are small text files placed on your device when you visit a website. Websites can also store similar information in your browser's local storage. Under UK GDPR and the Privacy and Electronic Communications Regulations (PECR), we must ask for your consent before using anything that is not strictly necessary.`,
    },
    {
      heading: 'Strictly necessary',
      content: `We store your cookie choice in your browser's local storage, so we do not ask you again on every page. This is not a cookie and is never sent to us. It stays until you clear your browser data or we change this policy and ask you again.`,
      cookies: [
        {
          name: 'firstcall-cookie-consent (local storage)',
          provider: '1st Call Auto',
          purpose: 'Remembers which cookies you have allowed',
          duration: 'Until cleared',
        },
      ],
    },
    {
      heading: 'Analytics (only if you allow them)',
      content: `With your permission we use Google Analytics to understand how visitors use our website, such as which pages are viewed and how people found us. These cookies are not set unless you allow analytics cookies, and they are removed if you later withdraw your consent.`,
      cookies: [
        {
          name: '_ga',
          provider: 'Google Analytics',
          purpose: 'Distinguishes one visitor from another',
          duration: '2 years',
        },
        {
          name: '_ga_<container-id>',
          provider: 'Google Analytics',
          purpose: 'Keeps track of your visit to this website',
          duration: '2 years',
        },
      ],
    },
    {
      heading: 'Google Maps (only if you allow it)',
      content: `The map in the Our Location section is provided by Google Maps and loads only if you allow Maps. Once it loads, Google may set its own cookies, such as NID, to remember your preferences and for its own purposes. These cookies are set by Google, not by us, and are covered by Google's privacy policy at policies.google.com. If you do not allow Maps, you can still use the "Get directions" link, which opens Google Maps in a new tab.`,
      cookies: [
        {
          name: 'NID and other Google cookies',
          provider: 'Google',
          purpose: 'Set by Google when the map loads',
          duration: 'Set by Google (NID: 6 months)',
        },
      ],
    },
    {
      heading: 'Managing your choice',
      content: `When you first visit our website we ask you to accept or reject non-essential cookies. You can change your choice at any time using the "Cookie settings" link in the footer of any page, or the button below.\n\nYou can also control and delete cookies through your browser settings. For more information, visit allaboutcookies.org. If you have any questions about how we use cookies, contact us at ${EMAIL}.`,
      cookieSettings: true,
    },
    {
      heading: 'Changes to this policy',
      content: `We may update this policy from time to time. If the cookies we use change, we will ask for your choice again.`,
    },
  ],
};
