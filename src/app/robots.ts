import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // if any API routes
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.canadacostcalculator.com'}/sitemap.xml`,
  };
}
