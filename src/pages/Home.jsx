import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import ProductModal from '../components/ProductModal';
import AboutSection from '../components/AboutSection';
import StatsBar from '../components/StatsBar';
import HorologyShowcase from '../components/HorologyShowcase';
import { useStore } from '../context/context';

/* ── Fade-up reusable variant ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

/* ── Featured Product Hero Block ── */
const FeaturedProductBlock = ({ product, onOpen }) => {
  const storeData = useStore();

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const msg = `Hi Mall of Decor! I'm interested in the ${product.name}.`;
    window.open(`https://wa.me/${storeData.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <motion.div
      className="rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[520px] cursor-pointer group"
      style={{ background: 'linear-gradient(135deg, #F5F5F7 0%, #FFFFFF 60%, #FAF8F4 100%)' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={() => onOpen(product)}
    >
      {/* Image side */}
      <div className="relative overflow-hidden min-h-[320px] md:min-h-full rounded-t-3xl md:rounded-t-none md:rounded-l-3xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          style={{ minHeight: '320px' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1614594975525-e45190c55d40?auto=format&fit=crop&q=80&w=1000";
          }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.04) 0%, transparent 60%)' }}
        />
      </div>

      {/* Content side */}
      <div className="flex flex-col justify-center px-10 md:px-14 py-14">
        <motion.p
          className="text-soft-gold text-xs uppercase tracking-[0.3em] font-medium mb-5"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Featured — {product.category}
        </motion.p>

        <motion.h2
          className="font-serif text-4xl md:text-5xl text-site-text leading-tight mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          {product.name}
        </motion.h2>

        <motion.p
          className="text-site-secondary text-base leading-relaxed mb-10 max-w-md"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {product.description}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(product); }}
            className="inline-flex items-center gap-2 rounded-full bg-site-text text-white px-7 py-3 text-sm uppercase tracking-widest hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-300"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleWhatsApp}
            className="inline-flex items-center gap-2 rounded-full border border-stone-gray/25 text-site-text/70 px-7 py-3 text-sm uppercase tracking-widest hover:border-[#25D366] hover:text-[#25D366] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            Enquire
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ── Main Home Page ── */
const Home = () => {
  const { products } = useStore();

  // Pick one representative product from each category for the showcase
  const featuredProduct = products.find(p => p.category === 'Clocks');
  const gridProducts = [
    products.find(p => p.category === 'Artificial Plants'),
    products.find(p => p.category === 'Curios'),
    products.find(p => p.category === 'Vases') || products.find(p => p.category === 'Buddha'),
  ].filter(Boolean);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openProduct = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />

      {/* ── Products Showcase ── */}
      <section className="py-24 md:py-32 bg-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 md:mb-20">
            <div>
              <motion.p
                className="text-soft-gold text-xs uppercase tracking-[0.3em] font-medium mb-3"
                custom={0}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Curated for You
              </motion.p>
              <motion.h2
                className="font-serif text-4xl md:text-5xl text-site-text tracking-tight leading-tight"
                custom={0.1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                From Our Collection
              </motion.h2>
            </div>
            <motion.div
              custom={0.15}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-8 md:mt-0"
            >
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full border border-champagne-gold/60 text-site-text px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-champagne-gold hover:text-white hover:scale-105 active:scale-95 transition-all duration-300"
              >
                View All
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>

          {/* Featured hero block */}
          <div className="mb-10 md:mb-14">
            <FeaturedProductBlock product={featuredProduct} onOpen={openProduct} />
          </div>

          {/* Product grid — remaining 3 */}
          <ProductGrid products={gridProducts} onProductClick={openProduct} />
        </div>
      </section>

      {/* ── Timeless Horology ── */}
      <HorologyShowcase />

      {/* ── Brand Manifesto ── */}
      <section
        className="relative py-32 md:py-48 flex items-center justify-center px-6 text-center overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #0F0F10 0%, #1C1C1E 100%)' }}
      >
        {/* Soft glow behind quote */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[500px] h-[300px] rounded-full animate-glow-pulse"
            style={{ background: 'radial-gradient(ellipse, rgba(198,168,125,0.1) 0%, transparent 70%)' }}
          />
        </div>
        <motion.div
          className="relative max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          animate={{ y: [0, -6, 0] }}
        >
          <p className="text-soft-gold text-xs uppercase tracking-[0.3em] font-medium mb-10">
            Our Philosophy
          </p>
          <blockquote className="font-serif text-2xl md:text-4xl lg:text-5xl text-white/90 leading-relaxed font-light italic">
            "Design is an opportunity to continue telling the story, not just to sum everything up. We curate objects that breathe life into your personal sanctuary."
          </blockquote>
        </motion.div>
      </section>

      <AboutSection />
      <StatsBar />
      <ProductModal product={selectedProduct} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </motion.div>
  );
};

export default Home;
