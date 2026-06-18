import React from 'react';
import { motion } from 'framer-motion';
import TransitionEffect from '../components/TransitionEffect';

const PARTNERS = [
  { name: 'Vogue France', type: 'Fashion & Runway', desc: 'Constructed custom kinetic scenery for the anniversary gala catwalk.', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400' },
  { name: 'Vertu Enterprise', type: 'Corporate Galas', desc: 'Designed full holographic display corridors and multi-sensory board spaces.', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=400' },
  { name: 'Chronos Motors', type: 'Product Reveals', desc: 'Orchestrated a 360-degree theater environment with robotic reveal arms for the EV hypercar.', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400' },
  { name: 'Aura Couture', type: 'Apparel Launches', desc: 'Constructed a coastline cliff mirror-catwalk hanging over ocean waves.', image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=400' },
  { name: 'Cartier Paris', type: 'Luxury Showrooms', desc: 'Architectured ambient, light-focused sensory corridors across flagship boutiques.', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400' },
  { name: 'LVMH Group', type: 'Experiential Galas', desc: 'Curated high-profile private dinner sets in historical landmarks.', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400' }
];

const Clients = () => {
  return (
    <>
      <TransitionEffect />
      
      {/* Page Header */}
      <section className="pt-40 pb-20 bg-luxury-bg dark:bg-luxury-bgDark transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4 max-w-4xl"
          >
            <p className="text-xs uppercase tracking-extreme text-luxury-gold font-semibold">Our Cohorts</p>
            <h1 className="font-editorial text-5xl md:text-7xl font-light leading-none tracking-tight">
              Elite Brand <br />
              <span className="italic text-luxury-gold">Partnerships</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Grid of Partners */}
      <section className="pb-32 bg-luxury-bg dark:bg-luxury-bgDark transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PARTNERS.map((partner, idx) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group bg-white dark:bg-[#0E0E0E] border border-luxury-gold/15 p-6 hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Aspect-ratio image block */}
                  <div className="h-48 relative overflow-hidden bg-gray-100">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${partner.image})` }}
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">
                      {partner.type}
                    </p>
                    <h3 className="font-editorial text-xl font-light text-luxury-black dark:text-white">
                      {partner.name}
                    </h3>
                    <p className="text-xs font-light text-luxury-black/60 dark:text-white/50 leading-relaxed">
                      {partner.desc}
                    </p>
                  </div>
                </div>

                <div className="border-t border-luxury-gold/10 mt-6 pt-4 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-luxury-gold">
                  <span>Elite Alliance</span>
                  <span>&bull;</span>
                  <span>2024 - 2026</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Clients;
