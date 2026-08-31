import { GuideArticle } from '@/lib/types';

export const guides: GuideArticle[] = [
  {
    slug: 'calgary-plumber-cost',
    title: 'Plumber Cost in Calgary – 2025 Guide',
    excerpt: 'Find out how much plumbers charge in Calgary, including hourly rates and common repairs.',
    content: '<p>Plumber costs in Calgary vary depending on...</p>',
    author: 'Cost Calculator Team',
    publishDate: '2025-01-15',
    updatedDate: '2025-02-20',
    category: 'Service Costs',
    tags: ['plumber', 'Calgary', 'home repair'],
    faqs: [
      { question: 'What is the average plumber cost in Calgary?', answer: 'Around $150-$300 per hour.' },
    ],
    relatedCalculators: ['plumber', 'renovation-cost'],
    relatedGuides: ['toronto-plumber-cost'],
    relatedCities: ['calgary'],
    seo: {
      title: 'Plumber Cost in Calgary – 2025 Price Guide',
      description: 'Detailed breakdown of plumber costs in Calgary, including emergency fees.',
    },
  },
  {
    slug: 'toronto-house-cleaning-cost',
    title: 'House Cleaning Cost in Toronto – 2025 Update',
    excerpt: 'Average prices for house cleaning services in Toronto, per hour and per visit.',
    content: '<p>In Toronto, house cleaning rates vary...</p>',
    author: 'Cost Calculator Team',
    publishDate: '2025-01-20',
    category: 'Service Costs',
    tags: ['cleaning', 'Toronto', 'house'],
    faqs: [
      { question: 'How much does house cleaning cost in Toronto?', answer: 'Typically $25-$40 per hour.' },
    ],
    relatedCalculators: ['house-cleaning', 'carpet-cleaning'],
    relatedGuides: ['calgary-plumber-cost'],
    relatedCities: ['toronto'],
    seo: {
      title: 'House Cleaning Cost in Toronto – 2025 Guide',
      description: 'Get the latest rates for house cleaning in Toronto.',
    },
  },
];

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return guides.find((g) => g.slug === slug);
}
