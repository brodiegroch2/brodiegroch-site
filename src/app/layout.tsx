import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import PasswordProtection from "@/components/PasswordProtection";
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
  title: "Protected Site",
  description: "This site is password protected.",
  robots: {
    index: false,
    follow: false,
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
        <PasswordProtection>
          {children}
        </PasswordProtection>
      </body>
    </html>
  );
}
