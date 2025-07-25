import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-inter",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["Georgia", "serif"],
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  title: "Brodie Groch - Strategic Systems Thinking",
  description: "Strategic systems thinking for a disrupted world. Exploring technology, national security, and political transformation.",
  keywords: ["strategic thinking", "systems thinking", "national security", "AI", "political transformation"],
  openGraph: {
    title: "Brodie Groch - Strategic Systems Thinking",
    description: "Strategic systems thinking for a disrupted world. Exploring technology, national security, and political transformation.",
    url: "https://brodiegroch.ca",
    siteName: "Brodie Groch",
    images: [
      {
        url: "/profile-1024x985.png",
        width: 1024,
        height: 985,
        alt: "Brodie Groch headshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brodie Groch - Strategic Systems Thinking",
    description: "Strategic systems thinking for a disrupted world. Exploring technology, national security, and political transformation.",
    images: ["/profile-1024x985.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/@tab_icon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} ${sourceSerif.variable} antialiased min-h-screen bg-white dark:bg-gray-900`}>
        {/* Skip Navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>
        
        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main id="main-content" className="pt-16">
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
                <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  About
                </Link>
                <Link href="/essays" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Articles
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
