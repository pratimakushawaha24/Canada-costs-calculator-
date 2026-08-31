import { MetadataRoute } from 'next';
import { calculators } from '@/lib/data/calculators';
import { services } from '@/lib/data/services';
import { cities } from '@/lib/data/cities';
import { guides } from '@/lib/data/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.canadacostcalculator.com';

  // Static pages
  const staticPages = [
    '',
    '/calculators',
    '/service-costs',
    '/cities',
    '/guides',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  // Dynamic pages
  const calculatorPages = calculators.map((calc) => ({
    url: `${baseUrl}/calculators/${calc.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  const servicePages = services.map((s) => ({
    url: `${baseUrl}/service-costs/${s.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  const cityPages = cities.map((c) => ({
    url: `${baseUrl}/cities/${c.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  const guidePages = guides.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  // City+Service pages (only those with data)
  // We'll generate combinations from cities' popularServices
  const cityServicePages: MetadataRoute.Sitemap = [];
  cities.forEach((city) => {
    if (city.popularServices) {
      city.popularServices.forEach((serviceSlug) => {
        cityServicePages.push({
          url: `${baseUrl}/${city.slug}/${serviceSlug}`,
          lastModified: new Date().toISOString().split('T')[0],
        });
      });
    }
  });

  return [
    ...staticPages,
    ...calculatorPages,
    ...servicePages,
    ...cityPages,
    ...guidePages,
    ...cityServicePages,
  ];
}
