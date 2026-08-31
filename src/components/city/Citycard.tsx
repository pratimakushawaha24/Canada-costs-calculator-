import Link from 'next/link';
import { CityDefinition } from '@/lib/types';

export default function CityCard({ city }: { city: CityDefinition }) {
  return (
    <Link href={`/cities/${city.slug}`} className="block bg-white rounded-lg shadow hover:shadow-md transition p-4 border border-gray-100">
      <h3 className="font-semibold text-lg text-purple-700">{city.name}</h3>
      <p className="text-gray-600 text-sm">{city.province}</p>
      {city.costOfLivingIndex && (
        <span className="inline-block mt-2 text-xs bg-gray-200 px-2 py-0.5 rounded">Cost Index: {city.costOfLivingIndex}</span>
      )}
    </Link>
  );
}
