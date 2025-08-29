import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiMapPin, FiPhone } from 'react-icons/fi';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderNumber, order } = location.state || {};

  if (!orderNumber) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-4">
            Order not found
          </h2>
          <Link to="/menu" className="btn-primary">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="pt-24 pb-16 min-h-screen bg-primary-50 dark:bg-charcoal-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.3 }}
          >
            <FiCheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </motion.div>
          
          <h1 className="text-4xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-charcoal-700 dark:text-primary-300 mb-2">
            Thank you for your order
          </p>
          <p className="text-lg font-medium text-wine-600 dark:text-gold-400">
            Order #{orderNumber}
          </p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-charcoal-800 rounded-2xl shadow-lg p-8 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-6">
            Order Details
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-charcoal-900 dark:text-primary-100 mb-4">
                Customer Information
              </h3>
              <div className="space-y-2 text-charcoal-700 dark:text-primary-300">
                <p><strong>Name:</strong> {order?.customer?.name}</p>
                <p><strong>Email:</strong> {order?.customer?.email}</p>
                <p><strong>Phone:</strong> {order?.customer?.phone}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-charcoal-900 dark:text-primary-100 mb-4">
                Order Information
              </h3>
              <div className="space-y-2 text-charcoal-700 dark:text-primary-300">
                <p><strong>Order Type:</strong> {order?.orderType}</p>
                <p><strong>Status:</strong> <span className="capitalize">{order?.status}</span></p>
                <p><strong>Total:</strong> ${order?.total?.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {order?.deliveryAddress && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-charcoal-900 dark:text-primary-100 mb-4">
                <FiMapPin className="inline mr-2" />
                Delivery Address
              </h3>
              <p className="text-charcoal-700 dark:text-primary-300">
                {order.deliveryAddress.street}<br />
                {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
              </p>
            </div>
          )}

          {order?.items && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-charcoal-900 dark:text-primary-100 mb-4">
                Order Items
              </h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-primary-50 dark:bg-charcoal-700 rounded-lg">
                    <span className="text-charcoal-900 dark:text-primary-100">
                      {item.quantity}× {item.name}
                    </span>
                    <span className="font-medium text-wine-600 dark:text-gold-400">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-wine-600 to-wine-700 rounded-2xl p-8 text-white text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <FiClock className="w-8 h-8 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Estimated Delivery Time</h3>
          <p className="text-lg mb-4">45-60 minutes</p>
          <p className="text-primary-200">
            We'll send you updates via email and SMS as your order progresses.
          </p>
        </motion.div>

        <motion.div
          className="text-center mt-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link to="/menu" className="btn-secondary mr-4">
            Order More
          </Link>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OrderConfirmation;