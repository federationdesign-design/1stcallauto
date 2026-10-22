import { ServicePageView, serviceMetadata } from '../components/services/ServicePageView';
import { SERVICING } from '../data/services/pages';

export const metadata = serviceMetadata(SERVICING);

export default function Services() {
  return <ServicePageView page={SERVICING} />;
}
