import React from 'react';
import { motion } from 'framer-motion';
import { Code, Shield, Headphones, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Code,
      titleKey: 'services.webdev.title',
      descKey: 'services.webdev.desc',
      features: ['services.webdev.f1', 'services.webdev.f2', 'services.webdev.f3'],
    },
    {
      icon: Shield,
      titleKey: 'services.security.title',
      descKey: 'services.security.desc',
      features: ['services.security.f1', 'services.security.f2', 'services.security.f3'],
    },
    {
      icon: Headphones,
      titleKey: 'services.support.title',
      descKey: 'services.support.desc',
      features: ['services.support.f1', 'services.support.f2', 'services.support.f3'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
    },
  };

  return (
    <section id="services" className="py-24 md:py-32 relative bg-muted/20">
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
            <span className="gradient-text">{t('services.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map(({ icon: Icon, titleKey, descKey, features }) => (
            <motion.div
              key={titleKey}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="glass-card h-full p-8 flex flex-col"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {t(titleKey)}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {t(descKey)}
                </p>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {features.map((featureKey) => (
                    <li key={featureKey} className="flex items-center gap-2 text-sm text-foreground/80">
                      <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                      {t(featureKey)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
