import React from 'react';
import { Home, Key, Search, Calculator, FileText, Users } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Property Listings',
    description: 'Access our extensive portfolio of premium properties, from luxury homes to investment opportunities.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200'
  },
  {
    icon: Search,
    title: 'Property Valuation',
    description: 'Get accurate market valuations backed by comprehensive local market analysis and trends.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200'
  },
  {
    icon: Key,
    title: 'Property Management',
    description: 'Complete property management services including maintenance, tenant screening, and rent collection.',
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80&w=1200'
  },
  {
    icon: Calculator,
    title: 'Investment Advisory',
    description: 'Expert guidance on chika online market investments, market analysis, and portfolio diversification strategies.',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=1200'
  },
  {
    icon: FileText,
    title: 'Legal Assistance',
    description: 'Professional support for all chika online market legal matters, from contracts to closing procedures.',
    image: 'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?auto=format&fit=crop&q=80&w=1200'
  },
  {
    icon: Users,
    title: 'Consultation Services',
    description: 'Personalized consultation sessions with our experienced chika online market professionals.',
    image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80&w=1200'
  }
];

function Services() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          Our Services
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive chika online solutions tailored to meet your property needs, whether you're buying, selling, or investing.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-48">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <service.icon className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
                <button className="mt-4 inline-flex items-center text-green-800 hover:text-blue-700 font-medium">
                  Learn more
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-orange-100 rounded-2xl p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-dack mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-dack mb-8 max-w-2xl mx-auto">
              Connect with our team of chika online market experts today and discover how we can help you achieve your property goals.
            </p>
            <button className="bg-green-800 text-dack px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
              Contact Us Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;