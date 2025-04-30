'use client';

import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Reach Out
        </h1>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-xl mb-8">
            I&apos;m always open to opportunities, interesting questions, or collaboration with serious builders and thinkers.
          </p>

          <div className="space-y-6">
            <p className="text-lg font-medium">You can contact me directly:</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📩</span>
                <a 
                  href="mailto:brodie@brodiegroch.ca"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  brodie@brodiegroch.ca
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl">🐦</span>
                <a 
                  href="https://twitter.com/brodiegroch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  @brodiegroch
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl">💼</span>
                <a 
                  href="https://linkedin.com/in/brodiegroch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-4">
            <Link
              href="/about"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Learn More About Me
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