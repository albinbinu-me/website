import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, ArrowRight } from 'lucide-react';
import { useStore } from '../context/context';

const ProductModal = ({ product, isOpen, onClose }) => {
  const storeData = useStore();

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleWhatsApp = () => {
    const msg = `Hi Mall of Decor! I'm interested in the ${product.name}.`;
    window.open(`https://wa.me/${storeData.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-end md:items-center justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white w-full md:w-[82vw] max-w-5xl rounded-t-3xl md:rounded-3xl overflow-hidden max-h-[92vh] md:max-h-[82vh] flex flex-col md:flex-row relative shadow-depth-3"
          initial={{ y: '100%', opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/6 hover:bg-black/12 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-site-text" />
          </button>

          {/* Image */}
          <div className="w-full md:w-[48%] bg-site-section flex items-center justify-center min-h-[42vh] md:min-h-full relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover max-h-[52vh] md:max-h-none transition-transform duration-700 hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1614594975525-e45190c55d40?auto=format&fit=crop&q=80&w=800";
              }}
            />
            {/* Gradient fade at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(250,248,244,0.3) 0%, transparent 100%)' }}
            />
          </div>

          {/* Details */}
          <div className="w-full md:w-[52%] p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
            <p className="text-soft-gold text-[10px] uppercase tracking-[0.3em] font-medium mb-4">
              {product.category}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-site-text mb-6 leading-tight tracking-tight">
              {product.name}
            </h2>
            <p className="text-site-secondary mb-10 leading-relaxed text-[15px]">
              {product.description}
            </p>

            <div className="space-y-3">
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-3 rounded-full bg-site-text text-white py-4 text-sm tracking-widest uppercase font-medium hover:bg-[#25D366] hover:scale-[1.02] active:scale-95 transition-all duration-400 ease-out shadow-depth-1"
              >
                <MessageCircle size={17} strokeWidth={1.8} />
                <span>Contact on WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 rounded-full border border-stone-gray/20 text-site-secondary py-3.5 text-sm tracking-widest uppercase hover:border-soft-gold hover:text-site-text hover:scale-[1.01] active:scale-95 transition-all duration-300"
              >
                Continue Browsing
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
