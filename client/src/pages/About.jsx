import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TransitionEffect from '../components/TransitionEffect';
import { useAuth } from '../context/AuthContext';

const CITIES = [
  { name: 'Las Vegas', x: '10.0%', y: '35.0%' },
  { name: 'New York', x: '19.3%', y: '31.1%' },
  { name: 'London', x: '46.9%', y: '29.4%' },
  { name: 'Berlin', x: '51.3%', y: '31.5%' },
  { name: 'Barcelona', x: '48.0%', y: '36.8%' },
  { name: 'Dubai', x: '63.0%', y: '49.6%' },
  { name: 'Cape Town', x: '51.8%', y: '84.0%' },
  { name: 'Singapore', x: '78.2%', y: '65.5%' },
  { name: 'Beijing', x: '79.4%', y: '36.2%' },
  { name: 'Tokyo', x: '85.9%', y: '40.4%' },
  { name: 'Sydney', x: '88.3%', y: '86.0%' }
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

const getLogoClass = (name) => {
  const normalized = (name || '').toLowerCase();

  // Bold/circular/square logos that appear naturally larger and need to be scaled down/contained
  const isBoldOrCircular =
    normalized.includes('bmw') ||
    normalized.includes('hermes') ||
    normalized.includes('hermès') ||
    normalized.includes('ferrari') ||
    normalized.includes('lexus') ||
    normalized.includes('hsbc') ||
    normalized.includes('montblanc');

  // Extremely thin/wide/text-only logos that appear naturally smaller and need a boost
  const isThinOrWide =
    normalized.includes('macallan') ||
    normalized.includes('audemars') ||
    normalized.includes('cartier') ||
    normalized.includes('piaget') ||
    normalized.includes('chopard') ||
    normalized.includes('dior') ||
    normalized.includes('gucci') ||
    normalized.includes('louis') ||
    normalized.includes('chanel');

  if (isBoldOrCircular) {
    // Keep bold/circular logos slightly smaller and contained so they don't overpower the grid
    return "h-11 md:h-13 w-auto max-w-[85%] object-contain transition-all duration-300 hover:scale-105 select-none pointer-events-none";
  }

  if (isThinOrWide) {
    // Boost height and width of thin text/wide logos so they are legible and match visual weight
    return "h-16 md:h-18 w-auto max-w-[95%] object-contain transition-all duration-300 hover:scale-105 select-none pointer-events-none";
  }

  // Default elegant size
  return "h-13 md:h-15 w-auto max-w-[90%] object-contain transition-all duration-300 hover:scale-105 select-none pointer-events-none";
};

const About = () => {
  const [hoveredCity, setHoveredCity] = useState(null);
  const [brokenLogos, setBrokenLogos] = useState({});
  const { API_URL } = useAuth();

  const clients = [
    { _id: '1', name: '', logoUrl: '/uploads/logo-1779964869829-241648877.webp' },
    { _id: '2', name: '', logoUrl: '/uploads/logo-1779964924216-993130959.webp' },
    { _id: '3', name: '', logoUrl: '/uploads/logo-1779965262997-63687423.webp' },
    { _id: '4', name: '', logoUrl: '/uploads/logo-1779965854047-483478109.webp' },
    { _id: '5', name: '', logoUrl: '/uploads/logo-1779966362250-752362.webp' },
    { _id: '6', name: '', logoUrl: '/uploads/logo-1779966417227-634848252.webp' },
    { _id: '7', name: '', logoUrl: '/uploads/logo-1780557285601-93065572.jpg' },
    { _id: '8', name: '', logoUrl: '/uploads/logo-1780557354158-634995759.jpg' },
    { _id: '9', name: '', logoUrl: '/uploads/logo-1780557416934-519710448.png' },
    { _id: '10', name: '', logoUrl: '/uploads/logo-1780557427406-844389947.png' },
    { _id: '11', name: '', logoUrl: '/uploads/logo-1780557844846-465942112.jpg' },
    { _id: '12', name: '', logoUrl: '/uploads/logo-1780557852304-664045466.png' },
    { _id: '13', name: '', logoUrl: '/uploads/logo-1780557858424-728397655.png' },
    { _id: '14', name: '', logoUrl: '/uploads/logo-1780557864638-377926523.jpg' },
    { _id: '15', name: '', logoUrl: '/uploads/logo-1780557872698-872064116.jpg' },
    { _id: '16', name: '', logoUrl: '/uploads/logo-1780557878544-681551346.png' },
    { _id: '17', name: '', logoUrl: '/uploads/logo-1780557883176-358550688.jpg' },
    { _id: '18', name: '', logoUrl: '/uploads/logo-1780557887775-825349826.jpg' },
    { _id: '19', name: '', logoUrl: '/uploads/logo-1780557891866-16868299.png' },
    { _id: '20', name: '', logoUrl: '/uploads/logo-1780557897133-818421009.png' },
    { _id: '21', name: '', logoUrl: '/uploads/logo-1780557915124-54900629.jpg' },
    { _id: '22', name: '', logoUrl: '/uploads/logo-1780557928494-463816006.jpg' },
    { _id: '23', name: '', logoUrl: '/uploads/logo-1780557933132-799732769.png' },
    { _id: '24', name: '', logoUrl: '/uploads/logo-1780557937111-544678353.png' }
  ];

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

  const handleLogoError = (id) => {
    setBrokenLogos(prev => ({
      ...prev,
      [id]: true
    }));
  };



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
                  const isHovered = hoveredCity === city.name;
                  return (
                    <div
                      key={city.name}
                      className="absolute group z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
                      style={{ left: city.x, top: city.y }}
                      onMouseEnter={() => setHoveredCity(city.name)}
                      onMouseLeave={() => setHoveredCity(null)}
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

              {/* Hoverable City Badges under the map */}
              <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-2xl">
                {CITIES.map((city) => (
                  <button
                    key={city.name}
                    onMouseEnter={() => setHoveredCity(city.name)}
                    onMouseLeave={() => setHoveredCity(null)}
                    className={`px-3 py-1.5 text-[9px] uppercase tracking-widest border transition-all duration-300 ${hoveredCity === city.name
                        ? 'border-luxury-gold text-luxury-gold bg-luxury-gold/5 scale-105 shadow-sm'
                        : 'border-luxury-gold/15 text-luxury-black/60 dark:text-white/60 hover:border-luxury-gold/40'
                      }`}
                  >
                    {city.name}
                  </button>
                ))}
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
          {clients.length > 0 && (
            <div className="relative w-full overflow-hidden py-6">
              {/* Left & Right elegant gradient overlays to fade out the edges for premium luxury touch */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-luxury-bg to-transparent dark:from-luxury-bgDark z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-luxury-bg to-transparent dark:from-luxury-bgDark z-10 pointer-events-none" />

              <div className="flex whitespace-nowrap animate-infinite-marquee hover:[animation-play-state:paused] gap-12 items-center">
                {/* Double array for infinite seamless looping */}
                {[...clients, ...clients].map((cli, idx) => {
                  const key = `${cli._id || idx}-${idx}`;
                  const isBroken = cli._id && brokenLogos[cli._id];
                  return (
                    <div
                      key={key}
                      className="inline-flex items-center justify-center shrink-0 w-36 h-24 relative group transition-transform duration-300 mx-4"
                    >
                      {isBroken ? (
                        <span className="font-editorial text-lg tracking-widest text-luxury-gold uppercase opacity-85 group-hover:scale-105 transition-transform duration-300 select-none">
                          {cli.name}
                        </span>
                      ) : (
                        <img
                          src={cli.logoUrl}
                          alt={cli.name || 'Brand Logo'}
                          className={getLogoClass(cli.name)}
                          onError={() => cli._id && handleLogoError(cli._id)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default About;
