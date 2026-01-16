import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for exit animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          {/* Cosmic background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Stars */}
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
            
            {/* Cosmic glow */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent" />
          </div>

          {/* Logo container */}
          <div className="relative">
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 -m-8 border-2 border-primary/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Inner ring */}
            <motion.div
              className="absolute inset-0 -m-4 border border-primary/50 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />

            {/* Initials */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
              className="relative z-10 w-24 h-24 flex items-center justify-center"
            >
              <motion.div
                className="text-5xl font-display font-bold gradient-text"
                animate={{ 
                  textShadow: [
                    '0 0 20px rgba(124, 58, 237, 0.5)',
                    '0 0 40px rgba(124, 58, 237, 0.8)',
                    '0 0 20px rgba(124, 58, 237, 0.5)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                NA
              </motion.div>
            </motion.div>

            {/* Orbital dots */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: Math.cos((i * 120 * Math.PI) / 180) * 60 - 4,
                  y: Math.sin((i * 120 * Math.PI) / 180) * 60 - 4,
                  rotate: 360,
                }}
                transition={{
                  rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
                  x: { duration: 0 },
                  y: { duration: 0 },
                }}
              />
            ))}
          </div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-20 text-muted-foreground text-sm tracking-widest uppercase"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading...
            </motion.span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
