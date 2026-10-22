// Site navigation. Labels follow the mockups; targets follow agent/ROUTES.md.

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const SERVICE_PAGES: NavItem[] = [
  { label: 'Auto Electrical Specialists', href: '/auto-electrical-specialists' },
  { label: 'Vehicle Mechanical Repairs & Servicing', href: '/vehicle-mechanical-repairs-servicing' },
  { label: 'Fault Finding & Vehicle Diagnostics', href: '/fault-finding-vehicle-diagnostics' },
];

export const HEADER_NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Services', href: '/services', children: SERVICE_PAGES },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Find Us', href: '/contact#location' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Find Us', href: '/contact#location' },
  { label: 'Get a free quote', href: '/contact#quote' },
  { label: 'Contact', href: '/contact' },
];

export const LEGAL_NAV: NavItem[] = [
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  { label: 'Cookies Policy', href: '/cookies-policy' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
];

// True when `href` is the current page. Hash links ("Find Us") are never
// marked current, so "Contact" is the only item lit on /contact.
export function isCurrent(href: string, pathname: string): boolean {
  if (href.includes('#')) return false;
  return href === pathname;
}

// True when the current page is `item` or one of its children.
export function isInSection(item: NavItem, pathname: string): boolean {
  return isCurrent(item.href, pathname) || !!item.children?.some((child) => isCurrent(child.href, pathname));
}
