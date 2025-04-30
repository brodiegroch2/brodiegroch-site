<<<<<<< HEAD
import React from 'react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Brodie Groch',
  description: 'Personal website of Brodie Groch',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/" className="text-xl font-bold text-gray-900">
                    Brodie Groch
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    href="/essays"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Essays
                  </Link>
                  <Link
                    href="/projects"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Projects
                  </Link>
                  <Link
                    href="/contact"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Contact
                  </Link>
                </div>
=======
import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  title: "Brodie Groch - Strategic Systems Thinking",
  description: "Strategic systems thinking for a disrupted world. Exploring technology, national security, and political transformation.",
  keywords: ["strategic thinking", "systems thinking", "national security", "AI", "political transformation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${sourceSerif.variable} antialiased min-h-screen bg-white dark:bg-gray-900`}>
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="font-bold text-lg">
                Brodie Groch
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Home
                </Link>
                <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  About
                </Link>
                <Link href="/essays" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Essays
                </Link>
                <Link href="/projects" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Projects
                </Link>
                <Link href="/now" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Now
                </Link>
                <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Contact
                </Link>
>>>>>>> 20f8fbd99acaf6cea6600c9d722c1de033b7b743
              </div>
            </div>
          </div>
        </nav>
<<<<<<< HEAD
        <main>{children}</main>
      </body>
    </html>
  )
} 
=======

        {/* Main Content */}
        <main className="pt-16">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-600 dark:text-gray-300 text-sm mb-4 md:mb-0">
                © 2025 Brodie Groch. All rights reserved.
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm mb-4 md:mb-0">
                Built with systems thinking.
              </div>
              <div className="flex space-x-6">
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Home
                </Link>
                <Link href="/essays" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Essays
                </Link>
                <Link href="/projects" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Projects
                </Link>
                <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
>>>>>>> 20f8fbd99acaf6cea6600c9d722c1de033b7b743
