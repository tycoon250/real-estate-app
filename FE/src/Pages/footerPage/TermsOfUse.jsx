import React from 'react';

function TermsOfUse() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Terms of Use</h1>
        <div className="prose prose-blue max-w-none">
          <p className="text-gray-600 mb-6">Last updated: March 15, 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Use License</h2>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Permission is granted to temporarily download one copy of the materials for personal, non-commercial transitory viewing only.</li>
              <li>This is the grant of a license, not a transfer of title.</li>
              <li>This license shall automatically terminate if you violate any of these restrictions.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
            <p className="text-gray-600 mb-4">
              The materials on this website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitations</h2>
            <p className="text-gray-600 mb-4">
              In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TermsOfUse;