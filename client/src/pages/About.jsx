import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiClock, FiUsers, FiAward, FiMapPin } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const timelineRef = useRef(null);
  const statsRef = useRef(null);

  const timelineEvents = [
    {
      year: '1987',
      title: 'The Beginning',
      description: 'Maison DéLuxe opened its doors as a small family restaurant with a vision of culinary excellence.',
      image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg'
    },
    {
      year: '1995',
      title: 'First Michelin Star',
      description: 'Recognition for our commitment to exceptional cuisine and service quality.',
      image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg'
    },
    {
      year: '2003',
      title: 'Expansion',
      description: 'Major renovation and expansion, doubling our seating capacity while maintaining intimate ambiance.',
      image: 'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg'
    },
    {
      year: '2015',
      title: 'Modern Innovation',
      description: 'Introduction of molecular gastronomy techniques while preserving classical French traditions.',
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg'
    },
    {
      year: '2023',
      title: 'Sustainability Focus',
      description: 'Leading the industry in sustainable practices and farm-to-table sourcing.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
    }
  ];

  const stats = [
    {
      icon: <FiClock />,
      number: '36',
      label: 'Years of Excellence',
      description: 'Serving discerning guests since 1987'
    },
    {
      icon: <FiUsers />,
      number: '500K+',
      label: 'Happy Guests',
      description: 'Creating memorable experiences'
    },
    {
      icon: <FiAward />,
      number: '25',
      label: 'Awards Won',
      description: 'Recognition for culinary excellence'
    },
    {
      icon: <FiMapPin />,
      number: '3',
      label: 'Locations',
      description: 'Premium dining destinations'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline animation
      gsap.fromTo('.timeline-item', {
        x: -100,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
        },
      });

      // Stats counter animation
      gsap.fromTo('.stat-item', {
        y: 50,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
        },
      });
    });

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
      <section className="relative py-20 bg-gradient-to-br from-charcoal-900 via-wine-900 to-charcoal-800">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg"
            alt="Restaurant Interior"
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
            Our Story
          </motion.h1>
          <motion.p
            className="text-xl text-primary-200 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A journey of culinary excellence spanning over three decades, where tradition meets innovation in perfect harmony.
          </motion.p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-primary-50 dark:bg-charcoal-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-8">
              Our Philosophy
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-effect p-8 rounded-2xl">
                <h3 className="text-xl font-semibold text-wine-600 dark:text-gold-400 mb-4">
                  Excellence
                </h3>
                <p className="text-charcoal-700 dark:text-primary-300">
                  We pursue perfection in every aspect of the dining experience, from ingredient selection to final presentation.
                </p>
              </div>
              <div className="glass-effect p-8 rounded-2xl">
                <h3 className="text-xl font-semibold text-wine-600 dark:text-gold-400 mb-4">
                  Innovation
                </h3>
                <p className="text-charcoal-700 dark:text-primary-300">
                  While honoring culinary traditions, we embrace modern techniques to create unique and memorable flavors.
                </p>
              </div>
              <div className="glass-effect p-8 rounded-2xl">
                <h3 className="text-xl font-semibold text-wine-600 dark:text-gold-400 mb-4">
                  Hospitality
                </h3>
                <p className="text-charcoal-700 dark:text-primary-300">
                  Every guest is treated like family, ensuring a warm and welcoming atmosphere that complements our cuisine.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-20 bg-white dark:bg-charcoal-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-4">
              Our Journey Through Time
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-wine-600 to-gold-500 mx-auto"></div>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-wine-600 to-gold-500 h-full hidden lg:block"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  className={`timeline-item flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <div className="bg-primary-50 dark:bg-charcoal-700 rounded-2xl p-8 shadow-lg">
                      <div className={`text-center ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                        <div className="text-3xl font-bold text-wine-600 dark:text-gold-400 mb-2">
                          {event.year}
                        </div>
                        <h3 className="text-xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-4">
                          {event.title}
                        </h3>
                        <p className="text-charcoal-700 dark:text-primary-300">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden lg:block w-6 h-6 bg-wine-600 rounded-full border-4 border-white dark:border-charcoal-900 z-10 shadow-lg"></div>

                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:pl-8' : 'lg:pr-8'}`}>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-64 object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-r from-wine-900 to-charcoal-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold text-white mb-4">
              By the Numbers
            </h2>
            <p className="text-primary-200 text-lg">
              Our achievements speak for themselves
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item glass-effect text-center p-8 rounded-2xl"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-4xl text-gold-400 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-primary-200 mb-2">
                  {stat.label}
                </div>
                <p className="text-primary-300 text-sm">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-primary-50 dark:bg-charcoal-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-6">
              Meet the Team Behind the Magic
            </h2>
            <p className="text-lg text-charcoal-700 dark:text-primary-300 mb-8">
              Our passionate team of culinary professionals, led by world-renowned chefs, work tirelessly to create extraordinary dining experiences.
            </p>
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Meet Our Chefs
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;