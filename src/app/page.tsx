'use client'

import PasswordProtection from '@/components/PasswordProtection';

export default function Home() {
  return (
    <PasswordProtection>
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Site Protected
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Content has been removed.
          </p>
        </div>
      </div>
    </PasswordProtection>
  );
}
