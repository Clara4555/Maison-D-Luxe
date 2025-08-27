import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiStar, FiAward } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const Chefs = () => {
  const chefsRef = useRef(null);

  const chefs = [
    {
      id: 1,
      name: 'Chef Antoine Dubois',
      title: 'Executive Chef',
      specialty: 'French Cuisine',
      experience: '25 years',
      awards: ['Michelin Star', 'James Beard Award'],
      bio: 'Master of classical French techniques with a modern twist. Trained at Le Cordon Bleu and worked in prestigious restaurants across Paris before joining Maison DéLuxe.',
      image: 'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg',
      signature: 'Wagyu Beef Wellington'
    },
    {
      id: 2,
      name: 'Chef Isabella Romano',
      title: 'Pastry Chef',
      specialty: 'Desserts & Pastries',
      experience: '18 years',
      awards: ['World Pastry Champion', 'Best Dessert Chef 2023'],
      bio: 'Italian pastry virtuoso known for her artistic dessert presentations. Creates edible masterpieces that are as beautiful as they are delicious.',
      image: 'https://images.pexels.com/photos/3771045/pexels-photo-3771045.jpeg',
      signature: 'Chocolate Soufflé'
    },
    {
      id: 3,
      name: 'Chef Hiroshi Tanaka',
      title: 'Sushi Master',
      specialty: 'Japanese Cuisine',
      experience: '30 years',
      awards: ['Sushi Master Certification', 'Tokyo Culinary Excellence'],
      bio: 'Third-generation sushi master from Tokyo. Brings authentic Japanese techniques and the freshest ingredients to create unforgettable sushi experiences.',
      image: 'https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg',
      signature: 'Omakase Tasting'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.chef-card', {
        y: 100,
        opacity: 0,
        rotationY: 30,
      }, {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: chefsRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
        },
      });
    }, chefsRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      className="pt-24 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-charcoal-900 via-wine-900 to-charcoal-800 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://images.pexels.com/photos/3771045/pexels-photo-3771045.jpeg"
            alt="Kitchen Background"
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
            Meet Our Master Chefs
          </motion.h1>
          <motion.p
            className="text-xl text-primary-200 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            World-renowned culinary artists who bring passion, creativity, and decades of experience to every dish they create.
          </motion.p>
        </div>
      </section>

      {/* Chefs Gallery */}
      <section ref={chefsRef} className="py-20 bg-primary-50 dark:bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {chefs.map((chef, index) => (
              <motion.div
                key={chef.id}
                className={`chef-card grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-cols-[1fr,1fr] lg:gap-12' : ''
                }`}
                style={{ perspective: '1000px' }}
              >
                {/* Chef Image */}
                <motion.div
                  className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                  whileHover={{ 
                    rotateY: 5,
                    rotateX: 5,
                    scale: 1.02,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-wine-600/20 to-gold-500/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300" />
                    <img
                      src={chef.image}
                      alt={chef.name}
                      className="relative w-full h-96 object-cover rounded-2xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>

                {/* Chef Info */}
                <motion.div
                  className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div>
                    <motion.h3
                      className="text-3xl md:text-4xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-2"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      {chef.name}
                    </motion.h3>
                    <p className="text-wine-600 dark:text-gold-400 font-semibold text-lg">
                      {chef.title}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-charcoal-800 p-4 rounded-xl shadow-md">
                      <p className="text-charcoal-600 dark:text-primary-300 text-sm">Specialty</p>
                      <p className="font-semibold text-charcoal-900 dark:text-primary-100">{chef.specialty}</p>
                    </div>
                    <div className="bg-white dark:bg-charcoal-800 p-4 rounded-xl shadow-md">
                      <p className="text-charcoal-600 dark:text-primary-300 text-sm">Experience</p>
                      <p className="font-semibold text-charcoal-900 dark:text-primary-100">{chef.experience}</p>
                    </div>
                  </div>

                  <p className="text-charcoal-700 dark:text-primary-300 leading-relaxed">
                    {chef.bio}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-charcoal-900 dark:text-primary-100 mb-2 flex items-center">
                        <FiAward className="mr-2 text-gold-500" />
                        Awards & Recognition
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {chef.awards.map((award, i) => (
                          <span
                            key={i}
                            className="bg-gradient-to-r from-wine-600 to-gold-500 text-white px-3 py-1 rounded-full text-sm"
                          >
                            {award}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-charcoal-900 dark:text-primary-100 mb-2 flex items-center">
                        <FiStar className="mr-2 text-gold-500" />
                        Signature Dish
                      </h4>
                      <p className="text-wine-600 dark:text-gold-400 font-medium">
                        {chef.signature}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-wine-900 to-charcoal-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold text-white mb-6">
              Experience Their Culinary Artistry
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Book a table and taste the masterpieces created by our world-class chefs.
            </p>
            <motion.button
              className="btn-secondary inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Make a Reservation
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Chefs;