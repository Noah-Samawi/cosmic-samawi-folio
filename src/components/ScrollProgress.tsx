import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-[62]"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, hsl(189 100% 50%), hsl(200 100% 55%), hsl(280 80% 60%), hsl(189 100% 50%))',
        backgroundSize: '200% 100%',
        boxShadow: '0 0 12px hsl(189 100% 50% / 0.6), 0 0 30px hsl(200 100% 55% / 0.3)',
      }}
    />
  );
};

export default ScrollProgress;
