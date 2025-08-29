import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCreditCard } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [orderData, setOrderData] = useState({
    customer: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    },
    deliveryAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    orderType: 'delivery',
    specialInstructions: ''
  });

  const tax = total * 0.08; // 8% tax
  const finalTotal = total + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setOrderData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setOrderData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderPayload = {
        customer: orderData.customer,
        items: items.map(item => ({
          menuItemId: item.id.toString(),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        subtotal: total,
        tax: tax,
        total: finalTotal,
        deliveryAddress: orderData.orderType === 'delivery' ? orderData.deliveryAddress : null,
        specialInstructions: orderData.specialInstructions,
        orderType: orderData.orderType,
        userId: user?._id
      };

      const response = await axios.post('/api/orders', orderPayload);
      
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/order-confirmation', { 
        state: { 
          orderNumber: response.data.order.orderNumber,
          order: response.data.order 
        } 
      });
    } catch (error) {
      console.error('Order submission error:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-4">
            Your cart is empty
          </h2>
          <p className="text-charcoal-600 dark:text-primary-300 mb-6">
            Add some delicious items from our menu to continue.
          </p>
          <button
            onClick={() => navigate('/menu')}
            className="btn-primary"
          >
            Browse Menu
          </button>
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl font-serif font-bold text-charcoal-900 dark:text-primary-100 text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Complete Your Order
        </motion.h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Form */}
          <motion.div
            className="bg-white dark:bg-charcoal-800 rounded-2xl shadow-lg p-8"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Customer Information */}
              <div>
                <h3 className="text-xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-6">
                  Customer Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-charcoal-700 dark:text-primary-300 font-medium mb-2">
                      <FiUser className="inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="customer.name"
                      value={orderData.customer.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal-700 dark:text-primary-300 font-medium mb-2">
                      <FiMail className="inline mr-2" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="customer.email"
                      value={orderData.customer.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-charcoal-700 dark:text-primary-300 font-medium mb-2">
                    <FiPhone className="inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="customer.phone"
                    value={orderData.customer.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              {/* Order Type */}
              <div>
                <h3 className="text-xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-6">
                  Order Type
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {['delivery', 'pickup', 'dine-in'].map(type => (
                    <label key={type} className="cursor-pointer">
                      <input
                        type="radio"
                        name="orderType"
                        value={type}
                        checked={orderData.orderType === type}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-lg border-2 text-center transition-all ${
                        orderData.orderType === type
                          ? 'border-wine-500 bg-wine-50 dark:bg-wine-900/20'
                          : 'border-primary-200 dark:border-charcoal-600 hover:border-wine-300'
                      }`}>
                        <span className="capitalize font-medium text-charcoal-900 dark:text-primary-100">
                          {type.replace('-', ' ')}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery Address */}
              {orderData.orderType === 'delivery' && (
                <div>
                  <h3 className="text-xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-6">
                    <FiMapPin className="inline mr-2" />
                    Delivery Address
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="deliveryAddress.street"
                      value={orderData.deliveryAddress.street}
                      onChange={handleInputChange}
                      required={orderData.orderType === 'delivery'}
                      className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100"
                      placeholder="Street address"
                    />
                    <div className="grid md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="deliveryAddress.city"
                        value={orderData.deliveryAddress.city}
                        onChange={handleInputChange}
                        required={orderData.orderType === 'delivery'}
                        className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100"
                        placeholder="City"
                      />
                      <input
                        type="text"
                        name="deliveryAddress.state"
                        value={orderData.deliveryAddress.state}
                        onChange={handleInputChange}
                        required={orderData.orderType === 'delivery'}
                        className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100"
                        placeholder="State"
                      />
                      <input
                        type="text"
                        name="deliveryAddress.zipCode"
                        value={orderData.deliveryAddress.zipCode}
                        onChange={handleInputChange}
                        required={orderData.orderType === 'delivery'}
                        className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100"
                        placeholder="ZIP Code"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              <div>
                <label className="block text-charcoal-700 dark:text-primary-300 font-medium mb-2">
                  Special Instructions
                </label>
                <textarea
                  name="specialInstructions"
                  value={orderData.specialInstructions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100 resize-none"
                  placeholder="Any special requests or dietary restrictions..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? (
                  <>
                    <motion.div
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3 inline-block"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Processing Order...
                  </>
                ) : (
                  <>
                    <FiCreditCard className="inline mr-2" />
                    Place Order - ${finalTotal.toFixed(2)}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="bg-white dark:bg-charcoal-800 rounded-2xl shadow-lg p-8"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-6">
              Order Summary
            </h3>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-primary-50 dark:bg-charcoal-700 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-charcoal-900 dark:text-primary-100">
                      {item.name}
                    </h4>
                    <p className="text-charcoal-600 dark:text-primary-300 text-sm">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-wine-600 dark:text-gold-400">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-primary-200 dark:border-charcoal-600 pt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-charcoal-700 dark:text-primary-300">Subtotal</span>
                <span className="font-medium text-charcoal-900 dark:text-primary-100">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-700 dark:text-primary-300">Tax (8%)</span>
                <span className="font-medium text-charcoal-900 dark:text-primary-100">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-primary-200 dark:border-charcoal-600 pt-3">
                <span className="text-charcoal-900 dark:text-primary-100">Total</span>
                <span className="text-wine-600 dark:text-gold-400">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;