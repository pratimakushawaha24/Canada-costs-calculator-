import Fuse from 'fuse.js';
import { calculators } from '@/lib/data/calculators';
import { services } from '@/lib/data/services';
import { cities } from '@/lib/data/cities';
import { guides } from '@/lib/data/guides';

export type SearchResultItem = {
  type: 'calculator' | 'service' | 'city' | 'guide';
  slug: string;
  name: string;
  description: string;
  url: string;
};

const allItems: SearchResultItem[] = [
  ...calculators.map((c) => ({
    type: 'calculator' as const,
    slug: c.slug,
    name: c.name,
    description: c.description,
    url: `/calculators/${c.slug}`,
  })),
  ...services.map((s) => ({
    type: 'service' as const,
    slug: s.slug,
    name: s.name,
    description: s.description,
    url: `/service-costs/${s.slug}`,
  })),
  ...cities.map((c) => ({
    type: 'city' as const,
    slug: c.slug,
    name: c.name,
    description: c.description,
    url: `/cities/${c.slug}`,
  })),
  ...guides.map((g) => ({
    type: 'guide' as const,
    slug: g.slug,
    name: g.title,
    description: g.excerpt,
    url: `/guides/${g.slug}`,
  })),
];

const fuse = new Fuse(allItems, {
  keys: ['name', 'description'],
  threshold: 0.3,
});

export function search(query: string): SearchResultItem[] {
  if (!query) return [];
  const results = fuse.search(query);
  return results.map((r) => r.item);
}
