'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { essays } from '@/data/essays'

export default function EssaysPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Essays
        </h1>

        <div className="space-y-8">
          {/* Latest Essay */}
          <div className="card">
            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">Latest Essay</span>
            <h2 className="text-2xl font-bold mt-2 mb-4">
              <Link 
                href="/essays/realignment-year"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                The Realignment Year: Why 2026 Will Reshape Canadian Politics Forever
              </Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Canada&apos;s political system isn&apos;t drifting. It&apos;s repositioning — and 2026 is the breakpoint year for a full-scale ideological and structural shift.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>May 2025</span>
              <span>•</span>
              <span>6-minute read</span>
            </div>
          </div>

          {/* Previous Essay */}
          <div className="card bg-white dark:bg-gray-900">
            <h2 className="text-2xl font-bold mb-4">
              <Link 
                href="/essays/ai-behavior-doctrine"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                The Strategic Blindspot: Why Canada Needs an AI Behavior Doctrine — Now
              </Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              As AI systems become more autonomous and influential, Canada needs a comprehensive doctrine for understanding and shaping AI behavior at a national scale.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>April 2025</span>
              <span>•</span>
              <span>8-minute read</span>
            </div>
          </div>
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