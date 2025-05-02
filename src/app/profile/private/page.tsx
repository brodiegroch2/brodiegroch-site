'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PrivateProfilePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authorized
    const isAuthorized = sessionStorage.getItem('profileAuthorized');
    if (!isAuthorized) {
      router.push('/profile');
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="card">
          <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Private Profile
          </h1>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-xl mb-6">
              Welcome to your private profile area.
            </p>
            {/* Add your private profile content here */}
          </div>
        </div>
      </div>
    </main>
  );
} 