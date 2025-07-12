'use client'

import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Image
                  src="/profile-1024x985.png"
                  alt="Brodie Groch headshot"
                  width={180}
                  height={180}
                  className="rounded-full shadow-2xl border-4 border-white dark:border-gray-800 object-cover ring-4 ring-blue-100 dark:ring-gray-700"
                  priority
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-6 font-inter text-gray-900 dark:text-white">
              ABOUT ME
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-3xl font-bold mb-4 font-inter text-gray-800 dark:text-gray-200">
              Systems × Mechanics × Execution
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="card bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div className="text-center mb-12">
                <p className="text-xl text-gray-700 dark:text-gray-300 font-source-serif leading-relaxed">
                  I&apos;m Brodie Groch, a Calgary-based Mechanical-Ops Systems Strategist.
                  My lane is where physical infrastructure, field robotics, and real-time ops software intersect. I build repeatable processes that cut waste (70 %+), slash errors (30 %+), and turn raw data into decisive action—whether that&apos;s automating invoices for a hardware startup or prototyping wildfire-drone swarms.
                </p>
              </div>

              <div className="space-y-16">
                {/* WHAT I'M BUILDING NOW */}
                <section className="relative">
                  <div className="absolute -left-4 top-0 w-2 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                  <div className="pl-8">
                    <h2 className="text-3xl font-bold mb-8 font-inter text-gray-900 dark:text-white flex items-center gap-3">
                      <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">1</span>
                      WHAT I&apos;M BUILDING NOW
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl border border-blue-100 dark:border-gray-600">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">1</div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Autonomous Wildfire-Drone Stack</h3>
                            <p className="text-gray-700 dark:text-gray-300">Thermal imaging, mesh networking, edge-AI inference for early ignition detection.</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl border border-purple-100 dark:border-gray-600">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">2</div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Run the Riding™</h3>
                            <p className="text-gray-700 dark:text-gray-300">No-code civic-ops app that lets Calgary-NW residents surface local issues in thirty seconds.</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl border border-green-100 dark:border-gray-600">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">3</div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Process-Compression Playbooks</h3>
                            <p className="text-gray-700 dark:text-gray-300">Python & ChatGPT driven templates that eliminate back-office latency for SMEs.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* CORE THESIS */}
                <section className="relative">
                  <div className="absolute -left-4 top-0 w-2 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                  <div className="pl-8">
                    <h2 className="text-3xl font-bold mb-8 font-inter text-gray-900 dark:text-white flex items-center gap-3">
                      <span className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">2</span>
                      CORE THESIS
                    </h2>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 p-8 rounded-xl border border-purple-100 dark:border-gray-600">
                      <blockquote className="text-xl font-source-serif text-gray-800 dark:text-gray-200 leading-relaxed mb-6">
                        The future belongs to operators who can bridge CAD benches, ERP dashboards, and field conditions—then compress time-to-outcome.
                      </blockquote>
                      <p className="text-lg text-gray-700 dark:text-gray-300 font-inter">
                        That&apos;s the leverage I chase: turn chaos into self-healing systems that scale beyond direct control.
                      </p>
                    </div>
                  </div>
                </section>

                {/* BACKGROUND SNAPSHOT */}
                <section className="relative">
                  <div className="absolute -left-4 top-0 w-2 h-full bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                  <div className="pl-8">
                    <h2 className="text-3xl font-bold mb-8 font-inter text-gray-900 dark:text-white flex items-center gap-3">
                      <span className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">3</span>
                      BACKGROUND SNAPSHOT
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl border border-blue-100 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Education</h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                          <li><strong>B.Mgmt (Operations & Strategy)</strong> – UBC Okanagan</li>
                          <li><strong>Diploma in Mechanical Engineering Technology (in progress)</strong> – SAIT, 2027</li>
                        </ul>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl border border-purple-100 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Experience</h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                          <li><strong>Co-Founder, GOAT Distributors</strong> – engineered full-stack ops platform; cut admin load 70 %</li>
                          <li><strong>Field credentials:</strong> RPAS Pilot (Transport Canada), H₂S Alive, Red Cross BLS</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* WHY I CARE */}
                <section className="relative">
                  <div className="absolute -left-4 top-0 w-2 h-full bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                  <div className="pl-8">
                    <h2 className="text-3xl font-bold mb-8 font-inter text-gray-900 dark:text-white flex items-center gap-3">
                      <span className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">4</span>
                      WHY I CARE
                    </h2>
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-600 p-8 rounded-xl border border-orange-100 dark:border-gray-600">
                      <p className="text-xl text-gray-800 dark:text-gray-200 leading-relaxed">
                        Badly-designed systems cost communities real money, time, and safety.
                        My motive is simple: make critical Canadian infrastructure faster, smarter, and harder to break.
                      </p>
                    </div>
                  </div>
                </section>

                {/* LET'S TALK */}
                <section className="relative">
                  <div className="absolute -left-4 top-0 w-2 h-full bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></div>
                  <div className="pl-8">
                    <h2 className="text-3xl font-bold mb-8 font-inter text-gray-900 dark:text-white flex items-center gap-3">
                      <span className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">5</span>
                      LET&apos;S TALK
                    </h2>
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-8 rounded-xl border border-indigo-100 dark:border-gray-600">
                      <p className="text-xl text-gray-800 dark:text-gray-200 leading-relaxed mb-6">
                        Working on drones, energy, wildfire tech, or national infrastructure resilience?
                        Shoot me a note → <a href="mailto:brodie@brodiegroch.ca" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">brodie@brodiegroch.ca</a>.
                      </p>
                      <p className="text-lg text-gray-700 dark:text-gray-300">
                        Full project logs live on the Content and Projects pages.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-16">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/essays"
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Read My Content
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 