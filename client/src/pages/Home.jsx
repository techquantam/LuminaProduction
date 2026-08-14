import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Award, Compass, Play, Sparkles } from 'lucide-react';
import TransitionEffect from '../components/TransitionEffect';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '../components/ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

// Fallback images if no hero images are set in admin
const DEFAULT_HERO_IMAGES = [];

const DEFAULT_SERVICES = [];
const DEFAULT_PROJECTS = [];
const DEFAULT_TESTIMONIALS = [];
const DEFAULT_GALLERY = [];

const PROCESS_STEPS = [
  { step: '01', title: 'Strategy', desc: 'Understanding core objectives and planning spatial maps.' },
  { step: '02', title: 'Concept', desc: 'Designing dramatic scripts, textures, and sensory grids.' },
  { step: '03', title: 'Production', desc: 'Engineering set assets, lighting rigs, and technical AV blueprints.' },
  { step: '04', title: 'Execution', desc: 'Constructing immersive venues under rigorous direction.' },
  { step: '05', title: 'Experience', desc: 'Delivering physical spectacles that captivate global audiences.' }
];

const LOGOS = [];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroImages, setHeroImages] = useState(DEFAULT_HERO_IMAGES);
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [gallery, setGallery] = useState(DEFAULT_GALLERY);

  const horizontalSectionRef = useRef(null);
  const horizontalScrollRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Background slider loop - resets if heroImages length changes
  useEffect(() => {
    setCurrentSlide(0);
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Fetch API content
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Fetch hero images from settings
        const hRes = await fetch(`${API_URL}/settings/hero-images`);
        const hData = await hRes.json();
        if (hData.success && hData.data && Array.isArray(hData.data.value) && hData.data.value.length > 0) {
          setHeroImages(hData.data.value);
        }

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
              style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
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
          {heroImages.map((_, idx) => (
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
              <ScrollReveal delay={0.1}>
                <p className="text-xs uppercase tracking-widest text-luxury-purple font-semibold">The Lumina Legacy</p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <h2 className="font-editorial text-4xl md:text-5xl font-light leading-tight">
                  Staging physical spectacles <br className="hidden md:inline" />
                  that command global awe.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className="text-sm font-light text-luxury-black/70 dark:text-white/60 leading-relaxed">
                  Lumina is a premium experiential marketing agency crafting bespoke event designs, high-end production engineering, and conceptual storytelling environments. From product launch to Global exhibitions, we compose sensory miracles for complete marketing solutions worldwide.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <div className="pt-4">
                  <Link to="/about" className="flex items-center space-x-3 group text-xs uppercase tracking-widest font-semibold text-luxury-purple hover:text-luxury-black dark:hover:text-white transition-colors">
                    <span>Our Heritage Story</span>
                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Grid stats */}
            <div className="grid grid-cols-2 gap-8 border-l border-luxury-purple/20 pl-8">
              <ScrollReveal delay={0.2} direction="left">
                <div className="space-y-2">
                  <h3 className="font-editorial text-5xl md:text-6xl text-luxury-purple font-light">24+</h3>
                  <p className="text-xs uppercase tracking-widest text-luxury-black/50 dark:text-white/40">Countries</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3} direction="left">
                <div className="space-y-2">
                  <h3 className="font-editorial text-5xl md:text-6xl text-luxury-purple font-light">450+</h3>
                  <p className="text-xs uppercase tracking-widest text-luxury-black/50 dark:text-white/40">Events Experiences</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.4} direction="left">
                <div className="space-y-2">
                  <h3 className="font-editorial text-5xl md:text-6xl text-luxury-purple font-light">30+</h3>
                  <p className="text-xs uppercase tracking-widest text-luxury-black/50 dark:text-white/40">Global Brands</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.5} direction="left">
                <div className="space-y-2">
                  <h3 className="font-editorial text-5xl md:text-6xl text-luxury-purple font-light">98%</h3>
                  <p className="text-xs uppercase tracking-widest text-luxury-black/50 dark:text-white/40">Client Return</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      {/* 3. SERVICES SECTION */}
      <section className="py-28 bg-white dark:bg-[#0E0E0E] transition-colors border-y border-luxury-purple/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-4">
              <ScrollReveal>
                <p className="text-xs uppercase tracking-widest text-luxury-purple font-semibold">Specialist Curation</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-editorial text-4xl md:text-5xl font-light">Experiential Disciplines</h2>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, idx) => (
              <ScrollReveal key={svc._id} delay={0.1 * idx}>
                <div
                  className="group relative h-full bg-luxury-bg dark:bg-luxury-bgDark border border-luxury-purple/15 p-8 space-y-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 rounded-full bg-luxury-purple/10 flex items-center justify-center text-luxury-purple group-hover:bg-luxury-purple group-hover:text-luxury-black transition-colors duration-500">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="font-editorial text-xl font-light group-hover:text-luxury-purple transition-colors">{svc.name}</h3>
                  <p className="text-sm font-light text-luxury-black/70 dark:text-white/60 leading-relaxed">{svc.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>





      {/* 6. PROCESS TIMELINE SECTION */}
      <section className="py-28 bg-white dark:bg-[#0E0E0E] transition-colors border-b border-luxury-purple/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="space-y-4 mb-20 text-center">
            <ScrollReveal>
              <p className="text-xs uppercase tracking-widest text-luxury-purple font-semibold">The Blueprint</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-editorial text-4xl md:text-5xl font-light">Experience Delivery</h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {PROCESS_STEPS.map((proc, idx) => (
              <ScrollReveal key={proc.step} delay={0.15 * idx} className="space-y-6 relative group">
                {/* Horizontal line connector in desktop */}
                {idx < 4 && (
                  <div className="hidden md:block absolute top-6 left-12 w-full h-[1px] bg-luxury-purple/20 group-hover:bg-luxury-purple transition-colors duration-500" />
                )}
                <div className="w-12 h-12 rounded-full border border-luxury-purple/40 flex items-center justify-center font-editorial text-luxury-purple font-light relative bg-white dark:bg-[#0E0E0E] group-hover:bg-luxury-purple group-hover:text-luxury-black transition-colors duration-500">
                  {proc.step}
                </div>
                <h3 className="font-editorial text-xl font-light">{proc.title}</h3>
                <p className="text-sm font-light text-luxury-black/60 dark:text-white/50 leading-relaxed">{proc.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>




      {/* 9. CONTACT CTA SECTION */}
      <section className="py-32 bg-luxury-black text-white relative border-t border-luxury-purple/25 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,106,0.08),transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10 relative z-10">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-widest text-luxury-purple font-semibold">Initiation</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-editorial text-5xl md:text-7xl font-light leading-none tracking-tight">
              Create an <br />
              <span className="italic text-luxury-purple">experience</span> with us.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-sm font-light text-white/50 max-w-md mx-auto leading-relaxed">
              Begin the script of your sensory event. Connect with our international concierge to outline your production objectives.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="pt-6">
              <Link to="/contact" className="inline-flex items-center space-x-3 bg-luxury-purple text-luxury-black font-semibold text-xs uppercase tracking-widest px-12 py-4 hover:bg-white transition-all duration-300">
                <span>Connect Concierge</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Home;
