import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
    
    alert('Thank you for your message! We will get back to you soon.');
  };

  const contactInfo = [
    {
      icon: <FiPhone />,
      title: 'Phone',
      info: '+1 (555) 123-4567',
      description: 'Call us for reservations'
    },
    {
      icon: <FiMail />,
      title: 'Email',
      info: 'hello@maisondeluxe.com',
      description: 'Send us a message'
    },
    {
      icon: <FiMapPin />,
      title: 'Address',
      info: '123 Culinary Boulevard, Gourmet District, NY 10001',
      description: 'Visit our flagship location'
    },
    {
      icon: <FiClock />,
      title: 'Hours',
      info: 'Mon-Sun: 5:00 PM - 11:00 PM',
      description: 'Dinner service only'
    }
  ];

  return (
    <motion.div
      className="pt-24 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-wine-900 via-charcoal-900 to-wine-800">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg"
            alt="Restaurant Interior"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-5xl md:text-6xl font-serif font-bold text-white mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="text-xl text-primary-200 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-primary-50 dark:bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-charcoal-800 p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl text-wine-600 dark:text-gold-400 mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-charcoal-700 dark:text-primary-200 font-medium mb-2">
                  {item.info}
                </p>
                <p className="text-charcoal-600 dark:text-primary-300 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-white dark:bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-8">
                Send Us a Message
              </h2>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-charcoal-700 dark:text-primary-300 font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100 transition-colors"
                      placeholder="Your full name"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-charcoal-700 dark:text-primary-300 font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100 transition-colors"
                      placeholder="your@email.com"
                    />
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-charcoal-700 dark:text-primary-300 font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100 transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-charcoal-700 dark:text-primary-300 font-medium mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100 transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="reservation">Reservation Inquiry</option>
                      <option value="event">Private Event</option>
                      <option value="catering">Catering Services</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-charcoal-700 dark:text-primary-300 font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100 transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Map */}
            <motion.div
              className="h-96 lg:h-full"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-full bg-primary-200 dark:bg-charcoal-700 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1647043432409!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Maison DéLuxe Location"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;