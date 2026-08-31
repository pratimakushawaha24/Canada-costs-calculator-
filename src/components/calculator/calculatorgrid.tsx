import { CalculatorDefinition } from '@/lib/types';
import CalculatorCard from './CalculatorCard';

export default function CalculatorGrid({ calculators }: { calculators: CalculatorDefinition[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {calculators.map((calc) => (
        <CalculatorCard key={calc.slug} calculator={calc} />
      ))}
    </div>
  );
}
