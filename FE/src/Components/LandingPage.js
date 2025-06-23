import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.subject && formData.message) {
      console.log('Form submitted:', formData);
      // Handle form submission here
      alert('Message sent successfully!');
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gray-200 rounded-full opacity-30 -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gray-300 rounded-full opacity-40 translate-x-32 translate-y-32"></div>
      <div className="absolute top-1/2 right-0 w-0 h-0 border-l-[300px] border-l-slate-600 border-t-[200px] border-t-transparent border-b-[200px] border-b-transparent opacity-90"></div>
      
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-4xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Contact info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-gray-100 rounded-2xl">
                <Mail className="w-8 h-8 text-gray-600" />
              </div>
            </div>
            
            <div>
              <h1 className="text-gray-400 text-4xl md:text-5xl font-light mb-2 tracking-wider">
                Contact
              </h1>
              <h2 className="text-slate-700 text-3xl md:text-4xl font-bold leading-tight">
                Leave Us A Message
              </h2>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              For more info or inquiry about our products project, and 
              pricing please feel free to get in touch with us.
            </p>
          </div>

          {/* Right side - Form */}
          <div className="space-y-6">
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name*"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 bg-gray-50"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email*"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 bg-gray-50"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject*"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 bg-gray-50"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  placeholder="Type your message here*"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 bg-gray-50 resize-none"
                ></textarea>
              </div>
              
              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-slate-700 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-slate-300"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;