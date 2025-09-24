'use client'

import PasswordProtection from '@/components/PasswordProtection';

export default function Home() {
  return (
    <PasswordProtection>
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Brodie Groch's Site
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            This site is currently under construction.
          </p>
        </div>
      </div>
    </PasswordProtection>
  );
}
