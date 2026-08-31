import { ServiceDefinition } from '@/lib/types';

export const services: ServiceDefinition[] = [
  {
    slug: 'plumber',
    name: 'Plumber Cost',
    category: 'home',
    description: 'Cost to hire a plumber for common repairs and installations in Canada.',
    averageCostRange: { min: 150, max: 500, currency: 'CAD' },
    factors: ['Hourly rate', 'Parts/materials', 'Emergency call', 'Location'],
    tips: ['Get multiple quotes', 'Ask for flat rate vs. hourly'],
    faqs: [
      { question: 'How much does a plumber cost per hour?', answer: 'Typically $100-$200 CAD per hour.' },
    ],
    relatedCalculators: ['emergency-plumber', 'renovation-cost'],
    relatedCities: ['toronto', 'vancouver', 'calgary'],
    seo: {
      title: 'Plumber Cost in Canada – Average Prices & Factors',
      description: 'Learn about plumber costs, hourly rates, and what affects pricing.',
    },
  },
  {
    slug: 'house-cleaning',
    name: 'House Cleaning Cost',
    category: 'home',
    description: 'Average cost of professional house cleaning services across Canada.',
    averageCostRange: { min: 80, max: 200, currency: 'CAD' },
    factors: ['Size of home', 'Frequency', 'Deep cleaning vs. standard'],
    tips: ['Book regular cleanings for discounts', 'Provide supplies or not'],
    faqs: [
      { question: 'How much is a cleaning service per hour?', answer: 'Between $25 and $45 per hour.' },
    ],
    relatedCalculators: ['carpet-cleaning', 'window-cleaning'],
    relatedCities: ['toronto', 'ottawa'],
    seo: { title: 'House Cleaning Cost Canada' },
  },
  {
    slug: 'junk-removal',
    name: 'Junk Removal Cost',
    category: 'home',
    description: 'Cost to remove junk, furniture, and debris in Canadian cities.',
    averageCostRange: { min: 100, max: 600, currency: 'CAD' },
    factors: ['Volume of junk', 'Type of materials', 'Accessibility'],
    tips: ['Sort recyclables separately', 'Ask about disposal fees'],
    faqs: [
      { question: 'What is the average cost of junk removal?', answer: 'Ranges from $100 to $600 depending on volume.' },
    ],
    relatedCalculators: ['renovation-cost'],
    relatedCities: ['calgary', 'edmonton'],
    seo: { title: 'Junk Removal Cost Canada' },
  },
  // ... more services
];

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return services.find((s) => s.slug === slug);
}
