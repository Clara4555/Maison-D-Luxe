import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const success = await register(formData.name, formData.email, formData.password);
      if (success) {
        navigate('/login');
      }
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      className="pt-24 pb-16 min-h-screen bg-primary-50 dark:bg-charcoal-900 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-md w-full mx-4">
        <motion.div
          className="bg-white dark:bg-charcoal-800 rounded-2xl shadow-2xl p-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-2">
              Join Maison DéLuxe
            </h1>
            <p className="text-charcoal-600 dark:text-primary-300">
              Create your account for a personalized experience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-charcoal-700 dark:text-primary-300 font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-charcoal-700 dark:text-primary-300 font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-charcoal-700 dark:text-primary-300 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-charcoal-700 dark:text-primary-300 font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-primary-200 dark:border-charcoal-600 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-transparent bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-primary-100"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-charcoal-600 dark:text-primary-300">
              Already have an account?{' '}
              <Link to="/login" className="text-wine-600 dark:text-gold-400 hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserRegister;