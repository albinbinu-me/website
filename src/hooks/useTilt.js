import { useState, useCallback } from 'react';

export const useTilt = (maxTilt = 15) => {
  const [tiltStyle, setTiltStyle] = useState({ transform: '' });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = -((y - centerY) / centerY) * maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;
    
    setTiltStyle({
      transform: `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
      transition: 'transform 0.1s ease-out'
    });
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
  }, []);

  return { tiltStyle, handleMouseMove, handleMouseLeave };
};
