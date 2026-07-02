import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Hooks & Components
import { useLenis } from './hooks/useLenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import IntroLoader from './components/IntroLoader';

// Static Imports to eliminate Suspense delays and AnimatePresence route glitches
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Clients from './pages/Clients';
import Contact from './pages/Contact';
import Team from './pages/Team';
import AdminDashboard from './pages/AdminDashboard';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    return sessionStorage.getItem('hasSeenIntro') !== 'true';
  });

  // Initialize Lenis smooth scroll globally
  useLenis();
  const location = useLocation();

  // Bulletproof Route Change Lifecycle: Reset scroll position, clean up GSAP layout locks & enable scroll
  useEffect(() => {
    // Kill all active GSAP ScrollTrigger instances immediately to dismantle pin-spacers and wrappers
    ScrollTrigger.getAll().forEach(trigger => {
      trigger.kill(true); // pass true to reset the pinned element positioning
    });
    
    // Clear and reset inline overrides placed on body and html nodes by GSAP or Lenis
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('height');
    document.body.style.removeProperty('width');
    document.body.style.transform = '';
    
    document.documentElement.style.removeProperty('overflow');
    document.documentElement.style.removeProperty('position');
    document.documentElement.style.transform = '';
    
    // Reset window scroll coordinate
    window.scrollTo(0, 0);

    // If Lenis smooth scroll is active, force scroll reset and start scrolling
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
      window.lenis.start(); // Ensure Lenis is not left in a paused state
    }

    // Delay the resize and refresh slightly to allow the DOM to fully repaint at the new route height
    const timer = setTimeout(() => {
      if (window.lenis) {
        window.lenis.resize(); // Force Lenis to recalculate dimensions for the new page
      }
      ScrollTrigger.refresh();
    }, 120);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {showIntro && (
        <IntroLoader onComplete={() => {
          sessionStorage.setItem('hasSeenIntro', 'true');
          setShowIntro(false);
        }} />
      )}
      <CustomCursor />
      
      <div className="flex flex-col min-h-screen">
        {/* Navbar is persistent */}
        <Navbar />

        {/* Dynamic Route Pages */}
        <main className="flex-grow">
          {/* 
            Stable React Router routing without AnimatePresence context wrapping.
            This completely prevents transition context-mismatch crashes on navigation,
            while still running beautiful mount-wipes because each page mounts its own TransitionEffect!
          */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Footer is persistent */}
        <Footer />
      </div>
    </>
  );
}

export default App;
