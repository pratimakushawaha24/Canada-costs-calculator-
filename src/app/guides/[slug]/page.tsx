import { notFound } from 'next/navigation';
import { getGuideBySlug, guides } from '@/lib/data/guides';
import ArticleLayout from '@/components/guide/ArticleLayout';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: guide.title, href: `/guides/${guide.slug}` },
        ]}
      />
      <ArticleLayout article={guide} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return {};
  const seo = guide.seo || {};
  return {
    title: seo.title || guide.title,
    description: seo.description || guide.excerpt,
    openGraph: {
      title: seo.title || guide.title,
      description: seo.description || guide.excerpt,
    },
  };
}
