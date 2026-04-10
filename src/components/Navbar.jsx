import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/context';
import { Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../images/logo/logo.jpeg';

const Navbar = () => {
  const storeData = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-apple ${
          scrolled
            ? 'glass-navbar shadow-depth-1 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="z-50 relative flex items-center h-16 md:h-[68px]">
            <img
              src={logoImg}
              alt={storeData.name}
              className="h-full w-auto object-contain rounded-md opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative group text-sm font-medium tracking-widest uppercase text-site-text/80 hover:text-site-text transition-colors duration-300"
              >
                {link.name}
                {/* Animated underline */}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[1.5px] bg-soft-gold rounded-full"
                  initial={false}
                  animate={{ width: isActive(link.path) ? '100%' : '0%' }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
                <span className="absolute -bottom-1 left-0 h-[1.5px] bg-soft-gold/40 rounded-full w-0 group-hover:w-full transition-all duration-300 ease-out" />
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 z-50 relative">
            <a
              href={`tel:${storeData.phone}`}
              className="relative group flex items-center justify-center w-10 h-10 rounded-full hover:bg-site-text/5 transition-all duration-300"
              title="Call us"
              aria-label="Call us"
            >
              <Phone
                className="w-[18px] h-[18px] text-site-text/70 group-hover:text-soft-gold transition-colors duration-300"
                strokeWidth={1.5}
              />
            </a>

            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-site-text/5 transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" strokeWidth={1.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center items-center"
            style={{ background: 'rgba(250,248,244,0.97)', backdropFilter: 'blur(24px)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex flex-col items-center space-y-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ delay: i * 0.07, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Link
                    to={link.path}
                    className={`font-serif text-4xl md:text-5xl tracking-tight transition-colors duration-300 ${
                      isActive(link.path) ? 'text-soft-gold' : 'text-site-text hover:text-soft-gold'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Phone number at bottom */}
            <motion.a
              href={`tel:${storeData.phone}`}
              className="absolute bottom-12 text-site-secondary text-sm tracking-widest hover:text-soft-gold transition-colors duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.35 }}
            >
              {storeData.phone}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
