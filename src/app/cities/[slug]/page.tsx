import { notFound } from 'next/navigation';
import { getCityBySlug, cities } from '@/lib/data/cities';
import { getServiceBySlug } from '@/lib/data/services';
import { getGuideBySlug } from '@/lib/data/guides';
import { getCalculatorBySlug } from '@/lib/data/calculators';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ServiceCard from '@/components/service/ServiceCard';
import CalculatorCard from '@/components/calculator/CalculatorCard';
import ArticleCard from '@/components/guide/ArticleCard';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export default function CityPage({ params }: { params: { slug: string } }) {
  const city = getCityBySlug(params.slug);
  if (!city) notFound();

  // Get related services, calculators, guides
  const relatedServices = city.popularServices?.map((slug) => getServiceBySlug(slug)).filter(Boolean) || [];
  const relatedCalculators = city.featuredCalculators?.map((slug) => getCalculatorBySlug(slug)).filter(Boolean) || [];
  // Just a sample guide – we could filter by city in guides data if we had city field.
  // For now, we'll show first 2 guides.

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Cities', href: '/cities' },
          { label: city.name, href: `/cities/${city.slug}` },
        ]}
      />
      <h1 className="text-3xl font-bold mb-2">{city.name}</h1>
      <p className="text-gray-600 mb-4">{city.description}</p>
      {city.population && <p className="text-sm text-gray-500">Population: {city.population.toLocaleString()}</p>}
      {city.costOfLivingIndex && <p className="text-sm text-gray-500">Cost of Living Index: {city.costOfLivingIndex}</p>}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Popular Services in {city.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedCalculators.map((calc) => (
            <CalculatorCard key={calc.slug} calculator={calc} />
          ))}
        </div>
      </div>

      {/* We'll add a link to city-specific guides if we had data */}
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const city = getCityBySlug(params.slug);
  if (!city) return {};
  return {
    title: city.seo?.title || `${city.name} Cost of Living & Service Prices`,
    description: city.seo?.description || city.description,
  };
}
