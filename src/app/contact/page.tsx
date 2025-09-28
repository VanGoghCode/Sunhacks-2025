import React from 'react';
import { Button } from '../../components/ui/Button';

const ContactPage = () => {
  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      description: 'Send us a message and we\'ll respond within 24 hours.',
      contact: 'hello@loopit.com',
      action: 'Send Email',
    },
    {
      icon: '📞',
      title: 'Call Us',
      description: 'Speak directly with our support team.',
      contact: '+1 (555) 123-4567',
      action: 'Call Now',
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Get instant support through our live chat.',
      contact: 'Available 9 AM - 6 PM EST',
      action: 'Start Chat',
    },
    {
      icon: '📍',
      title: 'Visit Us',
      description: 'Come see us at our eco-friendly headquarters.',
      contact: '123 Green Street, Eco City, EC 12345',
      action: 'Get Directions',
    },
  ];

  const faqs = [
    {
      question: 'How do you ensure products are truly sustainable?',
      answer: 'We have a rigorous vetting process that includes third-party certifications, supply chain audits, and environmental impact assessments for all products on our platform.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all products. If you\'re not satisfied, we\'ll provide a full refund or exchange, and we\'ll even handle the eco-friendly packaging for returns.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 50 countries worldwide. We use carbon-neutral shipping methods and partner with local distributors to minimize our environmental footprint.',
    },
    {
      question: 'How can I become a vendor on Loop It?',
      answer: 'We welcome sustainable brands! Apply through our vendor portal with your sustainability certifications, product information, and company values. Our team will review your application within 5 business days.',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-700 via-forest-600 to-green-800 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h1>
            <p className="text-xl text-green-800 mb-8 max-w-2xl mx-auto leading-relaxed">
              Have questions about sustainable living or need help with your order? 
              We&apos;re here to help you on your eco-friendly journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 border border-white/50"
              >
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-bold text-green-800 mb-4">
                  {method.title}
                </h3>
                <p className="text-green-700 mb-4 leading-relaxed">
                  {method.description}
                </p>
                <p className="text-green-700 font-medium mb-6">
                  {method.contact}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  {method.action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <h2 className="text-3xl font-bold text-green-800 mb-6">
                Send Us a Message
              </h2>
              <p className="text-green-600/80 mb-8">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
              
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-green-700 font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-green-700 font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-green-700 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-green-700 font-medium mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Customer Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-green-700 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                
                <Button variant="primary" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <h2 className="text-3xl font-bold text-green-800 mb-6">
                Visit Our Office
              </h2>
              <p className="text-green-600/80 mb-8">
                Located in the heart of the eco-district, our office is designed with 
                sustainability in mind. Stop by for a tour!
              </p>
              
              {/* Map Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-green-200 to-forest-200 rounded-2xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/30 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-green-700 font-medium">Interactive Map</p>
                </div>
              </div>
              
              {/* Office Info */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 mt-1">📍</div>
                  <div>
                    <p className="font-medium text-green-800">Address</p>
                    <p className="text-green-600/80">123 Green Street, Eco City, EC 12345</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 mt-1">🕒</div>
                  <div>
                    <p className="font-medium text-green-800">Office Hours</p>
                    <p className="text-green-600/80">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-green-600/80">Sat: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 mt-1">🚌</div>
                  <div>
                    <p className="font-medium text-green-800">Public Transport</p>
                    <p className="text-green-600/80">Green Line Metro - Eco Station</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-green-600/80">
              Find quick answers to the most common questions about Loop It.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
              >
                <h3 className="text-xl font-bold text-green-800 mb-3">
                  {faq.question}
                </h3>
                <p className="text-green-600/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-green-600/80 mb-4">
              Still have questions?
            </p>
            <Button variant="outline" size="lg">
              View All FAQs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;