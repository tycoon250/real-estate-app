import React, { useState } from 'react';
import { Search, Home, Key, Calculator, FileText, Users, ChevronDown, ChevronRight, Phone, Mail, MessageSquare, Clock, ArrowRight } from 'lucide-react';

function HelpCenter() {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const categories = [
    {
      id: 'buying',
      icon: <Home className="h-6 w-6" />,
      title: 'Buying a Property',
      questions: [
        {
          q: 'What are the steps to buying a property?',
          a: 'The process includes getting pre-approved for a mortgage, house hunting, making an offer, home inspection, and closing. Our agents will guide you through each step.'
        },
        {
          q: 'How much down payment do I need?',
          a: 'Down payment requirements vary, but typically range from 3.5% to 20% of the purchase price. We can help you understand your options and find the best financing solution.'
        },
        {
          q: 'How long does the buying process take?',
          a: 'The typical home buying process takes 30-60 days from offer acceptance to closing, but this can vary based on various factors.'
        }
      ]
    },
    {
      id: 'selling',
      icon: <Key className="h-6 w-6" />,
      title: 'Selling Your Home',
      questions: [
        {
          q: 'How do I determine my home\'s value?',
          a: 'We provide a comprehensive market analysis considering recent sales, current market conditions, and your home\'s unique features.'
        },
        {
          q: 'What improvements should I make before selling?',
          a: 'Focus on repairs and improvements that offer the best return on investment. Our agents can provide specific recommendations for your property.'
        },
        {
          q: 'How long will it take to sell my home?',
          a: 'Market time varies based on location, price point, and market conditions. We\'ll provide a detailed timeline based on current market analysis.'
        }
      ]
    },
    {
      id: 'mortgage',
      icon: <Calculator className="h-6 w-6" />,
      title: 'Mortgage & Financing',
      questions: [
        {
          q: 'What types of mortgages are available?',
          a: 'Common options include conventional, FHA, VA, and jumbo loans. We can connect you with trusted lenders to find the best fit.'
        },
        {
          q: 'How do I get pre-approved for a mortgage?',
          a: 'Pre-approval requires submitting financial documents to a lender. We can recommend reliable lenders who will guide you through the process.'
        }
      ]
    },
    {
      id: 'legal',
      icon: <FileText className="h-6 w-6" />,
      title: 'Legal & Documentation',
      questions: [
        {
          q: 'What documents do I need when buying/selling?',
          a: 'Required documents include proof of identity, income verification, property records, and various legal forms. We\'ll provide a detailed checklist.'
        },
        {
          q: 'Do I need a real estate attorney?',
          a: 'While not always required, we recommend legal representation to protect your interests. We can refer you to experienced real estate attorneys.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">How can we help you?</h1>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full pl-12 pr-4 py-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition cursor-pointer">
            <MessageSquare className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <h3 className="font-semibold text-gray-900">Live Chat</h3>
              <p className="text-sm text-gray-600">Chat with our support team</p>
            </div>
          </div>
          <div className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition cursor-pointer">
            <Phone className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <h3 className="font-semibold text-gray-900">Call Us</h3>
              <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition cursor-pointer">
            <Clock className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <h3 className="font-semibold text-gray-900">Schedule a Meeting</h3>
              <p className="text-sm text-gray-600">Book time with an agent</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
        <div className="grid gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div className="flex items-center">
                  <div className="bg-blue-50 p-3 rounded-lg mr-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                </div>
                {openCategory === category.id ? (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openCategory === category.id && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    {category.questions.map((item, index) => (
                      <div key={index} className="border-t pt-4">
                        <h4 className="text-lg font-medium text-gray-900 mb-2">{item.q}</h4>
                        <p className="text-gray-600">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Still need help?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our dedicated support team is here to assist you with any questions or concerns you may have.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-xl">
              <Mail className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Email Support</h3>
              <p className="text-gray-400 mb-4">Get in touch with our support team for detailed assistance.</p>
              <button className="flex items-center text-blue-400 hover:text-blue-300 transition">
                Send email <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <Users className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Visit an Office</h3>
              <p className="text-gray-400 mb-4">Meet with our agents in person at one of our locations.</p>
              <button className="flex items-center text-blue-400 hover:text-blue-300 transition">
                Find nearest office <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;