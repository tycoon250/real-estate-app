import React, { useState } from 'react';
import { Mail } from 'lucide-react';



const ContactForm = () => {
 const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "eb331954-158f-4ec0-bea8-cd778e4e270a");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gradient-to-tr from-orange-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-700 rounded-full opacity-30 -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-700 rounded-full opacity-40 translate-x-32 translate-y-32"></div>
      <div className="absolute top-1/2 right-0 w-0 h-0  border-l-[300px] border-l-slate-600 border-t-[200px] border-t-transparent border-b-[200px] border-b-transparent opacity-90"></div>
      
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
          <div className=' max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg'>
  <form onSubmit={onSubmit} className="space-y-6">
    <label className="block text-sm font-medium text-gray-700 mb-2"> Your Name</label>
    <input 
      type="text" 
      name='Name' 
      placeholder='Enter your name' 
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
    />
    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
    <input 
      type="Tel" 
      name='Phone' 
      placeholder='Enter your mobile number' 
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
    />
    <label className="block text-sm font-medium text-gray-700 mb-2">Write your masseges here</label>
    <textarea 
      name="Message"  
      rows="6" 
      placeholder='Enter your massage' 
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500 resize-none"
    ></textarea>
    <button 
      type='submit' 
      className='btn dark-btn w-full bg-orange-100 hover:bg-green-700 text-dack font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2'
    >
      Submit now 
    </button>
  </form>
  <span className="block mt-4 text-center text-sm text-gray-600">{result}</span>
</div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;