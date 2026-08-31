import { notFound } from 'next/navigation';
import { getCalculatorBySlug, calculators } from '@/lib/data/calculators';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import CalculatorInput from '@/components/calculator/CalculatorInput';
import CalculatorResult from '@/components/calculator/CalculatorResult';
import FAQSection from '@/components/faq/FAQSection';
import RelatedTools from '@/components/related/RelatedTools';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import DisclaimerBox from '@/components/common/DisclaimerBox';
import { generatePageSchema } from '@/lib/utils/structuredData';
import { Metadata } from 'next';

// Generate static paths for all calculators
export async function generateStaticParams() {
  return calculators.map((calc) => ({ slug: calc.slug }));
}

// Page component
export default function CalculatorPage({ params }: { params: { slug: string } }) {
  const calculator = getCalculatorBySlug(params.slug);
  if (!calculator) notFound();

  // For client-side calculator state, we'll use a client component wrapper
  // The CalculatorLayout will be a client component that handles state.
  // We'll pass the calculator definition as props.

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: calculator.name, href: `/calculators/${calculator.slug}` },
        ]}
      />
      <CalculatorLayout calculator={calculator}>
        <CalculatorInput fields={calculator.inputFields} />
        <CalculatorResult />
        <div className="mt-8">
          <DisclaimerBox />
        </div>
        <div className="mt-12">
          <FAQSection faqs={calculator.faqs} />
        </div>
        <div className="mt-12">
          <RelatedTools
            calculatorSlugs={calculator.relatedCalculators || []}
            title="Related Calculators"
          />
        </div>
      </CalculatorLayout>
    </div>
  );
}

// Metadata generation
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const calculator = getCalculatorBySlug(params.slug);
  if (!calculator) return {};
  const seo = calculator.seo || {};
  return {
    title: seo.title || calculator.name,
    description: seo.description || calculator.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title || calculator.name,
      description: seo.description || calculator.description,
    },
  };
}
