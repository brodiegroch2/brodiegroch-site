'use client'

import { useState } from 'react';
import Link from 'next/link';

interface PortfolioProject {
  id: string;
  title: string;
  abstract: string;
  thumbnail: string;
  technologies: string[];
  status: 'active' | 'completed' | 'prototype';
}

const portfolioProjects: PortfolioProject[] = [
  {
    id: 'wildfire-drone',
    title: 'Autonomous Wildfire-Drone Stack',
    abstract: 'Thermal imaging, mesh networking, edge-AI inference for early ignition detection. Prototyping swarm-UAV system with RPAS compliance.',
    thumbnail: '/essay-cover.svg',
    technologies: ['Thermal Imaging', 'Mesh Networking', 'Edge AI', 'RPAS Compliance'],
    status: 'prototype'
  },
  {
    id: 'run-the-riding',
    title: 'Run the Riding™',
    abstract: 'No-code civic-ops app that lets Calgary-NW residents surface local issues in thirty seconds. Built with Bubble.io and real-time data sync.',
    thumbnail: '/essay-cover.svg',
    technologies: ['Bubble.io', 'Google Sheets', 'Zapier', 'QR Codes'],
    status: 'active'
  },
  {
    id: 'process-compression',
    title: 'Process-Compression Playbooks',
    abstract: 'Python & ChatGPT driven templates that eliminate back-office latency for SMEs. Automated workflow optimization and documentation.',
    thumbnail: '/essay-cover.svg',
    technologies: ['Python', 'ChatGPT API', 'Process Automation', 'SME Tools'],
    status: 'active'
  },
  {
    id: 'goat-distributors',
    title: 'GOAT Distributors Operations Platform',
    abstract: 'Full-stack internal systems for payments, inventory, and order tracking. Cut admin load by 70% and eliminated fulfillment bottlenecks.',
    thumbnail: '/essay-cover.svg',
    technologies: ['No-Code Tools', 'Payment Systems', 'Inventory Management', 'Logistics'],
    status: 'completed'
  },
  {
    id: 'tri3-hardgear',
    title: 'Tri³ Hardgear Automation Suite',
    abstract: 'Automated invoice generation system reducing processing time from 15 minutes to under 5 minutes. Financial workflow optimization.',
    thumbnail: '/essay-cover.svg',
    technologies: ['Excel Macros', 'Financial Automation', 'Process Design', 'Vendor Management'],
    status: 'completed'
  },
  {
    id: '3d-printing-prototype',
    title: '3D Printing & Rapid Prototyping',
    abstract: 'Designed modular PETG wall/roof panels for trailer construction. Optimized slicer parameters for strength-to-print-time ratios.',
    thumbnail: '/essay-cover.svg',
    technologies: ['PETG', 'Ender 3 V2', 'Cura', 'FEM Analysis'],
    status: 'prototype'
  }
];

export default function PortfolioPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'systems2025') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 font-inter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
              PORTFOLIO
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
              Password-protected project showcase
            </p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 md:p-6 mb-6 md:mb-8 rounded-r-lg">
            <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-blue-900 dark:text-blue-100">Access Required</h3>
            <p className="text-blue-800 dark:text-blue-200 text-xs md:text-sm">
              This portfolio contains proprietary work and sensitive project details. 
              Please enter the password to view the full project showcase.
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-base"
                placeholder="Enter password"
                required
              />
            </div>
            
            {error && (
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            )}
            
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-base"
            >
              Access Portfolio
            </button>
          </form>

          <div className="mt-6 md:mt-8 text-center">
            <Link
              href="/contact"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              Need access? Contact me →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-inter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
          PORTFOLIO
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 md:mb-10 font-source-serif max-w-2xl">
          Project Showcase & Technical Work
        </p>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {portfolioProjects.map((project) => (
              <div key={project.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {/* Project Thumbnail */}
                <div className="h-32 md:h-48 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 to-blue-800 flex items-center justify-center">
                  <div className="text-center p-3 md:p-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-blue-600 dark:text-blue-400 text-xs md:text-sm font-medium">
                      {project.status.toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 md:mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 text-xs md:text-sm leading-relaxed mb-3 md:mb-4">
                    {project.abstract}
                  </p>

                  {/* Technologies */}
                  <div className="mb-3 md:mb-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Technologies:</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex justify-between items-center">
                    <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : project.status === 'completed'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                    
                    <button className="text-blue-600 dark:text-blue-400 hover:underline text-xs md:text-sm font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 md:mt-16">
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 md:p-6 rounded-r-lg max-w-2xl mx-auto">
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-blue-900 dark:text-blue-100">
                Interested in Working Together?
              </h3>
              <p className="text-blue-800 dark:text-blue-200 mb-3 md:mb-4 text-sm md:text-base">
                These projects showcase my approach to systems thinking and technical execution. 
                Let's discuss how I can help with your next project.
              </p>
              <Link
                href="/contact"
                className="px-6 md:px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors inline-block text-sm md:text-base"
              >
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 