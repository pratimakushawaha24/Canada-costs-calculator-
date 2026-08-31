'use client';

import { useState } from 'react';
import { FAQ } from '@/lib/types';
import { generateFAQSchema } from '@/lib/utils/structuredData';

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const schema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="bg-white rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold p-4 border-b">Frequently Asked Questions</h2>
        <div className="divide-y">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex justify-between w-full text-left font-medium text-gray-900 hover:text-blue-600"
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <span>{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="mt-2 text-gray-700 prose prose-sm max-w-none">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
          }
