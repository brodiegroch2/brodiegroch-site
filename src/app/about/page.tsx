'use client'

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          About Me
        </h1>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-2xl font-bold mb-6">
            Systems. Strategy. Execution.
          </p>

          <p className="mb-6">
            I&apos;m Brodie Groch, a 23-year-old Canadian strategist based in Calgary, Alberta — where I&apos;m building a career at the intersection of national systems, AI behavior, and political operations.
          </p>

          <p className="mb-6">
            I don&apos;t come from politics or Silicon Valley.<br />
            I come from a mindset:<br />
            → that the most important systems in a country are the least visible<br />
            → that strategy is a skill, not a title<br />
            → and that the future belongs to operators who can think clearly, act quickly, and build resiliently.
          </p>

          <hr className="my-12 border-gray-200 dark:border-gray-700" />

          <h2 className="text-2xl font-bold mb-6">🎯 What I&apos;m Focused On</h2>

          <p className="mb-6">
            I&apos;m building a portfolio of small but sharp public strategy projects — not because I&apos;m trying to impress, but because it&apos;s how I think best:
            in public, under pressure, and through systems.
          </p>

          <p className="mb-4">Right now, I&apos;m focused on:</p>
          <ul className="list-disc pl-8 mb-8 space-y-2">
            <li>AI Behavior + Risk — understanding how intelligent agents impact national resilience</li>
            <li>Strategic Political Infrastructure — from election modeling to memetic defense</li>
            <li>Civic Systems Thinking — analyzing and improving the strategic design of Canadian infrastructure, governance, and tech policy</li>
          </ul>

          <hr className="my-12 border-gray-200 dark:border-gray-700" />

          <h2 className="text-2xl font-bold mb-6">📚 My Background</h2>

          <p className="mb-6">
            I hold a Bachelor&apos;s in Management from UBCO, and I&apos;m currently entering the Mechanical Engineering Technology program at SAIT (Fall 2025). That may sound like a strange combo — but that&apos;s the point.
          </p>

          <p className="mb-6">
            I study how things work.<br />
            People, systems, structures, loops.<br />
            From political power to machine design.
          </p>

          <p className="mb-6">
            I co-own a small Canadian company (GOAT Distributors Inc.) and have worked across education, logistics, and entrepreneurship. Every role I&apos;ve taken on has had one common theme:
            take chaos and turn it into structure.
          </p>

          <hr className="my-12 border-gray-200 dark:border-gray-700" />

          <h2 className="text-2xl font-bold mb-6">🧠 Why Strategy?</h2>

          <p className="mb-6">
            Because strategy is leverage. It&apos;s the ability to:
          </p>

          <ul className="list-disc pl-8 mb-6 space-y-2">
            <li>Spot what others miss</li>
            <li>Act before the signal becomes obvious</li>
            <li>Build something that lasts beyond your direct control</li>
          </ul>

          <p className="mb-6">
            I&apos;m drawn to high-stakes domains — not for the adrenaline, but for the clarity they demand.<br />
            Domains where:
          </p>

          <ul className="list-disc pl-8 mb-8 space-y-2">
            <li>Bad strategy costs real people real things</li>
            <li>Systems fail in complex, not obvious, ways</li>
            <li>You don&apos;t get a second shot</li>
          </ul>

          <hr className="my-12 border-gray-200 dark:border-gray-700" />

          <h2 className="text-2xl font-bold mb-6">🤝 Let&apos;s Connect</h2>

          <p className="mb-6">
            This site is a public record of what I&apos;m thinking, building, and exploring.<br />
            If you&apos;re working in AI, public policy, defense, or national infrastructure — and you think Canada should play smarter in the next 5–10 years — we should talk.
          </p>

          <p className="mb-8">
            You can reach me directly at <a href="mailto:brodie@brodiegroch.ca" className="text-blue-600 dark:text-blue-400 hover:underline">brodie@brodiegroch.ca</a>, or find my latest work on the Essays and Projects pages.
          </p>

          <div className="flex gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get in Touch
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