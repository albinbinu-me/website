import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Flower, FallingPetals } from '../components/BlossomFlower';

const NotFound = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#fffafc] via-[#fdecef] to-[#fffafc] flex items-center justify-center">
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 pt-[80px]">
        {/* Soft glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,180,180,0.15),transparent_70%)]" />
        
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <fog attach="fog" args={["#fff5f7", 3, 10]} />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 3]} intensity={1.8} color="#ffe4ec" />
          <pointLight position={[0, 1.5, 2]} intensity={1.5} color="#ffd6cc" />
          
          <Environment preset="studio" />
          
          {/* Flower positioned off-center or lower for visual balance behind text */}
          <group position={[0, -1, -2]}>
            <Flower />
          </group>
          <FallingPetals count={50} />
        </Canvas>
      </div>

      {/* Foreground 404 Text */}
      <div className="relative z-10 flex flex-col items-center pointer-events-none text-center px-6">
        <motion.h1 
          className="font-serif text-[120px] md:text-[200px] leading-none text-champagne-gold opacity-90 tracking-tighter mix-blend-multiply"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: [0, -15, 0], opacity: 1 }}
          transition={{ 
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 1 }
          }}
        >
          404
        </motion.h1>

        <motion.p 
          className="font-serif text-xl md:text-3xl text-matte-black mt-2 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Oops! It seems this petal has floated away...
        </motion.p>
        
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.4, duration: 0.8 }}
           className="pointer-events-auto"
        >
          <Link 
            to="/" 
            className="px-8 py-3 bg-matte-black text-white hover:bg-champagne-gold transition-colors duration-300 uppercase tracking-widest text-sm rounded-full inline-block font-medium"
          >
            Return Home
          </Link>
        </motion.div>
      </div>

    </div>
  );
};

export default NotFound;
