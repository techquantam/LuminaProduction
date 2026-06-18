import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { admin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' }
  ];

  const isHomeAndTransparent = location.pathname === '/' && !scrolled;

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-luxury-bg/95 dark:bg-luxury-bgDark/95 backdrop-blur-md border-b border-luxury-gold/15 py-4 shadow-md' 
          : (location.pathname === '/' 
              ? 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-7' 
              : 'bg-transparent py-6')
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="select-none shrink-0 flex items-center">
            <img 
              src={logoImg} 
              alt="Lumina Global Events" 
              className={`h-9 md:h-11 w-auto object-contain transition-all duration-300 ${
                isHomeAndTransparent ? 'brightness-0 invert' : 'dark:brightness-0 dark:invert'
              }`}
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-xs uppercase tracking-widest transition-colors duration-300 py-2 group ${
                    isHomeAndTransparent 
                      ? 'text-white/80 hover:text-luxury-gold' 
                      : 'text-luxury-black dark:text-white/80 hover:text-luxury-gold dark:hover:text-luxury-gold'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-luxury-gold transition-transform duration-500 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </Link>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 transition-colors duration-300 ${isHomeAndTransparent ? 'text-white hover:text-luxury-gold' : 'text-luxury-black dark:text-white hover:text-luxury-gold dark:hover:text-luxury-gold'}`}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Admin Profile/Login */}
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 text-xs uppercase tracking-widest border rounded-full px-5 py-2.5 transition-all duration-300 ${
                isHomeAndTransparent 
                  ? 'border-white/30 text-white hover:border-luxury-gold hover:text-luxury-gold hover:bg-white/5' 
                  : 'border-luxury-gold/30 text-luxury-black dark:text-white hover:border-luxury-gold hover:text-luxury-gold hover:bg-luxury-gold/5'
              }`}
            >
              <User size={14} />
              <span>{admin ? 'Dashboard' : 'Admin'}</span>
            </Link>
          </div>

          {/* Mobile Actions (Menu & Theme) */}
          <div className="flex items-center lg:hidden space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 transition-colors duration-300 ${isHomeAndTransparent ? 'text-white' : 'text-luxury-black dark:text-white'}`}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors duration-300 focus:outline-none ${isHomeAndTransparent ? 'text-white' : 'text-luxury-black dark:text-white'}`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 bg-luxury-bg dark:bg-luxury-bgDark z-40 pt-28 px-8 flex flex-col justify-between pb-12 lg:hidden"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-2xl font-editorial tracking-widest uppercase py-2 border-b border-luxury-gold/10 ${isActive ? 'text-luxury-gold' : 'text-luxury-black dark:text-white'}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                to="/dashboard"
                className={`text-xl font-editorial tracking-widest uppercase py-2 flex items-center space-x-2 text-luxury-black dark:text-white`}
              >
                <User size={18} />
                <span>{admin ? 'Dashboard' : 'Admin Area'}</span>
              </Link>
            </div>

            <div className="border-t border-luxury-gold/10 pt-8">
              <p className="text-xs uppercase tracking-widest text-luxury-gold mb-2 font-medium">Bespoke Concierge</p>
              <p className="text-sm font-light text-luxury-black/70 dark:text-white/60">concierge@luminalive.com</p>
              <p className="text-sm font-light text-luxury-black/70 dark:text-white/60">+1 (800) 555-LUMI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
