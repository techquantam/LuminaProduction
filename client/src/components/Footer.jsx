import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

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
              <Link to="/services" className="hover:text-luxury-gold transition-colors">Services Overview</Link>
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

          {/* Newsletter subscription */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest text-luxury-gold font-medium">The Dispatch</h4>
            <p className="text-sm font-light text-white/60 leading-relaxed">
              Subscribe to Lumina Journal for private event access, industry concepts, and design reflections.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-4">
              <input
                type="email"
                placeholder="ENTER EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 py-3 pr-10 text-xs tracking-widest focus:outline-none focus:border-luxury-gold uppercase text-white placeholder-white/30"
                required
              />
              <button
                type="submit"
                className="absolute right-0 top-3 text-white/60 hover:text-luxury-gold transition-colors"
                aria-label="Submit Email"
              >
                <ArrowRight size={18} />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-luxury-gold uppercase tracking-wider mt-2 animate-pulse">
                Private dispatch subscription confirmed.
              </p>
            )}
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
