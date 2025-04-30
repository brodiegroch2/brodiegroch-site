'use client';

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // TODO: Implement email capture logic
    // For now, simulate a successful submission
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

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
            <div className="flex items-center gap-4 mb-2">
              <Image
                src="/profile-1024x985.png"
                alt="Brodie Groch headshot"
                width={56}
                height={56}
                className="rounded-full shadow border-2 border-white dark:border-gray-800 object-cover"
              />
              <span className="font-semibold text-lg">Brodie Groch</span>
            </div>
            
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

          {/* Email Capture Card */}
          <div className="mt-16 p-8 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="max-w-md mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get notified when I publish new essays or launch strategic projects.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
                    status === 'success'
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : status === 'success' ? (
                    'Subscribed!'
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>
              
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                No spam. Unsubscribe anytime.
              </p>
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