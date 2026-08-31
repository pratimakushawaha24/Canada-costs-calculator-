import Link from 'next/link';
import { CalculatorDefinition } from '@/lib/types';

export default function CalculatorCard({ calculator }: { calculator: CalculatorDefinition }) {
  return (
    <Link href={`/calculators/${calculator.slug}`} className="block bg-white rounded-lg shadow hover:shadow-md transition p-4 border border-gray-100">
      <h3 className="font-semibold text-lg text-blue-700">{calculator.name}</h3>
      <p className="text-gray-600 text-sm mt-1">{calculator.description}</p>
      <span className="inline-block mt-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
        {calculator.category}
      </span>
    </Link>
  );
}
