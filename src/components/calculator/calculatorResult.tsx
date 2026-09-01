import { CalculatorResult } from '@/lib/types';

export default function CalculatorResultDisplay({ result }: { result: CalculatorResult }) {
  return (
    <div className="mt-6 border-t pt-4">
      <h2 className="text-xl font-semibold mb-2">Result</h2>
      <div className="text-2xl font-bold text-blue-700">{result.formatted}</div>
      <p className="text-sm text-gray-600 mt-1">{result.description}</p>
      {result.breakdown && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(result.breakdown).map(([key, val]) => (
            <div key={key} className="bg-gray-50 p-3 rounded">
              <span className="text-gray-500 text-sm">{val.label}</span>
              <div className="font-semibold">${val.value.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
