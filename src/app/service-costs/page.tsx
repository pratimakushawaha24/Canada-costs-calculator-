import { services } from '@/lib/data/services';
import ServiceCard from '@/components/service/ServiceCard';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Canada Service Cost Guides | Plumber, Cleaning, Moving & More',
  description: 'Find average costs for home services across Canada. Updated prices for plumbers, cleaners, movers, and more.',
};

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Service Costs', href: '/service-costs' }]} />
      <h1 className="text-3xl font-bold mb-6">Service Cost Guides</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </div>
  );
}
