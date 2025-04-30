'use client'

import Link from "next/link";

export default function NowPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          What I&apos;m Doing Now
        </h1>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-xl mb-6">
            Inspired by Derek Sivers&apos; /now movement, this page gives visitors a pulse on what I&apos;m focused on this month.
          </p>

          <p className="mb-6">
            Current version (May 2025):
          </p>

          <ul className="list-disc pl-8 mb-8 space-y-4">
            <li>Writing first public strategic essay (AI & defense)</li>
            <li>Planning first civic systems project (Calgary-based)</li>
            <li>Building brodiegroch.ca (this site!)</li>
            <li>Exploring internships in defense, strategy, or political ops</li>
            <li>Studying advanced system dynamics and strategic planning</li>
          </ul>

          <p className="mb-8">
            Last updated: May 2025
          </p>

          <div className="flex gap-4 justify-center">
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