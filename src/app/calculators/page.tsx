import { calculators } from '@/lib/data/calculators';
import CalculatorGrid from '@/components/calculator/CalculatorGrid';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Canada Cost Calculators | Salary, Tax, Mortgage & More',
  description: 'Browse our complete collection of free calculators for Canadian salaries, taxes, home costs, moving, and more.',
};

export default function CalculatorsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Calculators', href: '/calculators' }]} />
      <h1 className="text-3xl font-bold mb-6">All Calculators</h1>
      <CalculatorGrid calculators={calculators} />
    </div>
  );
}
