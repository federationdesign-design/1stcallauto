import { LegalPageView, legalMetadata } from '../components/legal/LegalPageView';
import { COOKIES } from '../data/legal';

export const metadata = legalMetadata(COOKIES);

export default function CookiesPage() {
  return <LegalPageView page={COOKIES} />;
}
