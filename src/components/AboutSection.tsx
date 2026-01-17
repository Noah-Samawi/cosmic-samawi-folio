import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Code, Server, Award, Shield, Globe, Zap, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import noahProfile from '@/assets/noah-profile.png';

const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const [isHovering, setIsHovering] = useState(false);

  // 3D Tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const highlights = [
    { icon: Server, key: 'about.highlight1' },
    { icon: Code, key: 'about.highlight2' },
    { icon: Award, key: 'about.highlight3' },
    { icon: Zap, key: 'about.highlight4' },
    { icon: Users, key: 'about.highlight5' },
  ];

  const stats = [
    { value: '6+', labelKey: 'about.stat1' },
    { value: '5+', labelKey: 'about.stat2' },
    { value: '10+', labelKey: 'about.stat3' },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.02, 0.98]);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('about.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('about.subtitle')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative" style={{ perspective: '1000px' }}>
              {/* Main avatar card - 3D Perspective Tilt effect */}
              <motion.div 
                className="w-64 h-80 md:w-80 md:h-96 rounded-2xl ring-4 ring-primary/30 shadow-2xl shadow-primary/25 overflow-hidden relative cursor-pointer bg-white dark:bg-[#0a0a0a]"
                style={{ 
                  y: imageY, 
                  scale: imageScale,
                  rotateX: isHovering ? rotateX : 0,
                  rotateY: isHovering ? rotateY : 0,
                  transformStyle: 'preserve-3d',
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={handleMouseLeave}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Image container with overlay gradient for soft fade at bottom */}
                <div className="w-full h-full relative">
                  <img 
                    src={noahProfile} 
                    alt="Noah Al-Samawi" 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500"
                    style={{ transform: isHovering ? 'scale(0.85)' : 'scale(0.85)' }}
                  />
                  {/* Bottom fade overlay - paints background color over suit cut-off */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
                {/* Light mode blend mask - fades image edges to blend with white background */}
                <div className="absolute inset-0 pointer-events-none dark:hidden" style={{
                  background: 'radial-gradient(ellipse at center, transparent 50%, white 100%)'
                }} />
                
                {/* Shine effect on hover */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: isHovering 
                      ? 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)'
                      : 'transparent',
                    opacity: isHovering ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                />
                
                {/* Security badge overlay */}
                <div className="absolute top-4 right-4 p-2 rounded-xl bg-primary/20 backdrop-blur-sm" style={{ transform: 'translateZ(20px)' }}>
                  <Shield className="w-5 h-5 text-primary" />
                </div>
              </motion.div>
              
              {/* Experience badge */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -bottom-4 -right-4 w-28 h-28 rounded-2xl glass-card flex flex-col items-center justify-center pulse-glow"
              >
                <span className="text-3xl font-bold gradient-text">6+</span>
                <span className="text-xs text-muted-foreground text-center">{t('about.years')}</span>
              </motion.div>

              {/* Globe badge */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring" }}
                className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl glass-card flex items-center justify-center"
              >
                <Globe className="w-6 h-6 text-primary" />
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Unique value proposition */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
              <p className="text-foreground text-lg leading-relaxed font-medium">
                {t('about.valueProposition')}
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {t('about.description2')}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 py-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.labelKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-muted/30"
                >
                  <span className="block text-2xl font-bold gradient-text">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{t(stat.labelKey)}</span>
                </motion.div>
              ))}
            </div>

            {/* Highlights */}
            <div className="grid gap-3">
              {highlights.map(({ icon: Icon, key }, index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all group border border-transparent hover:border-primary/20"
                >
                  <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground">{t(key)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
