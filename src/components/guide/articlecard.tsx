import Link from 'next/link';
import { GuideArticle } from '@/lib/types';

export default function ArticleCard({ article }: { article: GuideArticle }) {
  return (
    <Link href={`/guides/${article.slug}`} className="block bg-white rounded-lg shadow hover:shadow-md transition p-4 border border-gray-100">
      <h3 className="font-semibold text-lg text-amber-700">{article.title}</h3>
      <p className="text-gray-600 text-sm mt-1">{article.excerpt}</p>
      <div className="mt-2 text-xs text-gray-400">
        {article.publishDate} · {article.author}
      </div>
    </Link>
  );
}
