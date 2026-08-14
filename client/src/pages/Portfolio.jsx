import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, FileDown, CheckCircle } from 'lucide-react';
import TransitionEffect from '../components/TransitionEffect';
import ScrollReveal from '../components/ScrollReveal';

const DEFAULT_PROJECTS = [];

const CATEGORIES = [
  'Pop-ups & Experiential Exhibitions',
  'Luxury, Fashion, Lifestyle Events & Galas',
  'Corporate Events & Conferences'
];

const Portfolio = () => {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [filteredProjects, setFilteredProjects] = useState(DEFAULT_PROJECTS);
  const [activeCategory, setActiveCategory] = useState('Pop-ups & Experiential Exhibitions');
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const formRef = useRef(null);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const nameInput = document.getElementsByName('name')[0];
        if (nameInput) nameInput.focus();
      }, 800);
    }
  };

  const [formData, setFormData] = useState({ name: '', email: '', company: '', jobTitle: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: '', downloadUrl: '' });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: '', downloadUrl: '' });

    try {
      const res = await fetch(`${API_URL}/contacts/credentials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setSubmitStatus({
          success: true,
          message: data.message || 'Credentials requested successfully!',
          downloadUrl: data.downloadUrl || '/lumina-credentials.pdf'
        });
        setFormData({ name: '', email: '', company: '', jobTitle: '' });
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || 'Error processing request.',
          downloadUrl: ''
        });
      }
    } catch (err) {
      setSubmitStatus({
        success: false,
        message: 'Unable to reach server. Please try again later.',
        downloadUrl: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/projects`);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setProjects(data.data);
          setFilteredProjects(data.data);
        }
      } catch (err) {
        console.warn('API down, using premium local fallback projects.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    setFilteredProjects(projects.filter(p => p.category === activeCategory));
    setShowAll(false); // reset when category changes
  }, [activeCategory, projects]);

  return (
    <>
      <TransitionEffect />

      {/* Premium Minimal Editorial Header */}
      <section className="pt-32 pb-6 bg-luxury-bg dark:bg-luxury-bgDark transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="space-y-2">
              <h1 className="font-editorial text-4xl md:text-5xl font-light tracking-tight text-luxury-black dark:text-white">
                Portfolio
              </h1>
            </div>
          </ScrollReveal>
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
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-luxury-purple"
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

      {/* Premium Project Grid */}
      <section className="pb-32 bg-luxury-bg dark:bg-luxury-bgDark transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Loading Skeleton */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {[1,2,3].map(i => (
                <div key={i} className="flex flex-col gap-3 animate-pulse">
                  <div className="h-3 w-32 bg-luxury-black/10 dark:bg-white/10 rounded" />
                  <div className="w-full aspect-[16/10] bg-luxury-black/10 dark:bg-white/10 rounded" />
                  <div className="h-2 w-24 bg-luxury-black/10 dark:bg-white/10 rounded" />
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-xs uppercase tracking-widest text-luxury-black/40 dark:text-white/40 font-bold">No spectacles archived in this category yet.</p>
              <p className="text-sm font-light text-luxury-black/30 dark:text-white/30 mt-2">Admin can add projects via the Dashboard → Spectacles CRUD.</p>
            </div>
          ) : (
            <>
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
              >
                <AnimatePresence mode="popLayout">
                  {(showAll ? filteredProjects : filteredProjects.slice(0, 3)).map((proj) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4 }}
                      key={proj._id}
                      className="flex flex-col"
                    >
                      <div
                        onClick={scrollToForm}
                        className="group flex flex-col w-full h-full select-none cursor-pointer"
                      >
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
                          <span className="w-1.5 h-1.5 rounded-full border border-luxury-purple shrink-0 inline-block" />
                          <span>{proj.location || 'Singapore'}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Show All / Show Less toggle */}
              {filteredProjects.length > 3 && (
                <div className="flex justify-center mt-16">
                  <button
                    onClick={() => setShowAll(prev => !prev)}
                    className="group flex items-center space-x-3 text-xs uppercase tracking-widest font-bold border border-luxury-purple/30 px-10 py-4 text-luxury-purple hover:bg-luxury-purple hover:text-luxury-black transition-all duration-300"
                  >
                    <span>{showAll ? `Show Less` : `View All ${filteredProjects.length} Projects`}</span>
                    <ArrowRight size={12} className={`transition-transform duration-300 ${showAll ? 'rotate-180' : 'group-hover:translate-x-1'}`} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Premium Credentials Request Form Section */}
      <section ref={formRef} className="py-24 bg-luxury-bg dark:bg-luxury-bgDark border-t border-luxury-purple/15 transition-colors">
        <div className="max-w-4xl mx-auto px-6 md:px-12">

          {/* Header */}
          <ScrollReveal>
            <div className="flex items-center space-x-4 mb-10">
              <h2 className="font-editorial text-3xl md:text-4xl font-light text-luxury-black dark:text-white">Request Credentials Booklet</h2>
              <span className="font-editorial text-3xl md:text-4xl font-light text-luxury-purple">↘</span>
              <div className="w-12 h-[1px] bg-luxury-purple" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-sm font-light text-luxury-black/70 dark:text-white/70 leading-relaxed mb-12 max-w-2xl">
              Access our exclusive capabilities portfolio, case studies, and bespoke event credentials.
              Fill in your details below to receive our official credentials booklet directly in your inbox.
            </p>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            {submitStatus.success ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-luxury-black/5 dark:bg-white/5 border border-luxury-purple/30 p-8 md:p-12 text-center rounded-lg shadow-xl relative overflow-hidden"
              >
                {/* Visual Glow */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-luxury-purple/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-luxury-purple/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-luxury-purple/10 border border-luxury-purple/30 flex items-center justify-center text-luxury-purple">
                    <CheckCircle size={32} />
                  </div>
                </div>

                <h3 className="font-editorial text-2xl font-light text-luxury-black dark:text-white mb-4">
                  Credentials Dispatched
                </h3>

                <p className="text-sm text-luxury-black/70 dark:text-white/70 leading-relaxed max-w-md mx-auto mb-10">
                  {submitStatus.message}
                </p>

                <div className="flex justify-center">
                  <button
                    onClick={() => setSubmitStatus({ success: null, message: '', downloadUrl: '' })}
                    className="inline-flex items-center space-x-2 bg-luxury-purple hover:bg-luxury-purple/90 text-luxury-black font-medium text-xs uppercase tracking-widest px-10 py-4 transition-all duration-300 rounded shadow-md hover:shadow-lg"
                  >
                    <span>Request Another</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="credentials-form"
                onSubmit={handleFormSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {submitStatus.success === false && (
                  <div className="text-red-500 text-xs uppercase tracking-widest border border-red-500/20 bg-red-500/5 p-4 rounded text-center">
                    {submitStatus.message}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name Input */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      placeholder="Full Name *"
                      className="w-full bg-transparent border-b border-luxury-black/15 dark:border-white/15 focus:border-luxury-purple outline-none py-3 text-sm font-light text-luxury-black dark:text-white transition-colors placeholder-luxury-black/40 dark:placeholder-white/40"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      placeholder="Email Address *"
                      className="w-full bg-transparent border-b border-luxury-black/15 dark:border-white/15 focus:border-luxury-purple outline-none py-3 text-sm font-light text-luxury-black dark:text-white transition-colors placeholder-luxury-black/40 dark:placeholder-white/40"
                    />
                  </div>

                  {/* Company Input */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleFormChange}
                      required
                      placeholder="Company Name *"
                      className="w-full bg-transparent border-b border-luxury-black/15 dark:border-white/15 focus:border-luxury-purple outline-none py-3 text-sm font-light text-luxury-black dark:text-white transition-colors placeholder-luxury-black/40 dark:placeholder-white/40"
                    />
                  </div>

                  {/* Job Title Input */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleFormChange}
                      placeholder="Job Title / Role (Optional)"
                      className="w-full bg-transparent border-b border-luxury-black/15 dark:border-white/15 focus:border-luxury-purple outline-none py-3 text-sm font-light text-luxury-black dark:text-white transition-colors placeholder-luxury-black/40 dark:placeholder-white/40"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center space-x-3 bg-luxury-purple text-luxury-black hover:bg-luxury-purple/90 disabled:bg-luxury-purple/50 font-medium text-xs uppercase tracking-widest px-10 py-5 transition-all duration-300 rounded shadow-md group"
                  >
                    <span>{isSubmitting ? 'Dispatching Credentials...' : 'Request Credentials Booklet'}</span>
                    {!isSubmitting && (
                      <ArrowRight size={14} className="transform transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

        </div>
      </section>
    </>
  );
};

export default Portfolio;
