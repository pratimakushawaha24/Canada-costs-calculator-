import { notFound } from 'next/navigation';
import { getServiceBySlug, services } from '@/lib/data/services';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ServiceCostDisplay from '@/components/service/ServiceCostDisplay';
import FAQSection from '@/components/faq/FAQSection';
import RelatedTools from '@/components/related/RelatedTools';
import RelatedArticles from '@/components/related/RelatedArticles';
import DisclaimerBox from '@/components/common/DisclaimerBox';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Service Costs', href: '/service-costs' },
          { label: service.name, href: `/service-costs/${service.slug}` },
        ]}
      />
      <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
      <p className="text-gray-600 mb-6">{service.description}</p>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Estimated Cost Range</h2>
        <ServiceCostDisplay service={service} />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Factors Affecting Price</h2>
        <ul className="list-disc list-inside space-y-1">
          {service.factors.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Cost‑Saving Tips</h2>
        <ul className="list-disc list-inside space-y-1">
          {service.tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <FAQSection faqs={service.faqs} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {service.relatedCalculators && (
          <RelatedTools calculatorSlugs={service.relatedCalculators} title="Related Calculators" />
        )}
        {service.relatedCalculators && (
          <RelatedArticles guideSlugs={service.relatedCalculators} />
        )}
      </div>

      <DisclaimerBox />
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  const seo = service.seo || {};
  return {
    title: seo.title || `${service.name} Cost in Canada`,
    description: seo.description || service.description,
    openGraph: {
      title: seo.title || `${service.name} Cost in Canada`,
      description: seo.description || service.description,
    },
  };
    }
