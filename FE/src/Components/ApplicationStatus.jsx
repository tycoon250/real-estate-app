import React from 'react';
import { Clock, CheckCircle, FileText, Bell, PhoneCall, Mail } from 'lucide-react';


const statusSteps = [
  {
    title: 'Application Submitted',
    description: 'Your application has been successfully received',
    status: 'completed',
  },
  {
    title: 'Initial Review',
    description: 'Our team is reviewing your documentation',
    status: 'current',
  },
  {
    title: 'Background Check',
    description: 'Verification of provided information',
    status: 'upcoming',
  },
  {
    title: 'Final Decision',
    description: 'Application approval and account activation',
    status: 'upcoming',
  },
];

const FAQItems = [
  {
    question: 'How long does the review process take?',
    answer: 'Typically, applications are reviewed within 3-5 business days.',
  },
  {
    question: 'Can I update my application?',
    answer: 'Yes, you can contact our support team to update your application details.',
  },
  {
    question: 'What happens after approval?',
    answer: 'You\'ll receive full access to seller features and our onboarding guide.',
  },
];


const ApplicationStatus = ({
  applicationDate,
  applicationId,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-blue-600 text-white px-4 py-2 text-center text-sm">
        <p>Our support team is available 24/7 to assist you with any questions</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Status Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Application Status</h1>
              <p className="text-gray-500">Application ID: {applicationId}</p>
            </div>
            <div className="hidden sm:block">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700">
                <Clock className="w-4 h-4 mr-2" />
                Under Review
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Status Timeline */}
            <div className="space-y-8">
              {statusSteps.map((step, index) => (
                <div key={step.title} className="relative">
                  {index !== statusSteps.length - 1 && (
                    <div
                      className={`absolute left-2.5 top-8 h-full w-0.5 ${
                        step.status === 'completed' ? 'bg-blue-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                  <div className="relative flex items-start">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                          ${
                            step.status === 'completed'
                              ? 'bg-blue-500 border-blue-500'
                              : step.status === 'current'
                              ? 'bg-white border-blue-500'
                              : 'bg-white border-gray-300'
                          }`}
                      >
                        {step.status === 'completed' && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                        {step.status === 'current' && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-sm text-gray-500">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Application Details */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Application Details</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Submission Date</p>
                    <p className="text-sm text-gray-500">{applicationDate}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bell className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Status Updates</p>
                    <p className="text-sm text-gray-500">Email notifications enabled</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Estimated Review Time</p>
                    <p className="text-sm text-gray-500">3-5 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="grid gap-6">
            {FAQItems.map((item, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <h3 className="font-medium text-gray-900 mb-2">{item.question}</h3>
                <p className="text-gray-500 text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-6 sm:p-8 text-white">
          <h2 className="text-xl font-bold mb-6">Need Assistance?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <PhoneCall className="w-6 h-6 mr-4" />
              <div>
                <p className="font-medium">Call Support</p>
                <p className="text-blue-100">Available 24/7 at +1 (800) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="w-6 h-6 mr-4" />
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-blue-100">support@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;