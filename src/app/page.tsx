import Link from 'next/link';
import { calculators } from '@/lib/data/calculators';
import { services } from '@/lib/data/services';
import { cities } from '@/lib/data/cities';
import { guides } from '@/lib/data/guides';
import CalculatorCard from '@/components/calculator/CalculatorCard';
import ServiceCard from '@/components/service/ServiceCard';
import CityCard from '@/components/city/CityCard';
import ArticleCard from '@/components/guide/ArticleCard';
import SearchBar from '@/components/common/SearchBar';
import FAQSection from '@/components/faq/FAQSection';

export default function HomePage() {
  // Show first 6 calculators, 4 services, 4 cities, 3 guides
  const featuredCalculators = calculators.slice(0, 6);
  const featuredServices = services.slice(0, 4);
  const featuredCities = cities.slice(0, 4);
  const latestGuides = guides.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Canada Cost & Service Calculators
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Calculate salaries, taxes, home service costs, moving expenses, mortgage payments and more across Canada.
          </p>
          <div className="max-w-md mx-auto">
            <SearchBar placeholder="Search a calculator or service..." />
          </div>
        </div>
      </section>

      {/* Featured Calculators */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Popular Calculators</h2>
            <Link href="/calculators" className="text-blue-600 hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCalculators.map((calc) => (
              <CalculatorCard key={calc.slug} calculator={calc} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Popular Service Costs</h2>
            <Link href="/service-costs" className="text-blue-600 hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Popular Canadian Cities</h2>
            <Link href="/cities" className="text-blue-600 hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCities.map((city) => (
              <CityCard key={city.slug} city={city} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Guides */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Latest Guides</h2>
            <Link href="/guides" className="text-blue-600 hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestGuides.map((guide) => (
              <ArticleCard key={guide.slug} article={guide} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <FAQSection
            faqs={[
              {
                question: 'What is the best calculator for salary after tax?',
                answer: 'Our Salary After Tax Calculator provides an estimate based on your province and income.',
              },
              {
                question: 'Are these service costs accurate?',
                answer: 'They are estimates. Actual costs may vary by location and provider.',
              },
            ]}
          />
        </div>
      </section>

      {/* Disclaimer */}
      <div className="container mx-auto px-4 py-6 text-sm text-gray-500 border-t">
        <DisclaimerBox />
      </div>
    </>
  );
}
