'use client'

import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <div className="flex justify-center mb-8">
          <Image
            src="/profile-1024x985.png"
            alt="Brodie Groch headshot"
            width={160}
            height={160}
            className="rounded-full shadow-lg border-4 border-white dark:border-gray-800 object-cover"
            priority
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 font-inter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
          ABOUT ME
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 font-source-serif max-w-2xl">
          Systems × Mechanics × Execution
        </p>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="text-center mb-12">
              <p className="text-xl text-gray-700 dark:text-gray-300 font-source-serif leading-relaxed">
                I&apos;m Brodie Groch, a Calgary-based Mechanical-Ops Systems Strategist.
                My lane is where physical infrastructure, field robotics, and real-time ops software intersect. I build repeatable processes that cut waste (70 %+), slash errors (30 %+), and turn raw data into decisive action—whether that&apos;s automating invoices for a hardware startup or prototyping wildfire-drone swarms.
              </p>
            </div>

            <div className="space-y-12">


              {/* CORE THESIS */}
              <div>
                <h2 className="text-3xl font-bold mb-6 font-inter text-gray-900 dark:text-white">CORE THESIS</h2>
                <blockquote className="text-xl font-source-serif text-gray-800 dark:text-gray-200 leading-relaxed mb-6 border-l-4 border-blue-500 pl-6">
                  The future belongs to operators who can bridge CAD benches, ERP dashboards, and field conditions—then compress time-to-outcome.
                </blockquote>
                <p className="text-lg text-gray-700 dark:text-gray-300 font-inter">
                  That&apos;s the leverage I chase: turn chaos into self-healing systems that scale beyond direct control.
                </p>
              </div>

              {/* BACKGROUND SNAPSHOT */}
              <div>
                <h2 className="text-3xl font-bold mb-6 font-inter text-gray-900 dark:text-white">BACKGROUND SNAPSHOT</h2>
                <ul className="list-disc pl-8 space-y-2">
                  <li><strong>B.Mgmt (Operations & Strategy)</strong> – UBC Okanagan</li>
                  <li><strong>Diploma in Mechanical Engineering Technology (in progress)</strong> – SAIT, 2027</li>
                  <li><strong>Co-Founder, GOAT Distributors</strong> – engineered full-stack ops platform; cut admin load 70 %</li>
                  <li><strong>Field credentials:</strong> RPAS Pilot (Transport Canada), H₂S Alive, Red Cross BLS</li>
                </ul>
              </div>

              {/* WHY I CARE */}
              <div>
                <h2 className="text-3xl font-bold mb-6 font-inter text-gray-900 dark:text-white">WHY I CARE</h2>
                <p className="text-xl text-gray-800 dark:text-gray-200 leading-relaxed">
                  Badly-designed systems cost communities real money, time, and safety.
                  My motive is simple: make critical Canadian infrastructure faster, smarter, and harder to break.
                </p>
              </div>

              {/* LET'S TALK */}
              <div>
                <h2 className="text-3xl font-bold mb-6 font-inter text-gray-900 dark:text-white">LET&apos;S TALK</h2>
                <p className="text-xl text-gray-800 dark:text-gray-200 leading-relaxed mb-6">
                  Working on drones, energy, wildfire tech, or national infrastructure resilience?
                  Shoot me a note → <a href="mailto:brodie@brodiegroch.ca" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">brodie@brodiegroch.ca</a>.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Full project logs live on the Content and Projects pages.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link
                href="/contact"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors"
              >
                Get in Touch
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