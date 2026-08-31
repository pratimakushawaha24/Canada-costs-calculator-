'use client';

import { useEffect, useState } from 'react';

export default function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    // Simple parser – extract h2/h3 from HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headers = doc.querySelectorAll('h2, h3');
    const items = Array.from(headers).map((el) => ({
      id: el.id || el.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
      text: el.textContent || '',
      level: parseInt(el.tagName.charAt(1)),
    }));
    setHeadings(items);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-gray-50 p-4 rounded mb-6">
      <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
      <ul className="space-y-1 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} style={{ marginLeft: (heading.level - 2) * 16 + 'px' }}>
            <a href={`#${heading.id}`} className="text-blue-600 hover:underline">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
