'use client'

import Link from "next/link";

export default function NowPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-inter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
          NOW
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 md:mb-10 font-source-serif max-w-2xl">
          What I'm focused on right now
        </p>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* Current Focus */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-inter text-gray-900 dark:text-white">Current Focus</h2>
              <div className="space-y-4 md:space-y-6">
                <div className="border-l-4 border-blue-500 pl-4 md:pl-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Autonomous Wildfire-Drone Stack
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    Prototyping thermal imaging, mesh networking, and edge-AI inference for early ignition detection. 
                    Currently in R&D phase with RPAS compliance and system architecture design.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4 md:pl-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Run the Riding™ Civic Tech
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    No-code civic-ops app for Calgary-NW residents to surface local issues in thirty seconds. 
                    Deploying QR-code funnels and real-time data sync.
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4 md:pl-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Process-Compression Playbooks
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    Python & ChatGPT driven templates that eliminate back-office latency for SMEs. 
                    Developing automated workflow optimization and documentation systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Learning */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-inter text-gray-900 dark:text-white">Learning</h2>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                      <strong>Mechanical Engineering Technology Diploma</strong> at SAIT (Expected 2027)
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      Lab-intensive focus on Thermodynamics, Statics, Electro-Mechanical Systems, and CAD/CAM
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                      <strong>Advanced RPAS Operations</strong> and thermal imaging systems
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      Expanding beyond basic VLOS to advanced mission planning and sensor integration
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                      <strong>Edge AI and IoT Systems</strong> for field robotics applications
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      Exploring TensorFlow Lite, ONNX, and embedded systems for real-time inference
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reading */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-inter text-gray-900 dark:text-white">Reading</h2>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                      <strong>"The Power of Habit"</strong> by Charles Duhigg
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      Understanding habit formation and systems thinking in organizational change
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                      <strong>"Thinking in Systems"</strong> by Donella H. Meadows
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      Deep dive into systems dynamics and leverage points for change
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                      <strong>Canadian Wildfire Policy Reports</strong> and academic papers
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      Research for ongoing wildfire management analysis and policy recommendations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Goals */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-inter text-gray-900 dark:text-white">Goals</h2>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                      <strong>Complete wildfire drone prototype</strong> by Q2 2025
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                      <strong>Launch Run the Riding™</strong> in Calgary-NW by Q3 2025
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                      <strong>Publish 3 more long-form essays</strong> on systems thinking and policy
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                      <strong>Secure 2-3 consulting engagements</strong> in process optimization
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 md:p-6 rounded-r-lg">
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-blue-900 dark:text-blue-100">
                Want to Collaborate?
              </h3>
              <p className="text-blue-800 dark:text-blue-200 mb-3 md:mb-4 text-sm md:text-base">
                I'm always interested in connecting with people working on systems thinking, 
                field robotics, or civic technology projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <a
                  href="https://calendly.com/brodiegroch/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 md:px-6 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition-colors inline-flex items-center gap-2 justify-center text-sm md:text-base"
                >
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book 15 Min Call
                </a>
                <Link
                  href="/contact"
                  className="px-4 md:px-6 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-center text-sm md:text-base"
                >
                  Send Message
                </Link>
              </div>
            </div>

            {/* Footer Note */}
            <div className="text-center mt-8 md:mt-12">
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Last updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                Inspired by <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Derek Sivers' /now page movement</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 