import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const InputField = ({ id, type = 'text', label, required = false, rows }) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const commonProps = {
    id,
    required,
    onFocus: () => setFocused(true),
    onBlur: (e) => {
      setFocused(false);
      setHasValue(e.target.value.length > 0);
    },
    className: `w-full rounded-lg border bg-white px-4 py-3.5 text-site-text text-sm outline-none transition-all duration-300 resize-none
      ${focused 
        ? 'border-soft-gold ring-2 ring-soft-gold/25 shadow-sm' 
        : 'border-[#E5E5E5] hover:border-stone-gray/40'
      }`,
  };

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`block text-xs font-medium uppercase tracking-widest mb-2 transition-colors duration-300 ${
          focused ? 'text-soft-gold' : 'text-site-secondary'
        }`}
      >
        {label}{required && <span className="text-soft-gold ml-0.5">*</span>}
      </label>
      {rows ? (
        <textarea {...commonProps} rows={rows} placeholder="" />
      ) : (
        <input {...commonProps} type={type} placeholder="" />
      )}
    </div>
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3500);
    }, 1600);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="space-y-5">
        <InputField id="name" label="Full Name" required />
        <InputField id="email" type="email" label="Email Address" required />
        <InputField id="phone" type="tel" label="Phone Number (Optional)" />
        <InputField id="message" label="Your Message" required rows={4} />

        <button
          type="submit"
          disabled={status !== 'idle'}
          className={`w-full h-14 rounded-full text-sm tracking-widest uppercase font-medium flex justify-center items-center transition-all duration-400 ease-out
            ${status === 'success'
              ? 'bg-emerald-500 text-white scale-[0.99]'
              : 'bg-site-text text-white hover:bg-champagne-gold hover:scale-[1.02] hover:shadow-lg active:scale-95'
            }
            ${status === 'submitting' ? 'opacity-70 cursor-wait' : ''}
          `}
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === 'idle' && (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                Send Message
              </motion.span>
            )}
            {status === 'submitting' && (
              <motion.div
                key="submitting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
              />
            )}
            {status === 'success' && (
              <motion.div
                key="success"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                <span>Message Sent!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
