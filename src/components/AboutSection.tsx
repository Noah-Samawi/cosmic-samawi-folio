import React from 'react';
import { motion } from 'framer-motion';
import { User, Code, Server, Award, Shield, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  const highlights = [
    { icon: Server, key: 'about.highlight1' },
    { icon: Code, key: 'about.highlight2' },
    { icon: Award, key: 'about.highlight3' },
  ];

  const stats = [
    { value: '6+', label: 'Years IT Experience' },
    { value: '10+', label: 'Projects Built' },
    { value: '3', label: 'Languages Spoken' },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
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
            <div className="relative">
              {/* Main avatar card */}
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl glass-card overflow-hidden flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                <User className="w-28 h-28 text-primary/60 group-hover:text-primary/80 transition-colors" />
                
                {/* Security badge overlay */}
                <div className="absolute top-4 right-4 p-2 rounded-xl bg-primary/20 backdrop-blur-sm">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
              </div>
              
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
                A <span className="text-primary">Software Developer</span> with <span className="text-primary">6+ years</span> of enterprise IT experience at <span className="text-primary">CBRE</span>, bridging the gap between <span className="text-accent">secure infrastructure</span> and <span className="text-accent">modern web development</span>.
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {t('about.description2')}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 py-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-muted/30"
                >
                  <span className="block text-2xl font-bold gradient-text">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
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
