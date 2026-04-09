import React from 'react';
import { motion } from 'framer-motion';
import { useTilt } from '../hooks/useTilt';
import { MessageCircle } from 'lucide-react';
import { useStore } from '../context/context';

const ProductCard = ({ product, onClick, index = 0 }) => {
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
      className="group cursor-pointer flex flex-col bg-white rounded-2xl overflow-hidden shadow-depth-1 hover:shadow-depth-3 transition-all duration-500 ease-out"
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
      {/* Image */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-site-section">
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

      {/* Info */}
      <div className="px-5 pt-4 pb-5 flex flex-col flex-grow">
        <p className="text-site-secondary text-[11px] uppercase tracking-[0.2em] font-medium mb-1.5">
          {product.category}
        </p>
        <h3 className="font-serif text-[17px] text-site-text mb-4 leading-snug flex-grow">
          {product.name}
        </h3>

        <button
          onClick={handleConnectClick}
          className="flex items-center justify-center gap-2 border border-stone-gray/25 text-site-text/70 hover:border-[#25D366] hover:text-[#25D366] hover:scale-[1.02] active:scale-95 transition-all duration-300 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium w-full"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Connect Us</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
