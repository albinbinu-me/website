import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

const AboutSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const imgRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start']
  });

  // Parallax: image drifts slightly as you scroll
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section ref={ref} className="py-24 md:py-36 bg-site-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">

          {/* Image — parallax */}
          <motion.div
            className="w-full md:w-1/2"
            ref={imgRef}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-depth-3">
              <motion.img
                style={{ y: imgY, scale: 1.08 }}
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000"
                alt="Interior design"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              {/* Subtle gold inner border overlay */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(198,168,125,0.2)' }}
              />
            </div>
          </motion.div>

          {/* Text content — line-by-line stagger */}
          <motion.div
            className="w-full md:w-1/2"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-soft-gold text-xs uppercase tracking-[0.3em] font-medium mb-5"
            >
              Our Story
            </motion.p>

            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-serif text-3xl md:text-5xl text-site-text mb-8 leading-tight tracking-tight"
            >
              Curating aesthetics for{' '}
              <span className="relative inline-block mt-1">
                modern living.
                <motion.span
                  className="absolute bottom-0 left-0 h-[2px] bg-soft-gold rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 1.1, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ transformOrigin: 'left', width: '100%' }}
                />
              </span>
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-site-secondary text-lg mb-7 leading-relaxed"
            >
              We believe that your space should be an extension of your identity. At Mall of Decor, we source and craft premium lifestyle objects that bring warmth, texture, and character to neutral spaces.
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeUp}
              className="text-site-secondary text-lg mb-12 leading-relaxed"
            >
              From lifelike artificial botanicals to hand-finished ceramics, each piece is selected with an uncompromising eye for contemporary design and enduring quality.
            </motion.p>

            <motion.div custom={4} variants={fadeUp}>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 rounded-full border border-champagne-gold/60 text-site-text px-8 py-3.5 text-sm uppercase tracking-widest hover:bg-champagne-gold hover:text-white hover:scale-105 active:scale-95 transition-all duration-400 ease-out"
              >
                Discover Our Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
