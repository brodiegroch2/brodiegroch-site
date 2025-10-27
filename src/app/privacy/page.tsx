export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for brodiegroch.ca'
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Privacy Policy
          </h1>

          <div className="card space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Effective Date</h2>
              <p className="text-gray-600 dark:text-gray-300">
                This privacy policy is effective as of October 27, 2024.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This website (brodiegroch.ca) provides an API service that allows users to store and manage personal items through OpenAI Custom GPTs. This privacy policy explains how we handle your data when you use our API.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                We are committed to protecting your privacy and handling your data responsibly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Collection and Storage</h2>
              <h3 className="text-xl font-semibold mb-2 mt-4">What Data We Collect</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                When you use our API through a Custom GPT, the following data may be stored:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li>Items you create, including tasks, notes, events, and metrics</li>
                <li>The content and metadata of these items</li>
                <li>Timestamps of when items are created or updated</li>
                <li>API usage logs (for security and debugging purposes)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-6">How We Store Data</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All data is stored in a secure PostgreSQL database hosted on Vercel. The database is:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li>Encrypted at rest and in transit</li>
                <li>Accessed only through authenticated API endpoints</li>
                <li>Regularly backed up by Vercel's infrastructure</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Security Measures</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We implement the following security measures to protect your data:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li>API key authentication required for all requests</li>
                <li>HTTPS encryption for all API communications</li>
                <li>Input validation to prevent malicious data injection</li>
                <li>Payload size limits (8KB maximum) to prevent abuse</li>
                <li>Server-side validation and sanitization of all inputs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Usage</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We use your data solely for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li>Providing the API service you requested</li>
                <li>Storing your items as you create them</li>
                <li>Allowing you to retrieve, update, and delete your items</li>
                <li>Ensuring system security and preventing abuse</li>
                <li>Debugging and improving the service</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                We do not:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li>Share your data with third parties</li>
                <li>Sell your data to advertisers</li>
                <li>Use your data for marketing purposes</li>
                <li>Analyze your personal content beyond what's necessary for service delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You have the following rights regarding your data:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li><strong>Access:</strong> You can retrieve all your items through the API</li>
                <li><strong>Update:</strong> You can modify any of your stored items</li>
                <li><strong>Delete:</strong> You can delete any of your items at any time</li>
                <li><strong>Export:</strong> You can request a copy of your data</li>
                <li><strong>Request Deletion:</strong> You can request permanent deletion of all your data</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                To exercise these rights, you can use the API endpoints directly or contact us through the contact page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Your data is stored indefinitely until you delete it or request its deletion. We do not automatically delete inactive accounts. If you wish to have your data removed, you can delete items through the API or contact us to request complete data deletion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This service relies on the following third-party providers:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li><strong>Vercel:</strong> Hosting and database services</li>
                <li><strong>PostgreSQL:</strong> Database storage</li>
                <li><strong>OpenAI:</strong> Custom GPT integration</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                These providers have their own privacy policies and security measures. We are not responsible for the privacy practices of these third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
              <p className="text-gray-600 dark:text-gray-300">
                This website does not use cookies or tracking technologies for the API service. The API is stateless and requires authentication via API key headers for each request.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
              <p className="text-gray-600 dark:text-gray-300">
                This service is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We may update this privacy policy from time to time. When we make changes, we will update the "Effective Date" at the top of this page. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions, concerns, or requests regarding this privacy policy or your data, please contact us through the <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">contact page</a>.
              </p>
            </section>

            <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The following API endpoints are available under this privacy policy:
              </p>
              
              <h3 className="text-xl font-semibold mb-2 mt-4">Data Management APIs</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li><code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">GET/POST/PUT/DELETE /api/data/courses</code> - Course management</li>
                <li><code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">GET/POST/PUT/DELETE /api/data/quick-links</code> - Quick links management</li>
                <li><code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">GET/POST/PUT/DELETE /api/data/schedule</code> - Schedule management</li>
                <li><code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">GET/POST/PUT/DELETE /api/data/grading-scale</code> - Grading scale management</li>
                <li><code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">GET/PUT /api/data/deliverables</code> - Deliverables management</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-2 mt-4">GPT Integration API</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li><code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">POST /api/gpt/upsert</code> - Create or update items</li>
                <li><code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">GET /api/gpt/items</code> - Retrieve items</li>
                <li><code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">DELETE /api/gpt/items</code> - Delete items</li>
              </ul>
              
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                GPT endpoints require authentication via the <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">X-API-Key</code> header.
              </p>
              
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                For complete API documentation, see the <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">API Documentation</a> page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

