import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Award, Compass, Play, Sparkles } from 'lucide-react';
import TransitionEffect from '../components/TransitionEffect';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Curated Unsplash images for luxury branding
const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600', // Gala Ballroom
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600', // Fashion runway
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600', // Luxury wedding
];

const DEFAULT_SERVICES = [
  { _id: '1', name: 'Exhibition Booth Design', description: 'Crafting bespoke, high-impact exhibition pavilions and interactive booths that command attention at global trade fairs.', icon: 'Compass' },
  { _id: '2', name: 'Production & Set Up', description: 'Providing elite technical staging, lighting design, sound engineering, and flawless on-site execution for grand spectacles.', icon: 'Award' },
  { _id: '3', name: 'Digital Solutions', description: 'Integrating cutting-edge creative technologies, holographic projections, and immersive AR/VR environments.', icon: 'Sparkles' },
  { _id: '4', name: 'Luxury Events', description: 'Immersive gala dinners, high-society celebrations, and bespoke private experiences defined by meticulous details.', icon: 'Sparkles' },
  { _id: '5', name: 'Brand Activations', description: 'High-impact tactile environments that bridge luxury brands and modern audiences.', icon: 'Flame' },
  { _id: '6', name: 'Fashion Shows', description: 'Breathtaking runway systems, couture lighting, and dynamic spatial concepts for luxury apparel brands.', icon: 'Scissors' },
  { _id: '7', name: 'Wedding Experiences', description: 'Ethereal, high-end nuptials and reception productions conceptualized with romance and architectural grandeur.', icon: 'Heart' }
];

const DEFAULT_PROJECTS = [
  { _id: '1', title: 'Couture Horizon Runway', category: 'Fashion Show', client: 'AURA COUTURE', imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800', featured: true },
  { _id: '2', title: 'The Obsidian Gala', category: 'Corporate Gala', client: 'VERTU ENTERPRISE', imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800', featured: true },
  { _id: '3', title: 'Ethereal Blossom Nuptials', category: 'Luxury Wedding', client: 'The Sterling Family', imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800', featured: true }
];

const PROCESS_STEPS = [
  { step: '01', title: 'Strategy', desc: 'Understanding core objectives and planning spatial maps.' },
  { step: '02', title: 'Concept', desc: 'Designing dramatic scripts, textures, and sensory grids.' },
  { step: '03', title: 'Production', desc: 'Engineering set assets, lighting rigs, and technical AV blueprints.' },
  { step: '04', title: 'Execution', desc: 'Constructing immersive venues under rigorous direction.' },
  { step: '05', title: 'Experience', desc: 'Delivering physical spectacles that captivate global audiences.' }
];

const DEFAULT_TESTIMONIALS = [
  { _id: '1', clientName: 'Alexander Vance', company: 'Aura Couture', feedback: 'Lumina did not just organize a runway; they created an architectural miracle. Staging our autumn couture on a cliffside mirror runway was sheer genius.', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150' },
  { _id: '2', clientName: 'Sophia Lin', company: 'Vertu Enterprise', feedback: 'Our annual executive congress was elevated into a cinematic story. The holographic stages and flawless flow exceeded our corporate vision by orders of magnitude.', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150' }
];

const DEFAULT_GALLERY = [
  { _id: '1', title: 'Oceanic Catwalk', imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600' },
  { _id: '2', title: 'Ambient Scenic Beam', imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600' },
  { _id: '3', title: 'Floral Conservatory', imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600' },
  { _id: '4', title: 'EV Reveal Laser Sync', imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600' }
];

const LOGOS = ['VOGUE', 'BMW', 'VERTU', 'CHANEL', 'CARTIER', 'AURA COUTURE', 'CHRONOS MOTORS', 'LVMH'];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [gallery, setGallery] = useState(DEFAULT_GALLERY);

  const horizontalSectionRef = useRef(null);
  const horizontalScrollRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Background slider loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Fetch API content
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const sRes = await fetch(`${API_URL}/services`);
        const sData = await sRes.json();
        if (sData.success && sData.data.length > 0) setServices(sData.data.slice(0, 7));

        const pRes = await fetch(`${API_URL}/projects/featured`);
        const pData = await pRes.json();
        if (pData.success && pData.data.length > 0) setProjects(pData.data.slice(0, 3));


        const gRes = await fetch(`${API_URL}/gallery`);
        const gData = await gRes.json();
        if (gData.success && gData.data.length > 0) setGallery(gData.data);
      } catch (err) {
        console.warn('API down, using premium local fallback data.');
      }
    };
    fetchHomeData();
  }, []);

  // GSAP Horizontal scroll for gallery
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const scrollEl = horizontalScrollRef.current;
      const containerEl = horizontalSectionRef.current;
      
      if (!scrollEl || !containerEl) return;

      const totalScroll = scrollEl.scrollWidth - window.innerWidth;
      
      if (totalScroll > 0) {
        gsap.to(scrollEl, {
          x: -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: containerEl,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${scrollEl.scrollWidth}`,
            invalidateOnRefresh: true,
          }
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill(true));
    };
  }, [gallery]);

  return (
    <>
      <TransitionEffect />
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden bg-black text-white">
        {/* Background Slide Carousel */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${HERO_IMAGES[currentSlide]})` }}
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 0.5, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: 'easeOut' }}
            />
          </AnimatePresence>
          {/* Subtle elegant radial dark vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
        </div>

        {/* Hero Center Text */}
        <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-start z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="space-y-4"
          >
            <p className="text-xs uppercase tracking-extreme text-luxury-gold font-medium">Bespoke Experiential Curation</p>
            <h1 className="font-editorial text-5xl md:text-8xl font-light leading-none tracking-tight max-w-4xl">
              Crafting <br />
              <span className="text-luxury-gold">Extraordinary</span> <br />
              Experiences
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 mt-12 w-full sm:w-auto"
          >
            <Link to="/portfolio" className="bg-luxury-gold text-luxury-black font-semibold text-xs uppercase tracking-widest px-10 py-4 hover:bg-white transition-colors text-center">
              Explore Portfolio
            </Link>
            <Link to="/contact" className="border border-white/30 text-white font-semibold text-xs uppercase tracking-widest px-10 py-4 hover:border-luxury-gold hover:text-luxury-gold transition-colors text-center">
              Request Curation
            </Link>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 right-6 md:right-12 flex items-center space-x-3 z-10">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-[2px] transition-all duration-500 ${idx === currentSlide ? 'w-12 bg-luxury-gold' : 'w-4 bg-white/30'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. ABOUT PREVIEW */}
      <section className="py-28 bg-luxury-bg dark:bg-luxury-bgDark transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Story */}
            <div className="space-y-8">
              <p className="text-xs uppercase tracking-widest text-luxury-gold font-semibold">The Lumina Legacy</p>
              <h2 className="font-editorial text-4xl md:text-5xl font-light leading-tight">
                Staging physical spectacles <br className="hidden md:inline" />
                that command global awe.
              </h2>
              <p className="text-sm font-light text-luxury-black/70 dark:text-white/60 leading-relaxed">
                Lumina is a premium experiential marketing agency crafting bespoke event designs, high-end production engineering, and conceptual storytelling environments. From product launch to Global exhibitions, we compose sensory miracles for complete marketing solutions worldwide.
              </p>
              <div className="pt-4">
                <Link to="/about" className="flex items-center space-x-3 group text-xs uppercase tracking-widest font-semibold text-luxury-gold hover:text-luxury-black dark:hover:text-white transition-colors">
                  <span>Our Heritage Story</span>
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Grid stats */}
            <div className="grid grid-cols-2 gap-8 border-l border-luxury-gold/20 pl-8">
              <div className="space-y-2">
                <h3 className="font-editorial text-5xl md:text-6xl text-luxury-gold font-light">24+</h3>
                <p className="text-xs uppercase tracking-widest text-luxury-black/50 dark:text-white/40">Countries</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-editorial text-5xl md:text-6xl text-luxury-gold font-light">450+</h3>
                <p className="text-xs uppercase tracking-widest text-luxury-black/50 dark:text-white/40">Events Experiences</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-editorial text-5xl md:text-6xl text-luxury-gold font-light">30+</h3>
                <p className="text-xs uppercase tracking-widest text-luxury-black/50 dark:text-white/40">Global Brands</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-editorial text-5xl md:text-6xl text-luxury-gold font-light">98%</h3>
                <p className="text-xs uppercase tracking-widest text-luxury-black/50 dark:text-white/40">Client Return</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 3. SERVICES SECTION */}
      <section className="py-28 bg-white dark:bg-[#0E0E0E] transition-colors border-y border-luxury-gold/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-luxury-gold font-semibold">Specialist Curation</p>
              <h2 className="font-editorial text-4xl md:text-5xl font-light">Experiential Disciplines</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, idx) => (
              <div
                key={svc._id}
                className="group relative bg-luxury-bg dark:bg-luxury-bgDark border border-luxury-gold/15 p-8 space-y-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-luxury-black transition-colors duration-500">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-editorial text-xl font-light group-hover:text-luxury-gold transition-colors">{svc.name}</h3>
                <p className="text-sm font-light text-luxury-black/70 dark:text-white/60 leading-relaxed">{svc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>





      {/* 6. PROCESS TIMELINE SECTION */}
      <section className="py-28 bg-white dark:bg-[#0E0E0E] transition-colors border-b border-luxury-gold/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="space-y-4 mb-20 text-center">
            <p className="text-xs uppercase tracking-widest text-luxury-gold font-semibold">The Blueprint</p>
            <h2 className="font-editorial text-4xl md:text-5xl font-light">Experience Delivery</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {PROCESS_STEPS.map((proc, idx) => (
              <div key={proc.step} className="space-y-6 relative group">
                {/* Horizontal line connector in desktop */}
                {idx < 4 && (
                  <div className="hidden md:block absolute top-6 left-12 w-full h-[1px] bg-luxury-gold/20 group-hover:bg-luxury-gold transition-colors duration-500" />
                )}
                <div className="w-12 h-12 rounded-full border border-luxury-gold/40 flex items-center justify-center font-editorial text-luxury-gold font-light relative bg-white dark:bg-[#0E0E0E] group-hover:bg-luxury-gold group-hover:text-luxury-black transition-colors duration-500">
                  {proc.step}
                </div>
                <h3 className="font-editorial text-xl font-light">{proc.title}</h3>
                <p className="text-sm font-light text-luxury-black/60 dark:text-white/50 leading-relaxed">{proc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* 9. CONTACT CTA SECTION */}
      <section className="py-32 bg-luxury-black text-white relative border-t border-luxury-gold/25 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,106,0.08),transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10 relative z-10">
          <p className="text-xs uppercase tracking-widest text-luxury-gold font-semibold">Initiation</p>
          <h2 className="font-editorial text-5xl md:text-7xl font-light leading-none tracking-tight">
            Create an <br />
            <span className="italic text-luxury-gold">experience</span> with us.
          </h2>
          <p className="text-sm font-light text-white/50 max-w-md mx-auto leading-relaxed">
            Begin the script of your sensory event. Connect with our international concierge to outline your production objectives.
          </p>
          <div className="pt-6">
            <Link to="/contact" className="inline-flex items-center space-x-3 bg-luxury-gold text-luxury-black font-semibold text-xs uppercase tracking-widest px-12 py-4 hover:bg-white transition-all duration-300">
              <span>Connect Concierge</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
