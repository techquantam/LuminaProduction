import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import TransitionEffect from '../components/TransitionEffect';

const DEFAULT_PROJECTS = [
  {
    _id: '1',
    title: 'Showcase',
    category: 'Pop-ups & Experiential Exhibitions',
    client: 'Range Rover',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800',
    location: 'Singapore',
    year: '2025',
    featured: true
  },
  {
    _id: '2',
    title: 'Perlée Pop-up',
    category: 'Pop-ups & Experiential Exhibitions',
    client: 'Van Cleef & Arpels',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800',
    location: 'Singapore, Thailand, Malaysia',
    year: '2025',
    featured: true
  },
  {
    _id: '3',
    title: 'The Magical House of Chanel',
    category: 'Luxury, Fashion, Lifestyle Events & Galas',
    client: 'Chanel',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800',
    location: 'Singapore',
    year: '2024',
    featured: true
  },
  {
    _id: '4',
    title: 'Journey of Potential Launch Event',
    category: 'Pop-ups & Experiential Exhibitions',
    client: 'Shiseido',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800',
    location: 'Singapore',
    year: '2024',
    featured: false
  },
  {
    _id: '5',
    title: 'Immersive Exhibition',
    category: 'Pop-ups & Experiential Exhibitions',
    client: 'Virtually Versailles',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800',
    location: 'Singapore',
    year: '2023',
    featured: false
  },
  {
    _id: '6',
    title: 'Venture Beyond',
    category: 'Luxury, Fashion, Lifestyle Events & Galas',
    client: 'Penfolds',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800',
    location: 'Singapore',
    year: '2022',
    featured: false
  },
  {
    _id: '7',
    title: 'Summit',
    category: 'Corporate Events & Conferences',
    client: 'Global Leadership',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800',
    location: 'Singapore',
    year: '2026',
    featured: true
  }
];

const CATEGORIES = [
  'All',
  'Pop-ups & Experiential Exhibitions',
  'Luxury, Fashion, Lifestyle Events & Galas',
  'Corporate Events & Conferences'
];

const Portfolio = () => {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [filteredProjects, setFilteredProjects] = useState(DEFAULT_PROJECTS);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/projects`);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setProjects(data.data);
          setFilteredProjects(data.data);
        }
      } catch (err) {
        console.warn('API down, using premium local fallback projects.');
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, projects]);

  return (
    <>
      <TransitionEffect />
      
      {/* Premium Minimal Editorial Header */}
      <section className="pt-32 pb-6 bg-luxury-bg dark:bg-luxury-bgDark transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-2"
          >
            <h1 className="font-editorial text-4xl md:text-5xl font-light tracking-tight text-luxury-black dark:text-white">
              Portfolio
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Categories Horizontal Navigation Bar */}
      <section className="pb-12 bg-luxury-bg dark:bg-luxury-bgDark transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Top Divider */}
          <div className="w-full h-[1px] bg-luxury-black/10 dark:bg-white/10 mb-6" />
          
          <div className="flex flex-wrap gap-x-10 gap-y-4 items-center">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs uppercase tracking-widest font-sans transition-all pb-1 duration-300 relative ${isActive ? 'text-luxury-black dark:text-white font-semibold' : 'text-luxury-black/40 dark:text-white/40 hover:text-luxury-black dark:hover:text-white font-normal'}`}
                >
                  {cat}
                  {isActive && (
                    <motion.span
                      layoutId="activeCategoryBorder"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-luxury-gold"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Divider */}
          <div className="w-full h-[1px] bg-luxury-black/10 dark:bg-white/10 mt-6" />
        </div>
      </section>

      {/* Premium 3-Column Luxury Grid */}
      <section className="pb-32 bg-luxury-bg dark:bg-luxury-bgDark transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  key={proj._id}
                  className="flex flex-col"
                >
                  <Link to={`/project/${proj._id}`} className="group flex flex-col w-full h-full">
                    {/* Header above image */}
                    <div className="mb-3 text-xs tracking-wide text-luxury-black/90 dark:text-white/90 font-sans leading-tight">
                      <span className="font-bold">{proj.client}</span>{' '}
                      <span className="font-light text-luxury-black/70 dark:text-white/70">{proj.title}</span>{' '}
                      <span className="font-light text-luxury-black/40 dark:text-white/40">| {proj.year || '2025'}</span>
                    </div>

                    {/* Image block */}
                    <div className="w-full aspect-[16/10] overflow-hidden bg-luxury-black/5 relative border border-luxury-black/5 dark:border-white/5 shadow-sm">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{ backgroundImage: `url(${proj.imageUrl})` }}
                      />
                    </div>

                    {/* Footer / Location below image */}
                    <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-luxury-black/50 dark:text-white/50 mt-3 font-light">
                      <span className="w-1.5 h-1.5 rounded-full border border-luxury-gold shrink-0 inline-block" />
                      <span>{proj.location || 'Singapore'}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
