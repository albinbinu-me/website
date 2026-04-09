import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import clockImage from '../images/products/clock-6.jpeg'; // High-end gold clock

const HorologyShowcase = () => {
    const ref = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // 1. Mobile Detection (to disable tilt safely)
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // 2. 3D Tilt Logic (Mouse Driven)
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current || isMobile) return;
        
        const rect = ref.current.getBoundingClientRect();
        
        // Relative mouse coordinates
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Normalize to raw percentages [-0.5, 0.5]
        const xPct = (mouseX / rect.width) - 0.5;
        const yPct = (mouseY / rect.height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        if (isMobile) return;
        x.set(0);
        y.set(0);
    };

    // 3. Parallax Scroll Logic
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    // Dynamic styles applied based on mobile state
    const appliedRotateX = isMobile ? 0 : rotateX;
    const appliedRotateY = isMobile ? 0 : rotateY;

    // --- CRITICAL FIX FOR REACT ERROR #300 ---
    // Extracting useTransform hooks to strictly the top level so they 
    // are called universally on every render, preventing hook count 
    // mismatch bugs when 'isMobile' state conditionally hides elements.
    const ambientGlowX = useTransform(mouseXSpring, [-0.5, 0.5], ["-60px", "60px"]);
    const ambientGlowY = useTransform(mouseYSpring, [-0.5, 0.5], ["-60px", "60px"]);

    const glareOffsetX = useTransform(mouseXSpring, [-0.5, 0.5], ["-80%", "80%"]);
    const glareOffsetY = useTransform(mouseYSpring, [-0.5, 0.5], ["-80%", "80%"]);

    const imageOffsetX = useTransform(mouseXSpring, [-0.5, 0.5], ["3%", "-3%"]);
    const imageOffsetY = useTransform(mouseYSpring, [-0.5, 0.5], ["3%", "-3%"]);

    return (
        <section 
            id="horology"
            ref={ref}
            className="relative w-full overflow-hidden bg-[#0A0A0A] py-24 md:py-48 flex items-center justify-center min-h-[85vh] perspective-[1200px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background Parallax Layer */}
            <motion.div 
               style={{ y: backgroundY }}
               className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-40 pointer-events-none"
            >
                <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
                    alt="Luxury interior background texture" 
                    className="w-full h-full object-cover blur-md scale-105"
                />
                {/* Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
            </motion.div>

            {/* Subtle Interactive Ambient Glow */}
            {!isMobile && (
                <motion.div 
                    className="absolute z-0 w-[400px] h-[400px] rounded-full bg-champagne-gold/15 blur-[100px] pointer-events-none mix-blend-screen"
                    style={{
                        x: ambientGlowX,
                        y: ambientGlowY,
                    }}
                />
            )}

            {/* Foreground Content Wrapper */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24 pointer-events-none">
                
                {/* Text Blueprint */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/2 text-center md:text-left pointer-events-auto flex flex-col items-center md:items-start"
                >
                    <h3 className="text-champagne-gold uppercase tracking-[0.3em] text-xs font-semibold mb-6">The Masterpiece</h3>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-xl">
                        Timeless<br className="hidden md:block" /> Horology
                    </h2>
                    <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 font-light max-w-md">
                        Discover clocks crafted not merely to track passing hours, but to effortlessly anchor a room. A perfect synthesis of precision engineering and classical grace.
                    </p>
                    <Link 
                        to="/products" 
                        className="group flex flex-row items-center gap-4 uppercase tracking-widest text-xs md:text-sm text-white hover:text-champagne-gold transition-colors duration-400"
                    >
                        <span className="border-b border-white/30 group-hover:border-champagne-gold pb-1 transition-colors">Explore Horology</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-3 transition-transform duration-500 ease-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </Link>
                </motion.div>

                {/* 3D Glass Image Card */}
                <div className="w-full md:w-1/2 flex justify-center perspective-[1000px] pointer-events-auto">
                    <motion.div
                        style={{ 
                            rotateX: appliedRotateX, 
                            rotateY: appliedRotateY,
                            transformStyle: "preserve-3d"
                        }}
                        whileHover={!isMobile ? { scale: 1.03 } : {}}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ 
                            scale: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
                            opacity: { duration: 1 }
                        }}
                        className="relative w-full max-w-[400px] lg:max-w-[480px] aspect-[4/5] rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] md:hover:shadow-[0_40px_80px_rgba(0,0,0,0.8)] transition-shadow duration-700 will-change-transform group cursor-pointer"
                    >
                        {/* Dynamic Glare & Specular Reflection overlay */}
                        {!isMobile && (
                            <motion.div 
                                className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay bg-gradient-to-tr from-transparent via-white/30 to-transparent"
                                style={{
                                    x: glareOffsetX,
                                    y: glareOffsetY,
                                }}
                            />
                        )}

                        {/* Depth Mid-layer Glow */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" style={{ transform: "translateZ(10px)" }} />
                        
                        {/* High Definition Product Image (Moving inversely for parallax within frame) */}
                        <motion.img 
                            src={clockImage} 
                            alt="Timeless Horology Clock Piece" 
                            style={!isMobile ? {
                                x: imageOffsetX,
                                y: imageOffsetY
                            } : {}}
                            className="absolute w-[110%] h-[110%] max-w-none object-cover -left-[5%] -top-[5%] group-hover:scale-105 transition-transform duration-1000 ease-out z-0"
                        />

                        {/* Floating Text elevated on the Z axis */}
                        <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10 z-20" style={!isMobile ? { transform: "translateZ(60px)" } : {}}>
                            <p className="text-white font-serif text-2xl md:text-3xl drop-shadow-xl tracking-wide">Signature Edition</p>
                            <p className="text-champagne-gold/90 text-xs md:text-sm uppercase tracking-widest mt-3 drop-shadow-md">Luxury Gold Hue</p>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default HorologyShowcase;
