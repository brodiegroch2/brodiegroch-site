'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { essays } from '@/data/essays'

export default function ContentPage() {
  // Sort essays by date in descending order
  const sortedEssays = [...essays].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 font-inter text-center">
          Content
        </h1>
        <div className="grid gap-8 max-w-4xl mx-auto">
          {sortedEssays.map((essay, index) => (
            <div key={index} className="card">
              <h2 className="text-2xl font-bold mb-2 font-inter">{essay.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 font-source-serif">
                {essay.description}
              </p>
              <Link
                href={`/essays/${essay.slug}`}
                className="text-blue-600 dark:text-blue-400 hover:underline font-inter font-semibold"
              >
                Read Content →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 