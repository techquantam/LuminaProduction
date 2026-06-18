import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Event listeners to detect interactive hover
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, [data-hover]');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    // Run listeners after components render
    const timer = setTimeout(addHoverListeners, 1000);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(timer);
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-luxury-gold pointer-events-none z-[9999] custom-cursor -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: position.x,
          y: position.y,
          scale: hovered ? 1.8 : 1,
          backgroundColor: hovered ? 'rgba(201, 168, 106, 0.15)' : 'rgba(201, 168, 106, 0)',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 250, mass: 0.8 }}
      />
      {/* Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-luxury-gold rounded-full pointer-events-none z-[9999] custom-cursor -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: position.x,
          y: position.y,
          scale: hovered ? 0.5 : 1
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 450, mass: 0.3 }}
      />
    </>
  );
};

export default CustomCursor;
