import { ServicePageView, serviceMetadata } from '../components/services/ServicePageView';
import { DIAGNOSTICS } from '../data/services/pages';

export const metadata = serviceMetadata(DIAGNOSTICS);

export default function FaultFindingVehicleDiagnostics() {
  return <ServicePageView page={DIAGNOSTICS} />;
}
