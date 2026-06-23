const Service = require('../models/Service');
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');
const Gallery = require('../models/Gallery');
const Client = require('../models/Client');
const TeamMember = require('../models/TeamMember');
const mockCollections = require('./mockDb');

const servicesData = [
  {
    name: 'Luxury Events',
    description: 'Immersive gala dinners, high-society celebrations, and bespoke private experiences defined by meticulous details.',
    icon: 'Sparkles',
    features: ['Exquisite Venue Sourcing', 'Atmospheric Scenic Scape', 'Couture Entertainment Design', 'VIP Concierge Coordination'],
    details: 'Our luxury private events are exercises in absolute luxury. We script every contact point, transforming venues into dramatic, immersive worlds that resonate with refined styling and elegance.'
  },
  {
    name: 'Corporate Conferences',
    description: 'Transforming corporate messaging into cinematic spatial stories with elite technical direction and flawless logistics.',
    icon: 'Award',
    features: ['Stunning Stage Architecture', 'Ultra-HD Multi-Screen Visuals', 'Digital Keynote Integration', 'Real-Time Stream Control'],
    details: 'We elevate corporate communication from simple presentations to majestic, cinematic brand statements. With elite AV arrays, real-time stage tracking, and seamless schedules, we inspire audiences globally.'
  },
  {
    name: 'Brand Activations',
    description: 'High-impact tactile environments that bridge luxury brands and modern audiences with storytelling depth.',
    icon: 'Flame',
    features: ['Kinetic Art Installations', 'Influencer Sensory Spaces', 'Viral Architectural Takeovers', 'Augmented Reality Overlays'],
    details: 'Through high-concept pop-ups, immersive gallery environments, and dynamic spatial takeovers, we construct unforgettable brand encounters that spark viral global reach and deep customer loyalty.'
  },
  {
    name: 'Product Launches',
    description: 'Sensory reveals designed to make your product introduction an epochal event in your industry.',
    icon: 'Rocket',
    features: ['High-Concept Reveal Tech', 'Global Press Management', 'Interactive Showcase Pods', 'Immersive Product Storytelling'],
    details: 'A product introduction should feel like a cultural moment. We blend state-of-the-art projection mapping, theatrical choreography, and high-impact set design to maximize prestige, anticipation, and industry capture.'
  },
  {
    name: 'Fashion Shows',
    description: 'Breathtaking runway systems, couture lighting, and dynamic spatial concepts for luxury apparel brands.',
    icon: 'Scissors',
    features: ['Custom Runway Engineering', 'Couture Lighting Plots', 'Backstage Sync Systems', 'Press Gallery Design'],
    details: 'Capturing the creative philosophy of apparel designers is our hallmark. We craft breathtaking set models, immersive soundscapes, and advanced architectural lighting to place couture garments in their perfect aesthetic orbit.'
  },
  {
    name: 'Wedding Experiences',
    description: 'Ethereal, high-end nuptials and reception productions conceptualized with romance and architectural grandeur.',
    icon: 'Heart',
    features: ['Floral Master Architecture', 'Ethereal Ambient Illumination', 'Curated Symphony Orchestrations', 'Bespoke Invitation Craft'],
    details: 'We create ethereal, museum-grade wedding layouts for our high-profile clients. Blending master floral engineering with bespoke entertainment curation, we bring dreamlike romances into fully realized physical realities.'
  },
  {
    name: 'Exhibition Design',
    description: 'Museum-grade spatial graphics, interactive booths, and curated galleries for global trade fairs.',
    icon: 'Compass',
    features: ['Custom Pavilion Engineering', 'Interactive Digital Walls', 'Architectural Spatial Planning', 'Eco-Luxury Material Sync'],
    details: 'Transforming trade floor presence into high-end curated gallery pavilions. We maximize guest flow, direct attention through lighting design, and leverage sustainable luxury finishes to command focus.'
  },
  {
    name: 'Experiential Marketing',
    description: 'Merging physical realms with digital magic through custom creative technologies.',
    icon: 'Globe',
    features: ['Holographic Stage Integrations', 'Interactive Sensory Corridors', 'Actionable Customer Analytics', 'Web3 Immersive Integrations'],
    details: 'The future of communication is active experience. We integrate custom creative technology—from custom sensory corridors to biometric-responsive systems—delivering deep customer insights and pure awe.'
  }
];

const projectsData = [
  {
    title: 'Showcase',
    description: 'An exclusive architectural lounge and glass showcase for the ultra-premium Range Rover SV, constructed inside the main atrium of a luxury retail center. The installation featured pristine mirror panel structures, synchronized LED screens, and custom copper lighting highlights.',
    category: 'Pop-ups & Experiential Exhibitions',
    client: 'Range Rover',
    date: new Date('2025-02-15'),
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800',
    subImages: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800'
    ],
    location: 'Singapore',
    year: '2025',
    videoUrl: '',
    servicesDone: ['Atrium Set Engineering', 'Mirror Pane Architectural Detailing', 'Dynamic Lighting Synchronization', 'High-End Customer Reception Sync'],
    featured: true
  },
  {
    title: 'Perlée Pop-up',
    description: 'A whimsical sensory garden showcasing the iconic Perlée collection by high-jewelry maison Van Cleef & Arpels. The pastel-green interactive space integrated a custom-built miniature golden Ferris wheel, kinetic floral sculptures, and immersive digital showcase boxes across Southeast Asian flagships.',
    category: 'Pop-ups & Experiential Exhibitions',
    client: 'Van Cleef & Arpels',
    date: new Date('2025-04-10'),
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800',
    subImages: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800'
    ],
    location: 'Singapore, Thailand, Malaysia',
    year: '2025',
    videoUrl: '',
    servicesDone: ['Kinetic Installation Engineering', 'Pastel Set Construction', 'Interactive Projection Mapping', 'Exhibition Display Curation'],
    featured: true
  },
  {
    title: 'The Magical House of Chanel',
    description: 'An outdoor architectural holiday installation staging a grand monochrome and gold house theme at Marina Bay Sands. The installation featured towering black double-C logos, oversized golden gift boxes, and a synchronized twilight laser light show.',
    category: 'Luxury, Fashion, Lifestyle Events & Galas',
    client: 'Chanel',
    date: new Date('2024-11-20'),
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800',
    subImages: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800',
      'https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?q=80&w=800'
    ],
    location: 'Singapore',
    year: '2024',
    videoUrl: '',
    servicesDone: ['Outdoor Architectural Engineering', 'Monochrome Scenic Production', 'Laser Array Integration', 'VIP Christmas Launch Gala Curation'],
    featured: true
  },
  {
    title: 'Journey of Potential Launch Event',
    description: 'A premium skincare launch event featuring custom biometric interactive screens that mapped skin health and projected personalized floral light art. The clean, modern gallery setting utilized sustainable timber frames and dynamic LED walls.',
    category: 'Pop-ups & Experiential Exhibitions',
    client: 'Shiseido',
    date: new Date('2024-08-05'),
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800',
    subImages: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800'
    ],
    location: 'Singapore',
    year: '2024',
    videoUrl: '',
    servicesDone: ['Biometric Integration Design', 'Sustainable Set Building', 'Projection Mapping Curation', 'Press Reveal Choreography'],
    featured: false
  },
  {
    title: 'Immersive Exhibition',
    description: 'A grand digital art dome projection showcasing the historical palace interiors of Versailles. High-fidelity VR lounges and customized scented mist corridors allowed visitors to walk through the Hall of Mirrors virtually in Singapore.',
    category: 'Pop-ups & Experiential Exhibitions',
    client: 'Virtually Versailles',
    date: new Date('2023-10-15'),
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800',
    subImages: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800',
      'https://images.unsplash.com/photo-1505232458627-539c97a88171?q=80&w=800'
    ],
    location: 'Singapore',
    year: '2023',
    videoUrl: '',
    servicesDone: ['Cylindrical Dome Projection', 'Scent Integration Mechanics', 'VR Lounge Network Design', 'Museum Display Engineering'],
    featured: false
  },
  {
    title: 'Venture Beyond',
    description: 'A space-themed luxury wine tasting event featuring cosmic projection tunnels, customized acoustic dining setups, and a live holographic brand narrator guiding VIP collectors through the Penfolds heritage collection.',
    category: 'Luxury, Fashion, Lifestyle Events & Galas',
    client: 'Penfolds',
    date: new Date('2022-09-02'),
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800',
    subImages: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800',
      'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?q=80&w=800',
      'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=800'
    ],
    location: 'Singapore',
    year: '2022',
    videoUrl: '',
    servicesDone: ['Cosmic Projection Tunnels', 'Acoustic Dining Engineering', 'Holographic Presentation Curation', 'Collector VIP Curation'],
    featured: false
  },
  {
    title: 'Summit',
    description: 'A massive high-level corporate leadership conference featuring advanced multi-panel LED stage assemblies, high-fidelity real-time streaming, and interactive keynotes with live-polling dashboard projection.',
    category: 'Corporate Events & Conferences',
    client: 'Global Leadership',
    date: new Date('2026-01-18'),
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800',
    subImages: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800'
    ],
    location: 'Singapore',
    year: '2026',
    videoUrl: '',
    servicesDone: ['Multi-Panel LED Stage Assemblies', 'High-Fidelity Stream Control', 'Interactive Keynote Design', 'Executive Lounge Curation'],
    featured: true
  }
];

const clientsData = [
  { name: 'Audemars Piguet', logoUrl: 'https://logo.clearbit.com/audemarspiguet.com' },
  { name: 'BMW', logoUrl: 'https://logo.clearbit.com/bmw.com' },
  { name: 'Cartier', logoUrl: 'https://logo.clearbit.com/cartier.com' },
  { name: 'Chanel', logoUrl: 'https://logo.clearbit.com/chanel.com' },
  { name: 'Chopard', logoUrl: 'https://logo.clearbit.com/chopard.com' },
  { name: 'Dior', logoUrl: 'https://logo.clearbit.com/dior.com' },
  { name: 'Fendi', logoUrl: 'https://logo.clearbit.com/fendi.com' },
  { name: 'Ferrari', logoUrl: 'https://logo.clearbit.com/ferrari.com' },
  { name: 'Gucci', logoUrl: 'https://logo.clearbit.com/gucci.com' },
  { name: 'Hermès', logoUrl: 'https://logo.clearbit.com/hermes.com' },
  { name: 'HSBC', logoUrl: 'https://logo.clearbit.com/hsbc.com' },
  { name: 'Lexus', logoUrl: 'https://logo.clearbit.com/lexus.com' },
  { name: 'Louis Vuitton', logoUrl: 'https://logo.clearbit.com/louisvuitton.com' },
  { name: 'Montblanc', logoUrl: 'https://logo.clearbit.com/montblanc.com' },
  { name: 'Piaget', logoUrl: 'https://logo.clearbit.com/piaget.com' }
];

const testimonialsData = [
  {
    clientName: 'Alexander Vance',
    company: 'Aura Couture',
    feedback: 'Lumina Production did not just organize a runway; they created an architectural miracle. Staging our autumn couture on a cliffside mirror runway was sheer genius.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    rating: 5
  },
  {
    clientName: 'Sophia Lin',
    company: 'Vertu Enterprise',
    feedback: 'Our annual executive congress was elevated into a cinematic story. The holographic stages and flawless flow exceeded our corporate vision by orders of magnitude.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    rating: 5
  }
];

const galleryData = [
  {
    title: 'Cliffside Catwalk View',
    category: 'Fashion Show',
    description: 'Minimalist glass and mirror runway extending out towards the endless ocean horizon.',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600'
  },
  {
    title: 'Obsidian Stage Light Plot',
    category: 'Stage Design',
    description: 'Precision luxury ambient light beam design cutting through a clean smoke atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600'
  },
  {
    title: 'Flora Installation Close-Up',
    category: 'Luxury Wedding',
    description: 'Intricate hanging wisteria and glass globes creating a mystical starlight dinner ceiling.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600'
  },
  {
    title: 'EV Robot Arm Setup',
    category: 'Product Launch',
    description: 'Advanced motion-controlled camera arm ready for the dramatic curtain drop.',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600'
  }
];

const teamData = [
  {
    name: 'Gilles Delacroix',
    role: 'Managing Director & Scenographer',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400'
  },
  {
    name: 'Sophia Laurent',
    role: 'Creative Director & Fashion Producer',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400'
  },
  {
    name: 'Marcus Vance',
    role: 'Chief Technical Officer & AV Architect',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400'
  },
  {
    name: 'Elena Rostova',
    role: 'Head of Experience & Client Relations',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400'
  }
];

const seedData = async () => {
  if (global.isMockDB) {
    // Seed mock collections
    if (mockCollections.Service.find().length === 0) {
      servicesData.forEach(item => mockCollections.Service.create(item));
      console.log('\x1b[32m[Seed] Mock Services Initialized.\x1b[0m');
    }
    if (mockCollections.Project.find().length === 0) {
      projectsData.forEach(item => mockCollections.Project.create(item));
      console.log('\x1b[32m[Seed] Mock Projects Initialized.\x1b[0m');
    }
    if (mockCollections.Testimonial.find().length === 0) {
      testimonialsData.forEach(item => mockCollections.Testimonial.create(item));
      console.log('\x1b[32m[Seed] Mock Testimonials Initialized.\x1b[0m');
    }
    if (mockCollections.Gallery.find().length === 0) {
      galleryData.forEach(item => mockCollections.Gallery.create(item));
      console.log('\x1b[32m[Seed] Mock Gallery Initialized.\x1b[0m');
    }
    const existingMockClients = mockCollections.Client.find();
    for (const item of clientsData) {
      const match = existingMockClients.find(c => c.name === item.name);
      if (match) {
        mockCollections.Client.findByIdAndUpdate(match._id, { logoUrl: item.logoUrl });
      } else {
        mockCollections.Client.create(item);
      }
    }
    console.log('\x1b[32m[Seed] Mock Clients Synchronized.\x1b[0m');
    if (mockCollections.TeamMember.find().length === 0) {
      teamData.forEach(item => mockCollections.TeamMember.create(item));
      console.log('\x1b[32m[Seed] Mock Team Members Initialized.\x1b[0m');
    }
  } else {
    try {
      // Seed Mongoose collections
      const serviceCount = await Service.countDocuments();
      if (serviceCount === 0) {
        await Service.insertMany(servicesData);
        console.log('\x1b[32m[Seed] Mongoose Services Initialized.\x1b[0m');
      }

      const projectCount = await Project.countDocuments();
      if (projectCount === 0) {
        await Project.insertMany(projectsData);
        console.log('\x1b[32m[Seed] Mongoose Projects Initialized.\x1b[0m');
      }

      const testimonialCount = await Testimonial.countDocuments();
      if (testimonialCount === 0) {
        await Testimonial.insertMany(testimonialsData);
        console.log('\x1b[32m[Seed] Mongoose Testimonials Initialized.\x1b[0m');
      }

      const galleryCount = await Gallery.countDocuments();
      if (galleryCount === 0) {
        await Gallery.insertMany(galleryData);
        console.log('\x1b[32m[Seed] Mongoose Gallery Initialized.\x1b[0m');
      }

      for (const item of clientsData) {
        await Client.findOneAndUpdate(
          { name: item.name },
          { logoUrl: item.logoUrl },
          { upsert: true }
        );
      }
      console.log('\x1b[32m[Seed] Mongoose Clients Synchronized.\x1b[0m');

      const teamCount = await TeamMember.countDocuments();
      if (teamCount === 0) {
        await TeamMember.insertMany(teamData);
        console.log('\x1b[32m[Seed] Mongoose Team Members Initialized.\x1b[0m');
      }
    } catch (err) {
      console.error('Error seeding Mongoose database:', err.message);
    }
  }
};

module.exports = seedData;
