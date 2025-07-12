'use client'
import React from 'react'
import Link from 'next/link'
import { essays } from '@/data/essays'

export default function BlogPage() {
  // Sort essays by date in descending order
  const sortedEssays = [...essays].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 font-inter text-gray-900 dark:text-white">
              Insights
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-source-serif max-w-2xl mx-auto">
              Strategic insights on technology, politics, and the systems that shape our world.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Featured Post */}
          {sortedEssays.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 font-inter text-gray-900 dark:text-white">
                Latest Post
              </h2>
              <div className="card hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <Link href={`/essays/${sortedEssays[0].slug}`} className="block">
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-inter">
                        {new Date(sortedEssays[0].date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-inter">
                        {sortedEssays[0].readTime} min read
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 font-inter text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {sortedEssays[0].title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 font-source-serif text-lg leading-relaxed">
                      {sortedEssays[0].description}
                    </p>
                    <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-inter font-semibold hover:underline">
                      Read full article →
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          )}

          {/* All Posts Grid */}
          <div>
            <h2 className="text-2xl font-bold mb-8 font-inter text-gray-900 dark:text-white">
              All Posts
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedEssays.slice(1).map((essay, index) => (
                <article key={index} className="card hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <Link href={`/essays/${essay.slug}`} className="block">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-inter">
                        {new Date(essay.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-inter">
                        {essay.readTime} min read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-inter text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {essay.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-source-serif line-clamp-3 mb-4">
                      {essay.description}
                    </p>
                    <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-inter font-semibold group-hover:underline">
                      Read more →
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-20">
            <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600">
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4 font-inter text-gray-900 dark:text-white">
                  Stay Updated
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 font-source-serif">
                  Get notified when I publish new insights on strategic thinking and systems analysis.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-inter focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-inter font-semibold rounded-lg transition-colors duration-200">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 