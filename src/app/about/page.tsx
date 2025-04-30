'use client'

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Who I Am
        </h1>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-xl mb-6">
            I&apos;m a 23-year-old strategic generalist based in Calgary, Alberta.
          </p>

          <p className="mb-6">
            I hold a Bachelors in Management from UBCO and am currently pursuing a Mechanical Engineering Technology diploma at SAIT (Fall 2025). I co-own GOAT Distributors Inc., but my long-term mission is deeper: to build and operate national-scale systems that shape the future of Canada and beyond.
          </p>

          <p className="mb-6">
            My background blends management, engineering, political analysis, and AI systems thinking — giving me an edge in chaotic environments where pattern recognition and execution speed matter most.
          </p>

          <p className="mb-6">
            I&apos;m especially drawn to domains where failure has real consequences:
          </p>

          <ul className="list-disc pl-8 mb-8">
            <li>Political operations</li>
            <li>AI risk + national security</li>
            <li>Strategic innovation systems</li>
          </ul>

          <p className="mb-8">
            This site is my open lab — follow along or reach out.
          </p>

          <div className="flex gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/essays"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              Read My Essays
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 