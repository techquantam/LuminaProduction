import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.png';

const IntroLoader = ({ onComplete }) => {
  const [step, setStep] = useState('video'); // 'video' | 'logo' | 'complete'
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    // Disable scrolling while intro is active
    document.body.style.overflow = 'hidden';
    if (window.lenis) {
      window.lenis.stop();
    }

    // Function to initialize the YouTube player
    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      playerRef.current = new window.YT.Player('intro-video-iframe', {
        events: {
          'onStateChange': (event) => {
            // YT.PlayerState.ENDED is 0
            if (event.data === 0) {
              handleVideoEnd();
            }
          },
          'onReady': (event) => {
            event.target.playVideo();
            // Force mute to ensure autoplay works on all browsers
            event.target.mute();
          }
        }
      });
    };

    // Load YouTube Iframe API if not already loaded
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
      if (!document.getElementById('youtube-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    return () => {
      // Re-enable scrolling on cleanup if not completed yet
      if (step === 'complete') {
        document.body.style.removeProperty('overflow');
        if (window.lenis) {
          window.lenis.start();
        }
      }
    };
  }, []);

  const toggleMute = () => {
    if (playerRef.current && typeof playerRef.current.unMute === 'function') {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  const handleVideoEnd = () => {
    setStep('logo');
    // Destroy player reference
    if (playerRef.current && playerRef.current.destroy) {
      try {
        playerRef.current.destroy();
      } catch (e) {
        console.error(e);
      }
    }

    // Logo animation plays for 3.5 seconds, then completes
    setTimeout(() => {
      setStep('complete');
      document.body.style.removeProperty('overflow');
      if (window.lenis) {
        window.lenis.start();
      }
      onComplete();
    }, 3500);
  };

  const handleSkip = () => {
    handleVideoEnd();
  };

  return (
    <AnimatePresence mode="wait">
      {step !== 'complete' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden select-none"
        >
          {/* Step 1: Fullscreen Video */}
          {step === 'video' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* YouTube Video Wrapper to make it full screen and hide black bars */}
              <div className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <iframe
                  id="intro-video-iframe"
                  src="https://www.youtube.com/embed/cG8NJJ9lnOg?enablejsapi=1&autoplay=1&mute=1&controls=0&loop=0&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&wmode=transparent"
                  title="Lumina Cinematic Intro"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Elegant Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black pointer-events-none" />

              {/* Elegant Controls Container */}
              <div className="absolute bottom-10 right-10 z-[10000] flex items-center space-x-4">
                {/* Mute/Unmute Button */}
                <button
                  onClick={toggleMute}
                  className="px-5 py-3 border border-white/30 rounded-full text-xs uppercase tracking-widest text-white hover:border-luxury-purple hover:text-luxury-purple transition-all duration-300 bg-black/40 backdrop-blur-sm flex items-center space-x-2"
                >
                  {isMuted ? (
                    <>
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM19 12c0 3.28-1.95 6.07-4.75 7.28v2.02C18.27 20.01 21 16.32 21 12s-2.73-8.01-6.75-9.3v2.02C17.05 5.93 19 8.72 19 12zM3 9v6h4l5 5V4L7 9H3zm7-.17v6.34L7.83 13H5v-2h2.83L10 8.83z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                      </svg>
                      <span>Unmute</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M4.34 2.93L2.93 4.34 7.29 8.7 7 9H3v6h4l5 5v-6.59l4.18 4.18c-.65.49-1.38.88-2.18 1.11v2.06c1.34-.3 2.57-.92 3.61-1.75l2.05 2.05 1.41-1.41L4.34 2.93zM10 15.17L7.83 13H5v-2h2.83l.88-.88L10 11.29v3.88zM19 12c0-1.88-.63-3.61-1.71-5l-1.44 1.44c.73.96 1.15 2.16 1.15 3.56 0 1.9-.77 3.62-2.03 4.88l1.42 1.42C18.06 16.63 19 14.42 19 12zm-4.5-4.03v-3.3L12 7l-2.06-2.06L12 3v6.17l2.5 2.5c.78-.69 1.5-1.53 1.5-3.7z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                      </svg>
                      <span>Mute</span>
                    </>
                  )}
                </button>

                {/* Skip Button */}
                <button
                  onClick={handleSkip}
                  className="px-6 py-3 border border-white/30 rounded-full text-xs uppercase tracking-widest text-white hover:border-luxury-purple hover:text-luxury-purple transition-all duration-300 bg-black/40 backdrop-blur-sm"
                >
                  Skip Intro
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Logo Animation */}
          {step === 'logo' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-6"
            >
              {/* Logo container with scale animation */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.05, opacity: 1 }}
                transition={{ duration: 2.5, ease: 'easeOut' }}
                className="flex items-center justify-center px-6"
              >
                <img
                  src={logoImg}
                  alt="Lumina Worldwide Events"
                  className="h-16 md:h-24 w-auto object-contain invert hue-rotate-180"
                />
              </motion.div>

              {/* Subtle elegant line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '80px' }}
                transition={{ delay: 0.8, duration: 1.5, ease: 'easeInOut' }}
                className="h-[1px] bg-luxury-purple/50"
              />

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="text-xs uppercase tracking-extreme text-luxury-purple text-center font-light"
              >
                Artistry. Precision. Perfection.
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
