import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import StatsBar from '../components/StatsBar';
import { useStore } from '../context/context';
import BlossomFlower from '../components/BlossomFlower';

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

/* Parallax image block */
const ParallaxImage = ({ src, alt, direction = 'left' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl shadow-depth-3"
      initial={{ opacity: 0, x: direction === 'left' ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.img
        style={{ y, scale: 1.1 }}
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      {/* Gold inner overlay */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(198,168,125,0.15)' }}
      />
    </motion.div>
  );
};

const About = () => {
  const storeData = useStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-site-bg pt-28"
    >
      {/* 3D Blossom Flower hero */}
      <BlossomFlower />

      {/* ── Story Sections ── */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto space-y-32 md:space-y-40">

        {/* Block 1 — Origins */}
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center">
          <div className="w-full md:w-1/2 aspect-square">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=1000"
              alt="Craftsmanship"
              direction="left"
            />
          </div>

          <motion.div
            className="w-full md:w-1/2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p variants={fadeUp} className="text-soft-gold text-xs uppercase tracking-[0.3em] font-medium mb-5">
              Origins
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-5xl text-site-text mb-8 leading-tight tracking-tight">
              Born from a desire for quiet beauty.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-site-secondary leading-relaxed mb-7 text-lg">
              Founded in Kozhikode, {storeData.name} began as a small boutique dedicated to finding objects that transcend trends. We observed that spaces dictating our moods needed pieces that spoke in whispers, not shouts.
            </motion.p>
            <motion.p variants={fadeUp} className="text-site-secondary leading-relaxed text-lg">
              Every detail in our collection is meticulously chosen to harmonize with modern minimalist architecture while retaining an organic, tactile soul.
            </motion.p>
          </motion.div>
        </div>

        {/* Block 2 — Philosophy */}
        <div className="flex flex-col md:flex-row-reverse gap-16 md:gap-24 items-center">
          <div className="w-full md:w-1/2 aspect-[4/3]">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000"
              alt="Philosophy"
              direction="right"
            />
          </div>

          <motion.div
            className="w-full md:w-1/2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p variants={fadeUp} className="text-soft-gold text-xs uppercase tracking-[0.3em] font-medium mb-5">
              Philosophy
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-5xl text-site-text mb-8 leading-tight tracking-tight">
              Intentional curation over mass production.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-site-secondary leading-relaxed mb-7 text-lg">
              We partner with artisans and manufacturers who share our obsession with materiality. Whether it's the unglazed finish of a ceramic vase or the exact hue of a synthetic leaf, quality is our compass.
            </motion.p>
            <motion.p variants={fadeUp} className="text-site-secondary leading-relaxed text-lg">
              Each object earns its place in our collection not through trend-chasing, but through an unspoken agreement with the spaces it will inhabit.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <StatsBar />

      {/* ── In-Person CTA ── */}
      <section className="py-24 bg-white text-center px-6">
        <motion.div
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-soft-gold text-xs uppercase tracking-[0.3em] font-medium mb-5">
            Visit Us
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-site-text mb-6 tracking-tight">
            Experience It In Person
          </h2>
          <p className="text-site-secondary max-w-md mx-auto mb-8 leading-relaxed">
            Visit our studio to feel the textures and see the pieces in natural light.
          </p>
          <p className="text-sm uppercase tracking-widest text-site-text font-medium mb-2">
            {storeData.address}
          </p>
          <p className="text-site-secondary text-sm">
            {storeData.area}
          </p>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default About;
