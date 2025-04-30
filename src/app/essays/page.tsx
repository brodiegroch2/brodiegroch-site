'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { essays } from '@/data/essays'

export default function EssaysPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Essays</h1>
        
        <div className="grid gap-8">
          {essays.map((essay) => (
            <Link
              key={essay.slug}
              href={`/essays/${essay.slug}`}
              className="group block"
            >
              <div className="flex flex-col md:flex-row gap-6 p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="relative w-full md:w-48 h-32">
                  <Image
                    src={essay.coverImage}
                    alt={essay.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {essay.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{essay.description}</p>
                  <div className="text-sm text-gray-500">
                    {new Date(essay.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
} 