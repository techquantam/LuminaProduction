import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

const TransitionEffect = () => {
  return (
    <>
      {/* ── Layer 1: Purple wipe (behind, slightly delayed) ── */}
      <motion.div
        className="fixed top-0 bottom-0 right-full w-full h-full z-[997] bg-luxury-purple"
        initial={{ x: '100%', width: '100%' }}
        animate={{ x: '0%', width: '0%' }}
        transition={{ delay: 0.15, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* ── Layer 2: White wipe (on top, leads first) ── */}
      <motion.div
        className="fixed top-0 bottom-0 right-full w-full h-full z-[998] bg-white"
        initial={{ x: '100%', width: '100%' }}
        animate={{ x: '0%', width: '0%' }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* ── Logo overlay (topmost layer) ── */}
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.85, duration: 0.4, ease: 'easeInOut' }}
      >
        {/* Radial purple glow */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '380px',
            height: '260px',
            background: 'radial-gradient(ellipse at center, rgba(109,40,217,0.15) 0%, transparent 70%)',
            filter: 'blur(6px)',
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Frosted card — auto-sizes around content */}
        <motion.div
          className="relative flex flex-col items-center gap-4 px-14 py-10 rounded-2xl border border-luxury-purple/20"
          style={{
            background: 'rgba(255,255,255,0.90)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 48px rgba(109,40,217,0.14), 0 2px 16px rgba(0,0,0,0.07)',
          }}
          initial={{ opacity: 0, scale: 0.82, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo */}
          <motion.img
            src={logoImg}
            alt="Lumina Worldwide Events"
            className="h-14 md:h-20 w-auto object-contain select-none block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45, ease: 'easeOut' }}
          />

          {/* Purple underline */}
          <motion.div
            className="h-[1.5px] bg-luxury-purple rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '52px' }}
            transition={{ delay: 0.32, duration: 0.42, ease: 'easeOut' }}
          />

          {/* Tagline */}
          <motion.p
            className="text-[8px] uppercase tracking-[0.28em] text-luxury-purple/70 font-light whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.48, duration: 0.35 }}
          >
            Artistry · Precision · Perfection
          </motion.p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default TransitionEffect;
