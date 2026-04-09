import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/context';
import ProductGrid from '../components/ProductGrid';
import ProductModal from '../components/ProductModal';

const Products = () => {
  const { products } = useStore();
  const [filter, setFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categories = ['All', 'Artificial Plants', 'Ceramic Sculptures', 'Clocks', 'Showpieces', 'Vases'];

  const filteredProducts = filter === 'All'
    ? products
    : products.filter(p => p.category === filter);

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
      className="bg-site-bg min-h-screen pt-36 pb-28 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            className="text-soft-gold text-xs uppercase tracking-[0.3em] font-medium mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Mall of Decor
          </motion.p>
          <motion.h1
            className="font-serif text-4xl md:text-6xl text-site-text mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            Our Collection
          </motion.h1>
          <motion.p
            className="text-site-secondary max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Explore our curated selection of premium home accents, designed to bring effortless elegance to your everyday spaces.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16 md:mb-20"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative px-5 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-350 ease-out ${
                filter === cat
                  ? 'bg-site-text text-white shadow-depth-1 scale-105'
                  : 'bg-white text-site-secondary border border-stone-gray/20 hover:border-soft-gold/50 hover:text-site-text hover:scale-105'
              }`}
            >
              {cat}
              {filter === cat && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-site-text -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Product Grid with fade transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} onProductClick={openProduct} />
            ) : (
              <div className="text-center py-28">
                <p className="text-site-secondary text-4xl mb-4">✦</p>
                <p className="text-site-secondary uppercase tracking-widest text-sm">
                  No products found in this category.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <ProductModal product={selectedProduct} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </motion.div>
  );
};

export default Products;
