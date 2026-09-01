import { notFound } from 'next/navigation';
import { cities, getCityBySlug } from '@/lib/data/cities';
import { services, getServiceBySlug } from '@/lib/data/services';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ServiceCostDisplay from '@/components/service/ServiceCostDisplay';
import FAQSection from '@/components/faq/FAQSection';
import RelatedTools from '@/components/related/RelatedTools';
import RelatedArticles from '@/components/related/RelatedArticles';
import DisclaimerBox from '@/components/common/DisclaimerBox';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const params: { city: string; service: string }[] = [];
  cities.forEach((city) => {
    if (city.popularServices) {
      city.popularServices.forEach((serviceSlug) => {
        params.push({ city: city.slug, service: serviceSlug });
      });
    }
  });
  return params;
}

export default function CityServicePage({ params }: { params: { city: string; service: string } }) {
  const city = getCityBySlug(params.city);
  const service = getServiceBySlug(params.service);
  if (!city || !service) notFound();

  const title = `${service.name} in ${city.name}`;
  const description = `Average costs and factors for ${service.name} in ${city.name}, ${city.province}.`;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Service Costs', href: '/service-costs' },
          { label: service.name, href: `/service-costs/${service.slug}` },
          { label: city.name, href: `/cities/${city.slug}` },
          { label: `${service.name} in ${city.name}`, href: `/${city.slug}/${service.slug}` },
        ]}
      />

      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 mb-6">{description}</p>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Estimated Costs</h2>
        <ServiceCostDisplay service={service} city={city} />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Cost Factors</h2>
        <ul className="list-disc list-inside space-y-1">
          {service.factors.map((factor) => (
            <li key={factor}>{factor}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          {service.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <FAQSection faqs={service.faqs} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <RelatedTools calculatorSlugs={service.relatedCalculators || []} title="Related Calculators" />
        <RelatedArticles guideSlugs={service.relatedCalculators || []} />
      </div>

      <DisclaimerBox />
    </div>
  );
}

export async function generateMetadata({ params }: { params: { city: string; service: string } }): Promise<Metadata> {
  const city = getCityBySlug(params.city);
  const service = getServiceBySlug(params.service);
  if (!city || !service) return {};
  return {
    title: `${service.name} in ${city.name} – Cost Guide`,
    description: `Find average ${service.name} costs in ${city.name}, plus factors and tips.`,
  };
}
