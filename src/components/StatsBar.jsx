import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const Counter = ({ end, suffix = '', label, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const stepTime = Math.max(10, Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <div ref={ref} className="text-center relative">
      {/* Glow behind number */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(198,168,125,0.12) 0%, transparent 70%)' }}
      />
      <motion.div
        className="font-serif text-5xl md:text-6xl text-champagne-gold mb-3 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {count.toLocaleString()}{suffix}
      </motion.div>
      <motion.div
        className="text-white/50 text-xs uppercase tracking-[0.25em]"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {label}
      </motion.div>
    </div>
  );
};

const StatsBar = () => {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #0F0F10 0%, #1C1C1E 100%)' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[700px] h-[200px] rounded-full animate-glow-pulse"
          style={{ background: 'radial-gradient(ellipse, rgba(198,168,125,0.07) 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="grid grid-cols-3 gap-8 divide-x divide-white/10">
          <Counter end={3000} suffix="+" label="Products" duration={1400} />
          <Counter end={10} suffix="+" label="Years of Excellence" duration={900} />
          <Counter end={10000} suffix="+" label="Happy Customers" duration={1400} />
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
