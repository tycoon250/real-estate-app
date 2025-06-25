import React from 'react';
import { MapPin, Home, Users, Star, Award, Building2, Clock, Phone, Mail, ArrowRight } from 'lucide-react';

function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="Modern building exterior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Building Trust Through Excellence in Chika Online Market
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              With over two decades of experience, we've helped thousands of families find their perfect home.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Home className="h-8 w-8 text-green-800" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">2,500+</div>
            <div className="text-gray-600">Properties Sold</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Users className="h-8 w-8 text-green-800 " />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">15,000+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Star className="h-8 w-8 text-green-800" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
            <div className="text-gray-600">Client Rating</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Award className="h-8 w-8 text-green-800" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">20+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Founded in 2025, Premier chika has grown from a small local agency to one of the most trusted names in chika online markert. Our journey has been built on a foundation of integrity, expertise, and unwavering commitment to our clients.
              </p>
              <p className="text-gray-600 mb-8">
                We believe that finding the perfect property is about more than just four walls and a roof it's about finding a place where memories will be made and dreams can flourish.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 text-green-800 mr-2" />
                  <span className="text-gray-700">Full Service Agency</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-green-800 mr-2" />
                  <span className="text-gray-700">24/7 Support</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-green-800 mr-2" />
                  <span className="text-gray-700">Local Expertise</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-green-800 mr-2" />
                  <span className="text-gray-700">Premium Service</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Modern interior"
                className="rounded-lg w-full h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1628744404730-eb21eff01c8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Team meeting"
                className="rounded-lg w-full h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced team of chika online professionals is dedicated to providing exceptional service and expertise to every client.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Founder",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              },
              {
                name: "Michael Chen",
                role: "Head of Sales",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              },
              {
                name: "Emily Rodriguez",
                role: "Operations Director",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.role}</p>
                  <button className="text-green-800 font-medium flex items-center hover:text-blue-700">
                    View Profile <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-orange-100 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dack mb-4">Ready to Start Your Journey?</h2>
              <p className="text-dack max-w-2xl mx-auto">
                Whether you're looking to buy, sell, or invest, our team is here to help you achieve your chika online market goals.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-4 text-dach">
                <Phone className="h-6 w-6" />
                <span className="text-lg">+250 789 355 507</span>
              </div>
              <div className="flex items-center justify-center space-x-4 text-dack">
                <Mail className="h-6 w-6" />
                <span className="text-lg">chikacare26@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;