'use client'
import React from 'react'
import Image from 'next/image'

export default function FutureOfAIPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Cover Image */}
        <div className="relative w-full h-[400px] mb-12 rounded-lg overflow-hidden">
          <Image
            src="/essay-cover.svg"
            alt="Essay Cover"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Essay Content */}
        <article className="prose prose-lg max-w-none dark:prose-invert">
          <h1 className="text-4xl font-bold mb-8">The Future of Artificial Intelligence</h1>
          
          <p className="mb-4">
            Artificial Intelligence (AI) has rapidly evolved from a theoretical concept to a transformative force in our daily lives. 
            This essay explores the current state of AI, its potential future developments, and the implications for society.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Current State of AI</h2>
          <p className="mb-4">
            Today's AI systems demonstrate remarkable capabilities in pattern recognition, natural language processing, and decision-making. 
            Machine learning algorithms power everything from recommendation systems to autonomous vehicles, while deep learning has 
            revolutionized fields like computer vision and natural language understanding.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Future Developments</h2>
          <p className="mb-4">
            The future of AI promises even more sophisticated systems capable of general intelligence. We're moving toward AI that can 
            understand context, reason abstractly, and learn from minimal examples. Quantum computing and neuromorphic computing may 
            further accelerate AI development, enabling more efficient and powerful systems.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Societal Implications</h2>
          <p className="mb-4">
            The rise of AI brings both opportunities and challenges. While AI can enhance productivity, improve healthcare, and solve 
            complex problems, it also raises concerns about job displacement, privacy, and ethical decision-making. Society must 
            carefully navigate these issues to ensure AI benefits all of humanity.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Conclusion</h2>
          <p className="mb-4">
            The future of AI is both exciting and uncertain. As we continue to develop more advanced AI systems, we must maintain a 
            focus on ethical considerations, human oversight, and equitable distribution of benefits. The choices we make today will 
            shape how AI evolves and impacts our future.
          </p>
        </article>
      </div>
    </main>
  )
} 