import { LegalPageView, legalMetadata } from '../components/legal/LegalPageView';
import { PRIVACY } from '../data/legal';

export const metadata = legalMetadata(PRIVACY);

export default function PrivacyPage() {
  return <LegalPageView page={PRIVACY} />;
}
