import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-luxury-black text-white pt-24 pb-12 border-t border-luxury-gold/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <h3 className="font-editorial text-2xl tracking-extreme uppercase text-luxury-gold">Lumina</h3>
            <p className="text-sm font-light text-white/60 leading-relaxed max-w-xs">
              Crafting sensory spectacles and architectural event wonders for the world's most prestigious entities.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-luxury-gold hover:text-luxury-gold transition-colors">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-luxury-gold hover:text-luxury-gold transition-colors">
                <Twitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-luxury-gold hover:text-luxury-gold transition-colors">
                <Linkedin size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-luxury-gold hover:text-luxury-gold transition-colors">
                <Facebook size={14} />
              </a>
            </div>
          </div>

          {/* Page Links */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest text-luxury-gold font-medium">Navigation</h4>
            <div className="flex flex-col space-y-3 text-sm font-light text-white/60">
              <Link to="/" className="hover:text-luxury-gold transition-colors">Home</Link>
              <Link to="/about" className="hover:text-luxury-gold transition-colors">About Story</Link>
              <Link to="/portfolio" className="hover:text-luxury-gold transition-colors">Creative Portfolio</Link>
              <Link to="/clients" className="hover:text-luxury-gold transition-colors">Elite Clients</Link>
              <Link to="/contact" className="hover:text-luxury-gold transition-colors">Bespoke Concierge</Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest text-luxury-gold font-medium">Bespoke Offices</h4>
            <div className="text-sm font-light text-white/60 space-y-4">
              <div>
                <p className="text-white/80 font-medium text-xs uppercase tracking-widest mb-1">Poland</p>
                <p>Osiedle Piastowskie 120</p>
                <p>61-166 Poznań, Poland</p>
                {/* <p>poland@luminalive.com</p> */}
              </div>
              <div>
                <p className="text-white/80 font-medium text-xs uppercase tracking-widest mb-1">Spain:
                </p>
                <p>Tren de la Fresa Nº 8 Street WarehouseNº 6 28350 Ciempozuelos(Madrid) , Spain</p>
                {/* <p>paris@luminalive.com</p> */}
              </div>
              <div>
                <p className="text-white/80 font-medium text-xs uppercase tracking-widest mb-1">India:
                </p>
                <p>Noida, 201301, Uttar Pradesh
                </p>
                {/* <p>paris@luminalive.com</p> */}
                <p className="text-white/80 font-medium text-xs uppercase tracking-widest mb-1">Italy <br />
                  Turkey<br />Saudi Arabia
                </p>
              </div>
            </div>
          </div>

          {/* World Map Section */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest text-luxury-gold font-medium">Global Network</h4>
            <div className="relative w-full aspect-[700/337] bg-neutral-100 border border-white/10 rounded-lg overflow-hidden p-0 group/map">
              {/* Map SVG - Clear white continents on light grey background */}
              <img 
                src="/world-map.svg" 
                alt="Lumina Global Locations" 
                className="w-full h-full opacity-95 select-none pointer-events-none" 
              />
              
              {/* Animated Location Dots */}
              {/* 1. Poland */}
              <a 
                href="https://maps.google.com/?q=Osiedle+Piastowskie+120,+61-166+Pozna%C5%84,+Poland" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute cursor-pointer group/dot z-10 -translate-x-1/2 -translate-y-1/2" 
                style={{ top: '32.15%', left: '53.18%' }}
              >
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-gold opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-luxury-gold border border-black/30"></span>
                </span>
                {/* Tooltip */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black border border-luxury-gold/40 text-white text-[10px] py-1.5 px-2.5 rounded shadow-2xl opacity-0 scale-75 group-hover/dot:opacity-100 group-hover/dot:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 origin-top">
                  <p className="font-semibold text-luxury-gold">Poznań, Poland</p>
                  <p className="text-white/60 text-[9px]">Click to view on Map</p>
                </div>
              </a>

              {/* 2. Spain */}
              <a 
                href="https://maps.google.com/?q=Calle+del+Tren+de+la+Fresa,+8,+28350+Ciempozuelos,+Madrid,+Spain" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute cursor-pointer group/dot z-10 -translate-x-1/2 -translate-y-1/2" 
                style={{ top: '43.28%', left: '46.05%' }}
              >
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-gold opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-luxury-gold border border-black/30"></span>
                </span>
                <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black border border-luxury-gold/40 text-white text-[10px] py-1.5 px-2.5 rounded shadow-2xl opacity-0 scale-75 group-hover/dot:opacity-100 group-hover/dot:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 origin-top">
                  <p className="font-semibold text-luxury-gold">Madrid, Spain</p>
                  <p className="text-white/60 text-[9px]">Click to view on Map</p>
                </div>
              </a>

              {/* 3. Italy */}
              <a 
                href="https://maps.google.com/?q=Piazza+del+Popolo,+Rome,+Italy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute cursor-pointer group/dot z-10 -translate-x-1/2 -translate-y-1/2" 
                style={{ top: '39.33%', left: '51.38%' }}
              >
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-gold opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-luxury-gold border border-black/30"></span>
                </span>
                <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black border border-luxury-gold/40 text-white text-[10px] py-1.5 px-2.5 rounded shadow-2xl opacity-0 scale-75 group-hover/dot:opacity-100 group-hover/dot:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 origin-top">
                  <p className="font-semibold text-luxury-gold">Rome, Italy</p>
                  <p className="text-white/60 text-[9px]">Click to view on Map</p>
                </div>
              </a>

              {/* 4. Turkey */}
              <a 
                href="https://maps.google.com/?q=Taksim+Square,+Istanbul,+Turkey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute cursor-pointer group/dot z-10 -translate-x-1/2 -translate-y-1/2" 
                style={{ top: '41.32%', left: '57.59%' }}
              >
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-gold opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-luxury-gold border border-black/30"></span>
                </span>
                <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black border border-luxury-gold/40 text-white text-[10px] py-1.5 px-2.5 rounded shadow-2xl opacity-0 scale-75 group-hover/dot:opacity-100 group-hover/dot:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 origin-top">
                  <p className="font-semibold text-luxury-gold">Istanbul, Turkey</p>
                  <p className="text-white/60 text-[9px]">Click to view on Map</p>
                </div>
              </a>

              {/* 5. Saudi Arabia */}
              <a 
                href="https://maps.google.com/?q=Olaya+District,+Riyadh,+Saudi+Arabia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute cursor-pointer group/dot z-10 -translate-x-1/2 -translate-y-1/2" 
                style={{ top: '50.52%', left: '60.29%' }}
              >
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-gold opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-luxury-gold border border-black/30"></span>
                </span>
                <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black border border-luxury-gold/40 text-white text-[10px] py-1.5 px-2.5 rounded shadow-2xl opacity-0 scale-75 group-hover/dot:opacity-100 group-hover/dot:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 origin-top">
                  <p className="font-semibold text-luxury-gold">Riyadh, Saudi Arabia</p>
                  <p className="text-white/60 text-[9px]">Click to view on Map</p>
                </div>
              </a>

              {/* 6. India */}
              <a 
                href="https://maps.google.com/?q=Sector+62,+Noida,+Uttar+Pradesh,+India" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute cursor-pointer group/dot z-10 -translate-x-1/2 -translate-y-1/2" 
                style={{ top: '48.10%', left: '69.30%' }}
              >
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-gold opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-luxury-gold border border-black/30"></span>
                </span>
                <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black border border-luxury-gold/40 text-white text-[10px] py-1.5 px-2.5 rounded shadow-2xl opacity-0 scale-75 group-hover/dot:opacity-100 group-hover/dot:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 origin-top">
                  <p className="font-semibold text-luxury-gold">Noida, India</p>
                  <p className="text-white/60 text-[9px]">Click to view on Map</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Big Branding Logo Line */}
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-light text-white/40 tracking-wider">
            &copy; {new Date().getFullYear()} LUMINA PRODUCTION. ALL AWARDS RESERVED.
          </p>
          <div className="text-[12vw] font-editorial tracking-extreme uppercase text-white/[0.03] select-none pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 overflow-hidden leading-none hidden lg:block">
            LUMINA
          </div>
          <div className="flex space-x-6 text-xs text-white/40 font-light">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
