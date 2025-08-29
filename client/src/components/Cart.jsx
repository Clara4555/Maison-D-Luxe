import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiX, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  return (
    <>
      {/* Cart Toggle Button */}
      <motion.button
        onClick={toggleCart}
        className="fixed bottom-6 right-4 sm:right-20 bg-wine-600 hover:bg-wine-700 text-white p-4 rounded-full shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={items.length > 0 ? { y: [0, -10, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <FiShoppingBag size={24} />
        {items.length > 0 && (
          <motion.span
            className="absolute -top-2 -right-2 bg-gold-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            {items.reduce((sum, item) => sum + item.quantity, 0)}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleCart}
            />

            {/* Cart Panel */}
            <motion.div
              className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-50 dark:bg-charcoal-900 shadow-2xl z-[110] border-l-2 border-wine-200 dark:border-charcoal-700"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b-2 border-wine-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-800">
                  <h2 className="text-xl font-serif font-bold text-charcoal-800 dark:text-primary-100">
                    Your Order
                  </h2>
                  <motion.button
                    onClick={toggleCart}
                    className="p-2 rounded-lg hover:bg-wine-100 dark:hover:bg-charcoal-700 transition-colors text-wine-600 dark:text-primary-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiX size={20} />
                  </motion.button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  {items.length === 0 ? (
                    <div className="text-center text-charcoal-700 dark:text-primary-300 mt-12">
                      <FiShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Your cart is empty</p>
                      <p className="text-sm mt-2">Add some delicious items from our menu!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          className="bg-white dark:bg-charcoal-800 rounded-lg p-4 border border-wine-200 dark:border-charcoal-700 shadow-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          layout
                        >
                          <div className="flex items-start gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium text-charcoal-800 dark:text-primary-100">
                                {item.name}
                              </h3>
                              <p className="text-wine-600 dark:text-gold-400 font-semibold">
                                ${item.price}
                              </p>
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center space-x-3">
                                  <motion.button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-1 rounded-full bg-wine-100 dark:bg-charcoal-700 hover:bg-wine-200 dark:hover:bg-charcoal-600 transition-colors text-wine-600 dark:text-primary-200"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <FiMinus size={12} />
                                  </motion.button>
                                  <span className="w-8 text-center font-medium text-charcoal-800 dark:text-primary-100">
                                    {item.quantity}
                                  </span>
                                  <motion.button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 rounded-full bg-wine-100 dark:bg-charcoal-700 hover:bg-wine-200 dark:hover:bg-charcoal-600 transition-colors text-wine-600 dark:text-primary-200"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <FiPlus size={12} />
                                  </motion.button>
                                </div>
                                <motion.button
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-500 hover:text-red-700 transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <FiX size={16} />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                  <div className="p-6 border-t-2 border-wine-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-800">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-charcoal-800 dark:text-primary-100">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-wine-600 dark:text-gold-400">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    <motion.button
                      className="w-full btn-primary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCheckout}
                    >
                      Checkout - ${total.toFixed(2)}
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;