'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ResumeData {
  personal: {
    fullName: string;
    title: string;
    summary: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
  };
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    achievements: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
    status: string;
    relevantCourses: string[];
    achievements: string[];
  }>;
  skills: Record<string, {
    tools: string[];
    proficiency: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
}

export default function ResumePage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  useEffect(() => {
    fetch('/resume-data.json')
      .then(res => res.json())
      .then(data => setResumeData(data))
      .catch(err => console.error('Error loading resume data:', err));
  }, []);

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-inter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
          RÉSUMÉ
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 md:mb-10 font-source-serif max-w-2xl">
          Professional Experience & Qualifications
        </p>
        
        {/* Download Button */}
        <div className="mb-6 md:mb-8">
          <a
            href="/resume-data.json"
            download="Brodie-Groch-Resume.json"
            className="px-6 md:px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors inline-flex items-center gap-2 text-sm md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download JSON
          </a>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Quick Snapshot */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 md:p-6 mb-8 md:mb-12 rounded-r-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 font-inter text-blue-900 dark:text-blue-100">Quick Snapshot</h2>
            <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm md:text-base">
              <li>• <strong>Co-Founder & Operations Lead</strong> at GOAT Distributors (2024-2025)</li>
              <li>• <strong>Business Consultant</strong> at Tri³ Hardgear (2024-2025)</li>
              <li>• <strong>Teaching Assistant</strong> at UBC - Project Management (2024)</li>
              <li>• <strong>RPAS Pilot</strong> (Transport Canada), <strong>H₂S Alive</strong>, <strong>Red Cross BLS</strong></li>
              <li>• <strong>70%+</strong> admin load reduction, <strong>30%+</strong> error reduction in operations</li>
              <li>• <strong>B.Mgmt (Operations & Strategy)</strong> from UBC Okanagan (2024)</li>
            </ul>
          </div>

          {/* Personal Info */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-inter text-gray-900 dark:text-white">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">{resumeData.personal.fullName}</p>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">{resumeData.personal.title}</p>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">{resumeData.personal.location}</p>
              </div>
              <div>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 break-all">{resumeData.personal.email}</p>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">{resumeData.personal.phone}</p>
                <a href={resumeData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm md:text-base break-all">
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-inter text-gray-900 dark:text-white">Professional Summary</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
                {resumeData.personal.summary}
              </p>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-inter text-gray-900 dark:text-white">Professional Experience</h2>
            <div className="space-y-6 md:space-y-8">
              {resumeData.experience.map((job, index) => (
                <div key={index} className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 md:pl-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                    <span className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
                      {job.startDate} - {job.endDate}
                    </span>
                  </div>
                  <p className="text-base md:text-lg text-blue-600 dark:text-blue-400 mb-2">{job.company}</p>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">{job.location}</p>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 md:mb-4">{job.description}</p>
                  <ul className="list-disc pl-4 md:pl-6 space-y-1">
                    {job.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-gray-700 dark:text-gray-300 text-xs md:text-sm">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-inter text-gray-900 dark:text-white">Education</h2>
            <div className="space-y-4 md:space-y-6">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 md:pl-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                    <span className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">{edu.graduationDate}</span>
                  </div>
                  <p className="text-base md:text-lg text-blue-600 dark:text-blue-400 mb-2">{edu.institution}</p>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-2">{edu.location}</p>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-2">Status: {edu.status}</p>
                  {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                    <div className="mb-2">
                      <p className="text-gray-700 dark:text-gray-300 text-xs md:text-sm">
                        <strong>Relevant Courses:</strong> {edu.relevantCourses.join(', ')}
                      </p>
                    </div>
                  )}
                  <ul className="list-disc pl-4 md:pl-6 space-y-1">
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-gray-700 dark:text-gray-300 text-xs md:text-sm">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-inter text-gray-900 dark:text-white">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {Object.entries(resumeData.skills).map(([category, skill]) => (
                <div key={category} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 md:p-4">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2">{category}</h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Tools:</strong> {skill.tools.join(', ')}
                  </p>
                  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">{skill.proficiency}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-inter text-gray-900 dark:text-white">Key Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {resumeData.projects.slice(0, 6).map((project, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 md:p-4">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2">{project.name}</h3>
                  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-2">{project.description}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-inter text-gray-900 dark:text-white">Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">{cert.name}</p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1 md:mt-0">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 md:mt-12">
            <Link
              href="/contact"
              className="px-6 md:px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors text-center text-sm md:text-base"
            >
              Get in Touch
            </Link>
            <Link
              href="/essays"
              className="px-6 md:px-8 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-center text-sm md:text-base"
            >
              Read My Insights
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 