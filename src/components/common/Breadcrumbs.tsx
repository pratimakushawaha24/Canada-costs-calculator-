import Link from 'next/link';
import { generateBreadcrumbSchema } from '@/lib/utils/structuredData';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schema = generateBreadcrumbSchema(items);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 py-2">
        <ol className="flex flex-wrap items-center space-x-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center">
                {!isLast ? (
                  <>
                    <Link href={item.href} className="hover:text-blue-600">
                      {item.label}
                    </Link>
                    <span className="mx-2">/</span>
                  </>
                ) : (
                  <span className="text-gray-800 font-medium">{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
