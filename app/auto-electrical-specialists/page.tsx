import { ServicePageView, serviceMetadata } from '../components/services/ServicePageView';
import { AUTO_ELECTRICAL } from '../data/services/pages';

export const metadata = serviceMetadata(AUTO_ELECTRICAL);

export default function AutoElectricalSpecialists() {
  return <ServicePageView page={AUTO_ELECTRICAL} />;
}
