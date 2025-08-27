import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiUsers, FiUser, FiPhone, FiMail } from 'react-icons/fi';

const Reservations = () => {
  const [reservationData, setReservationData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate reservation submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form after showing success
    setTimeout(() => {
      setShowSuccess(false);
      setReservationData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        specialRequests: ''
      });
    }, 3000);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

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
            alt="Elegant Restaurant Setting"
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
            Reserve Your Table
          </motion.h1>
          <motion.p
            className="text-xl text-primary-200 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Secure your spot for an unforgettable culinary journey at Maison DéLuxe.
          </motion.p>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-20 bg-primary-50 dark:bg-charcoal-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-charcoal-800 rounded-3xl shadow-2xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-wine-600 to-wine-700 px-8 py-6">
              <h2 className="text-2xl font-serif font-bold text-white text-center">
                Book Your Experience
              </h2>
            </div>

            {/* Success Modal */}
            {showSuccess && (
              <motion.div
                className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white dark:bg-charcoal-800 rounded-2xl p-8 max-w-md mx-4 text-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className="text-6xl text-green-500 mb-4">✓</div>
                  <h3 className="text-2xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-2">
                    Reservation Confirmed!
                  </h3>
                  <p className="text-charcoal-700 dark:text-primary-300">
                    Thank you for choosing Maison DéLuxe. We've sent a confirmation email with all the details.
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* Form Content */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-serif font-semibold text-charcoal-900 dark:text-primary-100 mb-6">
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-charcoal-700 dark:text-primary-300 font-medium mb-2">
                        <FiUser className="inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={reservationData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100 transition-all duration-300"
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
                        <FiMail className="inline mr-2" />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={reservationData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-charcoal-700 dark:text-primary-300 font-medium mb-2">
                        <FiPhone className="inline mr-2" />
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={reservationData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100 transition-all duration-300"
                        placeholder="(555) 123-4567"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Reservation Details */}
                <div>
                  <h3 className="text-lg font-serif font-semibold text-charcoal-900 dark:text-primary-100 mb-6">
                    Reservation Details
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-charcoal-700 dark:text-primary-300 font-medium mb-2">
                        <FiCalendar className="inline mr-2" />
                        Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={reservationData.date}
                        onChange={handleInputChange}
                        min={getTomorrowDate()}
                        required
                        className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100 transition-all duration-300"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-charcoal-700 dark:text-primary-300 font-medium mb-2">
                        <FiClock className="inline mr-2" />
                        Time *
                      </label>
                      <select
                        name="time"
                        value={reservationData.time}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100 transition-all duration-300"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-charcoal-700 dark:text-primary-300 font-medium mb-2">
                        <FiUsers className="inline mr-2" />
                        Guests *
                      </label>
                      <select
                        name="guests"
                        value={reservationData.guests}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100 transition-all duration-300"
                      >
                        {[...Array(12)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  </div>
                </div>

                {/* Special Requests */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-charcoal-700 dark:text-primary-300 font-medium mb-2">
                    Special Requests or Dietary Restrictions
                  </label>
                  <textarea
                    name="specialRequests"
                    value={reservationData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100 transition-all duration-300 resize-none"
                    placeholder="Please let us know about any allergies, dietary restrictions, or special occasions..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  className="text-center pt-6"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary px-12 py-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3 inline-block"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Processing Reservation...
                      </>
                    ) : (
                      'Confirm Reservation'
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-white dark:bg-charcoal-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-6">
              Important Information
            </h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-wine-600 dark:text-gold-400 text-xl">🍽️</div>
                <h4 className="font-semibold text-charcoal-900 dark:text-primary-100">Dress Code</h4>
                <p className="text-charcoal-600 dark:text-primary-300 text-sm">Smart casual to formal attire preferred</p>
              </div>
              <div className="space-y-2">
                <div className="text-wine-600 dark:text-gold-400 text-xl">⏰</div>
                <h4 className="font-semibold text-charcoal-900 dark:text-primary-100">Cancellation</h4>
                <p className="text-charcoal-600 dark:text-primary-300 text-sm">Please cancel 24 hours in advance</p>
              </div>
              <div className="space-y-2">
                <div className="text-wine-600 dark:text-gold-400 text-xl">🎉</div>
                <h4 className="font-semibold text-charcoal-900 dark:text-primary-100">Private Events</h4>
                <p className="text-charcoal-600 dark:text-primary-300 text-sm">Contact us for special occasions</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Reservations;