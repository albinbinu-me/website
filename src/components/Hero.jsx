import React, { Suspense, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../context/context';

const FloatingClock = () => {
  const hoursRef = useRef();
  const minutesRef = useRef();
  const secondsRef = useRef();

  useFrame(() => {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();
    const ms = d.getMilliseconds();

    const secAngle = -((s + ms / 1000) * (Math.PI * 2) / 60);
    const minAngle = -((m + s / 60) * (Math.PI * 2) / 60);
    const hrAngle = -(((h % 12) + m / 60) * (Math.PI * 2) / 12);

    if (hoursRef.current) hoursRef.current.rotation.z = hrAngle;
    if (minutesRef.current) minutesRef.current.rotation.z = minAngle;
    if (secondsRef.current) secondsRef.current.rotation.z = secAngle;
  });

  const generateSunburst = () => {
    const markers = [];
    for (let i = 0; i < 48; i++) {
      const angle = (i / 48) * Math.PI * 2;
      const isHour = i % 4 === 0;

      const innerR = 0.6;
      const length = isHour ? 0.6 : 0.3;
      const outerR = innerR + length;
      const midR = innerR + length / 2;

      const x = Math.cos(angle) * midR;
      const y = Math.sin(angle) * midR;

      markers.push(
        <group key={i}>
          <mesh position={[x, y, -0.05]} rotation={[0, 0, angle]}>
            <boxGeometry args={[length, isHour ? 0.015 : 0.008, 0.01]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
          </mesh>
          {isHour && (
            <mesh position={[Math.cos(angle) * outerR, Math.sin(angle) * outerR, -0.05]}>
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshStandardMaterial color="#ffffff" emissive="#fff1e6" emissiveIntensity={1} />
            </mesh>
          )}
        </group>
      );
    }
    return markers;
  };

  return (
    <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.5}>
      <group scale={1.2}>
        {/* Golden C-Ring */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[1.5, 0.04, 32, 100, Math.PI]} />
          <meshStandardMaterial color="#C9A96E" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Vertical Center Bar */}
        <mesh position={[0, 0, -0.1]}>
          <cylinderGeometry args={[0.02, 0.02, 3.0, 16]} />
          <meshStandardMaterial color="#C9A96E" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Black Clock Face */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.04, 64]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>

        {/* Sunburst Rays */}
        {generateSunburst()}

        {/* Clock Hands */}
        <group position={[0, 0, 0.04]}>
          <group ref={hoursRef}>
            <mesh position={[0, 0.25, 0]}>
              <boxGeometry args={[0.04, 0.5, 0.01]} />
              <meshStandardMaterial color="#C9A96E" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.1, 0]}>
              <boxGeometry args={[0.04, 0.2, 0.01]} />
              <meshStandardMaterial color="#C9A96E" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>

          <group ref={minutesRef} position={[0, 0, 0.015]}>
            <mesh position={[0, 0.4, 0]}>
              <boxGeometry args={[0.025, 0.8, 0.01]} />
              <meshStandardMaterial color="#C9A96E" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.15, 0]}>
              <boxGeometry args={[0.025, 0.3, 0.01]} />
              <meshStandardMaterial color="#C9A96E" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>

          <group ref={secondsRef} position={[0, 0, 0.03]}>
            <mesh position={[0, 0.45, 0]}>
              <boxGeometry args={[0.015, 0.9, 0.01]} />
              <meshStandardMaterial color="#C9A96E" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.2, 0]}>
              <boxGeometry args={[0.015, 0.4, 0.01]} />
              <meshStandardMaterial color="#C9A96E" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.06, 0.015, 16, 32]} />
              <meshStandardMaterial color="#C9A96E" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>

          {/* Golden Center Cap */}
          <mesh position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.04, 32]} />
            <meshStandardMaterial color="#C9A96E" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      </group>
    </Float>
  );
};

const Hero = () => {
  const storeData = useStore();
  const { scrollY } = useScroll();

  // Parallax layers
  const canvasY = useTransform(scrollY, [0, 600], [0, 120]);
  const textY = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 140], [1, 0]);

  const words = storeData.tagline.split(" ");

  return (
    <section className="relative h-screen w-full overflow-hidden noise-overlay" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #f0ece4 0%, #FAFAFA 60%, #F5F5F7 100%)' }}>
      
      {/* Radial glow accent */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, rgba(198,168,125,0.12) 0%, transparent 70%)' }}
        />
      </div>

      {/* 3D Canvas with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: canvasY }}>
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-ivory to-gray-100" />}>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
            <directionalLight position={[-5, 5, -5]} intensity={0.6} color="#C9A96E" />
            <pointLight position={[0, 2, 3]} intensity={0.4} color="#fff1e6" />
            <Environment preset="studio" />
            <group position={[0, -0.5, 0]}>
              <FloatingClock />
            </group>
          </Canvas>
        </Suspense>
      </motion.div>

      {/* Overlay gradient from bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-5 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #FAFAFA 0%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6 pt-24">
        <motion.div style={{ y: textY }} className="text-center max-w-4xl mx-auto pointer-events-auto">
          
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-soft-gold text-xs uppercase tracking-[0.3em] font-medium mb-8"
          >
            {storeData.name}
          </motion.p>

          {/* Headline words */}
          <div className="flex flex-wrap justify-center mb-10">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + i * 0.07,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="font-serif text-5xl md:text-7xl lg:text-[82px] text-site-text tracking-tight mr-[0.22em] last:mr-0"
                style={{ lineHeight: 1.08 }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2 + words.length * 0.07 + 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 rounded-full border border-champagne-gold/70 text-site-text px-9 py-3.5 text-sm uppercase tracking-widest hover:bg-champagne-gold hover:text-white hover:scale-105 hover:shadow-gold-glow active:scale-95 transition-all duration-500 ease-out"
              style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(255,255,255,0.4)' }}
            >
              {storeData.hero.buttonText || "Explore Collection"}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10 gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-stone-gray/60">
          {storeData.hero.scrollText || "Scroll"}
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-stone-gray/50" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
