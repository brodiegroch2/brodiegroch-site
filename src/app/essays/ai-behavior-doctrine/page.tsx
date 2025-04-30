'use client'
import React from 'react'
import Image from 'next/image'
import { essays } from '@/data/essays'

export default function AIBehaviorDoctrinePage() {
  const essay = essays.find(e => e.slug === 'ai-behavior-doctrine')

  if (!essay) {
    return <div>Essay not found</div>
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Cover Image */}
        <div className="relative w-full h-[400px] mb-12 rounded-lg overflow-hidden">
          <Image
            src={essay.coverImage}
            alt={essay.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Essay Content */}
        <article className="prose prose-lg max-w-none dark:prose-invert">
          <h1 className="text-4xl font-bold mb-4">{essay.title}</h1>
          
          <div className="text-gray-600 dark:text-gray-400 mb-8">
            By Brodie Groch | May 2025 | 6-minute read
          </div>

          <div className="border-l-4 border-blue-500 pl-4 my-8 italic">
            {essay.content.introduction}
          </div>

          {essay.content.sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-2xl font-semibold mt-8 mb-4">{section.title}</h2>
              <div className="prose dark:prose-invert">
                {section.content.split('\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8">
            <p className="text-gray-600 dark:text-gray-400">
              📬 Want to collaborate, challenge this, or build something? Reach me at brodie@brodiegroch.ca or follow the next pieces at brodiegroch.ca
            </p>
          </div>
        </article>
      </div>
    </main>
  )
} 