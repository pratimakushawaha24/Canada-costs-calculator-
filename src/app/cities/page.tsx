import { cities } from '@/lib/data/cities';
import CityCard from '@/components/city/CityCard';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Canadian Cities Cost of Living & Service Prices',
  description: 'Compare cost of living and service prices across major Canadian cities like Toronto, Vancouver, Calgary, and more.',
};

export default function CitiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cities', href: '/cities' }]} />
      <h1 className="text-3xl font-bold mb-6">Canadian Cities</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city) => (
          <CityCard key={city.slug} city={city} />
        ))}
      </div>
    </div>
  );
}
