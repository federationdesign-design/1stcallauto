import { LegalPageView, legalMetadata } from '../components/legal/LegalPageView';
import { TERMS } from '../data/legal';

export const metadata = legalMetadata(TERMS);

export default function TermsPage() {
  return <LegalPageView page={TERMS} />;
}
