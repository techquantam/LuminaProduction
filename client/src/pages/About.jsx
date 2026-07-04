import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TransitionEffect from '../components/TransitionEffect';
import { useAuth } from '../context/AuthContext';

const DEMO_CLIENTS = [
  { name: 'Chanel', logoUrl: 'https://logo.clearbit.com/chanel.com' },
  { name: 'Cartier', logoUrl: 'https://logo.clearbit.com/cartier.com' },
  { name: 'Gucci', logoUrl: 'https://logo.clearbit.com/gucci.com' },
  { name: 'Dior', logoUrl: 'https://logo.clearbit.com/dior.com' },
  { name: 'Hermes', logoUrl: 'https://logo.clearbit.com/hermes.com' },
  { name: 'Rolex', logoUrl: 'https://logo.clearbit.com/rolex.com' },
  { name: 'Prada', logoUrl: 'https://logo.clearbit.com/prada.com' },
  { name: 'Louis Vuitton', logoUrl: 'https://logo.clearbit.com/louisvuitton.com' },
  { name: 'Ferrari', logoUrl: 'https://logo.clearbit.com/ferrari.com' },
  { name: 'Bentley', logoUrl: 'https://logo.clearbit.com/bentleymotors.com' }
];

const CITIES = [
  { name: 'Las Vegas', country: 'USA', x: '10.0%', y: '35.0%' },
  { name: 'New York', country: 'USA', x: '19.3%', y: '31.1%' },
  { name: 'London', country: 'UK', x: '46.9%', y: '29.4%' },
  { name: 'Berlin', country: 'Germany', x: '51.3%', y: '31.5%' },
  { name: 'Barcelona', country: 'Spain', x: '48.0%', y: '36.8%' },
  { name: 'Dubai', country: 'UAE', x: '63.0%', y: '49.6%' },
  { name: 'Cape Town', country: 'South Africa', x: '51.8%', y: '84.0%' },
  { name: 'Singapore', country: 'Singapore', x: '78.2%', y: '65.5%' },
  { name: 'Beijing', country: 'China', x: '79.4%', y: '36.2%' },
  { name: 'Tokyo', country: 'Japan', x: '85.9%', y: '40.4%' },
  { name: 'Sydney', country: 'Australia', x: '88.3%', y: '86.0%' },
  { name: 'Rio de Janeiro', country: 'Brazil', x: '31.0%', y: '68.0%' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};



const About = () => {
  const [hoveredCity, setHoveredCity] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const rotatingImages = [
    '/about-drawing-1.png',
    '/about-drawing-2.png',
    '/about-drawing-3.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);



  return (
    <>
      <TransitionEffect />

      {/* Editorial Header */}
      <section className="pt-36 pb-12 bg-luxury-bg dark:bg-luxury-bgDark transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4 max-w-4xl"
          >
            <p className="text-xs uppercase tracking-extreme text-luxury-gold font-semibold">The Chronicle</p>
            <h1 className="font-editorial text-5xl md:text-7xl font-light leading-none tracking-tight">
              Architects of <br />
              <span className="italic text-luxury-gold">Sensory Grandeur</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Image and Description Section */}
      <section className="pb-16 bg-luxury-bg dark:bg-luxury-bgDark transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Main Image Container - Rotating drawings slideshow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="w-full h-[500px] overflow-hidden border border-luxury-gold/15 relative group shadow-2xl bg-black"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={rotatingImages[currentImageIndex]}
                alt={`Lumina Drawing Sketch ${currentImageIndex + 1}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Slide Navigation Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2.5 z-10">
              {rotatingImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentImageIndex
                    ? 'bg-luxury-gold w-8'
                    : 'bg-white/40 hover:bg-white/70'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Description - Aligned to the Right */}
          <div className="mt-12 flex justify-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="max-w-2xl text-right"
            >
              <p className="font-editorial text-xl md:text-2xl font-light text-luxury-black/90 dark:text-white/90 leading-relaxed">
                Orchestrating a new epoch of spatial design, we sculpt high-concept environments and cinematic brand spectacles that transcend traditional limits across Singapore and the global stage.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Footprint Section */}
      <section className="py-24 border-t border-luxury-gold/15 bg-luxury-bg dark:bg-luxury-bgDark transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="flex items-center space-x-4 mb-16">
            <h2 className="font-editorial text-4xl md:text-5xl font-light text-luxury-black dark:text-white">We Are Global</h2>
            <div className="w-12 h-[1px] bg-luxury-gold" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Text & Capabilities */}
            <div className="lg:col-span-5 space-y-8">
              <p className="text-sm font-light text-luxury-black/75 dark:text-white/60 leading-relaxed">
                Passionate about crafting experiences that strengthen the relationships between brands and the people who matter most to them.
              </p>

              <div className="border-l-2 border-luxury-gold pl-4">
                <p className="text-xs uppercase tracking-extreme text-luxury-gold font-semibold">Innovation is in our DNA.</p>
              </div>

              <p className="text-sm font-light text-luxury-black/75 dark:text-white/60 leading-relaxed">
                With more than 20 years of experience across the globe, we have set ourselves apart in the luxury experiential marketing industry. The geographical reach of our capabilities is demonstrated in the iconic cities where we have produced world-class events, exhibitions, and spectacular brand moments.
              </p>

              <div className="space-y-4 pt-4">
                <h4 className="text-xs uppercase tracking-widest text-luxury-gold font-bold">We maximize brand potential through:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Research & Strategy',
                    'Creative Conceptualisation',
                    'Unique Venue Sourcing',
                    'Scenography Design',
                    'Project Management',
                    'Budget Management',
                    'Production Management',
                    'Experience Activation'
                  ].map((cap) => (
                    <li key={cap} className="flex items-center space-x-3 text-xs tracking-wide font-light text-luxury-black/75 dark:text-white/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold shrink-0 animate-pulse" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Stylized Dotted World Map with Pulsing Hotspots */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div
                className="w-full relative border border-luxury-gold/15 bg-luxury-black/[0.02] dark:bg-white/[0.01] rounded overflow-hidden"
                style={{ aspectRatio: '700/337' }}
              >
                {/* Locally Served Dotted Map Image (Stretched to fill container) */}
                <img
                  src="/world-map.svg?v=3"
                  alt="Lumina Global Reach Map"
                  className="w-full h-full object-fill opacity-25 dark:opacity-20 select-none pointer-events-none filter invert dark:invert-0"
                />

                {/* Glowing coordinate pins */}
                {CITIES.map((city) => {
                  const isHovered = hoveredCity === city.name || hoveredCountry === city.country;
                  return (
                    <div
                      key={city.name}
                      className="absolute group z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
                      style={{ left: city.x, top: city.y }}
                      onMouseEnter={() => {
                        setHoveredCity(city.name);
                        setHoveredCountry(city.country);
                      }}
                      onMouseLeave={() => {
                        setHoveredCity(null);
                        setHoveredCountry(null);
                      }}
                    >
                      {/* Premium integrated glass-capsule indicator */}
                      <div className={`flex items-center space-x-1 px-1.5 py-0.5 rounded-full border backdrop-blur-[3px] transition-all duration-300 shadow-md ${isHovered
                        ? 'bg-luxury-gold border-luxury-gold text-luxury-black scale-110 z-20 shadow-lg'
                        : 'bg-luxury-black/85 border-luxury-gold/30 text-white hover:border-luxury-gold/80 hover:scale-105'
                        }`}>
                        {/* pulsing indicator dot */}
                        <div className="relative flex items-center justify-center shrink-0 w-2 h-2">
                          <span className={`absolute inline-flex h-3.5 w-3.5 rounded-full bg-luxury-gold opacity-75 transition-all duration-300 ${isHovered ? 'animate-ping scale-150' : 'animate-pulse'
                            }`} />
                          <span className={`relative flex rounded-full h-1.5 w-1.5 transition-colors duration-300 ${isHovered ? 'bg-luxury-black' : 'bg-luxury-gold'
                            }`} />
                        </div>

                        {/* Integrated readable city name */}
                        <span className="text-[7px] md:text-[8px] uppercase tracking-wider font-semibold whitespace-nowrap leading-none select-none">
                          {city.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Hoverable Country Badges under the map */}
              <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-2xl">
                {[...new Set(CITIES.map(c => c.country))].map((country) => {
                  const isActive = hoveredCountry === country;
                  return (
                    <button
                      key={country}
                      onMouseEnter={() => setHoveredCountry(country)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      className={`px-3 py-1.5 text-[9px] uppercase tracking-widest border transition-all duration-300 ${isActive
                        ? 'border-luxury-gold text-luxury-gold bg-luxury-gold/5 scale-105 shadow-sm'
                        : 'border-luxury-gold/15 text-luxury-black/60 dark:text-white/60 hover:border-luxury-gold/40'
                        }`}
                    >
                      {country}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* Luxury Clients Section */}
      <section className="py-24 bg-luxury-bg dark:bg-luxury-bgDark border-t border-luxury-gold/15 transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Section Header */}
          <div className="flex items-center space-x-4 mb-16">
            <h2 className="font-editorial text-4xl md:text-5xl font-light text-luxury-black dark:text-white">Our Clients</h2>
            <span className="font-editorial text-4xl md:text-5xl font-light text-luxury-gold">↘</span>
            <div className="w-12 h-[1px] bg-luxury-gold" />
          </div>

          {/* Infinite Sliding Logo Marquee right to left */}
          <div className="relative w-full overflow-hidden py-6">
            {/* Left & Right elegant gradient overlays to fade out the edges for premium luxury touch */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-luxury-bg to-transparent dark:from-luxury-bgDark z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-luxury-bg to-transparent dark:from-luxury-bgDark z-10 pointer-events-none" />

            <div className="flex whitespace-nowrap animate-infinite-marquee hover:[animation-play-state:paused] gap-12 items-center">
              {/* Double array for infinite seamless looping */}
              {[...DEMO_CLIENTS, ...DEMO_CLIENTS].map((cli, idx) => {
                const key = `${cli.name}-${idx}`;
                return (
                  <div
                    key={key}
                    className="inline-flex items-center justify-center shrink-0 w-36 h-20 relative group transition-transform duration-300 mx-6 bg-white dark:bg-neutral-900 border border-luxury-gold/10 p-4 rounded shadow-sm hover:scale-105"
                  >
                    <img
                      src={cli.logoUrl}
                      alt={cli.name || 'Brand Logo'}
                      className="max-w-full max-h-full object-contain pointer-events-none select-none"
                    />
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default About;
