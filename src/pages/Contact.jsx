import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../context/context';
import ContactForm from '../components/ContactForm';
import MapEmbed from '../components/MapEmbed';

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const Contact = () => {
  const storeData = useStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-site-bg min-h-screen pt-36 pb-28"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Page Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            className="text-soft-gold text-xs uppercase tracking-[0.3em] font-medium mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            We'd love to hear from you
          </motion.p>
          <motion.h1
            className="font-serif text-4xl md:text-6xl text-site-text mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            Connect With Us
          </motion.h1>
          <motion.p
            className="text-site-secondary max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Whether you have a question about an order, need design advice, or wish to collaborate, we are here to assist you.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">

          {/* Left — Form + Store Info */}
          <motion.div
            className="w-full lg:w-1/2 space-y-10"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Send Message block */}
            <motion.div variants={fadeUp}>
              <h2 className="font-serif text-2xl text-site-text mb-8">Send a Message</h2>
              <ContactForm />
            </motion.div>

            {/* Store Info card */}
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-depth-1 border border-stone-gray/8"
            >
              <h3 className="font-serif text-xl text-site-text mb-8">Store Information</h3>

              <div className="space-y-7">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-soft-gold font-medium mb-2">Location</p>
                  <p className="text-site-secondary leading-relaxed text-sm">{storeData.address}</p>
                  <p className="text-site-secondary text-sm">{storeData.area}</p>
                </div>

                <div className="h-px bg-stone-gray/10" />

                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-soft-gold font-medium mb-2">Hours</p>
                  <p className="text-site-secondary text-sm">{storeData.hours}</p>
                </div>

                <div className="h-px bg-stone-gray/10" />

                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-soft-gold font-medium mb-2">Contact</p>
                  <a href={`tel:${storeData.phone}`} className="text-site-secondary text-sm hover:text-soft-gold transition-colors duration-300 block">
                    {storeData.phone}
                  </a>
                  <a href={`mailto:${storeData.contact.email}`} className="text-site-secondary text-sm hover:text-soft-gold transition-colors duration-300 block mt-1">
                    {storeData.contact.email}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Map */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <MapEmbed />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
