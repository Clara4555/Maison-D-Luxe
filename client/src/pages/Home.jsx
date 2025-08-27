import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FiStar, FiArrowRight, FiClock, FiMapPin, FiPhone } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax effect
      gsap.to('.hero-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Features animation
      gsap.fromTo('.feature-card', {
        y: 100,
        opacity: 0,
        rotateY: 30,
      }, {
        y: 0,
        opacity: 1,
        rotateY: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
        },
      });

      // 3D text effect
      gsap.utils.toArray('.text-3d').forEach(text => {
        gsap.set(text, { transformPerspective: 1000 });
        
        text.addEventListener('mousemove', (e) => {
          const rect = text.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateY = ((x - centerX) / centerX) * 10;
          const rotateX = ((centerY - y) / centerY) * 10;
          
          gsap.to(text, {
            rotationY: rotateY,
            rotationX: rotateX,
            transformPerspective: 1000,
            transformOrigin: "center center",
            ease: "power2.out",
            duration: 0.5
          });
        });
        
        text.addEventListener('mouseleave', () => {
          gsap.to(text, {
            rotationY: 0,
            rotationX: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)"
          });
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const heroSlides = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg',
      title: 'Maison DéLuxe',
      subtitle: 'Where Culinary Artistry Meets Elegant Ambiance'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
      title: 'Exquisite Dining',
      subtitle: 'A Symphony of Flavors in Every Bite'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
      title: 'Michelin-Starred',
      subtitle: 'Recognized Excellence in Gastronomy'
    }
  ];

  const featuredDishes = [
    {
      id: 1,
      name: 'Wagyu Beef Wellington',
      description: 'Premium wagyu wrapped in golden pastry with truffle mousse',
      price: 85,
      image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg'
    },
    {
      id: 2,
      name: 'Lobster Thermidor',
      description: 'Fresh lobster with cognac cream sauce and gruyère cheese',
      price: 65,
      image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg'
    },
    {
      id: 3,
      name: 'Truffle Risotto',
      description: 'Arborio rice with black truffle shavings and parmesan foam',
      price: 45,
      image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg'
    },
    {
      id: 4,
      name: 'Foie Gras Terrine',
      description: 'Luxurious duck liver pâté with brioche and fig compote',
      price: 55,
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg'
    },
    {
      id: 5,
      name: 'Chocolate Soufflé',
      description: 'Warm chocolate soufflé with vanilla bean ice cream',
      price: 35,
      image: 'https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg'
    },
    {
      id: 6,
      name: 'Scallop Ceviche',
      description: 'Fresh scallops with citrus marinade and avocado mousse',
      price: 42,
      image: 'https://images.pexels.com/photos/1234535/pexels-photo-1234535.jpeg'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Food Critic',
      rating: 5,
      comment: 'An extraordinary culinary journey. Every dish is a masterpiece that tells a story of passion and precision.',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
    },
    {
      name: 'Marcus Johnson',
      role: 'Restaurant Owner',
      rating: 5,
      comment: 'The attention to detail and flavor combinations are unmatched in the city. A true gastronomic delight.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Wine Enthusiast',
      rating: 5,
      comment: 'Perfect wine pairings and an ambiance that takes your breath away. The sommelier is a genius!',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    },
    {
      name: 'James Wilson',
      role: 'Travel Blogger',
      rating: 5,
      comment: 'From the amuse-bouche to the final dessert, every moment was perfection. Worth every penny.',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
    }
  ];

  const restaurantFeatures = [
    {
      title: 'Farm to Table',
      description: 'We source ingredients directly from local farms for maximum freshness and sustainability',
      icon: '🌱'
    },
    {
      title: 'Sommelier Selection',
      description: 'Expertly curated wine pairings from our 500+ bottle cellar for each dish',
      icon: '🍷'
    },
    {
      title: 'Chef\'s Table',
      description: 'Exclusive 8-seat dining experience with personalized menu by our head chef',
      icon: '👨‍🍳'
    },
    {
      title: 'Seasonal Menu',
      description: 'Our menu changes monthly to showcase ingredients at their peak season',
      icon: '🍂'
    },
    {
      title: 'Mixology Bar',
      description: 'Craft cocktails using house-made infusions and rare spirits',
      icon: '🍸'
    },
    {
      title: 'Private Dining',
      description: 'Elegant private rooms for special occasions and business events',
      icon: '🎉'
    }
  ];

  const awards = [
    {
      year: '2023',
      name: 'Michelin Star',
      description: 'Awarded for culinary excellence and innovation'
    },
    {
      year: '2022',
      name: 'World\'s 50 Best',
      description: 'Ranked #32 in the world\'s best restaurants'
    },
    {
      year: '2021',
      name: 'AAA Five Diamond',
      description: 'Only 0.4% of restaurants achieve this honor'
    },
    {
      year: '2020',
      name: 'James Beard Award',
      description: 'Outstanding Chef: Antoine Moreau'
    }
  ];

  const teamMembers = [
    {
      name: 'Antoine Moreau',
      role: 'Executive Chef',
      bio: 'Trained in Paris and Tokyo, brings 25 years of Michelin-starred experience',
      image: 'https://images.pexels.com/photos/8438916/pexels-photo-8438916.jpeg'
    },
    {
      name: 'Isabella Rossi',
      role: 'Pastry Chef',
      bio: 'Specializes in modern interpretations of classic French desserts',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    },
    {
      name: 'Marcus Chen',
      role: 'Head Sommelier',
      bio: 'Wine director with expertise in rare vintages and food pairings',
      image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg'
    },
    {
      name: 'Sophie Laurent',
      role: 'General Manager',
      bio: 'Creates unforgettable dining experiences with impeccable service',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="overflow-hidden"
    >
      {/* Hero Section with Auto-sliding 3D effect */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={true}
          speed={1000}
          className="w-full h-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="hero-bg absolute inset-0 bg-gradient-to-r from-black/60 to-black/40">
                <img
                  src={slide.image}
                  alt="Restaurant Interior"
                  className="w-full h-full object-cover transform scale-110"
                  style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                />
              </div>
              
              <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
                <motion.div
                  className="max-w-4xl"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 text-shadow text-3d"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {slide.title}
                  </motion.h1>
                  
                  <motion.p
                    className="text-xl md:text-2xl lg:text-3xl mb-8 font-light tracking-wide"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.9 }}
                  >
                    {slide.subtitle}
                  </motion.p>
                  
                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1.1 }}
                  >
                    <Link 
                      to="/menu" 
                      className="btn-primary group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        Explore Our Menu
                        <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-wine-600 to-wine-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                    <Link 
                      to="/reservations" 
                      className="btn-secondary group relative overflow-hidden"
                    >
                      <span className="relative z-10">Make Reservation</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-charcoal-700 to-charcoal-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </section>

      {/* About Section with 3D elements */}
      <section className="py-20 bg-primary-100 dark:bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-4 text-3d">
              Our Story
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-wine-600 to-gold-500 mx-auto mb-6"></div>
            <p className="text-lg text-charcoal-700 dark:text-primary-300 max-w-3xl mx-auto">
              Founded in 2010 by Chef Antoine Moreau, Maison DéLuxe has been redefining fine dining with our innovative approach to classic French cuisine. Our Michelin-starred kitchen brings a wealth of international experience to create dishes that are as visually stunning as they are delicious.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ rotateY: 5, scale: 1.02 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.img
                src="https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg"
                alt="Chef preparing food"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05, rotateZ: 0.5 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-8"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-3xl font-serif font-bold text-white">Our Kitchen</h3>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-4">
                Culinary Excellence
              </h3>
              <p className="text-charcoal-600 dark:text-primary-300 mb-6">
                Our philosophy is simple: use the finest ingredients, apply expert techniques, and present with artistic flair. Each dish tells a story of tradition meeting innovation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {restaurantFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-charcoal-700 p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -5,
                      rotateZ: 0.5,
                      scale: 1.03,
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="text-3xl mb-3">{feature.icon}</div>
                    <h4 className="text-lg font-bold text-charcoal-900 dark:text-primary-100 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-charcoal-600 dark:text-primary-300">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-gradient-to-br from-charcoal-900 to-wine-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 text-3d">
              Awards & Recognition
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mb-6"></div>
            <p className="text-lg text-primary-200 max-w-2xl mx-auto">
              Our commitment to excellence has been recognized by the most prestigious institutions in gastronomy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 hover:border-gold-400 transition-all"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  rotateZ: 0.5,
                  boxShadow: '0 10px 25px rgba(212, 175, 55, 0.3)'
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-gold-400 text-4xl font-bold mb-2">{award.year}</div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">{award.name}</h3>
                <p className="text-primary-200">{award.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-primary-50 dark:bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-4 text-3d">
              Meet Our Team
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-wine-600 to-gold-500 mx-auto mb-6"></div>
            <p className="text-lg text-charcoal-700 dark:text-primary-300 max-w-2xl mx-auto">
              The talented individuals who make Maison DéLuxe an unforgettable experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="group bg-white dark:bg-charcoal-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  rotateY: 5,
                  rotateX: 2,
                  scale: 1.03,
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative overflow-hidden h-64">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <p className="text-gold-400 font-medium">{member.role}</p>
                      <p className="text-white text-sm">{member.bio}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-charcoal-600 dark:text-primary-300">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes with 3D hover */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-primary-100 dark:from-charcoal-900 dark:to-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-4 text-3d">
              Signature Creations
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-wine-600 to-gold-500 mx-auto mb-6"></div>
            <p className="text-lg text-charcoal-700 dark:text-primary-300 max-w-2xl mx-auto">
              Experience our chef's signature dishes, crafted with the finest ingredients and artistic precision.
            </p>
          </motion.div>

          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: true,
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            loop
            className="pb-12"
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {featuredDishes.map((dish, index) => (
              <SwiperSlide key={dish.id} className="max-w-sm">
                <motion.div
                  className="group bg-white dark:bg-charcoal-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full"
                  initial={{ y: 50, opacity: 0, rotateY: 30 }}
                  whileInView={{ y: 0, opacity: 1, rotateY: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    rotateY: 10,
                    rotateX: 5,
                    scale: 1.05,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative overflow-hidden h-64">
                    <motion.img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1, rotate: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white text-sm">{dish.description}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-2">
                      {dish.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-wine-600 dark:text-gold-400">
                        ${dish.price}
                      </span>
                      <motion.button
                        className="bg-wine-600 hover:bg-wine-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gradient-to-r from-wine-900 to-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 text-3d">
              Guest Experiences
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto"></div>
          </motion.div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 8000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="glass-effect text-center p-8 rounded-2xl h-full"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -5,
                    rotateZ: 0.5,
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-gold-400"
                    whileHover={{ scale: 1.05, rotateY: 10 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="text-gold-400 fill-current" size={20} />
                    ))}
                  </div>
                  
                  <p className="text-primary-200 mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  
                  <div className="text-white">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-primary-300">{testimonial.role}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Contact & Hours Section */}
      <section className="py-20 bg-primary-100 dark:bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="bg-white dark:bg-charcoal-900 p-8 rounded-2xl shadow-xl"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                rotateZ: 0.5,
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <h3 className="text-3xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-6">
                Visit Us
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-wine-100 dark:bg-wine-900 p-3 rounded-full mr-4">
                    <FiMapPin className="text-wine-600 dark:text-wine-300" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 dark:text-primary-100 mb-1">Address</h4>
                    <p className="text-charcoal-600 dark:text-primary-300">123 Gourmet Avenue, Culinary District, Paris</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-wine-100 dark:bg-wine-900 p-3 rounded-full mr-4">
                    <FiClock className="text-wine-600 dark:text-wine-300" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 dark:text-primary-100 mb-1">Hours</h4>
                    <p className="text-charcoal-600 dark:text-primary-300">
                      Tuesday - Thursday: 6PM - 10PM<br />
                      Friday - Saturday: 5:30PM - 11PM<br />
                      Sunday: 5PM - 9PM<br />
                      Monday: Closed
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-wine-100 dark:bg-wine-900 p-3 rounded-full mr-4">
                    <FiPhone className="text-wine-600 dark:text-wine-300" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 dark:text-primary-100 mb-1">Reservations</h4>
                    <p className="text-charcoal-600 dark:text-primary-300">+33 1 23 45 67 89</p>
                    <p className="text-charcoal-600 dark:text-primary-300">reservations@maisondeluxe.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="relative rounded-2xl overflow-hidden h-96"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                rotateY: 5,
                scale: 1.02,
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src="https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg"
                alt="Restaurant Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <h3 className="text-3xl font-serif font-bold text-white">Our Dining Room</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={featuresRef} className="py-20 bg-primary-100 dark:bg-charcoal-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            className="feature-card p-12 rounded-3xl bg-gradient-to-r from-wine-700 to-wine-900 shadow-2xl"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.02,
              rotateZ: 0.5,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <h2 className="text-4xl font-serif font-bold text-white mb-6 text-3d">
              Ready for an Unforgettable Experience?
            </h2>
            <p className="text-lg text-primary-200 mb-8">
              Book your table today and embark on a culinary journey that will awaken your senses.
            </p>
            <Link 
              to="/reservations" 
              className="btn-primary inline-flex items-center group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Reserve Your Table
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;