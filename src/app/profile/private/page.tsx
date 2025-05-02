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
            Portfolio
          </h1>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Brodie Groch</h2>
              <p className="text-gray-600 dark:text-gray-400">Calgary, AB</p>
              <p className="text-gray-600 dark:text-gray-400">✉️ brodiejsgroch@gmail.com</p>
              <p className="text-gray-600 dark:text-gray-400">📞 (403) 797-2846</p>
            </div>

            <hr className="my-8 border-gray-200 dark:border-gray-700" />

            <section>
              <h2 className="text-2xl font-bold mb-4">About Me</h2>
              <p>
                I hold a Bachelor of Management from UBC Okanagan (2020–2024) and am beginning a Mechanical Engineering Technology diploma at SAIT (2025–2027). I'm certified in responsible service & security (ProServe, ProTect), RPAS/UAS operation, and multiple FEMA ICS emergency-management courses, and have deployed AI-augmented automations in small-business and consulting roles. My work blends technical rigor, behavioral insight, and systems thinking to deliver high-impact strategy and operations.
              </p>
            </section>

            <hr className="my-8 border-gray-200 dark:border-gray-700" />

            <section>
              <h2 className="text-2xl font-bold mb-4">Timeline</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>2016–2019 St. Francis High School, Calgary – High School Diploma</li>
                <li>2020–2024 UBCO, Kelowna – Bachelor of Management</li>
                <li>July 2024–Present Managing Partner, GOAT Distributors (Calgary)</li>
                <li>Sept 2025–Apr 2027 SAIT, Calgary – Diploma, Mechanical Engineering Technology</li>
              </ul>
            </section>

            <hr className="my-8 border-gray-200 dark:border-gray-700" />

            <section>
              <h2 className="text-2xl font-bold mb-4">Education & Certifications</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">University of British Columbia – Okanagan (Kelowna, BC)</h3>
                  <p>Bachelor of Management (Aug 2020 – Apr 2024)</p>
                </div>
                <div>
                  <h3 className="font-semibold">Southern Institute of Technology (SAIT) (Calgary, AB)</h3>
                  <p>Diploma, Mechanical Engineering Technology (Aug 2025 – Apr 2027)</p>
                </div>
                <div>
                  <h3 className="font-semibold">Certifications</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>ProServe Certified (AGLC)</li>
                    <li>ProTect Certified (AGLC)</li>
                    <li>Small UAS Pilot (FAA)</li>
                    <li>RPAS Pilot (Transport Canada)</li>
                    <li>ICS-100, ICS-200, ICS-700, ICS-800 (FEMA)</li>
                    <li>FireSmart 101 (FireSmart Canada)</li>
                    <li>Basic Life Support (Red Cross)</li>
                  </ul>
                </div>
              </div>
            </section>

            <hr className="my-8 border-gray-200 dark:border-gray-700" />

            <section>
              <h2 className="text-2xl font-bold mb-4">Technical & Analytical Skills</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Software & Tools:</strong> Microsoft Word/Excel · Google Docs/Sheets · SolidWorks (3D CAD) · Basic Accounting/Spreadsheets</li>
                <li><strong>AI & Automation:</strong> ChatGPT prompt‐engineering · Make.com workflows</li>
                <li><strong>Core Strengths:</strong> Systems Thinking · Data-Driven Analysis · Process Automation · Strategic Planning</li>
                <li><strong>Personal Attributes:</strong> Problem-Solver · Team Player · Adaptable · Self-motivated · Competitive · Fast Learner · Personable · Honest</li>
              </ul>
            </section>

            <hr className="my-8 border-gray-200 dark:border-gray-700" />

            <section>
              <h2 className="text-2xl font-bold mb-4">Select Projects</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Capstone: V-Metrics UX & Marketing Strategy (Jan 2024 – Apr 2024)</h3>
                  <p>Improved user-experience design and go-to-market strategy for a SaaS metrics platform. Skills: UED, market research, roadmapping</p>
                </div>
                <div>
                  <h3 className="font-semibold">Uber: Strategic Analysis & Disruptive Innovation (Jan 2023 – Apr 2023)</h3>
                  <p>Led PESTEL & SWOT analyses to identify growth opportunities and competitive threats in ride-sharing</p>
                </div>
                <div>
                  <h3 className="font-semibold">Harley-Davidson: Growth Challenges & Strategic Initiatives (Jan 2023 – Feb 2023)</h3>
                  <p>Developed market-entry roadmaps and positioning frameworks for new product lines</p>
                </div>
                <div>
                  <h3 className="font-semibold">AMBIT by SOUL: Time-Management Social Initiative (Sep 2022 – Dec 2022)</h3>
                  <p>Designed a productivity-habit platform for students; oversaw full project lifecycle</p>
                </div>
              </div>
            </section>

            <hr className="my-8 border-gray-200 dark:border-gray-700" />

            <section>
              <h2 className="text-2xl font-bold mb-4">Professional Experience</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold">Managing Partner — GOAT Distributors, Calgary, AB (Jul 2024 – Present)</h3>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Led accounting, financial planning & CRM integrations, automating vendor workflows to cut admin time by 30%.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Business Consulting Intern — Tri3 Hardgear, Calgary, AB (May 2024 – Jan 2025)</h3>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Built an invoice-automation system, reducing processing time by 40%.</li>
                    <li>Conducted market research and delivered strategic growth recommendations.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Teaching Assistant (Project Management, MGMT 422) — UBC Okanagan (Jan 2024 – Apr 2024)</h3>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Co-developed case studies on risk & stakeholder analysis; led weekly tutorials, boosting student engagement.</li>
                  </ul>
                </div>
              </div>
            </section>

            <hr className="my-8 border-gray-200 dark:border-gray-700" />

            <section>
              <h2 className="text-2xl font-bold mb-4">Other Experience</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>TommyGuns Model (Kelowna, BC) — runway/model work</li>
                <li>Community & Junior B Hockey (Calgary) — competitive team sports</li>
                <li>Drone Registration — filed RPAS/UAS registrations in both U.S. & Canada</li>
              </ul>
            </section>

            <hr className="my-8 border-gray-200 dark:border-gray-700" />

            <section>
              <h2 className="text-2xl font-bold mb-4">Awards & Honours</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>2021 Employee of the Year Award</li>
                <li>Grade 4 Math PAT – Top 1% in Alberta</li>
                <li>Created Welland Jackfish All-Star Jersey</li>
                <li>2019 Rutherford Scholarship</li>
              </ul>
            </section>

            <hr className="my-8 border-gray-200 dark:border-gray-700" />

            <section>
              <h2 className="text-2xl font-bold mb-4">Relevant Coursework</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Engineering & Technical</h3>
                  <p>APSC 171 (Engineering Drawing & CAD/CAM) · APSC 172 (Engineering Analysis I) · APSC 179 (Linear Algebra for Engineers) · APSC 180 (Statics) · APSC 182 (Matter & Energy I) · COSC 111 (Computer Programming I)</p>
                </div>
                <div>
                  <h3 className="font-semibold">Management & Economics</h3>
                  <p>MGMT 355 (Operations Management) · MGMT 441 (Marketing Strategy) · MGMT 490 (Capstone Service Learning) · ECON 101 (Principles of Microeconomics)</p>
                </div>
                <div>
                  <h3 className="font-semibold">Behavioral & Data</h3>
                  <p>PSYO 271 (Introduction to Data Analysis) · PSYO 348 (Health Psychology)</p>
                </div>
              </div>
            </section>

            <hr className="my-8 border-gray-200 dark:border-gray-700" />

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact & Next Steps</h2>
              <p>
                I'm actively pursuing strategic internships or analyst roles in political operations, defense/intel strategy, AI systems, or think-tank fellowships. Let's connect:
              </p>
              <p className="mt-4">
                ✉️ brodiejsgroch@gmail.com · 📞 (403) 797-2846
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
} 