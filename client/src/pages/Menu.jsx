import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiPlus, FiSearch, FiX, FiFilter, FiChevronLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('starters');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { addItem } = useCart();
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const cardRefs = useRef([]);

  const categories = [
    { id: 'starters', name: 'Starters', icon: '🥗' },
    { id: 'mains', name: 'Main Courses', icon: '🥩' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'drinks', name: 'Beverages', icon: '🍷' },
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: 'under25', name: 'Under $25' },
    { id: '25to50', name: '$25 - $50' },
    { id: 'over50', name: 'Over $50' },
  ];

  const menuItems = {
    starters: [
      {
        id: 1,
        name: 'Oysters Rockefeller',
        description: 'Fresh oysters with spinach, herbs, and butter',
        price: 24,
        image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg',
        tags: ['seafood', 'signature'],
        details: 'Our signature Oysters Rockefeller features fresh oysters sourced daily from the Pacific Northwest, topped with a rich blend of sautéed spinach, herbs, and clarified butter, then baked to perfection. Served with lemon wedges and our house-made mignonette sauce.'
      },
      {
        id: 2,
        name: 'Foie Gras Terrine',
        description: 'Classic French delicacy with brioche toast',
        price: 32,
        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
        tags: ['luxury', 'signature'],
        details: 'An exquisite terrine of Hudson Valley foie gras, slow-cooked with Sauternes wine and spices, served with toasted brioche, fig compote, and a sprinkle of fleur de sel. Each bite melts in your mouth with rich, buttery flavors.'
      },
      {
        id: 3,
        name: 'Tuna Tartare',
        description: 'Yellowfin tuna with avocado and citrus',
        price: 28,
        image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
        tags: ['seafood', 'light'],
        details: 'Premium sushi-grade yellowfin tuna diced and marinated in a citrus-soy dressing, mixed with ripe avocado, shallots, and toasted sesame seeds. Served with crispy wonton chips and microgreens.'
      },
      {
        id: 13,
        name: 'Burrata Salad',
        description: 'Creamy burrata with heirloom tomatoes and basil',
        price: 22,
        image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg',
        tags: ['vegetarian', 'light'],
        details: 'Fresh Italian burrata cheese served with heirloom tomatoes, basil leaves, aged balsamic reduction, and extra virgin olive oil. Accompanied by grilled ciabatta bread for the perfect bite.'
      },
    ],
    mains: [
      {
        id: 4,
        name: 'Wagyu Beef Wellington',
        description: 'Premium wagyu wrapped in golden pastry',
        price: 85,
        image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg',
        tags: ['meat', 'signature'],
        details: 'Our showstopping Wagyu Beef Wellington features A5 Japanese Wagyu beef tenderloin wrapped in duxelles (mushroom paste), prosciutto, and flaky puff pastry. Served with truffle mashed potatoes and roasted seasonal vegetables. Cooked to your preferred temperature (recommended medium-rare).'
      },
      {
        id: 5,
        name: 'Lobster Thermidor',
        description: 'Fresh lobster with cognac cream sauce',
        price: 65,
        image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg',
        tags: ['seafood', 'luxury'],
        details: 'Whole Maine lobster split and stuffed with a rich sauce of lobster meat, cream, cognac, Gruyère cheese, and mustard, then broiled to golden perfection. Served with saffron risotto and grilled asparagus.'
      },
      {
        id: 6,
        name: 'Duck Confit',
        description: 'Slow-cooked duck leg with orange glaze',
        price: 48,
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
        tags: ['meat', 'signature'],
        details: 'Duck leg slow-cooked in its own fat until fall-off-the-bone tender, then crisped to perfection. Served with Grand Marnier orange glaze, duck fat potatoes, and braised red cabbage.'
      },
      {
        id: 14,
        name: 'Mushroom Risotto',
        description: 'Arborio rice with wild mushrooms and truffle oil',
        price: 36,
        image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
        tags: ['vegetarian', 'comfort'],
        details: 'Creamy Arborio rice cooked with a medley of wild mushrooms (chanterelle, morel, and porcini), white wine, shallots, and finished with Parmigiano-Reggiano and white truffle oil. Garnished with microgreens and edible flowers.'
      },
    ],
    desserts: [
      {
        id: 7,
        name: 'Chocolate Soufflé',
        description: 'Dark chocolate with vanilla bean ice cream',
        price: 18,
        image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
        tags: ['chocolate', 'signature'],
        details: 'Our legendary chocolate soufflé made with 70% Valrhona dark chocolate, served warm with a molten center. Accompanied by Tahitian vanilla bean ice cream and a dusting of cocoa powder. Requires 20 minutes preparation time.'
      },
      {
        id: 8,
        name: 'Crème Brûlée',
        description: 'Classic vanilla custard with caramelized sugar',
        price: 14,
        image: 'https://images.pexels.com/photos/792073/pexels-photo-792073.jpeg',
        tags: ['classic', 'creamy'],
        details: 'Traditional French vanilla custard made with Madagascar vanilla beans and organic cream, topped with a perfectly caramelized sugar crust. Served with fresh berries and a shortbread cookie.'
      },
      {
        id: 9,
        name: 'Tarte Tatin',
        description: 'Upside-down apple tart with cinnamon',
        price: 16,
        image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg',
        tags: ['fruit', 'warm'],
        details: 'Classic French upside-down caramelized apple tart made with Honeycrisp apples, butter, and cinnamon, served warm with crème fraîche or vanilla ice cream.'
      },
      {
        id: 15,
        name: 'Passion Fruit Mousse',
        description: 'Light mousse with tropical fruit coulis',
        price: 17,
        image: 'https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg',
        tags: ['fruit', 'light'],
        details: 'Airy passion fruit mousse layered with mango coulis and coconut dacquoise (meringue). Topped with tropical fruit salsa (dragon fruit, kiwi, and pineapple) and a mint garnish.'
      },
    ],
    drinks: [
      {
        id: 10,
        name: 'Château Margaux 2015',
        description: 'Exceptional Bordeaux wine',
        price: 350,
        image: 'https://images.pexels.com/photos/38400/wine-tasting-blind-tasting-wine-38400.jpeg',
        tags: ['wine', 'luxury'],
        details: 'First growth Bordeaux from the legendary 2015 vintage. This wine displays intense aromas of blackcurrant, violet, and subtle oak. Full-bodied with velvety tannins and a finish that lasts minutes. Decant for 1 hour before serving.'
      },
      {
        id: 11,
        name: 'Vintage Champagne',
        description: 'Dom Pérignon 2012',
        price: 280,
        image: 'https://images.pexels.com/photos/236525/pexels-photo-236525.jpeg',
        tags: ['champagne', 'luxury'],
        details: 'Dom Pérignon Vintage 2012 presents a luminous golden color with fine, persistent bubbles. The nose reveals white flowers, citrus zest, and brioche notes. The palate is vibrant with mineral freshness and a long, complex finish. Served in hand-blown crystal flutes.'
      },
      {
        id: 12,
        name: 'Artisan Cocktails',
        description: 'Crafted with premium spirits',
        price: 18,
        image: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg',
        tags: ['cocktails', 'signature'],
        details: 'Choose from our award-winning craft cocktails: 1) The Gold Rush (Bourbon, honey, lemon), 2) Elderflower Spritz (Gin, St-Germain, prosecco), 3) Smoked Old Fashioned (Rye whiskey, demerara, aromatic bitters, smoked with cherry wood). All cocktails are made with premium spirits and house-made ingredients.'
      },
      {
        id: 16,
        name: 'Craft Beer Selection',
        description: 'Local and international craft beers',
        price: 12,
        image: 'https://images.pexels.com/photos/1267700/pexels-photo-1267700.jpeg',
        tags: ['beer', 'local'],
        details: 'Rotating selection of 8 craft beers on tap, including local microbrews and international specialties. Current highlights: 1) IPA from Local Brewery (6.5% ABV, citrusy hops), 2) Belgian Tripel (9% ABV, spicy yeast character), 3) German Rauchbier (5.5% ABV, smoky malt flavor). Served in appropriate glassware at ideal temperature.'
      },
    ],
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Menu card animations
      gsap.fromTo('.menu-card', {
        y: 100,
        opacity: 0,
        rotationY: -30,
      }, {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: menuRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
        },
      });

      // Search bar animation
      gsap.from(searchRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
      });
    }, menuRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const handleAddToCart = (item, event) => {
    event.stopPropagation();
    addItem(item);
    
    // Create floating animation
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    gsap.fromTo('.cart-animation', {
      x: rect.left,
      y: rect.top,
      scale: 1,
      opacity: 1,
    }, {
      x: window.innerWidth - 100,
      y: 100,
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      onComplete: () => {
        // Add a small bounce effect to the cart icon in the header
        gsap.to('.cart-icon', {
          scale: 1.2,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out'
        });
      }
    });
  };

  const filteredItems = () => {
    let items = menuItems[activeCategory];
    
    // Apply search filter
    if (searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Apply price filter
    switch (priceFilter) {
      case 'under25':
        items = items.filter(item => item.price < 25);
        break;
      case '25to50':
        items = items.filter(item => item.price >= 25 && item.price <= 50);
        break;
      case 'over50':
        items = items.filter(item => item.price > 50);
        break;
      default:
        // No price filter applied
        break;
    }
    
    return items;
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeDetailView = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <motion.div
      className="pt-24 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-wine-900 via-charcoal-900 to-wine-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg"
            alt="Menu Background"
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
            Our Exquisite Menu
          </motion.h1>
          <motion.p
            className="text-xl text-primary-200 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover culinary masterpieces crafted by our world-renowned chefs using the finest ingredients.
          </motion.p>
        </div>

        {/* Floating food elements */}
        <motion.div 
          className="absolute top-1/4 left-10 text-4xl"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          �
        </motion.div>
        <motion.div 
          className="absolute top-1/3 right-20 text-5xl"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          🥂
        </motion.div>
        <motion.div 
          className="absolute bottom-1/4 left-1/4 text-6xl"
          animate={{ y: [0, 25, 0], rotate: [0, 360, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          🍰
        </motion.div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white dark:bg-charcoal-800 sticky top-20 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Navigation */}
            <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              <div className="flex space-x-2 bg-primary-100 dark:bg-charcoal-700 rounded-full p-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-wine-600 text-white shadow-lg'
                        : 'text-charcoal-700 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-charcoal-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div ref={searchRef} className="relative w-full md:w-64">
              <motion.div
                className="flex items-center bg-primary-100 dark:bg-charcoal-700 rounded-full px-4 py-3 shadow-inner"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiSearch className="text-charcoal-500 dark:text-primary-300 mr-2" />
                <input
                  type="text"
                  placeholder="Search menu..."
                  className="bg-transparent border-none outline-none w-full text-charcoal-700 dark:text-primary-200 placeholder-charcoal-400 dark:placeholder-primary-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <motion.button
                    onClick={() => setSearchQuery('')}
                    className="ml-2 text-charcoal-500 dark:text-primary-300"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <FiX />
                  </motion.button>
                )}
              </motion.div>
            </div>

            {/* Filter Button */}
            <motion.button
              onClick={toggleFilters}
              className="flex items-center gap-2 bg-wine-600 hover:bg-wine-700 text-white px-4 py-3 rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiFilter />
              <span>Filters</span>
            </motion.button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="mt-4 p-6 bg-white dark:bg-charcoal-700 rounded-xl shadow-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold text-charcoal-900 dark:text-primary-100 mb-4">Price Range</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {priceRanges.map((range) => (
                    <motion.button
                      key={range.id}
                      onClick={() => setPriceFilter(range.id)}
                      className={`px-4 py-2 rounded-full text-sm ${
                        priceFilter === range.id
                          ? 'bg-wine-600 text-white'
                          : 'bg-primary-100 dark:bg-charcoal-600 text-charcoal-700 dark:text-primary-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {range.name}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Menu Items */}
      <section ref={menuRef} className="py-16 bg-primary-50 dark:bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filteredItems().length > 0 ? (
              <motion.div
                key={activeCategory + searchQuery + priceFilter}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {filteredItems().map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="menu-card group bg-white dark:bg-charcoal-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl relative cursor-pointer"
                    initial={{ rotateY: -90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{
                      y: -10,
                      rotateY: 15,
                      boxShadow: '0 12px 32px 0 rgba(80,0,40,0.18)',
                      transition: { duration: 0.3 }
                    }}
                    onClick={() => handleCardClick(item)}
                    style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                  >
                    <div className="relative h-full" style={{ transformStyle: 'preserve-3d' }}>
                      <div className="h-full" style={{ backfaceVisibility: 'hidden' }}>
                        <div className="relative overflow-hidden h-64">
                          <motion.img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1, rotateZ: 2 }}
                            transition={{ duration: 0.4 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <motion.button
                            onClick={(e) => handleAddToCart(item, e)}
                            className="absolute top-4 right-4 bg-wine-600 hover:bg-wine-700 text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FiPlus size={20} />
                          </motion.button>
                          {item.tags?.includes('signature') && (
                            <div className="absolute top-4 left-4 bg-gold-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                              Signature
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-2">
                            {item.name}
                          </h3>
                          <p className="text-charcoal-600 dark:text-primary-300 text-sm mb-4 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-wine-600 dark:text-gold-400">
                              ${item.price}
                            </span>
                            <motion.button
                              onClick={(e) => handleAddToCart(item, e)}
                              className="bg-gradient-to-r from-wine-600 to-wine-700 hover:from-wine-700 hover:to-wine-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Add to Cart
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-4">
                  No items found
                </h3>
                <p className="text-charcoal-600 dark:text-primary-300 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <motion.button
                  onClick={() => {
                    setSearchQuery('');
                    setPriceFilter('all');
                  }}
                  className="bg-wine-600 hover:bg-wine-700 text-white px-6 py-3 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset Filters
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Detailed Item View - Modal (no flip) */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              {/* Background overlay */}
              <motion.div
                className="fixed inset-0 bg-black/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeDetailView}
              />
              {/* Modal content */}
              <div className="inline-block align-bottom rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full">
                <motion.div
                  className="relative bg-white dark:bg-charcoal-800 rounded-2xl overflow-hidden shadow-xl h-[80vh]"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-full flex flex-col md:flex-row">
                    {/* Image section */}
                    <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden flex items-center justify-center">
                      <motion.img
                        src={selectedItem.image}
                        alt={selectedItem.name}
                        className="w-full h-full object-cover rounded-xl shadow-2xl"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        whileHover={{ rotateY: 18, rotateX: 8, scale: 1.05, boxShadow: '0 16px 40px 0 rgba(80,0,40,0.22)' }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, duration: 0.5 }}
                        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                      {/* Back button */}
                      <button
                        onClick={closeDetailView}
                        className="absolute top-4 left-4 bg-white/80 hover:bg-white text-charcoal-900 p-2 rounded-full shadow-lg"
                      >
                        <FiChevronLeft size={24} />
                      </button>
                    </div>
                    {/* Content section */}
                    <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 md:p-8 overflow-y-auto">
                      <div className="flex flex-col h-full">
                        <div>
                          <h2 className="text-3xl font-serif font-bold text-charcoal-900 dark:text-primary-100 mb-2">
                            {selectedItem.name}
                          </h2>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {selectedItem.tags?.map(tag => (
                              <span key={tag} className="bg-wine-100 dark:bg-charcoal-700 text-wine-800 dark:text-primary-200 px-3 py-1 rounded-full text-xs font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-charcoal-600 dark:text-primary-300 mb-6">
                            {selectedItem.description}
                          </p>
                          <div className="mb-6">
                            <h3 className="text-lg font-bold text-charcoal-900 dark:text-primary-100 mb-2">Details</h3>
                            <p className="text-charcoal-600 dark:text-primary-300">
                              {selectedItem.details}
                            </p>
                          </div>
                        </div>
                        <div className="mt-auto pt-6 border-t border-primary-200 dark:border-charcoal-700">
                          <div className="flex justify-between items-center">
                            <span className="text-3xl font-bold text-wine-600 dark:text-gold-400">
                              ${selectedItem.price}
                            </span>
                            <motion.button
                              onClick={(e) => {
                                handleAddToCart(selectedItem, e);
                              }}
                              className="bg-gradient-to-r from-wine-600 to-wine-700 hover:from-wine-700 hover:to-wine-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Add to Cart
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Cart Animation Element */}
      <div className="cart-animation fixed pointer-events-none z-50 w-8 h-8 bg-wine-600 rounded-full opacity-0 flex items-center justify-center">
        <FiPlus className="text-white" />
      </div>
    </motion.div>
  );
};

export default Menu;