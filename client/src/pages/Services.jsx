import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import TransitionEffect from '../components/TransitionEffect';

const DEFAULT_SERVICES = [
  {
    _id: '1',
    name: 'Luxury Events',
    description: 'Immersive gala dinners, high-society celebrations, and bespoke private experiences defined by meticulous details.',
    icon: 'Sparkles',
    features: ['Exquisite Venue Sourcing', 'Atmospheric Scenic Scape', 'Couture Entertainment Design', 'VIP Concierge Coordination'],
    details: 'Our luxury private events are exercises in absolute luxury. We script every contact point, transforming venues into dramatic, immersive worlds that resonate with refined styling and elegance.'
  },
  {
    _id: '2',
    name: 'Corporate Conferences',
    description: 'Transforming corporate messaging into cinematic spatial stories with elite technical direction and flawless logistics.',
    icon: 'Award',
    features: ['Stunning Stage Architecture', 'Ultra-HD Multi-Screen Visuals', 'Digital Keynote Integration', 'Real-Time Stream Control'],
    details: 'We elevate corporate communication from simple presentations to majestic, cinematic brand statements. With elite AV arrays, real-time stage tracking, and seamless schedules, we inspire audiences globally.'
  },
  {
    _id: '3',
    name: 'Brand Activations',
    description: 'High-impact tactile environments that bridge luxury brands and modern audiences with storytelling depth.',
    icon: 'Flame',
    features: ['Kinetic Art Installations', 'Influencer Sensory Spaces', 'Viral Architectural Takeovers', 'Augmented Reality Overlays'],
    details: 'Through high-concept pop-ups, immersive gallery environments, and dynamic spatial takeovers, we construct unforgettable brand encounters that spark viral global reach and deep customer loyalty.'
  },
  {
    _id: '4',
    name: 'Product Launches',
    description: 'Sensory reveals designed to make your product introduction an epochal event in your industry.',
    icon: 'Rocket',
    features: ['High-Concept Reveal Tech', 'Global Press Management', 'Interactive Showcase Pods', 'Immersive Product Storytelling'],
    details: 'A product introduction should feel like a cultural moment. We blend state-of-the-art projection mapping, theatrical choreography, and high-impact set design to maximize prestige, anticipation, and industry capture.'
  },
  {
    _id: '5',
    name: 'Fashion Shows',
    description: 'Breathtaking runway systems, couture lighting, and dynamic spatial concepts for luxury apparel brands.',
    icon: 'Scissors',
    features: ['Custom Runway Engineering', 'Couture Lighting Plots', 'Backstage Sync Systems', 'Press Gallery Design'],
    details: 'Capturing the creative philosophy of apparel designers is our hallmark. We craft breathtaking set models, immersive soundscapes, and advanced architectural lighting to place couture garments in their perfect orbit.'
  },
  {
    _id: '6',
    name: 'Wedding Experiences',
    description: 'Ethereal, high-end nuptials and reception productions conceptualized with romance and architectural grandeur.',
    icon: 'Heart',
    features: ['Floral Master Architecture', 'Ethereal Ambient Illumination', 'Curated Symphony Orchestrations', 'Bespoke Invitation Craft'],
    details: 'We create ethereal, museum-grade wedding layouts for our high-profile clients. Blending master floral engineering with bespoke entertainment curation, we bring dreamlike romances into fully realized physical realities.'
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
