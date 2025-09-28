"use client";
import React, { useState, useRef } from "react";
import { Button } from "../../components/ui/Button";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const ContactPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    try {
      setIsSubmitting(true);

      // Get form data
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset form
      formRef.current.reset();

      // Show success message
      setShowSuccessPopup(true);

      // Hide popup after delay
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const contactMethods = [
    {
      icon: "✉️",
      title: "Email Us",
      description: "Send us a message and we'll respond within 24 hours.",
      contact: "hello@loopit.com",
      action: "Send Email",
    },
    {
      icon: "📞",
      title: "Call Us",
      description: "Speak directly with our support team.",
      contact: "+1 (111) 111-1111",
      action: "Call Now",
    },
    {
      icon: "💬",
      title: "Live Chat",
      description: "Get instant support through our live chat.",
      contact: "Available 9 AM - 6 PM MST",
      action: "Start Chat",
    },
    {
      icon: "📍",
      title: "Visit Us",
      description: "Come see us at our eco-friendly headquarters.",
      contact: "Sun Devil Fitness Complex",
      action: "Get Directions",
    },
  ];

  const faqs = [
    {
      question: "Why not just delete files or factory reset a device?",
      answer:
        "Deleting or resetting does not securely remove data. Anyone with recovery tools can still retrieve files. Our process follows NIST SP 800-88 standards (industry-recognized), ensuring data is permanently erased and auditable.",
    },
    {
      question: "Aren’t there already wiping tools like DBAN or Blancco?",
      answer:
        "Yes, but most tools either don’t generate verifiable certificates needed for compliance or donations, or require expensive licenses. We combine secure wipe logs with tamper-evident certificates and sustainability metrics in one easy workflow.",
    },
    {
      question: "Why would organizations trust your certificate?",
      answer:
        "We follow NIST-compliant sanitization methods, generate digitally signed certificates with QR verification, and provide a transparent audit trail of who wiped, when, and how. This builds trust with NGOs, regulators, and auditors.",
    },
    {
      question: "What about companies that prefer shredding drives?",
      answer:
        "Some industries like finance, defense, and healthcare will always destroy drives. But schools, SMBs, and nonprofits often want to reuse, they just lack affordable, verifiable wiping. We’re solving for that audience first.",
    },
    {
      question: "What happens if a wipe log is incomplete or tampered with?",
      answer:
        "Our backend verifies logs automatically. If a wipe is incomplete, the device is flagged as 'Wipe Failed' and no certificate is issued. This prevents false claims and ensures only properly wiped devices are certified.",
    },
    {
      question: "How does this reduce e-waste?",
      answer:
        "By giving organizations confidence to donate instead of destroy. Each verified certificate proves the device is safe to reuse, unlocking devices for schools, NGOs, and communities instead of landfills.",
    },
    {
      question: "What about devices that are too old or locked (BIOS/iCloud)?",
      answer:
        "Not all devices can be reused. Our platform can classify them: reusable devices are certified and sent to donation, while non-reusable ones are marked for responsible recycling. This closes the loop responsibly.",
    },
    {
      question: "How is the CO₂ impact calculated?",
      answer:
        "We use standard lifecycle analysis values. For example, one reused laptop saves ~200 kg CO₂ compared to manufacturing a new one. Each certificate includes an impact score that organizations can use in ESG reports.",
    },
    {
      question: "Who can use this platform?",
      answer:
        "Businesses and schools can clear old IT closets with confidence, nonprofits and NGOs can receive working certified devices, and refurbishers or recyclers can simplify intake with verified wipe proof.",
    },
    {
      question: "What’s the business model?",
      answer:
        "We offer per-device certificate fees ($1–3), organization subscriptions for unlimited wipes and reporting, and in the future, carbon credit integration so organizations can offset and report sustainability impact.",
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
                Have Questions? We're Here to Help!
              </span>
            </h1>
            <p className="text-xl text-green-800 mb-8 max-w-2xl mx-auto leading-relaxed">
              Have a question or want to collaborate? Let&apos;s make sure every
              retired device finds a second life safely and sustainably.
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
                className="flex flex-col justify-around items-center bg-white/60 backdrop-blur-sm rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 border border-white/50"
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
              <p className="text-green-600/90 mb-8">
                Fill out the form below and we&apos;ll get back to you as soon
                as possible.
              </p>

              {/* Success Popup */}
              <div
                className={`
                  fixed top-4 right-4 
                  bg-green-100 border border-green-500 
                  text-green-700 px-6 py-4 rounded-xl 
                  shadow-lg flex items-center space-x-3
                  transition-all duration-500 transform
                  ${
                    showSuccessPopup
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-12 opacity-0 pointer-events-none"
                  }
                  z-50
                `}
              >
                <div className="flex-shrink-0 bg-green-50 rounded-full p-2">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Success!</p>
                  <p className="text-sm text-green-600">
                    Your message has been sent successfully.
                  </p>
                </div>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-6"
                method="POST"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-green-700 font-medium mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-green-700 font-medium mb-2"
                    >
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
                  <label
                    htmlFor="email"
                    className="block text-green-700 font-medium mb-2"
                  >
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
                  <label
                    htmlFor="subject"
                    className="block text-green-700 font-medium mb-2"
                  >
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
                  <label
                    htmlFor="message"
                    className="block text-green-700 font-medium mb-2"
                  >
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

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <h2 className="text-3xl font-bold text-green-800 mb-6">
                Visit Our Office
              </h2>
              <p className="text-green-600/80 mb-8">
                Located in the heart of the eco-district, our office is designed
                with sustainability in mind. Stop by for a tour!
              </p>

              {/* Office Image */}
              <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/images/Sun Devil Fitness Complex.jpg"
                  alt="Sun Devil Fitness Complex"
                  width={800}
                  height={450}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Office Info */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 mt-1">📍</div>
                  <div>
                    <p className="font-medium text-green-800">Address</p>
                    <p className="text-green-600/80">
                      Sun Devil Fitness Complex
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 mt-1">🕒</div>
                  <div>
                    <p className="font-medium text-green-800">Office Hours</p>
                    <p className="text-green-600/80">
                      Mon - Fri: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-green-600/80">Sat: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 mt-1">🚌</div>
                  <div>
                    <p className="font-medium text-green-800">
                      Public Transport
                    </p>
                    <p className="text-green-600/80">
                      Green Line Metro - Eco Station
                    </p>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-6 ">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-green-600">
              Find quick answers to the most common questions about Loop It.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.slice(0, showAllFaqs ? faqs.length : 4).map((faq, index) => (
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
              Still have questions? Contact Us
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAllFaqs(!showAllFaqs)}
            >
              {showAllFaqs ? "Show Less FAQs" : "View All FAQs"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
