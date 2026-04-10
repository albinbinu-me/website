import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../context/context';
import { ArrowRight, Plane, Building2, Paintbrush, ShieldCheck } from 'lucide-react';

import { useTilt } from '../hooks/useTilt';

const ServiceCard = ({ service, index }) => {
  const storeData = useStore();
  const { tiltStyle, handleMouseMove, handleMouseLeave } = useTilt(8);
  
  const handleConnect = () => {
    const msg = `Hi Mall of Decor! I'm interested in your ${service.title} service.`;
    window.open(`https://wa.me/${storeData.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group relative h-[450px] w-full cursor-pointer overflow-hidden rounded-3xl bg-site-text"
      onClick={handleConnect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
    >
      {/* Immersive Background Image */}
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-40"
      />
      
      {/* Glass Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-8 pt-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
            {service.icon}
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">B2B Solutions</span>
        </div>
        
        <h3 className="mb-3 font-serif text-3xl text-white tracking-tight">{service.title}</h3>
        <p className="mb-8 text-sm leading-relaxed text-white/70 line-clamp-3">
          {service.description}
        </p>
        
        <button className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white font-medium group-hover:gap-4 transition-all duration-300">
          Inquire Now <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      
      {/* 3D Reflection Effect */}
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
           style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)' }} />
    </motion.div>
  );
};

const Services = () => {
  const b2bServices = [
    {
      title: 'Bespoke Consulting',
      description: 'Expert guidance for architectural firms and interior designers to select the perfect botanical and decor elements for large-scale projects.',
      icon: <Building2 className="h-5 w-5 text-white" />,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'
    },
    {
      title: 'Vertical Landscaping',
      description: 'High-end artificial vertical gardens tailored for corporate offices, hotels, and luxury retail lounges. Zero maintenance, maximum impact.',
      icon: <Paintbrush className="h-5 w-5 text-white" />,
      image: 'https://images.unsplash.com/photo-1583339734020-c24c25368a5c?auto=format&fit=crop&q=80&w=1200'
    },
    {
      title: 'Global Sourcing',
      description: 'Leverage our international supply network to procure rare, oversized clocks and curated showpieces for premium development projects.',
      icon: <Plane className="h-5 w-5 text-white" />,
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200'
    },
    {
      title: 'AMC Maintenance',
      description: 'Annual Maintenance Contracts for existing decor installations, ensuring your commercial space remains pristine and impressive year-round.',
      icon: <ShieldCheck className="h-5 w-5 text-white" />,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200'
    }
  ];

  return (
    <div 
      className="min-h-screen pt-40 pb-32 overflow-hidden relative"
      style={{ 
        background: 'linear-gradient(180deg, #F5F5F7 0%, #E8E8ED 25%, #1D1D1F 60%)' 
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="mb-24 flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-site-secondary text-[10px] uppercase tracking-[0.5em] font-medium mb-6"
          >
            Commercial Excellence
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-site-text font-serif text-5xl md:text-7xl tracking-tighter text-center max-w-3xl leading-tight"
          >
            Architectural Decor <br /> <span className="text-site-secondary italic font-normal">for B2B Spaces.</span>
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[1px] bg-site-text/10 mt-12" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {b2bServices.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
