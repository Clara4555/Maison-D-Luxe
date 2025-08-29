import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon, FiShoppingBag } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { items, toggleCart } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Chefs', href: '/chefs' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Reservations', href: '/reservations' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.nav
      className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <motion.h1 
              className="text-2xl md:text-3xl font-serif font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Maison DéLuxe
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group ${
                    location.pathname === item.href
                      ? 'text-wine-600 dark:text-gold-400'
                      : 'text-charcoal-700 dark:text-primary-200 hover:text-wine-600 dark:hover:text-gold-400'
                  }`}
                >
                  {item.name}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-wine-600 dark:bg-gold-400 transition-transform duration-300 ${
                      location.pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* User menu */}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-charcoal-700 dark:text-primary-200 text-sm">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="text-charcoal-700 dark:text-primary-200 hover:text-wine-600 dark:hover:text-gold-400 text-sm font-medium"
                >
                  Logout
                </button>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="bg-wine-600 hover:bg-wine-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                  >
                    Admin
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-charcoal-700 dark:text-primary-200 hover:text-wine-600 dark:hover:text-gold-400 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-wine-600 hover:bg-wine-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-primary-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-charcoal-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </motion.button>

            {/* Cart */}
            <motion.button
              onClick={toggleCart}
              className="relative p-2 rounded-lg bg-primary-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-charcoal-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiShoppingBag size={20} />
              {totalItems > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-wine-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-primary-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-charcoal-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-6 space-y-2 bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-md rounded-lg mt-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                        location.pathname === item.href
                          ? 'text-wine-600 dark:text-gold-400 bg-wine-50 dark:bg-charcoal-800'
                          : 'text-charcoal-700 dark:text-primary-200 hover:text-wine-600 dark:hover:text-gold-400 hover:bg-primary-100 dark:hover:bg-charcoal-800'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;