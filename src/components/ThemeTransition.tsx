import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeTransition: React.FC = () => {
  const { theme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevTheme, setPrevTheme] = useState(theme);

  useEffect(() => {
    if (theme !== prevTheme) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPrevTheme(theme);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [theme, prevTheme]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ 
            clipPath: 'circle(0% at 50% 50%)',
            opacity: 1 
          }}
          animate={{ 
            clipPath: 'circle(150% at 50% 50%)',
            opacity: 1 
          }}
          exit={{ 
            opacity: 0 
          }}
          transition={{ 
            clipPath: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.2, delay: 0.4 }
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
