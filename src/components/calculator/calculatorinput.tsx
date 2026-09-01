'use client';

import { useState } from 'react';
import { CalculatorInputField } from '@/lib/types';

export default function CalculatorInput({
  fields,
  onCalculate,
}: {
  fields: CalculatorInputField[];
  onCalculate: (inputs: Record<string, number>) => void;
}) {
  const [values, setValues] = useState<Record<string, number | string>>(
    fields.reduce((acc, field) => {
      acc[field.id] = field.defaultValue !== undefined ? field.defaultValue : '';
      return acc;
    }, {} as Record<string, number | string>)
  );

  const handleChange = (id: string, value: string | number) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericValues: Record<string, number> = {};
    let hasError = false;
    for (const field of fields) {
      const val = values[field.id];
      if (field.required && (val === '' || val === undefined)) {
        hasError = true;
        alert(`${field.label} is required.`);
        return;
      }
      const num = typeof val === 'string' ? parseFloat(val) : val;
      if (isNaN(num) && field.type !== 'select') {
        hasError = true;
        alert(`${field.label} must be a valid number.`);
        return;
      }
      if (field.validation && field.validation(num)) {
        hasError = true;
        alert(field.validation(num));
        return;
      }
      numericValues[field.id] = num;
    }
    if (!hasError) {
      onCalculate(numericValues);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          {field.type === 'select' ? (
            <select
              id={field.id}
              value={values[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              required={field.required}
            >
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="number"
              id={field.id}
              value={values[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.valueAsNumber)}
              placeholder={field.placeholder}
              min={field.min}
              max={field.max}
              step={field.step}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              required={field.required}
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
      >
        Calculate
      </button>
    </form>
  );
}
