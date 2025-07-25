"use client";
import { primeCollapseSolids } from '@/data/prime-collapse-solids';
import ReactMarkdown from 'react-markdown';

export default function PrimeCollapseSolids() {
  const { title, content } = primeCollapseSolids;
  return (
    <article className="prose dark:prose-invert max-w-4xl mx-auto px-4 py-12">
      <h1>{title}</h1>
      <h2>Abstract</h2>
      <p>{content.introduction}</p>
      {content.sections.map((section, idx) => (
        <section key={idx}>
          <h2>{section.title}</h2>
          <ReactMarkdown>{section.content}</ReactMarkdown>
        </section>
      ))}
    </article>
  );
} 