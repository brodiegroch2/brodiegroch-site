import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { essays } from '@/data/essays';
import type { Essay } from '@/data/essays';

interface EssayPageProps {
  params: {
    slug: string;
  };
}

export default function EssayPage({ params }: EssayPageProps) {
  const essay: Essay | undefined = essays.find((e) => e.slug === params.slug);

  if (!essay) {
    notFound();
  }

  const { title, date, content, slug } = essay as Essay;
  // Get other essays for sidebar
  const otherEssays = essays.filter(e => e.slug !== slug).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
      {/* Main Content */}
      <article className="lg:col-span-3">
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        <div className="text-gray-600 mb-8">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed mb-8">
            <ReactMarkdown>{content.introduction}</ReactMarkdown>
          </div>
          {content.sections.map((section: { title: string; content: string }, index: number) => (
            <section key={index} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              <div className="text-gray-700 leading-relaxed">
                <ReactMarkdown>{section.content}</ReactMarkdown>
              </div>
            </section>
          ))}
          <div className="text-gray-700 leading-relaxed mt-8">
            <ReactMarkdown>{content.conclusion}</ReactMarkdown>
          </div>
        </div>
      </article>
      {/* Sidebar */}
      <aside className="lg:col-span-1 border-l border-gray-200 dark:border-gray-700 pl-6">
        <h3 className="text-lg font-semibold mb-4">Other Articles</h3>
        <ul className="space-y-4">
          {otherEssays.map(e => (
            <li key={e.slug}>
              <Link href={`/essays/${e.slug}`} className="block group">
                <span className="font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                  {e.title}
                </span>
                <br />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(e.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
} 