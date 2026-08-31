import Link from 'next/link';
import { ServiceDefinition } from '@/lib/types';

export default function ServiceCard({ service }: { service: ServiceDefinition }) {
  return (
    <Link href={`/service-costs/${service.slug}`} className="block bg-white rounded-lg shadow hover:shadow-md transition p-4 border border-gray-100">
      <h3 className="font-semibold text-lg text-green-700">{service.name}</h3>
      <p className="text-gray-600 text-sm mt-1">{service.description}</p>
      <div className="mt-2 text-sm text-gray-500">
        ${service.averageCostRange.min} – ${service.averageCostRange.max} CAD
      </div>
    </Link>
  );
}
