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
        <div className="card">
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

              {/* Social Links with Company Logos */}
              <div className="flex gap-6 mt-6">
                <a
                  href="https://www.linkedin.com/in/brodiegroch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:opacity-80 transition-opacity"
                >
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="6" fill="#0A66C2"/>
                    <path d="M10.666 13.333h3.111v1.333h.045c.433-.82 1.492-1.687 3.073-1.687 3.29 0 3.895 2.165 3.895 4.983v5.037h-3.222v-4.47c0-1.066-.019-2.438-1.486-2.438-1.487 0-1.714 1.162-1.714 2.364v4.544h-3.222v-9.666zm-1.555-3.333a1.778 1.778 0 1 1 0-3.555 1.778 1.778 0 0 1 0 3.555zm1.611 13.333h-3.222v-9.666h3.222v9.666z" fill="#fff"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/brodiegroch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:opacity-80 transition-opacity"
                >
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="6" fill="#fff"/>
                    <radialGradient id="ig-gradient" cx="16" cy="16" r="16" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#feda75"/>
                      <stop offset="0.5" stopColor="#fa7e1e"/>
                      <stop offset="1" stopColor="#d62976"/>
                    </radialGradient>
                    <rect width="32" height="32" rx="6" fill="url(#ig-gradient)"/>
                    <path d="M16 11.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm0 7.92a3.12 3.12 0 1 1 0-6.24 3.12 3.12 0 0 1 0 6.24zm6.4-8.16a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0zm3.2 1.12c-.07-1.48-.41-2.8-1.49-3.88C23.6 7.41 22.28 7.07 20.8 7c-1.48-.07-5.92-.07-7.4 0-1.48.07-2.8.41-3.88 1.49C7.41 8.4 7.07 9.72 7 11.2c-.07 1.48-.07 5.92 0 7.4.07 1.48.41 2.8 1.49 3.88 1.08 1.08 2.4 1.42 3.88 1.49 1.48.07 5.92.07 7.4 0 1.48-.07 2.8-.41 3.88-1.49 1.08-1.08 1.42-2.4 1.49-3.88.07-1.48.07-5.92 0-7.4zm-2.88 9.04a3.36 3.36 0 0 1-1.89 1.89c-1.31.52-4.42.4-5.63.4s-4.32.12-5.63-.4a3.36 3.36 0 0 1-1.89-1.89c-.52-1.31-.4-4.42-.4-5.63s-.12-4.32.4-5.63a3.36 3.36 0 0 1 1.89-1.89c1.31-.52 4.42-.4 5.63-.4s4.32-.12 5.63.4a3.36 3.36 0 0 1 1.89 1.89c.52 1.31.4 4.42.4 5.63s.12 4.32-.4 5.63z" fill="#fff"/>
                  </svg>
                </a>
                <a
                  href="https://github.com/brodiegroch2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="hover:opacity-80 transition-opacity"
                >
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="6" fill="#181717"/>
                    <path d="M16 7.333c-4.78 0-8.667 3.887-8.667 8.667 0 3.833 2.487 7.08 5.94 8.233.433.08.593-.187.593-.413 0-.2-.007-.727-.01-1.427-2.417.527-2.927-1.167-2.927-1.167-.393-.993-.96-1.257-.96-1.257-.787-.54.06-.53.06-.53.87.06 1.327.893 1.327.893.773 1.327 2.027.943 2.52.72.08-.56.3-.943.547-1.16-1.93-.22-3.967-.967-3.967-4.307 0-.953.34-1.733.893-2.347-.09-.22-.387-1.1.087-2.293 0 0 .727-.233 2.387.893.693-.193 1.44-.287 2.18-.29.74.003 1.487.097 2.18.29 1.66-1.127 2.387-.893 2.387-.893.473 1.193.177 2.073.087 2.293.553.613.893 1.393.893 2.347 0 3.347-2.04 4.083-3.98 4.3.307.267.58.793.58 1.6 0 1.157-.01 2.09-.01 2.377 0 .227.16.497.6.413C22.18 23.08 24.667 19.833 24.667 16c0-4.78-3.887-8.667-8.667-8.667z" fill="#fff"/>
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@brodiegroch"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="hover:opacity-80 transition-opacity"
                >
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="6" fill="#000"/>
                    <path d="M22.667 13.333c-1.84 0-3.333-1.493-3.333-3.333V8h-2.667v12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .36.02.533.06v-2.08A4.013 4.013 0 0 0 14 15.333c-2.207 0-4 1.793-4 4s1.793 4 4 4 4-1.793 4-4v-5.333c.8.533 1.76.866 2.667.866v-1.533z" fill="#fff"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Email Capture Card */}
            <div className="mt-16">
              <div className="max-w-md mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Get notified when I publish new content or launch strategic projects.
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

            <div className="mt-12 flex gap-4 justify-center">
              <Link
                href="/about"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Learn More About Me
              </Link>
              <Link
                href="/content"
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                Read My Content
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 