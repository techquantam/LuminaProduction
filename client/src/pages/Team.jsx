import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TransitionEffect from '../components/TransitionEffect';
import { useAuth } from '../context/AuthContext';

const SEGMENTS = [
  {
    title: 'Strategy & Planning',
    desc: 'We assess client projects to optimize their reach and impact, combining research, analysis, and creative concepts for integrated communication, PR, and marketing campaigns. This approach builds brands.'
  },
  {
    title: 'Event Management & Activation',
    desc: 'Our expertise in event planning is marked by meticulousness, creativity, client-focused management, well-organized projects, strict timelines, and budget control. Long-running luxury brand partnerships validate our capabilities.'
  },
  {
    title: 'Design',
    desc: 'Good design fosters lasting impact. Our creative team crafts top-quality set and experiential designs, graphics, 3D renderings, AutoCAD, and production plans, delivering modern and impactful experiences.'
  },
  {
    title: 'Production',
    desc: 'With extensive experience throughout Asia, our prestigious client roster attests to our excellence. We manage set production, technical and AV requirements, supplier procurement, vendor supervision, and timelines.'
  }
];

const Team = () => {
  const [members, setMembers] = useState([]);
  const { API_URL } = useAuth();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${API_URL}/team`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setMembers(data.data);
        } else {
          throw new Error('No team members found');
        }
      } catch (err) {
        console.warn('Team API offline. Loading seeded luxury luminaries.');
        // Set beautiful static placeholder team members
        setMembers([
          { _id: '1', name: 'Gilles Delacroix', role: 'Managing Director & Scenographer', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400' },
          { _id: '2', name: 'Sophia Laurent', role: 'Creative Director & Fashion Producer', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400' },
          { _id: '3', name: 'Marcus Vance', role: 'Chief Technical Officer & AV Architect', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400' },
          { _id: '4', name: 'Elena Rostova', role: 'Head of Experience & Client Relations', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400' }
        ]);
      }
    };
    fetchTeam();
  }, [API_URL]);

  return (
    <>
      <TransitionEffect />

      {/* Main Container */}
      <div className="bg-luxury-bg dark:bg-luxury-bgDark transition-colors pt-36 pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header Segment */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16">
            <div className="lg:col-span-5">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-editorial text-5xl md:text-6xl font-light text-luxury-black dark:text-white"
              >
                Our Luminaries
              </motion.h1>
            </div>
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4 text-sm font-light text-luxury-black/70 dark:text-white/60 leading-relaxed"
              >
                <p>Our strength lies in our team of seasoned and devoted professionals.</p>
                <p>Having years of expertise, our team has the innate ability to turn ideas into reality with unwavering commitment to quality. Our keen eye for detail ensures that every event we create is unique, and sets us apart as leaders in the world of luxury and lifestyle events.</p>
                <p>And our work ethics is infused with enthusiasm.</p>
              </motion.div>
            </div>
          </div>

          {/* Segments Sections */}
          <div className="space-y-12 border-t border-luxury-gold/15 pt-12 pb-24">
            {SEGMENTS.map((seg, idx) => (
              <motion.div
                key={seg.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-luxury-gold/10 pb-8 items-start"
              >
                {/* Title with Arrow Icon on the left */}
                <div className="lg:col-span-5 flex items-start space-x-3 group">
                  <span className="font-editorial text-2xl text-luxury-gold transform transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
                    ↘
                  </span>
                  <h3 className="font-editorial text-2xl font-light text-luxury-black dark:text-white leading-tight">
                    {seg.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="lg:col-span-7">
                  <p className="text-xs font-light text-luxury-black/60 dark:text-white/50 leading-relaxed max-w-2xl">
                    {seg.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dynamic Team Members Grid */}
          <div className="border-t border-luxury-gold/15 pt-20">
            {/* Subsection Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
              <div>
                <p className="text-xs uppercase tracking-extreme text-luxury-gold font-semibold mb-2">Team</p>
                <h2 className="font-editorial text-4xl font-light text-luxury-black dark:text-white">
                  Meet the Innovators
                </h2>
              </div>
              <div className="w-16 h-[1px] bg-luxury-gold hidden md:block" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {members.map((member, idx) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group bg-white dark:bg-[#0E0E0E] border border-luxury-gold/15 p-6 hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    {/* Aspect-ratio image block */}
                    <div className="h-80 relative overflow-hidden bg-gray-100">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
                        style={{ backgroundImage: `url(${member.imageUrl})` }}
                      />
                      <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
                    </div>

                    <div className="space-y-2 text-center">
                      <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">
                        {member.role}
                      </p>
                      <h3 className="font-editorial text-xl font-light text-luxury-black dark:text-white">
                        {member.name}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Team;
