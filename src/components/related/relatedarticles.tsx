import Link from 'next/link';
import { getGuideBySlug } from '@/lib/data/guides';

export default function RelatedArticles({ guideSlugs }: { guideSlugs: string[] }) {
  const guides = guideSlugs.map((slug) => getGuideBySlug(slug)).filter(Boolean);
  if (guides.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold text-lg mb-2">Related Articles</h3>
      <ul className="space-y-1">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link href={`/guides/${g.slug}`} className="text-blue-600 hover:underline">
              {g.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
