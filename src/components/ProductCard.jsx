import React from 'react';
import { motion } from 'framer-motion';
import { useTilt } from '../hooks/useTilt';
import { MessageCircle, Search, Heart } from 'lucide-react';
import { useStore } from '../context/context';

const ProductCard = ({ product, onClick, index = 0, viewMode = 'grid' }) => {
  const { tiltStyle, handleMouseMove, handleMouseLeave } = useTilt(10);
  const storeData = useStore();

  const handleConnectClick = (e) => {
    e.stopPropagation();
    const msg = `Hi Mall of Decor! I'm interested in the ${product.name}.`;
    const url = `https://wa.me/${storeData.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      className={`group cursor-pointer flex bg-white rounded-2xl overflow-hidden shadow-depth-1 hover:shadow-depth-2 transition-all duration-500 ease-out ${viewMode === 'list' ? 'flex-row h-52 md:h-60' : 'flex-col'}`}
      onClick={() => onClick(product)}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden bg-site-section ${viewMode === 'list' ? 'w-52 md:w-72 flex-shrink-0' : 'w-full aspect-[4/5]'}`}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-custom group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1614594975525-e45190c55d40?auto=format&fit=crop&q=80&w=800";
          }}
        />
        {/* Gradient overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 100%)' }}
        />
        {/* Category pill on image */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      {/* Info Container */}
      <div className={`px-5 py-5 flex flex-col flex-grow justify-center ${viewMode === 'list' ? 'md:px-10' : 'pt-4 pb-5'}`}>
        <p className="text-site-secondary text-[11px] uppercase tracking-[0.2em] font-medium mb-1.5 opacity-60">
          {product.category}
        </p>
        <h3 className="font-serif text-[18px] md:text-[20px] text-site-text mb-6 leading-snug">
          {product.name}
        </h3>

        <div className={viewMode === 'list' ? 'max-w-xs' : 'w-full mt-auto'}>
          <button
            onClick={handleConnectClick}
            className="flex items-center justify-center gap-2 border border-site-text/10 text-site-text/80 hover:bg-site-text hover:text-white hover:scale-[1.02] active:scale-95 transition-all duration-300 px-6 py-3 rounded-full text-[11px] uppercase tracking-widest font-medium w-full group/btn"
          >
            <Search className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
            <span>Quick View</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
