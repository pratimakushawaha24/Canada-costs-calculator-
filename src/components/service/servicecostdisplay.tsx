import { ServiceDefinition } from '@/lib/types';

export default function ServiceCostDisplay({ service, city }: { service: ServiceDefinition; city?: any }) {
  return (
    <div className="bg-gray-50 p-4 rounded">
      <div className="flex items-baseline gap-4">
        <span className="text-2xl font-bold text-green-600">
          ${service.averageCostRange.min} – ${service.averageCostRange.max}
        </span>
        <span className="text-gray-500 text-sm">CAD</span>
      </div>
      <p className="text-gray-600 text-sm mt-1">Estimated range for {service.name}{city ? ` in ${city.name}` : ' across Canada'}</p>
    </div>
  );
}
