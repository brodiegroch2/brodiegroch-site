'use client'

// Home page component - displays latest work and hero section - refreshed deployment
import Link from "next/link";
import { essays } from '@/data/essays';

export default function Home() {
  // Get the latest essay
  const latestEssay = [...essays].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 font-inter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
          Strategic Systems Thinking for a Disrupted World
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 font-source-serif max-w-2xl">
          I&apos;m Brodie Groch — a Canadian strategist exploring the intersection of technology, national security, and political transformation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/essays"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors"
          >
            Read my latest content
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            Learn more about me
          </Link>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 font-inter text-center">Latest Work</h2>
          <div className="grid gap-8">
            <div className="card">
              <h3 className="text-xl font-bold mb-2 font-inter">📘 {latestEssay.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 font-source-serif">
                {latestEssay.description}
              </p>
              <Link
                href={`/essays/${latestEssay.slug}`}
                className="text-blue-600 dark:text-blue-400 hover:underline font-inter font-semibold"
              >
                Read Content →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
