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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 font-inter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
          CONTACT
        </h1>
        <div className="flex items-center justify-center gap-4">
          <Image
            src="/profile-1024x985.png"
            alt="Brodie Groch headshot"
            width={80}
            height={80}
            className="rounded-full shadow-lg border-4 border-white dark:border-gray-800 object-cover"
          />
          <div className="text-left">
            <p className="text-2xl font-bold font-inter text-gray-900 dark:text-white">
              Brodie Groch
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 font-inter">
              Mechanical-Ops Systems Strategist
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="space-y-12">
              {/* Direct Line Section */}
              <div>
                <h2 className="text-3xl font-bold mb-6 font-inter text-gray-900 dark:text-white">Direct Line</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <a 
                      href="mailto:brodie@brodiegroch.ca"
                      className="text-lg text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                    >
                      brodie@brodiegroch.ca
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <a 
                      href="https://linkedin.com/in/brodiegroch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                    >
                      linkedin.com/in/brodiegroch
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <a 
                      href="https://twitter.com/brodiegroch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                    >
                      @brodiegroch
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
                      Calgary • Field-deployable across Canada
                    </span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    I reply fastest to concise, well-framed problems or partnership briefs.
                  </p>
                </div>
              </div>

              {/* What I'm Open To Section */}
              <div>
                <h2 className="text-3xl font-bold mb-6 font-inter text-gray-900 dark:text-white">What I&apos;m Open To</h2>
                <ul className="list-disc pl-8 space-y-2">
                  <li>Frontier-tech ops roles (drones, wildfire resilience, advanced manufacturing)</li>
                  <li>Process-compression consulting (ERP, Lean, AI-assisted workflows)</li>
                  <li>Joint R&D or grant proposals in critical infrastructure and field robotics</li>
                  <li>Thought-level conversations with builders who value systems over slogans</li>
                </ul>
              </div>

              {/* Newsletter Section */}
              <div>
                <h2 className="text-3xl font-bold mb-6 font-inter text-gray-900 dark:text-white">Stay on My Radar</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Get a short, high-signal note when I ship a new build-log, white-paper, or tool.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
                      status === 'success'
                        ? 'bg-blue-600 text-white'
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
                
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 italic">
                  *Zero fluff. Opt-out anytime.*
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link
                href="/about"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors"
              >
                Learn More About Me
              </Link>
              <Link
                href="/essays"
                className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                Read My Content
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 