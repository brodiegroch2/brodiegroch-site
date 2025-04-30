'use client'

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 font-inter">
            Strategic Systems Thinking for a Disrupted World
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-source-serif">
            I&apos;m Brodie Groch — a Canadian strategist exploring the intersection of technology, national security, and political transformation.
          </p>
          <div className="flex gap-4">
            <Link
              href="/essays"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Read my latest essay
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              Learn more about me
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 font-inter">Featured Work</h2>
          <div className="grid gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2 font-inter">📘 Canada&apos;s Strategic AI Dilemma</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 font-source-serif">
                A deep dive into Canada&apos;s position in the global AI landscape and strategic recommendations for national security.
              </p>
              <Link
                href="/essays/ai-behavior-doctrine"
                className="text-blue-600 dark:text-blue-400 hover:underline font-inter"
              >
                Read Essay →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
