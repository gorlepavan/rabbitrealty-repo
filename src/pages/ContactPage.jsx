import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Check, ChevronDown } from 'lucide-react';
import PageLayout from '../components/common/PageLayout';
import emailjs from 'emailjs-com';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for the field that was changed
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      errors.message = 'Message must be at least 20 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission with EmailJS
      // In a real implementation, you would use your EmailJS credentials
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          });
        }, 5000);
      }, 1500);
    }
  };
  
  const contactInfo = [
    {
      icon: <MapPin size={24} className="text-primary-600" />,
      title: 'Our Location',
      content: (
        <>
          <p>Rabbit Towers, MG Road</p>
          <p>Bangalore, Karnataka 560001</p>
          <p>India</p>
        </>
      )
    },
    {
      icon: <Phone size={24} className="text-primary-600" />,
      title: 'Call Us',
      content: (
        <>
          <p>+91 98765 43210</p>
          <p>+91 87654 32109</p>
        </>
      )
    },
    {
      icon: <Mail size={24} className="text-primary-600" />,
      title: 'Email Us',
      content: (
        <>
          <p>info@rabbitrealty.com</p>
          <p>support@rabbitrealty.com</p>
        </>
      )
    }
  ];

  return (
    <PageLayout title="Contact Us">
      <div className="pt-24 pb-12 bg-secondary-900 text-white">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-white/80 max-w-2xl">
            Have questions about our properties or services? Get in touch with our team and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>
      
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-primary-50 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {info.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold text-secondary-800 mb-3">
                  {info.title}
                </h3>
                <div className="text-secondary-600">
                  {info.content}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <motion.div
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6 bg-secondary-900 text-white">
                <h2 className="font-heading text-2xl font-semibold">Get In Touch</h2>
                <p className="text-white/70 mt-1">
                  Fill out the form below and we'll get back to you shortly
                </p>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2" htmlFor="name">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.name ? 'border-red-500' : ''}`}
                        placeholder="John Doe"
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-xs text-red-600">{formErrors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2" htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.email ? 'border-red-500' : ''}`}
                        placeholder="your@email.com"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-xs text-red-600">{formErrors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2" htmlFor="phone">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2" htmlFor="subject">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.subject ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select a subject</option>
                        <option value="Property Inquiry">Property Inquiry</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Complaint">Complaint</option>
                        <option value="Other">Other</option>
                      </select>
                      {formErrors.subject && (
                        <p className="mt-1 text-xs text-red-600">{formErrors.subject}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-secondary-700 mb-2" htmlFor="message">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`input-field min-h-[150px] ${formErrors.message ? 'border-red-500' : ''}`}
                      placeholder="Please provide details about your inquiry..."
                    ></textarea>
                    {formErrors.message && (
                      <p className="mt-1 text-xs text-red-600">{formErrors.message}</p>
                    )}
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center py-3"
                    disabled={isSubmitting || isSubmitted}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <Check size={20} className="mr-2" />
                        Message Sent Successfully
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                <div className="p-6 bg-secondary-900 text-white">
                  <h2 className="font-heading text-2xl font-semibold">Our Office Location</h2>
                  <p className="text-white/70 mt-1">
                    Visit us at our office in Bangalore
                  </p>
                </div>
                
                <div className="h-[400px] w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9342825612035!2d77.59784087479837!3d12.971387914961175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1679b5cbed77%3A0x5bb6890e48212f43!2sMG%20Road%2C%20Bengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1704354104151!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-secondary-800 mb-4">
                    Office Hours
                  </h3>
                  <div className="space-y-3 text-secondary-600">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="section-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-primary-500 mx-auto mt-2 mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.p 
              className="text-secondary-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Find answers to commonly asked questions about our services and properties
            </motion.p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: 'How do I schedule a property viewing?',
                answer: 'You can schedule a property viewing by contacting the property agent directly through the property details page. Alternatively, you can fill out the contact form on this page with your request, and one of our agents will get in touch with you promptly.'
              },
              {
                question: 'What documents do I need to buy a property?',
                answer: 'To purchase a property in India, you generally need identity proof (Aadhar Card, PAN Card, Passport), address proof, income proof (ITR, salary slips), and bank statements. Additional documents may be required for home loans. Our agents can guide you through the specific requirements based on your situation.'
              },
              {
                question: 'Do you help with home loans?',
                answer: 'Yes, we have partnerships with several major banks and financial institutions in India. Our team can assist you in finding the best home loan options suited to your needs and help with the application process.'
              },
              {
                question: 'What are the maintenance charges for properties?',
                answer: 'Maintenance charges vary depending on the property type, location, and amenities provided. These details are listed on each property page. For apartments and gated communities, maintenance typically covers security, common area upkeep, and basic utilities.'
              },
              {
                question: 'How long does the property buying process take?',
                answer: 'The property buying process in India typically takes between 30-90 days from initial agreement to final registration. This timeline can vary based on factors such as documentation, loan processing, and registration procedures in different states.'
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="mb-4 bg-white rounded-xl shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-6">
                    <h3 className="font-heading text-lg font-semibold text-secondary-800">
                      {faq.question}
                    </h3>
                    <div className="text-primary-600 group-open:rotate-180 transition-transform">
                      <ChevronDown size={20} />
                    </div>
                  </summary>
                  <div className="px-6 pb-6 text-secondary-600">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactPage; 