import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.9,
  distance = 80,
  scale = 0.92,
  className = "" 
}) => {
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: scale,
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] // Very smooth, noticeable spring-like ease out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
