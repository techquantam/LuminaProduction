import React from 'react';
import { motion } from 'framer-motion';

const TransitionEffect = () => {
  return (
    <>
      {/* First Layer: Obsidian Wipe */}
      <motion.div
        className="fixed top-0 bottom-0 right-full w-full h-full z-[999] bg-luxury-black"
        initial={{ x: '100%', width: '100%' }}
        animate={{ x: '0%', width: '0%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
      {/* Second Layer: Luxury Gold Wipe */}
      <motion.div
        className="fixed top-0 bottom-0 right-full w-full h-full z-[998] bg-luxury-gold"
        initial={{ x: '100%', width: '100%' }}
        animate={{ x: '0%', width: '0%' }}
        transition={{ delay: 0.15, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
      {/* Third Layer: Off-White Slate Wipe */}
      <motion.div
        className="fixed top-0 bottom-0 right-full w-full h-full z-[997] bg-[#EAEAEA]"
        initial={{ x: '100%', width: '100%' }}
        animate={{ x: '0%', width: '0%' }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
    </>
  );
};

export default TransitionEffect;
