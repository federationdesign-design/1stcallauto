import { ServicePageView, serviceMetadata } from '../components/services/ServicePageView';
import { MECHANICAL } from '../data/services/pages';

export const metadata = serviceMetadata(MECHANICAL);

export default function VehicleMechanicalRepairsServicing() {
  return <ServicePageView page={MECHANICAL} />;
}
