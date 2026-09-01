import { CityDefinition } from '@/lib/types';

export const cities: CityDefinition[] = [
  {
    slug: 'toronto',
    name: 'Toronto',
    province: 'Ontario',
    description: 'Toronto is the largest city in Canada with a high cost of living.',
    population: 2930000,
    costOfLivingIndex: 78,
    popularServices: ['plumber', 'house-cleaning', 'junk-removal', 'snow-removal'],
    featuredCalculators: ['salary-after-tax', 'mortgage', 'gst-hst'],
    seo: { title: 'Toronto Cost of Living & Service Costs' },
  },
  {
    slug: 'vancouver',
    name: 'Vancouver',
    province: 'British Columbia',
    description: 'Vancouver is known for high housing and service costs.',
    population: 675000,
    costOfLivingIndex: 88,
    popularServices: ['plumber', 'house-cleaning', 'roofing'],
    featuredCalculators: ['salary-after-tax', 'mortgage'],
    seo: { title: 'Vancouver Service Costs & Calculators' },
  },
  {
    slug: 'calgary',
    name: 'Calgary',
    province: 'Alberta',
    description: 'Calgary offers a lower cost of living compared to Vancouver and Toronto.',
    population: 1300000,
    costOfLivingIndex: 62,
    popularServices: ['plumber', 'junk-removal', 'snow-removal', 'lawn-care'],
    featuredCalculators: ['salary-after-tax', 'moving-cost'],
    seo: { title: 'Calgary Cost of Living & Service Prices' },
  },
  // ... more cities
];

export function getCityBySlug(slug: string): CityDefinition | undefined {
  return cities.find((c) => c.slug === slug);
  }
