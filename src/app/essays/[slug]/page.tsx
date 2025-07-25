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

  const { title, date, content, slug, tldr } = essay as Essay;
  // Get other essays for sidebar
  const otherEssays = essays.filter(e => e.slug !== slug).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Main Content */}
          <article className="lg:col-span-3">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">{title}</h1>
            <div className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
        {new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
            
            {/* TL;DR Section */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 md:p-6 mb-6 md:mb-8 rounded-r-lg">
              <h3 className="text-base md:text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">TL;DR</h3>
              <ul className="space-y-2">
                {tldr.bullets.map((bullet, index) => (
                  <li key={index} className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                    • {bullet}
                  </li>
                ))}
              </ul>
            </div>
            
      <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed mb-6 md:mb-8 text-base md:text-lg">
                <ReactMarkdown>{content.introduction}</ReactMarkdown>
              </div>
        {content.sections.map((section: { title: string; content: string }, index: number) => (
                <section key={index} className="mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">{section.title}</h2>
                  <div className="text-gray-700 leading-relaxed text-base md:text-lg">
                    <ReactMarkdown>{section.content}</ReactMarkdown>
                  </div>
          </section>
        ))}
              <div className="text-gray-700 leading-relaxed mt-6 md:mt-8 text-base md:text-lg">
                <ReactMarkdown>{content.conclusion}</ReactMarkdown>
              </div>
              
              {/* Contextual CTA */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 md:p-6 mt-6 md:mt-8 rounded-r-lg">
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-blue-900 dark:text-blue-100">
                  Interested in This Topic?
                </h3>
                <p className="text-blue-800 dark:text-blue-200 mb-4 text-sm md:text-base">
                  I write about systems thinking, policy analysis, and strategic operations. Let's discuss how these insights apply to your challenges.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <a
                    href="https://calendly.com/brodiegroch/15min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 md:px-6 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition-colors inline-flex items-center gap-2 justify-center text-sm md:text-base"
                  >
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book 15 Min Call
                  </a>
                  <Link
                    href="/contact"
                    className="px-4 md:px-6 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-center text-sm md:text-base"
                  >
                    Send Message
                  </Link>
                </div>
              </div>
            </div>
          </article>
          
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="lg:border-l lg:border-gray-200 lg:dark:border-gray-700 lg:pl-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Other Articles</h3>
              <ul className="space-y-3 md:space-y-4">
                {otherEssays.map(e => (
                  <li key={e.slug}>
                    <Link href={`/essays/${e.slug}`} className="block group">
                      <span className="font-medium text-blue-600 dark:text-blue-400 group-hover:underline text-sm md:text-base">
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
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
} 