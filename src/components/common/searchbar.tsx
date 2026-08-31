'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { search, SearchResultItem } from '@/lib/utils/search';

interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({ placeholder = 'Search calculators, services, cities...' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 1) {
      setResults(search(query));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: SearchResultItem) => {
    router.push(item.url);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md" ref={ref}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:border-blue-500 focus:outline-none"
      />
      {isOpen && results.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg max-h-60 overflow-auto">
          {results.map((item) => (
            <li
              key={`${item.type}-${item.slug}`}
              onClick={() => handleSelect(item)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-500">{item.description?.slice(0, 80)}...</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
