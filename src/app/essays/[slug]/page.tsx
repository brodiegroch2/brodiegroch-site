import { notFound } from 'next/navigation';
import Image from 'next/image';
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

  const { title, coverImage, date, content } = essay as Essay;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">{title}</h1>
      {coverImage && (
        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}
      <div className="text-gray-600 mb-8">
        {new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
      <div className="prose prose-lg max-w-none">
        <p className="lead mb-8">{content.introduction}</p>

        {content.sections.map((section: { title: string; content: string }, index: number) => (
          <section key={index} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </section>
        ))}

        <p className="mt-8">{content.conclusion}</p>
      </div>
    </article>
  );
} 