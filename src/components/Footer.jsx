import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/context';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Instagram, Facebook, Twitter, ExternalLink } from 'lucide-react';

const Footer = () => {
  const storeData = useStore();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  const navLinks = [
    { name: 'Our Collection', path: '/products' },
    { name: 'Our Story', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const socials = [
    { name: 'Instagram', href: storeData.socials.instagram, Icon: Instagram },
    { name: 'Facebook', href: storeData.socials.facebook, Icon: Facebook },
    { name: 'X / Twitter', href: storeData.socials.twitter, Icon: Twitter },
    { name: 'IndiaMart', href: storeData.socials.indiamart, Icon: ExternalLink },
  ];

  return (
    <footer
      ref={ref}
      style={{ background: 'linear-gradient(180deg, #111111 0%, #0A0A0A 100%)' }}
      className="text-warm-white pt-20 pb-8"
    >
      {/* Top gradient separator */}
      <div className="h-px w-full mb-16" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(198,168,125,0.3) 50%, transparent 100%)' }} />

      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Brand column */}
        <div className="md:col-span-5">
          <Link
            to="/"
            className="font-serif text-2xl font-medium tracking-wide text-white hover:text-champagne-gold transition-colors duration-300 inline-block mb-5"
          >
            {storeData.name}
          </Link>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            {storeData.tagline}
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4 mt-8">
            {socials.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-champagne-gold/50 hover:text-champagne-gold hover:scale-110 transition-all duration-300"
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Nav links */}
        <div className="md:col-span-3 md:col-start-7">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-champagne-gold font-medium mb-6">
            Navigate
          </h4>
          <ul className="space-y-4">
            {navLinks.map(({ name, path }) => (
              <li key={name}>
                <Link
                  to={path}
                  className="text-white/50 text-sm hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Store info */}
        <div className="md:col-span-4 md:col-start-10">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-champagne-gold font-medium mb-6">
            Visit Us
          </h4>
          <address className="not-italic text-white/50 text-sm leading-relaxed space-y-3">
            <p>{storeData.address}</p>
            <p>{storeData.area}</p>
            <a
              href={`tel:${storeData.phone}`}
              className="block pt-1 hover:text-champagne-gold transition-colors duration-300"
            >
              {storeData.phone}
            </a>
            <p className="text-white/30 text-xs">{storeData.hours}</p>
          </address>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-6 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/25">
        <p>© {new Date().getFullYear()} {storeData.name}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
