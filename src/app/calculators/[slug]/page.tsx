import { notFound } from 'next/navigation';
import { getCalculatorBySlug, calculators } from '@/lib/data/calculators';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return calculators.map((calc) => ({ slug: calc.slug }));
}

export default function CalculatorPage({ params }: { params: { slug: string } }) {
  const calculator = getCalculatorBySlug(params.slug);
  if (!calculator) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <CalculatorLayout calculator={calculator} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const calculator = getCalculatorBySlug(params.slug);
  if (!calculator) return {};
  const seo = calculator.seo || {};
  return {
    title: seo.title || calculator.name,
    description: seo.description || calculator.description,
    openGraph: {
      title: seo.title || calculator.name,
      description: seo.description || calculator.description,
    },
  };
}
