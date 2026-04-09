import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useStore } from '../context/context';

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const { whatsapp } = useStore();

  useEffect(() => {
    // 1. Delayed appearance (show after 3 seconds anyway)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // 2. Show after scrolling 20% of the page
    const handleScroll = () => {
      if (isVisible) return; // Don't check if already visible
      
      const scrolled = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (totalHeight > 0 && (scrolled / totalHeight) > 0.2) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  // Context-aware dynamic WhatsApp message
  const getMessage = () => {
    if (location.pathname.includes('/products')) {
      return "Hi, I'm interested in this product";
    }
    return "Hi, I'd like to know more about your decor collection";
  };

  const encodedMessage = encodeURIComponent(getMessage());
  // Assuming 'whatsapp' store value contains the 91XX... number.
  const waUrl = `https://wa.me/${whatsapp}?text=${encodedMessage}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Premium Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10, transition: { duration: 0.2 } }}
                className="hidden md:block bg-white/90 backdrop-blur-md border border-stone-gray/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-4 py-2.5 rounded-2xl text-matte-black text-sm font-medium tracking-wide backdrop-saturate-150"
              >
                Chat with us
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Floating Button */}
          <motion.a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative flex items-center justify-center w-[54px] h-[54px] md:w-[60px] md:h-[60px] bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgb(0,0,0,0.12)] rounded-full group outline-none"
          >
            {/* Subtle Pulse Animation */}
            <span className="absolute inset-0 rounded-full border border-[#25D366]/20 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
            
            <svg 
              viewBox="0 0 24 24" 
              className="w-7 h-7 md:w-8 md:h-8 text-[#25D366] drop-shadow-sm transition-transform duration-300"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingWhatsApp;
