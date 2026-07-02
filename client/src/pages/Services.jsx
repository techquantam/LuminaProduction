import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import TransitionEffect from '../components/TransitionEffect';

const DEFAULT_SERVICES = [
  {
    _id: '1',
    name: 'Exhibition Booth Design',
    description: 'Crafting bespoke, high-impact exhibition pavilions and interactive booths that command attention at global trade fairs.',
    icon: 'Compass',
    features: ['Custom Pavilion Engineering', 'Interactive Digital Walls', 'Architectural Spatial Planning', 'Eco-Luxury Material Sync'],
    details: 'Transforming trade floor presence into high-end curated gallery pavilions. We maximize guest flow, direct attention through lighting design, and leverage sustainable luxury finishes to command focus.'
  },
  {
    _id: '2',
    name: 'Production & Set Up',
    description: 'Providing elite technical staging, lighting design, sound engineering, and flawless on-site execution for grand spectacles.',
    icon: 'Award',
    features: ['High-End AV Blueprinting', 'Couture Lighting Plots', 'Rigging & Structural Setup', 'On-Site Technical Direction'],
    details: 'We deliver museum-grade event production. Our team coordinates complex rigging, custom stage fabrications, and synchronized lighting states to ensure a flawless execution under rigorous schedules.'
  },
  {
    _id: '3',
    name: 'Digital Solutions',
    description: 'Integrating cutting-edge creative technologies, holographic projections, and immersive AR/VR environments.',
    icon: 'Sparkles',
    features: ['Holographic Stage Integrations', 'Interactive Sensory Corridors', 'Actionable Customer Analytics', 'Web3 Immersive Integrations'],
    details: 'The future of communication is active experience. We integrate custom creative technology—from custom sensory corridors to biometric-responsive systems—delivering deep customer insights and pure awe.'
  }
];

// Dynamic Icon Renderer
const ServiceIcon = ({ name, className }) => {
  const IconComponent = Icons[name] || Icons.Sparkles;
  return <IconComponent className={className} size={24} />;
};

const Services = () => {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_URL}/services`);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setServices(data.data);
        }
      } catch (err) {
        console.warn('API down, using local fallback services.');
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      <TransitionEffect />
      
      {/* Page Header */}
      <section className="pt-40 pb-20 bg-luxury-bg dark:bg-luxury-bgDark transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4 max-w-4xl"
          >
            <p className="text-xs uppercase tracking-extreme text-luxury-gold font-semibold">Our Portfolio</p>
            <h1 className="font-editorial text-5xl md:text-7xl font-light leading-none tracking-tight">
              Experiential <br />
              <span className="italic text-luxury-gold">Disciplines</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Services Grid List */}
      <section className="pb-32 bg-luxury-bg dark:bg-luxury-bgDark transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="space-y-16">
            {services.map((svc, idx) => (
              <motion.div
                key={svc._id || idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-luxury-gold/20 pb-16 items-start`}
              >
                {/* Visual Icon & Index Column */}
                <div className="lg:col-span-3 flex items-center space-x-6">
                  <div className="w-16 h-16 rounded-full bg-luxury-gold/10 text-luxury-gold flex items-center justify-center border border-luxury-gold/20">
                    <ServiceIcon name={svc.icon} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-luxury-gold font-semibold">Service</p>
                    <h3 className="font-editorial text-2xl font-light text-luxury-black dark:text-white mt-1">{svc.name}</h3>
                  </div>
                </div>

                {/* Main Description */}
                <div className="lg:col-span-5 space-y-4">
                  <p className="text-sm font-light text-luxury-black/80 dark:text-white/70 leading-relaxed">
                    {svc.description}
                  </p>
                  <p className="text-xs font-light text-luxury-black/50 dark:text-white/40 leading-relaxed italic">
                    {svc.details}
                  </p>
                </div>

                {/* Key Features Bullet points */}
                <div className="lg:col-span-4 space-y-3">
                  <p className="text-xs uppercase tracking-widest text-luxury-gold font-semibold mb-2">Key Curation Specs</p>
                  <div className="grid grid-cols-1 gap-2">
                    {svc.features?.map((feat, fidx) => (
                      <div key={fidx} className="flex items-center space-x-3 text-xs tracking-wide font-light text-luxury-black/75 dark:text-white/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
