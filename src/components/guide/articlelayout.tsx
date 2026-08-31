import { GuideArticle } from '@/lib/types';
import TableOfContents from './TableOfContents';
import FAQSection from '@/components/faq/FAQSection';
import RelatedTools from '@/components/related/RelatedTools';
import RelatedArticles from '@/components/related/RelatedArticles';
import ShareButtons from '@/components/common/ShareButtons';
import DisclaimerBox from '@/components/common/DisclaimerBox';

export default function ArticleLayout({ article }: { article: GuideArticle }) {
  return (
    <article className="bg-white rounded-lg shadow p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <div className="text-sm text-gray-500 mb-4">
        By {article.author} · {article.publishDate} {article.updatedDate && `(Updated ${article.updatedDate})`}
      </div>

      {/* Table of Contents */}
      <TableOfContents content={article.content} />

      {/* Main Content */}
      <div
        className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* FAQ */}
      {article.faqs && article.faqs.length > 0 && (
        <div className="mt-8">
          <FAQSection faqs={article.faqs} />
        </div>
      )}

      {/* Related */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {article.relatedCalculators && (
          <RelatedTools calculatorSlugs={article.relatedCalculators} title="Related Calculators" />
        )}
        {article.relatedGuides && (
          <RelatedArticles guideSlugs={article.relatedGuides} />
        )}
      </div>

      <div className="mt-8">
        <ShareButtons title={article.title} url={`/guides/${article.slug}`} />
      </div>

      <div className="mt-8">
        <DisclaimerBox />
      </div>
    </article>
  );
}
