import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeTransition: React.FC = () => {
  const { theme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevTheme, setPrevTheme] = useState(theme);
  const [clickPosition, setClickPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    // Listen for theme toggle clicks to get position
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-theme-toggle]')) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        setClickPosition({ x, y });
      }
    };
    window.addEventListener('click', handleClick, true);
    return () => window.removeEventListener('click', handleClick, true);
  }, []);

  useEffect(() => {
    if (theme !== prevTheme) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPrevTheme(theme);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [theme, prevTheme]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ 
            clipPath: `circle(0% at ${clickPosition.x}% ${clickPosition.y}%)`,
            opacity: 1 
          }}
          animate={{ 
            clipPath: `circle(150% at ${clickPosition.x}% ${clickPosition.y}%)`,
            opacity: 1 
          }}
          exit={{ 
            opacity: 0 
          }}
          transition={{ 
            clipPath: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.3, delay: 0.5 }
          }}
          className={`fixed inset-0 z-[99] pointer-events-none ${
            theme === 'dark' 
              ? 'bg-[#0b1120]' 
              : 'bg-[#f8fafc]'
          }`}
        />
      )}
    </AnimatePresence>
  );
};

export default ThemeTransition;
