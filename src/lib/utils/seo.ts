import { Metadata } from 'next';
import { siteConfig } from '@/lib/data/siteConfig';

export function generatePageMetadata({
  title,
  description,
  canonicalUrl,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}): Metadata {
  return {
    title: title ? `${title} | ${siteConfig.title}` : siteConfig.title,
    description: description || siteConfig.description,
    alternates: {
      canonical: canonicalUrl || undefined,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      title: title || siteConfig.title,
      description: description || siteConfig.description,
      url: canonicalUrl || siteConfig.url,
    },
  };
}
