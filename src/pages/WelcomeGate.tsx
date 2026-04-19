import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, ArrowRight, Sparkles } from 'lucide-react';
import welcomeBg from '@/assets/welcome-gate-bg.jpg';

const WelcomeGate: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={welcomeBg}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">AI-Powered Solutions</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">
              <span className="gradient-text">Noavio</span>
              <span className="text-foreground"> Solutions</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto">
              Automating the Future with AI-Powered Solutions
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="xl"
              variant="default"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto gap-3 glass-card bg-primary/90 hover:bg-primary border border-primary/50 shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
            >
              <LogIn className="w-5 h-5" />
              Client Login / Sign Up
            </Button>
            <Button
              size="xl"
              variant="glass"
              onClick={() => navigate('/home')}
              className="w-full sm:w-auto gap-3 border border-border/50"
            >
              Explore as Guest
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Subtle footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 text-xs text-muted-foreground/60"
        >
          Frankfurt, Germany · AI & Software Engineering
        </motion.p>
      </div>
    </div>
  );
};

export default WelcomeGate;
