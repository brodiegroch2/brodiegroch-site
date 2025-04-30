'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Navigation(): React.JSX.Element {
  const pathname = usePathname();

  const isActive = (path: string): boolean => pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-800 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Brodie Groch
          </span>
        </Link>
        <div className="flex md:order-2">
          <Link
            href="/contact"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Contact Me
          </Link>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className={`block py-2 pl-3 pr-4 rounded md:p-0 ${
                  isActive('/') 
                    ? 'text-white bg-blue-700 md:text-blue-700 md:bg-transparent dark:text-white' 
                    : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className={`block py-2 pl-3 pr-4 rounded md:p-0 ${
                  isActive('/projects')
                    ? 'text-white bg-blue-700 md:text-blue-700 md:bg-transparent dark:text-white'
                    : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }`}
              >
                Projects
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
} 