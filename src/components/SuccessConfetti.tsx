import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface SuccessConfettiProps {
  show: boolean;
  onComplete?: () => void;
}

const SuccessConfetti: React.FC<SuccessConfettiProps> = ({ show, onComplete }) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([]);

  useEffect(() => {
    if (show) {
      // Generate confetti particles
      const colors = [
        'hsl(var(--primary))',
        'hsl(var(--accent))',
        '#FFD700',
        '#FF6B6B',
        '#4ECDC4',
        '#45B7D1',
      ];
      
      const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      
      setConfetti(particles);
      
      // Auto-hide after animation
      const timer = setTimeout(() => {
        setConfetti([]);
        onComplete?.();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
        >
          {/* Confetti particles */}
          {confetti.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                x: `${particle.x}vw`,
                y: -20,
                rotate: 0,
                scale: 1,
              }}
              animate={{
                y: '100vh',
                rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                scale: [1, 0.8, 1, 0.6],
              }}
              transition={{
                duration: 2.5 + Math.random(),
                delay: particle.delay,
                ease: 'easeOut',
              }}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                backgroundColor: particle.color,
                left: 0,
                top: 0,
              }}
            />
          ))}
          
          {/* Success checkmark */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 20,
              delay: 0.2 
            }}
            className="relative z-10"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                duration: 0.5, 
                delay: 0.4,
                repeat: 1,
              }}
              className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <CheckCircle className="w-12 h-12 text-primary" strokeWidth={2.5} />
              </motion.div>
            </motion.div>
            
            {/* Ripple effect */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute inset-0 rounded-full border-2 border-primary"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="absolute inset-0 rounded-full border-2 border-primary"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessConfetti;
