import React, { useState, useEffect } from 'react';
import { XCircle, AlertCircle, RefreshCcw, FileText, Calendar, Mail, PhoneCall, ArrowRight } from 'lucide-react';


const commonReasons = [
  {
    title: 'Incomplete Documentation',
    description: 'Ensure all required documents are properly submitted and verified.',
  },
  {
    title: 'Experience Requirements',
    description: 'Review our minimum experience requirements for sellers.',
  },
  {
    title: 'Verification Issues',
    description: 'Double-check all provided information for accuracy.',
  },
];

const RejectedStatus = ({
  applicationDate,
  applicationId,
  rejectionDate,
  rejectionReason,
  reapplyAfter,
  onReapply,
}) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [canReapply, setCanReapply] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const reapplyTime = new Date(reapplyAfter).getTime();
      const timeDiff = reapplyTime - now;

      if (timeDiff <= 0) {
        setCanReapply(true);
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    // Initial calculation
    calculateTimeRemaining();

    // Update countdown every second
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, [reapplyAfter]);

  const progress = () => {
    const total = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
    const elapsed = Date.now() - new Date(rejectionDate).getTime();
    return Math.min((elapsed / total) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-red-600 text-white px-4 py-2 text-center text-sm">
        <p>Our support team is ready to help you understand your application status</p>
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
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 text-red-700">
                <XCircle className="w-4 h-4 mr-2" />
                Application Rejected
              </span>
            </div>
          </div>

          <div className="border-l-4 border-red-500 bg-red-50 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Your application has not been approved at this time
                </h3>
                {rejectionReason && (
                  <p className="text-sm text-red-700 mt-2">{rejectionReason}</p>
                )}
              </div>
            </div>
          </div>

          {/* Reapplication Status with Countdown */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reapplication Status</h3>
            {canReapply ? (
              <div className="space-y-4">
                <p className="text-gray-700">
                  You are now eligible to submit a new application. Please review the requirements and ensure all documentation is up to date.
                </p>
                <button
                  onClick={onReapply}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Start New Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">{timeRemaining.days}</div>
                    <div className="text-sm text-gray-500">Days</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">{timeRemaining.hours}</div>
                    <div className="text-sm text-gray-500">Hours</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">{timeRemaining.minutes}</div>
                    <div className="text-sm text-gray-500">Minutes</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">{timeRemaining.seconds}</div>
                    <div className="text-sm text-gray-500">Seconds</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${progress()}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Time remaining until you can reapply
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Application Timeline */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">Application Timeline</h3>
              <div className="border-l-2 border-gray-200 pl-4 space-y-6">
                <div className="relative">
                  <div className="absolute -left-[25px] mt-1">
                    <div className="h-4 w-4 rounded-full bg-gray-200 border-2 border-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Application Submitted</p>
                    <p className="text-sm text-gray-500">{applicationDate}</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] mt-1">
                    <div className="h-4 w-4 rounded-full bg-red-500 border-2 border-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Application Rejected</p>
                    <p className="text-sm text-gray-500">{rejectionDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Next Steps</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <RefreshCcw className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Reapplication Period</p>
                    <p className="text-sm text-gray-500">You can reapply after the cooldown period</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileText className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Review Requirements</p>
                    <p className="text-sm text-gray-500">Check our updated seller guidelines</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Schedule Consultation</p>
                    <p className="text-sm text-gray-500">Book a call with our seller support team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Reasons Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Common Reasons & Improvements</h2>
          <div className="grid gap-6">
            {commonReasons.map((reason, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <h3 className="font-medium text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-gray-500 text-sm">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6 sm:p-8 text-white">
          <h2 className="text-xl font-bold mb-6">Get Help With Your Application</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <PhoneCall className="w-6 h-6 mr-4" />
              <div>
                <p className="font-medium">Schedule a Call</p>
                <p className="text-gray-300">Book a consultation with our team</p>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="w-6 h-6 mr-4" />
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-gray-300">seller.support@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectedStatus;