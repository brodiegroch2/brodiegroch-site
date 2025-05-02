'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { essays } from '@/data/essays'

export default function EssaysPage() {
  // Sort essays by date in descending order
  const sortedEssays = [...essays].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Essays
        </h1>

        <div className="space-y-8">
          {sortedEssays.map((essay, index) => (
            <div key={essay.slug} className={`card ${index === 0 ? '' : 'bg-white dark:bg-gray-900'}`}>
              {index === 0 && (
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">Latest Essay</span>
              )}
              <h2 className={`text-2xl font-bold ${index === 0 ? 'mt-2' : ''} mb-4`}>
                <Link 
                  href={`/essays/${essay.slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {essay.title}
                </Link>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {essay.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>{new Date(essay.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                <span>•</span>
                <span>{index === 0 ? '7' : '8'}-minute read</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex gap-4 justify-center">
          <Link
            href="/about"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            About Me
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </main>
  )
} 