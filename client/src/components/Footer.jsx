import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

const LOCATIONS = [
  { id: 'poland', name: 'Poland', region: 'Europe', top: '32.15%', left: '53.18%', mapUrl: 'https://maps.google.com/?q=Osiedle+Piastowskie+120,+61-166+Pozna%C5%84,+Poland' },
  { id: 'spain', name: 'Spain', region: 'Europe', top: '43.28%', left: '46.05%', mapUrl: 'https://maps.google.com/?q=Tren+de+la+Fresa+N%C2%BA+8+Street+WarehouseN%C2%BA+6+28350+Ciempozuelos+(Madrid)+Spain' },
  { id: 'italy', name: 'Italy', region: 'Europe', top: '39.33%', left: '51.38%', mapUrl: 'https://maps.google.com/?q=Viale+A.+De+Gasperi+101+-20017+Rho+(Milano)+Italy' },
  { id: 'turkey', name: 'Turkey', region: 'Europe', top: '41.32%', left: '57.59%', mapUrl: 'https://maps.google.com/?q=Orhan+Gazi+Mah.+Mimsan+San.+Sit.+1730+Sok.+No+:+3+Esenyurt+/+%C4%B0stanbul+Turkey' },
  { id: 'saudi', name: 'Saudi Arabia', region: 'Asia', top: '50.52%', left: '60.29%', mapUrl: 'https://maps.google.com/?q=3311+An+Nasr+Rd,+7868,+Al-Masani,+Riyadh+14714,+Saudi+Arabia' },
  { id: 'india', name: 'India', region: 'Asia', top: '48.10%', left: '69.30%', mapUrl: 'https://maps.google.com/?q=Noida,+201301,+Uttar+Pradesh,+India' }
];

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <footer className="bg-[#0b0612] text-white pt-24 pb-12 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {isHomePage && (
          <>
            {/* Heading Section */}
            <div className="mb-16 max-w-5xl mx-auto">
          <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight mb-4">
            Delivering your brand globally
          </h2>
          <div className="h-1 w-24 bg-luxury-purple"></div>
        </div>

        {/* Large Map Section */}
        <div className="relative w-full max-w-5xl mx-auto aspect-[700/337] mb-32">
          {/* Pattern Map using Mask */}
          <div 
            className="absolute inset-0 w-full h-full opacity-60"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='50%25' font-size='12' font-family='monospace' font-weight='bold' fill='%23ffffff' text-anchor='middle' dominant-baseline='middle'%3E+%3C/text%3E%3C/svg%3E")`,
              backgroundSize: '14px 14px',
              WebkitMaskImage: `url('/world-map.svg')`,
              WebkitMaskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: `url('/world-map.svg')`,
              maskSize: '100% 100%',
              maskRepeat: 'no-repeat',
              maskPosition: 'center'
            }}
          />
          
          {/* Location Markers */}
          {LOCATIONS.map(loc => (
            <a 
              key={loc.id}
              href={loc.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute z-10 flex items-center -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform group/marker"
              style={{ top: loc.top, left: loc.left }}
            >
              <span className="text-luxury-purple font-mono text-lg leading-none font-bold group-hover/marker:text-white transition-colors">+</span>
              <span className="ml-1.5 text-xs text-white font-semibold tracking-wide group-hover/marker:text-luxury-purple transition-colors">{loc.name}</span>
            </a>
          ))}
          </div>
          </>
        )}

        {/* Classic Footer Section */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 ${isHomePage ? 'pt-12 border-t border-luxury-purple/20' : ''}`}>
          
          {/* Brand Info */}
          <div className="space-y-6 lg:col-span-2">
            <h3 className="font-editorial text-2xl tracking-[0.3em] uppercase text-luxury-purple font-semibold">L U M I N A</h3>
            <p className="text-sm font-light text-white/60 leading-relaxed max-w-sm">
              Crafting sensory spectacles and architectural event wonders for the world's most prestigious entities.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-luxury-purple hover:text-luxury-purple transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-luxury-purple hover:text-luxury-purple transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-luxury-purple hover:text-luxury-purple transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-luxury-purple hover:text-luxury-purple transition-colors">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Page Links */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest text-luxury-purple font-bold">Navigation</h4>
            <div className="flex flex-col space-y-4 text-sm font-light text-white/70">
              <Link to="/" className="hover:text-luxury-purple transition-colors">Home</Link>
              <Link to="/about" className="hover:text-luxury-purple transition-colors">About Story</Link>
              <Link to="/portfolio" className="hover:text-luxury-purple transition-colors">Creative Portfolio</Link>
              <Link to="/contact" className="hover:text-luxury-purple transition-colors">Bespoke Concierge</Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-6 lg:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-luxury-purple font-bold">Bespoke Offices</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-12">
              <div className="border-l border-luxury-purple/40 pl-4">
                <a 
                  href="https://maps.google.com/?q=Osiedle+Piastowskie+120,+61-166+Pozna%C5%84,+Poland" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-luxury-purple font-medium text-xs uppercase tracking-widest transition-colors block py-1"
                >
                  Poland
                </a>
              </div>
              <div className="border-l border-luxury-purple/40 pl-4">
                <a 
                  href="https://maps.google.com/?q=Tren+de+la+Fresa+N%C2%BA+8+Street+WarehouseN%C2%BA+6+28350+Ciempozuelos+(Madrid)+Spain" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-luxury-purple font-medium text-xs uppercase tracking-widest transition-colors block py-1"
                >
                  Spain
                </a>
              </div>
              <div className="border-l border-luxury-purple/40 pl-4">
                <a 
                  href="https://maps.google.com/?q=Viale+A.+De+Gasperi+101+-20017+Rho+(Milano)+Italy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-luxury-purple font-medium text-xs uppercase tracking-widest transition-colors block py-1"
                >
                  Italy
                </a>
              </div>
              <div className="border-l border-luxury-purple/40 pl-4">
                <a 
                  href="https://maps.google.com/?q=Orhan+Gazi+Mah.+Mimsan+San.+Sit.+1730+Sok.+No+:+3+Esenyurt+/+%C4%B0stanbul+Turkey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-luxury-purple font-medium text-xs uppercase tracking-widest transition-colors block py-1"
                >
                  Turkey
                </a>
              </div>
              <div className="border-l border-luxury-purple/40 pl-4">
                <a 
                  href="https://maps.google.com/?q=3311+An+Nasr+Rd,+7868,+Al-Masani,+Riyadh+14714,+Saudi+Arabia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-luxury-purple font-medium text-xs uppercase tracking-widest transition-colors block py-1"
                >
                  Saudi Arabia
                </a>
              </div>
              <div className="border-l border-luxury-purple/40 pl-4">
                <a 
                  href="https://maps.google.com/?q=Noida,+201301,+Uttar+Pradesh,+India" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-luxury-purple font-medium text-xs uppercase tracking-widest transition-colors block py-1"
                >
                  India
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Big Branding Logo Line */}
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 relative">
          <p className="text-xs font-light text-white/40 tracking-wider">
            &copy; {new Date().getFullYear()} LUMINA PRODUCTION. ALL AWARDS RESERVED.
          </p>
          <div className="text-[14vw] font-editorial tracking-extreme uppercase text-white/[0.02] select-none pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 overflow-hidden leading-none hidden lg:block">
            LUMINA
          </div>
          <div className="flex space-x-6 text-xs text-white/40 font-light relative z-10">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
