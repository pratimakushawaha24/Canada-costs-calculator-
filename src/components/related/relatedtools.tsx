import Link from 'next/link';
import { getCalculatorBySlug } from '@/lib/data/calculators';

export default function RelatedTools({ calculatorSlugs, title }: { calculatorSlugs: string[]; title?: string }) {
  const calculators = calculatorSlugs.map((slug) => getCalculatorBySlug(slug)).filter(Boolean);
  if (calculators.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold text-lg mb-2">{title || 'Related Calculators'}</h3>
      <ul className="space-y-1">
        {calculators.map((calc) => (
          <li key={calc.slug}>
            <Link href={`/calculators/${calc.slug}`} className="text-blue-600 hover:underline">
              {calc.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
