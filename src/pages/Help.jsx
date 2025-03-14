import { useState } from 'react';

function MinimalAdminHelp() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = section => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="max-w-md mx-auto p-4 rounded-2xl shadow-sm">
      <h1 className="text-lg font-bold text-gray-800 mb-4">Help Center</h1>

      {/* Quick Start */}
      <div className="mb-2 border rounded-lg overflow-hidden">
        <button
          className="w-full px-3 py-2 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
          onClick={() => toggleSection('quickstart')}
        >
          <span className="font-medium text-gray-800">Quick Start</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 text-gray-500 transition-transform ${expandedSection === 'quickstart' ? 'transform rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSection === 'quickstart' && (
          <div className="px-3 py-2 text-xs text-gray-600 border-t">
            <ul className="space-y-1">
              <li>
                <strong>Beacons:</strong> Add physical devices that detect nearby mobile devices
              </li>
              <li>
                <strong>Advertisements:</strong> Create content to show when users are near beacons
              </li>
              <li>
                <strong>Assignments:</strong> Link advertisements to specific beacons
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Common Tasks */}
      <div className="mb-2 border rounded-lg overflow-hidden">
        <button
          className="w-full px-3 py-2 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
          onClick={() => toggleSection('tasks')}
        >
          <span className="font-medium text-gray-800">Common Tasks</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 text-gray-500 transition-transform ${expandedSection === 'tasks' ? 'transform rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSection === 'tasks' && (
          <div className="px-3 py-2 text-xs text-gray-600 border-t">
            <p className="font-medium mb-1">Adding Items:</p>
            <ul className="list-disc pl-4 mb-2 space-y-1">
              <li>Use the &quot;Add&quot; button in each section</li>
              <li>Fill in all required fields</li>
              <li>Click &quot;Create&quot; to save</li>
            </ul>

            <p className="font-medium mb-1">Managing Items:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Edit - Update existing information</li>
              <li>Delete - Remove items from the system</li>
              <li>View - See detailed information</li>
            </ul>
          </div>
        )}
      </div>

      {/* Troubleshooting */}
      <div className="mb-2 border rounded-lg overflow-hidden">
        <button
          className="w-full px-3 py-2 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
          onClick={() => toggleSection('troubleshooting')}
        >
          <span className="font-medium text-gray-800">Troubleshooting</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 text-gray-500 transition-transform ${expandedSection === 'troubleshooting' ? 'transform rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSection === 'troubleshooting' && (
          <div className="px-3 py-2 text-xs text-gray-600 border-t">
            <div className="mb-2">
              <p className="font-medium">Advertisement Not Showing:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Check if advertisement is active</li>
                <li>Verify dates are current</li>
                <li>Ensure beacon is active</li>
              </ul>
            </div>

            <div>
              <p className="font-medium">Quote Error in Content:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  Avoid using single (&apos;) or double (&quot;) quotes in advertisement content
                </li>
                <li>If quotes are needed, use the HTML entities: &amp;#39;</li>
                <li>Edit the advertisement and remove any unescaped quotes</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Data Loading Issues */}
      <div className="mb-2 border rounded-lg overflow-hidden">
        <button
          className="w-full px-3 py-2 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
          onClick={() => toggleSection('dataIssues')}
        >
          <span className="font-medium text-gray-800">Data Loading Issues</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 text-gray-500 transition-transform ${expandedSection === 'dataIssues' ? 'transform rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSection === 'dataIssues' && (
          <div className="px-3 py-2 text-xs text-gray-600 border-t">
            <p className="mb-1">If data isn{"'"}t loading correctly:</p>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Refresh the page</li>
              <li>Clear browser cache</li>
              <li>Check your internet connection</li>
              <li>Try logging out and back in</li>
            </ol>
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="mt-4 bg-primary/20 p-3 text-xs text-third rounded-xl">
        <p className="font-medium mb-1">Need more help?</p>
        <p>
          Email:{' '}
          <a href="mailto:support@example.com" className="text-forth hover:underline">
            support@example.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default MinimalAdminHelp;
