import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Tag, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import TransitionEffect from '../components/TransitionEffect';

const DEFAULT_PROJECTS = {
  '1': {
    title: 'Showcase',
    description: 'An exclusive architectural lounge and glass showcase for the ultra-premium Range Rover SV, constructed inside the main atrium of a luxury retail center. The installation featured pristine mirror panel structures, synchronized LED screens, and custom copper lighting highlights.',
    category: 'Pop-ups & Experiential Exhibitions',
    client: 'Range Rover',
    date: '2025-02-15',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200',
    subImages: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800'
    ],
    location: 'Singapore',
    year: '2025',
    servicesDone: ['Atrium Set Engineering', 'Mirror Pane Architectural Detailing', 'Dynamic Lighting Synchronization', 'High-End Customer Reception Sync']
  },
  '2': {
    title: 'Perlée Pop-up',
    description: 'A whimsical sensory garden showcasing the iconic Perlée collection by high-jewelry maison Van Cleef & Arpels. The pastel-green interactive space integrated a custom-built miniature golden Ferris wheel, kinetic floral sculptures, and immersive digital showcase boxes across Southeast Asian flagships.',
    category: 'Pop-ups & Experiential Exhibitions',
    client: 'Van Cleef & Arpels',
    date: '2025-04-10',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200',
    subImages: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200'
    ],
    location: 'Singapore, Thailand, Malaysia',
    year: '2025',
    servicesDone: ['Kinetic Installation Engineering', 'Pastel Set Construction', 'Interactive Projection Mapping', 'Exhibition Display Curation']
  },
  '3': {
    title: 'The Magical House of Chanel',
    description: 'An outdoor architectural holiday installation staging a grand monochrome and gold house theme at Marina Bay Sands. The installation featured towering black double-C logos, oversized golden gift boxes, and a synchronized twilight laser light show.',
    category: 'Luxury, Fashion, Lifestyle Events & Galas',
    client: 'Chanel',
    date: '2024-11-20',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200',
    subImages: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200',
      'https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?q=80&w=1200'
    ],
    location: 'Singapore',
    year: '2024',
    servicesDone: ['Outdoor Architectural Engineering', 'Monochrome Scenic Production', 'Laser Array Integration', 'VIP Christmas Launch Gala Curation']
  },
  '4': {
    title: 'Journey of Potential Launch Event',
    description: 'A premium skincare launch event featuring custom biometric interactive screens that mapped skin health and projected personalized floral light art. The clean, modern gallery setting utilized sustainable timber frames and dynamic LED walls.',
    category: 'Pop-ups & Experiential Exhibitions',
    client: 'Shiseido',
    date: '2024-08-05',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200',
    subImages: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200'
    ],
    location: 'Singapore',
    year: '2024',
    servicesDone: ['Biometric Integration Design', 'Sustainable Set Building', 'Projection Mapping Curation', 'Press Reveal Choreography']
  },
  '5': {
    title: 'Immersive Exhibition',
    description: 'A grand digital art dome projection showcasing the historical palace interiors of Versailles. High-fidelity VR lounges and customized scented mist corridors allowed visitors to walk through the Hall of Mirrors virtually in Singapore.',
    category: 'Pop-ups & Experiential Exhibitions',
    client: 'Virtually Versailles',
    date: '2023-10-15',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200',
    subImages: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200',
      'https://images.unsplash.com/photo-1505232458627-539c97a88171?q=80&w=1200'
    ],
    location: 'Singapore',
    year: '2023',
    servicesDone: ['Cylindrical Dome Projection', 'Scent Integration Mechanics', 'VR Lounge Network Design', 'Museum Display Engineering']
  },
  '6': {
    title: 'Venture Beyond',
    description: 'A space-themed luxury wine tasting event featuring cosmic projection tunnels, customized acoustic dining setups, and a live holographic brand narrator guiding VIP collectors through the Penfolds heritage collection.',
    category: 'Luxury, Fashion, Lifestyle Events & Galas',
    client: 'Penfolds',
    date: '2022-09-02',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200',
    subImages: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200',
      'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?q=80&w=1200',
      'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1200'
    ],
    location: 'Singapore',
    year: '2022',
    servicesDone: ['Cosmic Projection Tunnels', 'Acoustic Dining Engineering', 'Holographic Presentation Curation', 'Collector VIP Curation']
  },
  '7': {
    title: 'Summit',
    description: 'A massive high-level corporate leadership conference featuring advanced multi-panel LED stage assemblies, high-fidelity real-time streaming, and interactive keynotes with live-polling dashboard projection.',
    category: 'Corporate Events & Conferences',
    client: 'Global Leadership',
    date: '2026-01-18',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200',
    subImages: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200'
    ],
    location: 'Singapore',
    year: '2026',
    servicesDone: ['Multi-Panel LED Stage Assemblies', 'High-Fidelity Stream Control', 'Interactive Keynote Design', 'Executive Lounge Curation']
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  
  const carouselRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const res = await fetch(`${API_URL}/projects/${id}`);
        const data = await res.json();
        if (data.success) {
          setProject(data.data);
          setActiveImage(data.data.imageUrl);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('API down, attempting fallback detail loading.');
      }

      // Standalone Fallback
      if (DEFAULT_PROJECTS[id]) {
        setProject(DEFAULT_PROJECTS[id]);
        setActiveImage(DEFAULT_PROJECTS[id].imageUrl);
      } else {
        // Fallback to first available if ID is custom and API failed
        setProject(DEFAULT_PROJECTS['1']);
        setActiveImage(DEFAULT_PROJECTS['1'].imageUrl);
      }
      setLoading(false);
    };

    fetchProjectDetail();
  }, [id]);

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-bg dark:bg-luxury-bgDark flex items-center justify-center">
        <p className="font-editorial text-lg tracking-widest text-luxury-gold animate-pulse">Retexturing Scene...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-luxury-bg dark:bg-luxury-bgDark flex flex-col items-center justify-center space-y-6">
        <p className="font-editorial text-2xl text-luxury-gold">Spectacle Not Found</p>
        <Link to="/portfolio" className="text-xs uppercase tracking-widest border border-luxury-gold px-6 py-3 text-luxury-gold">
          Return to Gallery
        </Link>
      </div>
    );
  }

  // Fallback to primary image if subImages is not defined or empty
  const subImagesList = project.subImages && project.subImages.length > 0 
    ? project.subImages 
    : [project.imageUrl];

  return (
    <>
      <TransitionEffect />

      {/* Large Premium Main Viewport Area */}
      <section className="relative pt-24 bg-luxury-bg dark:bg-luxury-bgDark transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Back Navigation Bar */}
          <div className="py-4 mb-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-3 text-luxury-black/60 dark:text-white/60 hover:text-luxury-gold dark:hover:text-luxury-gold transition-colors text-xs uppercase tracking-widest font-semibold font-sans"
            >
              <ArrowLeft size={14} />
              <span>Back to Portfolio</span>
            </button>
            <div className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold font-sans">
              {project.category}
            </div>
          </div>

          {/* Majestic Large Main Viewport */}
          <div className="w-full h-[62vh] relative overflow-hidden bg-luxury-black border border-luxury-black/5 dark:border-white/5 shadow-md">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.imageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
            
            {/* Project Quick Overlay Title */}
            <div className="absolute bottom-6 left-6 md:left-12 z-10 text-white">
              <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold mb-1">
                {project.client}
              </p>
              <h2 className="font-editorial text-2xl md:text-3xl font-light">
                {project.title}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Horizontal Scrolling Sub-Images Strip */}
      <section className="bg-luxury-bg dark:bg-luxury-bgDark transition-colors pt-4 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative group/carousel">
          
          {/* Scroll Navigation Buttons */}
          {subImagesList.length > 2 && (
            <>
              <button
                onClick={() => handleScroll('left')}
                className="absolute left-8 md:left-14 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-luxury-bgDark/90 border border-luxury-gold/25 text-luxury-gold flex items-center justify-center hover:bg-luxury-gold hover:text-white transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 shadow-md"
                aria-label="Scroll Left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="absolute right-8 md:right-14 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-luxury-bgDark/90 border border-luxury-gold/25 text-luxury-gold flex items-center justify-center hover:bg-luxury-gold hover:text-white transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 shadow-md"
                aria-label="Scroll Right"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Large Horizontal Scroll View */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none pb-4 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {subImagesList.map((imgUrl, index) => {
              return (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-[300px] md:w-[480px] aspect-[16/10] overflow-hidden border border-luxury-black/10 dark:border-white/10 bg-luxury-black/10 shadow-sm"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out hover:scale-[1.03]"
                    style={{ backgroundImage: `url(${imgUrl})` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Spec Curation Checklist & Description Details */}
      <section className="pb-32 bg-luxury-bg dark:bg-luxury-bgDark transition-colors border-t border-luxury-black/5 dark:border-white/5 pt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Creative Narrative Details */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-luxury-gold font-bold font-sans">
                  The Creative Script
                </p>
                <h3 className="font-editorial text-3xl font-light text-luxury-black dark:text-white leading-tight">
                  {project.client} &mdash; <span className="italic text-luxury-gold">{project.title}</span>
                </h3>
              </div>
              <p className="font-editorial text-lg font-light text-luxury-black/80 dark:text-white/70 leading-relaxed max-w-2xl">
                {project.description}
              </p>
            </div>

            {/* Right Column: Spec Metrics & Checklist details */}
            <div className="lg:col-span-5 space-y-8 bg-white dark:bg-[#0E0E0E] p-8 border border-luxury-gold/15 shadow-sm">
              <div className="space-y-6 pb-6 border-b border-luxury-gold/10">
                <h4 className="text-xs uppercase tracking-widest text-luxury-gold font-bold font-sans">
                  Chronology & Location
                </h4>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-luxury-black/40 dark:text-white/40 block font-bold font-sans mb-1">Coordinates</span>
                    <div className="flex items-center space-x-2 text-sm font-semibold tracking-wide">
                      <MapPin size={14} className="text-luxury-gold" />
                      <span>{project.location || 'Singapore'}</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-luxury-black/40 dark:text-white/40 block font-bold font-sans mb-1">Epoch</span>
                    <div className="flex items-center space-x-2 text-sm font-semibold tracking-wide">
                      <Calendar size={14} className="text-luxury-gold" />
                      <span>{project.year || '2025'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* services done checklist */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-luxury-gold font-bold font-sans">
                  Curation Checklist
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {project.servicesDone?.map((svc, idx) => (
                    <div key={idx} className="flex items-center space-x-3 text-xs font-light text-luxury-black/80 dark:text-white/85">
                      <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold shrink-0" />
                      <span>{svc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
