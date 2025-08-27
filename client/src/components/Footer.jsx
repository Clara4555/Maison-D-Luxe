// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-charcoal-900 text-primary-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-serif font-bold mb-4">Maison DéLuxe</h3>
            <p className="text-primary-300">
              Where culinary artistry meets elegant ambiance since 2010.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-serif font-bold mb-4">Hours</h3>
            <ul className="space-y-2 text-primary-300">
              <li>Monday - Thursday: 5PM - 10PM</li>
              <li>Friday - Saturday: 5PM - 11PM</li>
              <li>Sunday: 5PM - 9PM</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-serif font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-primary-300">
              <li>123 Gourmet Avenue</li>
              <li>New York, NY 10001</li>
              <li>(212) 555-1234</li>
              <li>info@maisondeluxe.com</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-serif font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {['Instagram', 'Facebook', 'Twitter'].map((social, index) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-primary-300 hover:text-gold-400 transition-colors"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-charcoal-700 mt-12 pt-8 text-center text-primary-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>© {new Date().getFullYear()} Maison DéLuxe. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;