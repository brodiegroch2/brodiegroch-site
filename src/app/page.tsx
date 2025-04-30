'use client'

import React from 'react';
import Image from 'next/image'
import Link from 'next/link'

export default function Home(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Brodie Groch</h1>
          <p className="text-xl text-gray-600">Software Engineer & Writer</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Link href="/essays" className="group">
            <div className="p-6 border rounded-lg hover:border-gray-300 transition-colors">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600">Essays</h2>
              <p className="text-gray-600">Thoughts on technology, software development, and life.</p>
            </div>
          </Link>

          <Link href="/projects" className="group">
            <div className="p-6 border rounded-lg hover:border-gray-300 transition-colors">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600">Projects</h2>
              <p className="text-gray-600">A collection of my work and side projects.</p>
            </div>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </main>
  )
} 