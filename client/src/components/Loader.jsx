import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Loader = () => {
  const wineGlassRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Wine glass spinning animation
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(wineGlassRef.current, {
      rotation: 360,
      duration: 2,
      ease: "power2.inOut"
    })
    .to(wineGlassRef.current, {
      scale: 1.1,
      duration: 0.5,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    }, "-=1");

    // Text animation
    gsap.fromTo(textRef.current, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      ease: "power2.out"
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-wine-900 via-charcoal-900 to-wine-800 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <div ref={wineGlassRef} className="w-24 h-24 mx-auto mb-8">
          <svg viewBox="0 0 100 100" className="w-full h-full text-gold-400">
            <path
              d="M25 20 L75 20 L70 45 Q70 60 50 60 Q30 60 30 45 Z M50 60 L50 80 M40 80 L60 80"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="50" cy="35" r="15" fill="currentColor" opacity="0.3" />
          </svg>
        </div>
        
        <div ref={textRef} className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif text-gold-400 font-bold">
            Maison DéLuxe
          </h1>
          <p className="text-primary-200 text-lg font-light tracking-widest">
            CULINARY ARTISTRY AWAITS
          </p>
          
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-gold-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;