import React from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What services do you offer?',
    answer: 'We offer a comprehensive range of chika online services including property listings, valuations, property management, investment advisory, legal assistance, and consultation services.',
  },
  {
    question: 'How do I schedule a property viewing?',
    answer: 'You can schedule a property viewing by contacting our team through the website, phone, or email. We\'ll arrange a convenient time for you to visit the property with one of our experienced agents.',
  },
  {
    question: 'What are your fees for property management services?',
    answer: 'Our property management fees vary depending on the services required and the type of property. We offer competitive rates and customized packages to meet your specific needs.',
  },
  {
    question: 'How long does the buying/selling process typically take?',
    answer: 'The duration of the buying/selling process can vary depending on various factors such as market conditions, property type, and financing arrangements. On average, it takes 2-3 months from offer acceptance to completion.',
  },
  {
    question: 'Do you help with mortgage arrangements?',
    answer: 'Yes, we work with trusted mortgage advisors and can connect you with the right professionals to help you secure the best mortgage rates and terms for your property purchase.',
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = React.useState(null);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
              <button
                className="w-full px-6 py-4 flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="h-5 w-5 text-blue-600" />
                ) : (
                  <Plus className="h-5 w-5 text-blue-600" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;