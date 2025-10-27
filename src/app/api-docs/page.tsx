'use client'

import Link from 'next/link';

export const metadata = {
  title: 'API Documentation',
  description: 'Complete API documentation for brodiegroch.ca'
};

export default function ApiDocs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            API Documentation
          </h1>

          <div className="card space-y-8">
            
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Welcome to the brodiegroch.ca API documentation. This API provides endpoints for managing courses, schedules, deliverables, quick links, grading scales, and calendar feeds.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 my-4">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Base URL:</strong> <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">https://brodiegroch.ca</code>
                </p>
              </div>
            </section>

            {/* Course Management API */}
            <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4">Course Management API</h2>
              
              <div className="space-y-6">
                {/* GET */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-sm font-semibold">GET</span>
                    <code className="text-lg">/api/data/courses</code>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Retrieve all courses</p>
                  <div className="mt-3">
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-1">Returns:</p>
                    <pre className="bg-gray-900 dark:bg-black text-green-400 p-3 rounded text-xs overflow-x-auto">
{`Array of course objects:
{
  "Course ID": "COMP 213",
  "Course Name": "...",
  "Credit Hours": "3",
  "Course Description": "...",
  "Professor/Teacher Name": "...",
  "Professor/Teacher Email": "...",
  "Course Average Weighted Grade": "..."
}`}
                    </pre>
                  </div>
                </div>

                {/* POST */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-sm font-semibold">POST</span>
                    <code className="text-lg">/api/data/courses</code>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Create a new course</p>
                  <div className="mt-3">
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-1">Request Body:</p>
                    <pre className="bg-gray-900 dark:bg-black text-green-400 p-3 rounded text-xs overflow-x-auto">
{`{
  "Course ID": "COMP 213",
  "Course Name": "Computing for...",
  "Credit Hours": "3"
}`}
                    </pre>
                  </div>
                </div>

                {/* PUT */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded text-sm font-semibold">PUT</span>
                    <code className="text-lg">/api/data/courses</code>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Update an existing course</p>
                </div>

                {/* DELETE */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-sm font-semibold">DELETE</span>
                    <code className="text-lg">/api/data/courses</code>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Delete a course</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Query Parameter: <code className="bg-white dark:bg-gray-800 px-1 rounded">?id=COURSE_ID</code></p>
                </div>
              </div>
            </section>

            {/* Schedule API */}
            <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4">Schedule Management API</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-sm font-semibold">GET</span>
                    <code className="text-lg">/api/data/schedule</code>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Retrieve schedule items</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Query Parameters: <code className="bg-white dark:bg-gray-800 px-1 rounded">?courseId=COMP_213&dayOfWeek=Tuesday</code>
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-sm font-semibold">POST</span>
                    <code className="text-lg">/api/data/schedule</code>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Create a new schedule item</p>
                </div>
              </div>
            </section>

            {/* Deliverables API */}
            <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4">Deliverables API</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-sm font-semibold">GET</span>
                    <code className="text-lg">/api/data/deliverables</code>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Retrieve all assignments and deliverables</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded text-sm font-semibold">PUT</span>
                    <code className="text-lg">/api/data/deliverables</code>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Update deliverable status and grades</p>
                </div>
              </div>
            </section>

            {/* Calendar Feed API */}
            <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4">Calendar Feed API</h2>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-sm font-semibold">GET</span>
                  <code className="text-lg">/api/calendar</code>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Generate an ICS (iCalendar) format feed of schedule data for calendar applications.
                </p>
                <div className="mt-3">
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">Returns: ICS format file</p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm">
                    <p className="text-gray-700 dark:text-gray-300">
                      Import this feed into Google Calendar, Apple Calendar, Outlook, or any calendar application that supports ICS format.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Other APIs */}
            <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4">Other Management APIs</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  <div>
                    <code className="text-sm">/api/data/quick-links</code>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Manage quick links</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">GET</span>
                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">POST</span>
                    <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded">PUT</span>
                    <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded">DELETE</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  <div>
                    <code className="text-sm">/api/data/grading-scale</code>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Manage grading scale</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">GET</span>
                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">POST</span>
                    <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded">PUT</span>
                    <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded">DELETE</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Documentation Downloads */}
            <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4">Documentation Downloads</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <a 
                  href="/actions.txt" 
                  download
                  className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 rounded-lg border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">API Actions Reference</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Complete guide for all API endpoints</p>
                    </div>
                  </div>
                </a>

                <a 
                  href="/openapi-spec.yaml" 
                  download
                  className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30 rounded-lg border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">OpenAPI Specification</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">OpenAPI 3.1.0 specification file</p>
                    </div>
                  </div>
                </a>
              </div>
            </section>

            {/* Links */}
            <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/privacy"
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/contact"
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

