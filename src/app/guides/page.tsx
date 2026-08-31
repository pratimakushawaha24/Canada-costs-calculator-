import { guides } from '@/lib/data/guides';
import ArticleCard from '@/components/guide/ArticleCard';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Canada Cost & Service Guides | Articles & Tips',
  description: 'Read our in-depth guides on Canadian service costs, calculators, and local pricing insights.',
};

export default function GuidesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }]} />
      <h1 className="text-3xl font-bold mb-6">Guides & Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <ArticleCard key={guide.slug} article={guide} />
        ))}
      </div>
    </div>
  );
}
