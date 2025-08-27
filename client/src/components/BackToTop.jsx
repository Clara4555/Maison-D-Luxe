// src/components/BackToTop.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BackToTop = () => {
  const backToTopRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (self.scroll() > 300) {
          gsap.to(backToTopRef.current, { opacity: 1, y: 0, duration: 0.3 });
        } else {
          gsap.to(backToTopRef.current, { opacity: 0, y: 20, duration: 0.3 });
        }
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      ref={backToTopRef}
      onClick={scrollToTop}
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 bg-wine-600 hover:bg-wine-700 text-white p-3 rounded-full shadow-lg z-30 opacity-0"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <FiArrowUp size={20} />
    </motion.button>
  );
};

export default BackToTop;